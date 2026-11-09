import { PostContent, SocialPlatformId, PlatformCredential } from '@/types';
import { tokenVault } from '../tokenVault';
import { SocialPlatformAdapter, PublishExecutionResult, PlatformValidationResult, FormattedPayload } from './base';
import { TwitterAdapter } from './twitter';
import { InstagramAdapter } from './instagram';
import { YouTubeAdapter } from './youtube';
import { FacebookAdapter } from './facebook';
import { TikTokAdapter } from './tiktok';
import { PinterestAdapter } from './pinterest';
import { ThreadsAdapter } from './threads';

export * from './base';
export * from './twitter';
export * from './instagram';
export * from './youtube';
export * from './facebook';
export * from './tiktok';
export * from './pinterest';
export * from './threads';

export interface PublishBatchResponse {
  success: boolean;
  totalRequested: number;
  successCount: number;
  failureCount: number;
  totalExecutionTimeMs: number;
  results: PublishExecutionResult[];
}

export class OmniPublisherEngine {
  private adapters: Map<SocialPlatformId, SocialPlatformAdapter> = new Map();

  constructor() {
    this.registerAdapter(new TwitterAdapter());
    this.registerAdapter(new InstagramAdapter());
    this.registerAdapter(new YouTubeAdapter());
    this.registerAdapter(new FacebookAdapter());
    this.registerAdapter(new TikTokAdapter());
    this.registerAdapter(new PinterestAdapter());
    this.registerAdapter(new ThreadsAdapter());
  }

  private registerAdapter(adapter: SocialPlatformAdapter) {
    this.adapters.set(adapter.platformId, adapter);
  }

  public getAdapter(platformId: SocialPlatformId): SocialPlatformAdapter | undefined {
    return this.adapters.get(platformId);
  }

  /**
   * Belirli bir platform için dönüştürülmüş payload'u önizler
   */
  public getPayloadPreview(post: PostContent, platformId: SocialPlatformId): FormattedPayload | null {
    const adapter = this.adapters.get(platformId);
    return adapter ? adapter.formatPayload(post) : null;
  }

  /**
   * Tüm seçili platformlar için gönderiyi önceden doğrular (Pre-flight Validation)
   */
  public validateForPlatforms(
    post: PostContent,
    platformIds: SocialPlatformId[]
  ): Record<SocialPlatformId, PlatformValidationResult> {
    const results: Record<string, PlatformValidationResult> = {};

    for (const id of platformIds) {
      const adapter = this.adapters.get(id);
      if (adapter) {
        results[id] = adapter.validate(post);
      } else {
        results[id] = {
          valid: false,
          errors: [`Platform adaptörü bulunamadı: ${id}`],
          warnings: [],
        };
      }
    }

    return results as Record<SocialPlatformId, PlatformValidationResult>;
  }

  /**
   * Eşzamanlı Dağıtım Motoru (Concurrent Omni Dispatcher)
   * Promise.allSettled ile izole hata yönetimi sağlar:
   * Bir platform hata alsa veya hesabı bağlı olmasa dahi diğer başarılı olanlar etkilenmez.
   */
  public async publishConcurrently(
    post: PostContent,
    platformIds: SocialPlatformId[]
  ): Promise<PublishBatchResponse> {
    const overallStartTime = Date.now();

    // Tüm platformları eşzamanlı olarak tetikler
    const publishPromises = platformIds.map(async (platformId): Promise<PublishExecutionResult> => {
      const adapter = this.adapters.get(platformId);
      const timeStr = new Date().toLocaleTimeString('tr-TR');

      if (!adapter) {
        return {
          platformId,
          status: 'failed',
          executionTimeMs: 0,
          message: `Adaptör mevcut değil: ${platformId}`,
          logs: [`[${timeStr} ERROR] [OmniPublisher] ${platformId} için kayıtlı adaptör bulunamadı.`],
          httpStatus: 404,
        };
      }

      // 1. Token Vault'tan hesap bağlantı durumunu kontrol et
      const credential = tokenVault.getAccount(platformId);

      if (!credential || credential.status === 'disconnected') {
        return {
          platformId,
          status: 'failed',
          executionTimeMs: 30,
          message: `${adapter.platformName} hesabı bağlı değil. Lütfen önce 'Bağlı Hesaplar & API' menüsünden hesabı bağlayın.`,
          logs: [
            `[${timeStr} WARN] [${adapter.platformName}] Token Kasası Kontrolü: Hesap bağlı değil.`,
            `[${timeStr} ERROR] [${adapter.platformName}] 401 Unauthorized: İşlem iptal edildi (Diğer platformlar devam ediyor).`,
          ],
          httpStatus: 401,
        };
      }

      if (credential.status === 'expired') {
        return {
          platformId,
          status: 'failed',
          executionTimeMs: 35,
          message: `${adapter.platformName} OAuth erişim token'ının süresi dolmuş. Lütfen token yenileyin.`,
          logs: [
            `[${timeStr} WARN] [${adapter.platformName}] Token Kasası: Token süresi doldu (${credential.tokenExpiresAt}).`,
            `[${timeStr} ERROR] [${adapter.platformName}] 401 Token Expired.`,
          ],
          httpStatus: 401,
        };
      }

      try {
        const result = await adapter.publish(post, credential);

        // Başarılı olduysa Token Kasası üzerindeki kotayı güncelle
        if (result.status === 'success' && credential.quota) {
          const newUsed = (credential.quota.used || 0) + 1;
          tokenVault.saveAccount(platformId, {
            quota: {
              ...credential.quota,
              used: newUsed,
            },
          });
        }

        return result;
      } catch (err: any) {
        return {
          platformId,
          status: 'failed',
          executionTimeMs: 0,
          message: `Beklenmedik adaptör hatası: ${err.message}`,
          logs: [`[${timeStr} ERROR] [OmniPublisher] İstisna: ${err.message}`],
          errorDetails: err.stack,
          httpStatus: 500,
        };
      }
    });

    const settledResults = await Promise.allSettled(publishPromises);

    const finalResults: PublishExecutionResult[] = settledResults.map((settled, index) => {
      const platformId = platformIds[index];
      if (settled.status === 'fulfilled') {
        return settled.value;
      } else {
        return {
          platformId,
          status: 'failed',
          executionTimeMs: 0,
          message: `İşlem kesintiye uğradı: ${settled.reason}`,
          logs: [`[OmniPublisher] Promise rejected: ${settled.reason}`],
          httpStatus: 500,
        };
      }
    });

    const successCount = finalResults.filter((r) => r.status === 'success').length;
    const failureCount = finalResults.length - successCount;
    const totalExecutionTimeMs = Date.now() - overallStartTime;

    return {
      success: failureCount === 0,
      totalRequested: platformIds.length,
      successCount,
      failureCount,
      totalExecutionTimeMs,
      results: finalResults,
    };
  }
}

// Global singleton motor örneği
export const omniPublisher = new OmniPublisherEngine();
