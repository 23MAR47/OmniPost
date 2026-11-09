import fs from 'fs';
import path from 'path';
import { ScheduledPost, CreateScheduleRequest, UpdateScheduleRequest, PostContent } from '@/types';
import { omniPublisher } from './adapters';
import { analyticsService } from './analyticsService';
import { SAMPLE_MEDIAS } from './constants';

function generateDefaultScheduledPosts(): ScheduledPost[] {
  const now = new Date();
  
  // Yarın saat 10:00
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(10, 0, 0, 0);

  // Bu Cuma saat 18:30
  const friday = new Date(now);
  const dayOfWeek = friday.getDay();
  const diff = (5 - dayOfWeek + 7) % 7 || 7;
  friday.setDate(friday.getDate() + diff);
  friday.setHours(18, 30, 0, 0);

  // Dün tamamlanmış bir gönderi (Örnek geçmiş)
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  yesterday.setHours(14, 0, 0, 0);

  return [
    {
      id: 'sched-1',
      title: 'Haftalık Bülten & Sosyal Medya Trendleri 🚀',
      caption: 'Bu haftanın en popüler yapay zeka araçları ve sosyal medya otomasyon yöntemleri yayında! Detaylar blogumuzda. #bülten #teknoloji #ai #yazılım',
      media: [
        {
          id: 'media-s1',
          name: 'Tech Trends Banner',
          type: 'image',
          url: SAMPLE_MEDIAS[0].url,
        },
      ],
      platforms: ['twitter', 'threads', 'facebook'],
      destinationUrl: 'https://omnipost.dev/blog/weekly-tech',
      scheduledFor: tomorrow.toISOString(),
      status: 'pending',
      createdAt: new Date(now.getTime() - 2 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'sched-2',
      title: 'Yeni Özellik Tanıtım Videosu & Shorts 🎬',
      caption: 'OmniPost Stüdyo artık tüm platformlara tek tıkla video ve görsel dağıtımı yapabiliyor! Videomuzu izleyin ve düşüncelerinizi paylaşın. #omnipost #shorts #reels',
      media: [
        {
          id: 'media-s2',
          name: 'App Demo Video',
          type: 'video',
          url: SAMPLE_MEDIAS[1].url,
        },
      ],
      platforms: ['youtube', 'tiktok', 'instagram'],
      destinationUrl: 'https://omnipost.dev',
      scheduledFor: friday.toISOString(),
      status: 'pending',
      createdAt: new Date(now.getTime() - 5 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'sched-3',
      title: 'Geliştirici Günlüğü: Çoklu API Mimarisi',
      caption: 'OAuth 2.0 PKCE ve AES-256 şifreli Token Vault nasıl kurulur? Geliştirici rehberimiz yayında.',
      media: [
        {
          id: 'media-s3',
          name: 'Dev Architecture',
          type: 'image',
          url: SAMPLE_MEDIAS[0].url,
        },
      ],
      platforms: ['twitter', 'pinterest'],
      destinationUrl: 'https://github.com/omnipost-studio',
      scheduledFor: yesterday.toISOString(),
      status: 'completed',
      createdAt: new Date(yesterday.getTime() - 24 * 60 * 60 * 1000).toISOString(),
      executedAt: yesterday.toISOString(),
    },
  ];
}

class ScheduleManager {
  private filePath: string;
  private posts: ScheduledPost[];

  constructor() {
    this.filePath = process.env.VERCEL
      ? path.join('/tmp', '.scheduled-posts.json')
      : path.join(process.cwd(), '.scheduled-posts.json');
    this.posts = generateDefaultScheduledPosts();
    this.loadFromDisk();
  }

  private loadFromDisk() {
    try {
      if (fs.existsSync(this.filePath)) {
        const fileContent = fs.readFileSync(this.filePath, 'utf8');
        const parsed = JSON.parse(fileContent);
        if (Array.isArray(parsed) && parsed.length > 0) {
          this.posts = parsed;
        }
      } else {
        this.saveToDisk();
      }
    } catch {
      // Vercel / serverless silent fallback
    }
  }

  private saveToDisk() {
    try {
      fs.writeFileSync(this.filePath, JSON.stringify(this.posts, null, 2), 'utf8');
    } catch {
      // Vercel / serverless silent fallback - data remains in memory
    }
  }

  public getAll(): ScheduledPost[] {
    // Tarihe göre sıralı (En yakından uzağa)
    return [...this.posts].sort(
      (a, b) => new Date(a.scheduledFor).getTime() - new Date(b.scheduledFor).getTime()
    );
  }

  public getById(id: string): ScheduledPost | undefined {
    return this.posts.find((p) => p.id === id);
  }

  public create(data: CreateScheduleRequest): ScheduledPost {
    const newPost: ScheduledPost = {
      id: `sched-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      title: data.title || '',
      caption: data.caption,
      media: data.media || [],
      platforms: data.platforms,
      destinationUrl: data.destinationUrl,
      platformOverrides: data.platformOverrides,
      scheduledFor: data.scheduledFor,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    this.posts.push(newPost);
    this.saveToDisk();
    return newPost;
  }

  public update(id: string, updates: Partial<UpdateScheduleRequest>): ScheduledPost | null {
    const index = this.posts.findIndex((p) => p.id === id);
    if (index === -1) return null;

    this.posts[index] = {
      ...this.posts[index],
      ...updates,
    };

    this.saveToDisk();
    return this.posts[index];
  }

  public cancel(id: string): ScheduledPost | null {
    const post = this.getById(id);
    if (!post) return null;

    post.status = 'cancelled';
    this.saveToDisk();
    return post;
  }

  public delete(id: string): boolean {
    const initialLen = this.posts.length;
    this.posts = this.posts.filter((p) => p.id !== id);
    if (this.posts.length !== initialLen) {
      this.saveToDisk();
      return true;
    }
    return false;
  }

  /**
   * Belirli bir planlı gönderiyi beklemeden hemen yayınlar
   */
  public async triggerNow(id: string): Promise<ScheduledPost | null> {
    const post = this.getById(id);
    if (!post) return null;

    post.status = 'processing';
    this.saveToDisk();

    try {
      const postContent: PostContent = {
        title: post.title,
        caption: post.caption,
        media: post.media,
        destinationUrl: post.destinationUrl,
        platformOverrides: post.platformOverrides || {},
      };

      const publishBatch = await omniPublisher.publishConcurrently(postContent, post.platforms);

      post.status = publishBatch.successCount > 0 ? 'completed' : 'failed';
      post.executedAt = new Date().toISOString();
      post.publishResults = publishBatch.results;

      try {
        analyticsService.recordPublishedPost(postContent, publishBatch.results);
      } catch (analyticsErr) {
        console.warn('[ScheduleService] Analitik kaydı oluşturulamadı:', analyticsErr);
      }

      this.saveToDisk();
      return post;
    } catch (err: any) {
      post.status = 'failed';
      post.errorDetails = err.message;
      this.saveToDisk();
      return post;
    }
  }

  /**
   * Arka plan Cron/Worker kontrolü: Zamanı dolan (scheduledFor <= now) ve 'pending' olan içerikleri yayınlar
   */
  public async runWorkerCheck(): Promise<{ processedCount: number; executedIds: string[] }> {
    const now = new Date().getTime();
    const duePosts = this.posts.filter(
      (p) => p.status === 'pending' && new Date(p.scheduledFor).getTime() <= now
    );

    const executedIds: string[] = [];

    for (const post of duePosts) {
      await this.triggerNow(post.id);
      executedIds.push(post.id);
    }

    return {
      processedCount: duePosts.length,
      executedIds,
    };
  }

  public resetToDefaults(): ScheduledPost[] {
    this.posts = generateDefaultScheduledPosts();
    this.saveToDisk();
    return this.getAll();
  }
}

export const scheduleManager = new ScheduleManager();
