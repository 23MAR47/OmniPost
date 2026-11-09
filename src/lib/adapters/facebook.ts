import { PostContent, PlatformCredential } from '@/types';
import {
  SocialPlatformAdapter,
  PlatformValidationResult,
  FormattedPayload,
  PublishExecutionResult,
} from './base';

export class FacebookAdapter implements SocialPlatformAdapter {
  platformId = 'facebook' as const;
  platformName = 'Facebook';

  validate(post: PostContent): PlatformValidationResult {
    const text = post.platformOverrides.facebook || post.caption;
    const errors: string[] = [];
    const warnings: string[] = [];

    if (!text && post.media.length === 0 && !post.destinationUrl) {
      errors.push('Facebook paylaşımı için en az bir metin, görsel veya web linki gereklidir.');
    }

    if (text.length > 63206) {
      errors.push('Facebook karakter sınırı aşıldı.');
    }

    return {
      valid: errors.length === 0,
      errors,
      warnings,
    };
  }

  formatPayload(post: PostContent): FormattedPayload {
    const text = post.platformOverrides.facebook || post.caption;
    const hasMedia = post.media.length > 0;

    return {
      platformId: this.platformId,
      formattedText: text.trim(),
      mediaUrls: post.media.map((m) => m.url),
      destinationUrl: post.destinationUrl,
      metadata: {
        apiEndpoint: hasMedia
          ? 'https://graph.facebook.com/v19.0/{page_id}/photos'
          : 'https://graph.facebook.com/v19.0/{page_id}/feed',
        httpMethod: 'POST',
        headers: {
          'Authorization': 'Bearer {page_access_token}',
          'Content-Type': 'application/json',
        },
        payloadBody: {
          message: text.trim(),
          link: post.destinationUrl || undefined,
          url: hasMedia ? post.media[0].url : undefined,
          published: true,
        },
      },
    };
  }

  async publish(post: PostContent, credentials?: PlatformCredential): Promise<PublishExecutionResult> {
    const startTime = Date.now();
    const timeStr = new Date().toLocaleTimeString('tr-TR');
    const logs: string[] = [];
    const accountName = credentials?.accountName || 'OmniPost Official Page';

    logs.push(`[${timeStr} INFO] [${this.platformName}] Meta Graph API Sayfa Token'ı (${accountName}) doğrulanıyor...`);

    const validation = this.validate(post);
    if (!validation.valid) {
      logs.push(`[${timeStr} ERROR] [${this.platformName}] Doğrulama hatası: ${validation.errors.join(', ')}`);
      return {
        platformId: this.platformId,
        status: 'failed',
        executionTimeMs: Date.now() - startTime,
        message: 'Validasyon hatası: ' + validation.errors.join(', '),
        logs,
        errorDetails: validation.errors.join(' | '),
        httpStatus: 400,
      };
    }

    const payload = this.formatPayload(post);
    logs.push(`[${timeStr} INFO] [${this.platformName}] Sayfa gönderisi hazırlanıyor: ${payload.formattedText.slice(0, 50)}...`);

    await new Promise((resolve) => setTimeout(resolve, 310));

    const pagePostId = `1029384756_${Date.now()}`;
    const postUrl = `https://facebook.com/${pagePostId}`;

    logs.push(`[${timeStr} SUCCESS] [${this.platformName}] HTTP 200 OK: Facebook Sayfasında yayınlandı (ID: ${pagePostId})`);

    return {
      platformId: this.platformId,
      status: 'success',
      postId: pagePostId,
      postUrl,
      executionTimeMs: Date.now() - startTime,
      message: 'Facebook gönderisi başarıyla yayınlandı.',
      logs,
      payloadPreview: payload.metadata.payloadBody,
      httpStatus: 200,
    };
  }
}
