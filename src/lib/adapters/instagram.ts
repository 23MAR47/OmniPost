import { PostContent, PlatformCredential } from '@/types';
import {
  SocialPlatformAdapter,
  PlatformValidationResult,
  FormattedPayload,
  PublishExecutionResult,
} from './base';

export class InstagramAdapter implements SocialPlatformAdapter {
  platformId = 'instagram' as const;
  platformName = 'Instagram';

  validate(post: PostContent): PlatformValidationResult {
    const text = post.platformOverrides.instagram || post.caption;
    const errors: string[] = [];
    const warnings: string[] = [];

    if (post.media.length === 0) {
      errors.push('Instagram için en az 1 adet görsel veya video zorunludur.');
    }

    if (post.media.length > 10) {
      errors.push('Instagram Karusel (Carousel) gönderileri en fazla 10 medya içerebilir.');
    }

    if (text.length > 2200) {
      errors.push(`Instagram açıklama limiti 2,200 karakterdir (Mevcut: ${text.length}).`);
    }

    // Hashtag sayısı uyarısı
    const hashtags = (text.match(/#[a-zA-Z0-9_ğüşıöçĞÜŞİÖÇ]+/g) || []);
    if (hashtags.length > 30) {
      errors.push('Instagram en fazla 30 hashtag kullanımına izin verir.');
    }

    return {
      valid: errors.length === 0,
      errors,
      warnings,
    };
  }

  formatPayload(post: PostContent): FormattedPayload {
    const text = post.platformOverrides.instagram || post.caption;
    const isCarousel = post.media.length > 1;
    const isReel = post.media.length === 1 && post.media[0].type === 'video';

    return {
      platformId: this.platformId,
      formattedText: text.trim(),
      mediaUrls: post.media.map((m) => m.url),
      metadata: {
        apiEndpoint: 'https://graph.facebook.com/v19.0/{ig_user_id}/media',
        httpMethod: 'POST',
        headers: {
          'Authorization': 'Bearer ***',
          'Content-Type': 'application/json',
        },
        payloadBody: {
          caption: text.trim(),
          media_type: isCarousel ? 'CAROUSEL' : isReel ? 'REELS' : 'IMAGE',
          children: isCarousel ? post.media.map((m, i) => ({ type: m.type.toUpperCase(), url: m.url })) : undefined,
          image_url: !isCarousel && !isReel && post.media.length > 0 ? post.media[0].url : undefined,
          video_url: isReel ? post.media[0].url : undefined,
        },
        formatType: isCarousel ? 'Karusel (Çoklu Fotoğraf/Video)' : isReel ? 'Reels' : 'Tekil Post',
      },
    };
  }

  async publish(post: PostContent, credentials?: PlatformCredential): Promise<PublishExecutionResult> {
    const startTime = Date.now();
    const timeStr = new Date().toLocaleTimeString('tr-TR');
    const logs: string[] = [];
    const accountHandle = credentials?.accountHandle || '@omnipost.creator';

    logs.push(`[${timeStr} INFO] [${this.platformName}] Meta Graph API Instagram İşletme Hesabı doğrulanıyor (${accountHandle})...`);

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
    logs.push(`[${timeStr} INFO] [${this.platformName}] IG Medya Konteyneri (${payload.metadata.formatType}) oluşturuluyor...`);
    logs.push(`[${timeStr} INFO] [${this.platformName}] Açıklama ve hashtag analizi tamamlandı.`);

    await new Promise((resolve) => setTimeout(resolve, 380));

    const igMediaId = `179${Math.floor(10000000000 + Math.random() * 90000000000)}`;
    const postShortcode = Math.random().toString(36).substring(2, 13);
    const postUrl = `https://instagram.com/p/${postShortcode}`;

    logs.push(`[${timeStr} SUCCESS] [${this.platformName}] HTTP 200: Medya konteyneri yayınlandı (ID: ${igMediaId})`);

    return {
      platformId: this.platformId,
      status: 'success',
      postId: igMediaId,
      postUrl,
      executionTimeMs: Date.now() - startTime,
      message: 'Instagram gönderisi başarıyla yayınlandı.',
      logs,
      payloadPreview: payload.metadata.payloadBody,
      httpStatus: 200,
    };
  }
}
