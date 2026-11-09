import { PostContent, PlatformCredential } from '@/types';
import {
  SocialPlatformAdapter,
  PlatformValidationResult,
  FormattedPayload,
  PublishExecutionResult,
} from './base';

export class YouTubeAdapter implements SocialPlatformAdapter {
  platformId = 'youtube' as const;
  platformName = 'YouTube';

  validate(post: PostContent): PlatformValidationResult {
    const text = post.platformOverrides.youtube || post.caption;
    const errors: string[] = [];
    const warnings: string[] = [];

    if (!post.title || post.title.trim() === '') {
      errors.push('YouTube için video başlığı (Title) zorunludur.');
    } else if (post.title.length > 100) {
      errors.push('YouTube başlığı en fazla 100 karakter olabilir.');
    }

    const hasVideo = post.media.some((m) => m.type === 'video');
    if (!hasVideo && post.media.length > 0) {
      errors.push('YouTube yalnızca video formatlarını kabul eder (Fotoğraf kabul edilmez).');
    }

    if (text.length > 5000) {
      errors.push(`YouTube açıklama sınırı 5000 karakterdir (Mevcut: ${text.length}).`);
    }

    return {
      valid: errors.length === 0,
      errors,
      warnings,
    };
  }

  formatPayload(post: PostContent): FormattedPayload {
    const text = post.platformOverrides.youtube || post.caption;
    const video = post.media.find((m) => m.type === 'video') || post.media[0];

    // Açıklamadan etiketleri çıkarma (#etiket -> ['etiket'])
    const extractedTags = (text.match(/#[a-zA-Z0-9_ğüşıöçĞÜŞİÖÇ]+/g) || [])
      .map((t) => t.replace('#', ''))
      .slice(0, 15);

    const isShorts = post.title.toLowerCase().includes('#shorts') || text.toLowerCase().includes('#shorts');

    return {
      platformId: this.platformId,
      formattedText: text.trim(),
      title: post.title,
      mediaUrls: video ? [video.url] : [],
      metadata: {
        apiEndpoint: 'https://www.googleapis.com/upload/youtube/v3/videos?uploadType=resumable&part=snippet,status',
        httpMethod: 'POST',
        headers: {
          'Authorization': 'Bearer ***',
          'Content-Type': 'application/json; charset=UTF-8',
        },
        payloadBody: {
          snippet: {
            title: post.title,
            description: text.trim(),
            tags: extractedTags.length > 0 ? extractedTags : ['omnipost', 'video', 'shorts'],
            categoryId: '28', // Bilim ve Teknoloji
            defaultLanguage: 'tr',
          },
          status: {
            privacyStatus: 'public',
            selfDeclaredMadeForKids: false,
            embeddable: true,
          },
        },
        contentType: isShorts ? 'YouTube Shorts (Dikey 9:16)' : 'Standart Video',
      },
    };
  }

  async publish(post: PostContent, credentials?: PlatformCredential): Promise<PublishExecutionResult> {
    const startTime = Date.now();
    const timeStr = new Date().toLocaleTimeString('tr-TR');
    const logs: string[] = [];
    const accountName = credentials?.accountName || 'OmniPost Stüdyo & Dev';

    logs.push(`[${timeStr} INFO] [${this.platformName}] Google Cloud OAuth 2.0 oturumu doğrulanıyor (${accountName})...`);

    const validation = this.validate(post);
    if (!validation.valid) {
      logs.push(`[${timeStr} ERROR] [${this.platformName}] Doğrulama başarısız: ${validation.errors.join(', ')}`);
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
    logs.push(`[${timeStr} INFO] [${this.platformName}] Video meta bilgileri paketlendi: "${payload.title}" (${payload.metadata.contentType})`);
    logs.push(`[${timeStr} INFO] [${this.platformName}] Resumable Video Yükleme kanalı açılıyor...`);

    // Gerçekçi video işleme ve yükleme simülasyonu
    await new Promise((resolve) => setTimeout(resolve, 450));

    const videoId = Math.random().toString(36).substring(2, 13);
    const postUrl = `https://youtube.com/watch?v=${videoId}`;

    logs.push(`[${timeStr} SUCCESS] [${this.platformName}] HTTP 200 OK: Video başarıyla yüklendi ve yayınlandı (ID: ${videoId})`);

    return {
      platformId: this.platformId,
      status: 'success',
      postId: videoId,
      postUrl,
      executionTimeMs: Date.now() - startTime,
      message: 'YouTube videosu başarıyla yüklendi ve yayınlandı.',
      logs,
      payloadPreview: payload.metadata.payloadBody,
      httpStatus: 200,
    };
  }
}
