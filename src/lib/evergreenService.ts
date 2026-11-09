import { EvergreenBucket, EvergreenPost } from '@/types/evergreen';

const INITIAL_BUCKETS: EvergreenBucket[] = [
  {
    id: 'b-1',
    name: '🌟 Haftalık Motivasyon & İpuçları',
    color: '#3B82F6',
    description: 'Pazartesi motivasyon sözleri, yazılım & tasarım verimlilik ipuçları.',
    recycleIntervalDays: 14,
    cooldownHours: 72,
    postCount: 3,
    isActive: true,
  },
  {
    id: 'b-2',
    name: '📊 Ürün Özellikleri & Tanıtımlar',
    color: '#8B5CF6',
    description: 'OmniPost temel özellikleri, API entegrasyonu, PWA desteği ve güvenlik vitrini.',
    recycleIntervalDays: 21,
    cooldownHours: 96,
    postCount: 2,
    isActive: true,
  },
  {
    id: 'b-3',
    name: '🎙️ Müşteri Başarı Hikayeleri & Vaka Analizleri',
    color: '#10B981',
    description: 'Sosyal medya ajanslarının elde ettiği %300 zaman tasarrufu hikayeleri.',
    recycleIntervalDays: 30,
    cooldownHours: 120,
    postCount: 2,
    isActive: true,
  },
];

const INITIAL_POSTS: EvergreenPost[] = [
  {
    id: 'ep-1',
    bucketId: 'b-1',
    caption: '“Büyük işler, küçük şeylerin bir araya getirilmesiyle oluşur.” — Vincent Van Gogh. Haftaya üretken başlamak için hedeflerinizi 3 ana maddeye bölün! 🚀 #motivasyon #hedef #üretkenlik',
    mediaUrl: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=500&fit=crop',
    platforms: ['twitter', 'instagram', 'threads'],
    timesRecycled: 4,
    maxRecycles: 0,
    lastSharedAt: new Date(Date.now() - 12 * 24 * 3600 * 1000).toISOString(),
    nextScheduledAt: new Date(Date.now() + 2 * 24 * 3600 * 1000).toISOString(),
    isPaused: false,
    engagementScore: 92,
  },
  {
    id: 'ep-2',
    bucketId: 'b-1',
    caption: 'Yazılımcılar için altın kural: Kod yazmadan önce problemi bir kağıda çizin. Çözüm %50 basitleşecektir. 💻✨ #yazılım #ipucu #kodlama',
    platforms: ['twitter', 'threads'],
    timesRecycled: 2,
    maxRecycles: 8,
    lastSharedAt: new Date(Date.now() - 8 * 24 * 3600 * 1000).toISOString(),
    nextScheduledAt: new Date(Date.now() + 6 * 24 * 3600 * 1000).toISOString(),
    isPaused: false,
    engagementScore: 88,
  },
  {
    id: 'ep-3',
    bucketId: 'b-2',
    caption: 'Tek panelden YouTube Shorts, TikTok, Reels ve X akışlarına video dağıtmak hiç bu kadar kolay olmamıştı! OmniPost ile saniyeler içinde yayındasınız. 📱🎬 #omnipost #sosyalmedya #video',
    mediaUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=500&fit=crop',
    platforms: ['youtube', 'tiktok', 'instagram', 'facebook'],
    timesRecycled: 6,
    maxRecycles: 12,
    lastSharedAt: new Date(Date.now() - 18 * 24 * 3600 * 1000).toISOString(),
    nextScheduledAt: new Date(Date.now() + 3 * 24 * 3600 * 1000).toISOString(),
    isPaused: false,
    engagementScore: 96,
  },
  {
    id: 'ep-4',
    bucketId: 'b-3',
    caption: 'Bir dijital ajans, OmniPost’un çoklu platform kuyruğuna geçerek haftada tam 18 çalışma saati kazandı! Detaylı vaka çalışması web sitemizde yayında. 📈🌟 #vakaanalizi #growth #agency',
    platforms: ['twitter', 'facebook', 'instagram'],
    timesRecycled: 1,
    maxRecycles: 5,
    lastSharedAt: new Date(Date.now() - 25 * 24 * 3600 * 1000).toISOString(),
    nextScheduledAt: new Date(Date.now() + 5 * 24 * 3600 * 1000).toISOString(),
    isPaused: false,
    engagementScore: 85,
  },
];

const BUCKETS_KEY = 'omnipost_evergreen_buckets_v1';
const POSTS_KEY = 'omnipost_evergreen_posts_v1';

export class EvergreenService {
  private static getStoredBuckets(): EvergreenBucket[] {
    if (typeof window === 'undefined') return INITIAL_BUCKETS;
    try {
      const raw = localStorage.getItem(BUCKETS_KEY);
      if (!raw) {
        localStorage.setItem(BUCKETS_KEY, JSON.stringify(INITIAL_BUCKETS));
        return INITIAL_BUCKETS;
      }
      return JSON.parse(raw);
    } catch {
      return INITIAL_BUCKETS;
    }
  }

  private static getStoredPosts(): EvergreenPost[] {
    if (typeof window === 'undefined') return INITIAL_POSTS;
    try {
      const raw = localStorage.getItem(POSTS_KEY);
      if (!raw) {
        localStorage.setItem(POSTS_KEY, JSON.stringify(INITIAL_POSTS));
        return INITIAL_POSTS;
      }
      return JSON.parse(raw);
    } catch {
      return INITIAL_POSTS;
    }
  }

  private static savePosts(posts: EvergreenPost[]) {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(POSTS_KEY, JSON.stringify(posts));
    } catch (e) {
      console.error('Failed to save evergreen posts', e);
    }
  }

  private static saveBuckets(buckets: EvergreenBucket[]) {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(BUCKETS_KEY, JSON.stringify(buckets));
    } catch (e) {
      console.error('Failed to save evergreen buckets', e);
    }
  }

  static getData(): { buckets: EvergreenBucket[]; posts: EvergreenPost[] } {
    return {
      buckets: this.getStoredBuckets(),
      posts: this.getStoredPosts(),
    };
  }

  static togglePostPause(postId: string): EvergreenPost {
    const posts = this.getStoredPosts();
    const post = posts.find((p) => p.id === postId);
    if (!post) throw new Error('Gönderi bulunamadı');

    post.isPaused = !post.isPaused;
    this.savePosts(posts);
    return post;
  }

  static toggleBucketActive(bucketId: string): EvergreenBucket {
    const buckets = this.getStoredBuckets();
    const bucket = buckets.find((b) => b.id === bucketId);
    if (!bucket) throw new Error('Havuz bulunamadı');

    bucket.isActive = !bucket.isActive;
    this.saveBuckets(buckets);
    return bucket;
  }

  static recycleNow(postId: string): EvergreenPost {
    const posts = this.getStoredPosts();
    const post = posts.find((p) => p.id === postId);
    if (!post) throw new Error('Gönderi bulunamadı');

    post.timesRecycled += 1;
    post.lastSharedAt = new Date().toISOString();
    // Schedule next according to default 14 days
    post.nextScheduledAt = new Date(Date.now() + 14 * 24 * 3600 * 1000).toISOString();
    this.savePosts(posts);
    return post;
  }
}
