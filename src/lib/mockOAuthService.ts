import { SocialPlatformId, PingResult, PlatformCredential, QuotaInfo } from '@/types';
import { tokenVault } from './tokenVault';
import { PLATFORMS_CONFIG } from './constants';

export class MockOAuthService {
  /**
   * Bir platform için gerçek veya simüle ping/sağlık kontrolü yapar
   */
  public async pingPlatform(platformId: SocialPlatformId): Promise<PingResult> {
    const account = tokenVault.getAccount(platformId);
    const startTime = Date.now();

    // Gerçekçi ağ gecikmesi simülasyonu (40ms - 150ms)
    const simulatedDelay = Math.floor(Math.random() * 80) + 45;
    await new Promise((resolve) => setTimeout(resolve, simulatedDelay));

    const totalPing = Date.now() - startTime;

    if (!account || account.status === 'disconnected') {
      const result: PingResult = {
        platformId,
        success: false,
        pingMs: totalPing,
        status: 'disconnected',
        message: `${PLATFORMS_CONFIG[platformId]?.name || platformId} hesabı bağlı değil. Lütfen OAuth veya API anahtarı ekleyin.`,
        timestamp: new Date().toISOString(),
      };
      tokenVault.updatePing(platformId, totalPing, false, result.message);
      return result;
    }

    // Token süresi kontrolü (varsa)
    if (account.tokenExpiresAt && new Date(account.tokenExpiresAt).getTime() < Date.now()) {
      const result: PingResult = {
        platformId,
        success: false,
        pingMs: totalPing,
        status: 'expired',
        message: 'OAuth Access Token süresi doldu! Refresh token ile yenilenmesi gerekiyor.',
        accountHandle: account.accountHandle,
        timestamp: new Date().toISOString(),
      };
      tokenVault.updatePing(platformId, totalPing, false, result.message);
      return result;
    }

    // Başarılı yanıt
    const result: PingResult = {
      platformId,
      success: true,
      pingMs: totalPing,
      status: 'connected',
      message: `Bağlantı aktif ve sağlıklı. (${account.mode === 'mock' ? 'Simülatör Modu' : 'Canlı API'})`,
      accountHandle: account.accountHandle,
      timestamp: new Date().toISOString(),
      quota: account.quota,
    };

    tokenVault.updatePing(platformId, totalPing, true, result.message);
    return result;
  }

  /**
   * Tüm platformları aynı anda (asenkron eşzamanlı) pingler
   */
  public async pingAllPlatforms(): Promise<PingResult[]> {
    const platformIds: SocialPlatformId[] = [
      'youtube',
      'twitter',
      'instagram',
      'facebook',
      'tiktok',
      'pinterest',
      'threads',
    ];

    const promises = platformIds.map((id) => this.pingPlatform(id));
    return Promise.all(promises);
  }

  /**
   * OAuth 2.0 PKCE El Sıkışmasını Simüle Eder
   */
  public async simulateOAuthHandshake(
    platformId: SocialPlatformId,
    customHandle?: string
  ): Promise<PlatformCredential> {
    // 300ms yapay handshake beklemesi
    await new Promise((resolve) => setTimeout(resolve, 350));

    const account = tokenVault.connectMock(platformId);
    if (customHandle) {
      account.accountHandle = customHandle.startsWith('@') ? customHandle : `@${customHandle}`;
      tokenVault.saveAccount(platformId, { accountHandle: account.accountHandle });
    }
    return account;
  }

  /**
   * Token Yenileme (Refresh Token Akışı)
   */
  public async refreshToken(platformId: SocialPlatformId): Promise<PlatformCredential> {
    await new Promise((resolve) => setTimeout(resolve, 250));

    const newExpiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
    return tokenVault.saveAccount(platformId, {
      status: 'connected',
      tokenExpiresAt: newExpiresAt,
      lastTestedAt: new Date().toISOString(),
      lastError: undefined,
    });
  }
}

export const mockOAuthService = new MockOAuthService();
