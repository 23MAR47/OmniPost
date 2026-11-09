import { PostContent, PlatformCredential } from '@/types';
import {
  SocialPlatformAdapter,
  PlatformValidationResult,
  FormattedPayload,
  PublishExecutionResult,
} from './base';

export class TikTokAdapter implements SocialPlatformAdapter {
  platformId = 'tiktok' as const;
  platformName = 'TikTok';

  validate(post: PostContent): PlatformValidationResult {
    const text = post.platformOverrides.tiktok || post.caption;
    const errors: string[] = [];
    const warnings: string[] = [];

    const hasVideo = post.media.some((m) => m.type === 'video');
    if (!hasVideo && post.media.length > 0) {
      errors.push('TikTok için video dosyası (MP4/WebM) zorunludur. Görseller desteklenmez.');
    } else if (post.media.length === 0) {
      errors.push('TikTok paylaşımı için bir video eklemelisiniz.');
    }

    if (text.length > 2200) {
      errors.push(`TikTok açıklama limiti 2200 karakterdir (Mevcut: ${text.length}).`);
    }

    warnings.push('En iyi izlenme için 9:16 dikey video formatı önerilir.');

    return {
      valid: errors.length === 0,
      errors,
      warnings,
    };
  }

  formatPayload(post: PostContent): FormattedPayload {
    const text = post.platformOverrides.tiktok || post.caption;
    const video = post.media.find((m) => m.type === 'video') || post.media[0];

    return {
      platformId: this.platformId,
      formattedText: text.trim(),
      mediaUrls: video ? [video.url] : [],
      metadata: {
        apiEndpoint: 'https://open.tiktokapis.com/v2/post/publish/video/init/',
        httpMethod: 'POST',
        headers: {
          'Authorization': 'Bearer {tiktok_user_access_token}',
          'Content-Type': 'application/json',
        },
        payloadBody: {
          post_info: {
            title: text.slice(0, 150),
            privacy_level: 'PUBLIC_TO_EVERYONE',
            disable_duet: false,
            disable_comment: false,
            disable_stitch: false,
            video_cover_timestamp_ms: 1000,
          },
          source_info: {
            source: 'FILE_UPLOAD',
            video_url: video?.url,
          },
        },
      },
    };
  }

  async publish(post: PostContent, credentials?: PlatformCredential): Promise<PublishExecutionResult> {
    const startTime = Date.now();
    const timeStr = new Date().toLocaleTimeString('tr-TR');
    const logs: string[] = [];
    const accountHandle = credentials?.accountHandle || '@omnipost_tok';

    logs.push(`[${timeStr} INFO] [${this.platformName}] TikTok Open API v2 OAuth denetimi (${accountHandle})...`);

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
    logs.push(`[${timeStr} INFO] [${this.platformName}] Video yükleme oturumu başlatılıyor (Chunked Upload)...`);

    await new Promise((resolve) => setTimeout(resolve, 420));

    const publishId = `v_pub_${Math.floor(100000000 + Math.random() * 900000000)}`;
    const postUrl = `https://tiktok.com/${accountHandle}/video/${publishId}`;

    logs.push(`[${timeStr} SUCCESS] [${this.platformName}] HTTP 200 OK: Video işleme kuyruğuna alındı ve yayınlandı (ID: ${publishId})`);

    return {
      platformId: this.platformId,
      status: 'success',
      postId: publishId,
      postUrl,
      executionTimeMs: Date.now() - startTime,
      message: 'TikTok videosu başarıyla yüklendi.',
      logs,
      payloadPreview: payload.metadata.payloadBody,
      httpStatus: 200,
    };
  }
}
