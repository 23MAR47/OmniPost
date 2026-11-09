import { PostContent, PlatformCredential } from '@/types';
import {
  SocialPlatformAdapter,
  PlatformValidationResult,
  FormattedPayload,
  PublishExecutionResult,
} from './base';

export class PinterestAdapter implements SocialPlatformAdapter {
  platformId = 'pinterest' as const;
  platformName = 'Pinterest';

  validate(post: PostContent): PlatformValidationResult {
    const text = post.platformOverrides.pinterest || post.caption;
    const errors: string[] = [];
    const warnings: string[] = [];

    const hasImage = post.media.some((m) => m.type === 'image');
    if (!hasImage && post.media.length === 0) {
      errors.push('Pinterest için bir görsel (Pin Görseli) zorunludur.');
    }

    if (!post.destinationUrl) {
      warnings.push('Pinterest gönderileri için hedef web sitesi bağlantısı (Link) tavsiye edilir.');
    }

    if (text.length > 500) {
      errors.push(`Pinterest açıklama sınırı 500 karakterdir (Mevcut: ${text.length}).`);
    }

    return {
      valid: errors.length === 0,
      errors,
      warnings,
    };
  }

  formatPayload(post: PostContent): FormattedPayload {
    const text = post.platformOverrides.pinterest || post.caption;
    const image = post.media.find((m) => m.type === 'image') || post.media[0];

    return {
      platformId: this.platformId,
      formattedText: text.trim(),
      title: post.title || text.slice(0, 40) + '...',
      mediaUrls: image ? [image.url] : [],
      destinationUrl: post.destinationUrl || 'https://omnipost.dev',
      metadata: {
        apiEndpoint: 'https://api.pinterest.com/v5/pins',
        httpMethod: 'POST',
        headers: {
          'Authorization': 'Bearer {pinterest_access_token}',
          'Content-Type': 'application/json',
        },
        payloadBody: {
          title: post.title || text.slice(0, 50),
          description: text.trim(),
          link: post.destinationUrl || 'https://omnipost.dev',
          board_id: '88291029384756',
          media_source: {
            source_type: 'image_url',
            url: image?.url,
          },
        },
      },
    };
  }

  async publish(post: PostContent, credentials?: PlatformCredential): Promise<PublishExecutionResult> {
    const startTime = Date.now();
    const timeStr = new Date().toLocaleTimeString('tr-TR');
    const logs: string[] = [];
    const accountHandle = credentials?.accountHandle || '@omnipost_pins';

    logs.push(`[${timeStr} INFO] [${this.platformName}] Pinterest API v5 OAuth doğrulama (${accountHandle})...`);

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
    logs.push(`[${timeStr} INFO] [${this.platformName}] Pin oluşturuluyor: Pano ID #88291029384756`);

    await new Promise((resolve) => setTimeout(resolve, 360));

    const pinId = `${Math.floor(100000000000000000 + Math.random() * 900000000000000000)}`;
    const postUrl = `https://pinterest.com/pin/${pinId}`;

    logs.push(`[${timeStr} SUCCESS] [${this.platformName}] HTTP 201 Created: Pin panoya başarıyla kaydedildi (ID: ${pinId})`);

    return {
      platformId: this.platformId,
      status: 'success',
      postId: pinId,
      postUrl,
      executionTimeMs: Date.now() - startTime,
      message: 'Pinterest pini başarıyla oluşturuldu.',
      logs,
      payloadPreview: payload.metadata.payloadBody,
      httpStatus: 201,
    };
  }
}
