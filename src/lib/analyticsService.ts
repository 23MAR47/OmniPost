import fs from 'fs';
import path from 'path';
import { PostHistoryItem, AnalyticsSummary, SocialPlatformId } from '@/types';
import { SAMPLE_MEDIAS, PLATFORMS_CONFIG } from './constants';
import { omniPublisher } from './adapters';

function generateDefaultHistory(): PostHistoryItem[] {
  const now = new Date();

  return [
    {
      id: 'hist-1',
      title: 'OmniPost Çoklu Dağıtım Lansman Duyurusu! 🚀',
      caption: 'Tek bir modern stüdyodan YouTube, X, Instagram, Facebook, TikTok, Pinterest ve Threads hesaplarınıza aynı anda içerik dağıtın! #teknoloji #yazılım #omnipost #ai',
      mediaCount: 1,
      mediaThumbnail: SAMPLE_MEDIAS[0].url,
      publishedAt: new Date(now.getTime() - 2 * 60 * 60 * 1000).toISOString(), // 2 saat önce
      status: 'success',
      platforms: [
        {
          platformId: 'twitter',
          status: 'success',
          postId: '18491029384756',
          postUrl: 'https://x.com/omnipost_app/status/18491029384756',
          metrics: { views: 6400, likes: 480, comments: 42, shares: 88 },
        },
        {
          platformId: 'instagram',
          status: 'success',
          postId: '17992837465',
          postUrl: 'https://instagram.com/p/DAx9102b',
          metrics: { views: 12800, likes: 1150, comments: 94, shares: 120 },
        },
        {
          platformId: 'youtube',
          status: 'success',
          postId: 'yt_k891aX',
          postUrl: 'https://youtube.com/watch?v=yt_k891aX',
          metrics: { views: 24500, likes: 2100, comments: 160, shares: 310 },
        },
        {
          platformId: 'facebook',
          status: 'success',
          postId: 'fb_882910',
          postUrl: 'https://facebook.com/fb_882910',
          metrics: { views: 3200, likes: 180, comments: 18, shares: 24 },
        },
        {
          platformId: 'tiktok',
          status: 'success',
          postId: 'tt_99281',
          postUrl: 'https://tiktok.com/@omnipost_tok/video/tt_99281',
          metrics: { views: 38000, likes: 4200, comments: 280, shares: 540 },
        },
        {
          platformId: 'pinterest',
          status: 'success',
          postId: 'pin_38291',
          postUrl: 'https://pinterest.com/pin/pin_38291',
          metrics: { views: 1900, likes: 95, comments: 8, shares: 45 },
        },
        {
          platformId: 'threads',
          status: 'success',
          postId: 'th_019283',
          postUrl: 'https://threads.net/@omnipost.threads/post/th_019283',
          metrics: { views: 4100, likes: 320, comments: 35, shares: 52 },
        },
      ],
      totalViews: 90900,
      totalLikes: 8525,
      totalComments: 637,
      totalShares: 1179,
    },
    {
      id: 'hist-2',
      title: 'Haftalık Yapay Zeka Bülteni: Agent Sistemleri',
      caption: 'Bu hafta yapay zeka ajanları ve otomatik iş akışları yazılım dünyasını nasıl dönüştürüyor? İnceleme yazımız blogda.',
      mediaCount: 1,
      mediaThumbnail: SAMPLE_MEDIAS[1].url,
      publishedAt: new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString(), // Dün
      status: 'success',
      platforms: [
        {
          platformId: 'twitter',
          status: 'success',
          postId: '18490011223344',
          postUrl: 'https://x.com/omnipost_app/status/18490011223344',
          metrics: { views: 4200, likes: 310, comments: 28, shares: 64 },
        },
        {
          platformId: 'threads',
          status: 'success',
          postId: 'th_998877',
          postUrl: 'https://threads.net/@omnipost.threads/post/th_998877',
          metrics: { views: 2800, likes: 190, comments: 19, shares: 32 },
        },
        {
          platformId: 'facebook',
          status: 'success',
          postId: 'fb_554433',
          postUrl: 'https://facebook.com/fb_554433',
          metrics: { views: 1600, likes: 95, comments: 12, shares: 15 },
        },
      ],
      totalViews: 8600,
      totalLikes: 595,
      totalComments: 59,
      totalShares: 111,
    },
    {
      id: 'hist-3',
      title: 'Tasarım Sistemimiz: Modern Temiz Açık Tema',
      caption: 'Kullanıcı dostu, göz yormayan Açık Tema tasarım ilkelerimiz ve Tailwind mimarimiz.',
      mediaCount: 1,
      mediaThumbnail: SAMPLE_MEDIAS[0].url,
      publishedAt: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 gün önce
      status: 'partial',
      platforms: [
        {
          platformId: 'instagram',
          status: 'success',
          postId: 'ig_776655',
          postUrl: 'https://instagram.com/p/DAw1102b',
          metrics: { views: 8900, likes: 740, comments: 55, shares: 70 },
        },
        {
          platformId: 'pinterest',
          status: 'failed',
          errorMessage: 'Pano seçimi yapılmadı veya API geçici yanıt vermedi.',
        },
      ],
      totalViews: 8900,
      totalLikes: 740,
      totalComments: 55,
      totalShares: 70,
    },
    {
      id: 'hist-4',
      title: 'Mobil Stüdyo & Shorts Fragmanı 🎬',
      caption: 'Her ekranda kusursuz çalışan OmniPost mobil arayüzünü keşfedin! #reels #shorts #tiktok',
      mediaCount: 1,
      mediaThumbnail: SAMPLE_MEDIAS[1].url,
      publishedAt: new Date(now.getTime() - 4 * 24 * 60 * 60 * 1000).toISOString(), // 4 gün önce
      status: 'success',
      platforms: [
        {
          platformId: 'youtube',
          status: 'success',
          postId: 'yt_shorts_01',
          postUrl: 'https://youtube.com/shorts/yt_shorts_01',
          metrics: { views: 18200, likes: 1450, comments: 110, shares: 220 },
        },
        {
          platformId: 'tiktok',
          status: 'success',
          postId: 'tt_shorts_01',
          postUrl: 'https://tiktok.com/@omnipost_tok/video/tt_shorts_01',
          metrics: { views: 24500, likes: 2800, comments: 195, shares: 380 },
        },
        {
          platformId: 'instagram',
          status: 'success',
          postId: 'ig_reel_01',
          postUrl: 'https://instagram.com/reel/ig_reel_01',
          metrics: { views: 15300, likes: 1200, comments: 88, shares: 140 },
        },
      ],
      totalViews: 58000,
      totalLikes: 5450,
      totalComments: 393,
      totalShares: 740,
    },
  ];
}

class AnalyticsService {
  private filePath: string;
  private history: PostHistoryItem[];

  constructor() {
    this.filePath = path.join(process.cwd(), '.post-history.json');
    this.history = generateDefaultHistory();
    this.loadFromDisk();
  }

  private loadFromDisk() {
    try {
      if (fs.existsSync(this.filePath)) {
        const fileContent = fs.readFileSync(this.filePath, 'utf8');
        const parsed = JSON.parse(fileContent);
        if (Array.isArray(parsed) && parsed.length > 0) {
          this.history = parsed;
        }
      } else {
        this.saveToDisk();
      }
    } catch (e) {
      console.warn('[AnalyticsService] Dosya okunamadı, varsayılanlar yükleniyor:', e);
    }
  }

  private saveToDisk() {
    try {
      fs.writeFileSync(this.filePath, JSON.stringify(this.history, null, 2), 'utf8');
    } catch (e) {
      console.warn('[AnalyticsService] Diske kaydedilemedi:', e);
    }
  }

  public getAll(): PostHistoryItem[] {
    return [...this.history].sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  }

  public recordPublishedPost(
    post: { title?: string; caption?: string; media?: { url: string }[] },
    results: { platformId: SocialPlatformId; status: 'success' | 'failed'; postId?: string; postUrl?: string; errorMessage?: string }[]
  ): PostHistoryItem {
    const successCount = results.filter((r) => r.status === 'success').length;
    const overallStatus: 'success' | 'partial' | 'failed' =
      successCount === results.length ? 'success' : successCount > 0 ? 'partial' : 'failed';

    const platformDetails = results.map((r) => {
      const views = r.status === 'success' ? Math.floor(Math.random() * 500) + 50 : 0;
      const likes = r.status === 'success' ? Math.floor(views * 0.08) + 2 : 0;
      const comments = r.status === 'success' ? Math.floor(views * 0.015) : 0;
      const shares = r.status === 'success' ? Math.floor(views * 0.01) : 0;

      return {
        platformId: r.platformId,
        status: r.status,
        postId: r.postId,
        postUrl: r.postUrl,
        errorMessage: r.errorMessage,
        metrics: { views, likes, comments, shares },
      };
    });

    const totalViews = platformDetails.reduce((sum, p) => sum + (p.metrics?.views || 0), 0);
    const totalLikes = platformDetails.reduce((sum, p) => sum + (p.metrics?.likes || 0), 0);
    const totalComments = platformDetails.reduce((sum, p) => sum + (p.metrics?.comments || 0), 0);
    const totalShares = platformDetails.reduce((sum, p) => sum + (p.metrics?.shares || 0), 0);

    const newItem: PostHistoryItem = {
      id: 'hist-' + Date.now(),
      title: post.title || 'Başlıksız gönderi',
      caption: post.caption || '',
      mediaCount: post.media?.length || 0,
      mediaThumbnail: post.media?.[0]?.url,
      publishedAt: new Date().toISOString(),
      status: overallStatus,
      platforms: platformDetails,
      totalViews,
      totalLikes,
      totalComments,
      totalShares,
    };

    this.history.unshift(newItem);
    this.saveToDisk();
    return newItem;
  }

  public getSummary(): AnalyticsSummary {
    const all = this.getAll();
    const totalPosts = all.length;

    let totalPlatformDispatches = 0;
    let totalSuccessfulDispatches = 0;
    let totalViews = 0;
    let totalLikes = 0;
    let totalComments = 0;
    let totalShares = 0;

    const platformDistribution: Record<SocialPlatformId, number> = {
      youtube: 0,
      twitter: 0,
      instagram: 0,
      facebook: 0,
      tiktok: 0,
      pinterest: 0,
      threads: 0,
      linkedin: 0,
      googlebusiness: 0,
      telegram: 0,
      bluesky: 0,
      discord: 0,
      tumblr: 0,
    };

    all.forEach((item) => {
      totalViews += item.totalViews || 0;
      totalLikes += item.totalLikes || 0;
      totalComments += item.totalComments || 0;
      totalShares += item.totalShares || 0;

      item.platforms.forEach((p) => {
        totalPlatformDispatches += 1;
        if (p.status === 'success') {
          totalSuccessfulDispatches += 1;
        }
        if (platformDistribution[p.platformId] !== undefined) {
          platformDistribution[p.platformId] += 1;
        }
      });
    });

    const successRate =
      totalPlatformDispatches > 0
        ? Math.round((totalSuccessfulDispatches / totalPlatformDispatches) * 1000) / 10
        : 100;

    // Son 7 günlük trend
    const dailyMap: Record<string, { posts: number; views: number }> = {};
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateKey = d.toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' });
      dailyMap[dateKey] = { posts: 0, views: 0 };
    }

    all.forEach((item) => {
      const dateKey = new Date(item.publishedAt).toLocaleDateString('tr-TR', {
        day: 'numeric',
        month: 'short',
      });
      if (dailyMap[dateKey]) {
        dailyMap[dateKey].posts += 1;
        dailyMap[dateKey].views += item.totalViews || 0;
      }
    });

    const dailyTrend = Object.entries(dailyMap).map(([date, data]) => ({
      date,
      postsCount: data.posts,
      viewsCount: data.views,
    }));

    return {
      totalPosts,
      totalSuccess: totalSuccessfulDispatches,
      totalFailed: totalPlatformDispatches - totalSuccessfulDispatches,
      successRate,
      totalViews,
      totalLikes,
      totalComments,
      totalShares,
      platformDistribution,
      dailyTrend,
    };
  }

  /**
   * Başarısız platformu yeniden deneme (Isolated Retry)
   */
  public async retryPlatform(
    historyId: string,
    platformId: SocialPlatformId
  ): Promise<PostHistoryItem | null> {
    const post = this.history.find((h) => h.id === historyId);
    if (!post) return null;

    const platDetail = post.platforms.find((p) => p.platformId === platformId);
    if (!platDetail) return null;

    // Retry via omniPublisher
    const res = await omniPublisher.publishConcurrently(
      {
        title: post.title,
        caption: post.caption,
        media: [],
        platformOverrides: {},
      },
      [platformId]
    );

    const publishRes = res.results[0];
    if (publishRes && publishRes.status === 'success') {
      platDetail.status = 'success';
      platDetail.postId = publishRes.postId;
      platDetail.postUrl = publishRes.postUrl;
      platDetail.errorMessage = undefined;
      platDetail.metrics = {
        views: 120,
        likes: 14,
        comments: 2,
        shares: 1,
      };

      // Check if all platforms are now success
      const allSuccess = post.platforms.every((p) => p.status === 'success');
      post.status = allSuccess ? 'success' : 'partial';

      this.saveToDisk();
      return post;
    }

    return null;
  }

  /**
   * CSV formatında profesyonel rapor dışa aktarma (Export)
   * Excel ve Türkçe bölgesel ayarları ile %100 uyumlu (Noktalı virgül ve UTF-8 BOM)
   */
  public generateCSV(delimiter: ';' | ',' = ';'): string {
    const d = delimiter;
    const escape = (val: any): string => {
      if (val === null || val === undefined) return '""';
      const str = String(val).replace(/\r\n/g, ' ').replace(/\n/g, ' ').replace(/"/g, '""');
      return `"${str}"`;
    };

    const platformNames: Record<string, string> = {
      twitter: 'X (Twitter)',
      instagram: 'Instagram',
      youtube: 'YouTube',
      facebook: 'Facebook',
      tiktok: 'TikTok',
      pinterest: 'Pinterest',
      threads: 'Threads',
    };

    const statusLabels: Record<string, string> = {
      success: 'Başarılı',
      partial: 'Kısmi Başarılı',
      failed: 'Başarısız',
    };

    const headers = [
      'Gönderi ID',
      'Başlık',
      'Açıklama / Metin',
      'Yayın Tarihi',
      'Yayın Saati',
      'Genel Durum',
      'Hedef Ağ Sayısı',
      'Başarılı Ağlar',
      'Hatalı Ağlar',
      'Görüntülenme',
      'Beğeni',
      'Yorum',
      'Paylaşım',
      'Toplam Etkileşim',
      'Etkileşim Oranı (%)',
      'Platform Detayları',
    ];

    const rows: string[] = [];
    // sep directive for Excel auto-detection
    rows.push(`sep=${d}`);
    rows.push(headers.map(escape).join(d));

    const allItems = this.getAll();
    let sumViews = 0;
    let sumLikes = 0;
    let sumComments = 0;
    let sumShares = 0;

    allItems.forEach((item) => {
      const pubDate = new Date(item.publishedAt);
      const datePart = isNaN(pubDate.getTime())
        ? '-'
        : pubDate.toLocaleDateString('tr-TR', { day: '2-digit', month: '2-digit', year: 'numeric' });
      const timePart = isNaN(pubDate.getTime())
        ? '-'
        : pubDate.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

      const statusTr = statusLabels[item.status] || item.status;

      const successfulPlatforms = item.platforms
        .filter((p) => p.status === 'success')
        .map((p) => platformNames[p.platformId] || p.platformId);

      const failedPlatforms = item.platforms
        .filter((p) => p.status === 'failed')
        .map((p) => {
          const name = platformNames[p.platformId] || p.platformId;
          return p.errorMessage ? `${name} (${p.errorMessage})` : name;
        });

      const successfulStr = successfulPlatforms.length > 0 ? successfulPlatforms.join(', ') : 'Yok';
      const failedStr = failedPlatforms.length > 0 ? failedPlatforms.join(', ') : 'Yok (Tümü Başarılı)';

      const platformDetailsStr = item.platforms
        .map((p) => {
          const name = platformNames[p.platformId] || p.platformId;
          const st = statusLabels[p.status] || p.status;
          return `${name}: ${st}`;
        })
        .join(' | ');

      const totalEngagements = (item.totalLikes || 0) + (item.totalComments || 0) + (item.totalShares || 0);
      const engagementRate =
        (item.totalViews || 0) > 0
          ? ((totalEngagements / item.totalViews) * 100).toFixed(2).replace('.', ',') + '%'
          : '0,00%';

      sumViews += item.totalViews || 0;
      sumLikes += item.totalLikes || 0;
      sumComments += item.totalComments || 0;
      sumShares += item.totalShares || 0;

      const rowValues = [
        item.id,
        item.title || '(Başlıksız)',
        item.caption || '',
        datePart,
        timePart,
        statusTr,
        item.platforms.length,
        successfulStr,
        failedStr,
        item.totalViews || 0,
        item.totalLikes || 0,
        item.totalComments || 0,
        item.totalShares || 0,
        totalEngagements,
        engagementRate,
        platformDetailsStr,
      ];

      rows.push(rowValues.map(escape).join(d));
    });

    // Summary Section at the bottom of the CSV
    const totalEng = sumLikes + sumComments + sumShares;
    const avgRate = sumViews > 0 ? ((totalEng / sumViews) * 100).toFixed(2).replace('.', ',') + '%' : '0,00%';

    rows.push('');
    rows.push(['--- GENEL PERFORMANS VE DAĞITIM ÖZETİ ---'].map(escape).join(d));
    rows.push(['Toplam Gönderi Adedi', allItems.length].map(escape).join(d));
    rows.push(['Toplam Görüntülenme', sumViews].map(escape).join(d));
    rows.push(['Toplam Beğeni', sumLikes].map(escape).join(d));
    rows.push(['Toplam Yorum', sumComments].map(escape).join(d));
    rows.push(['Toplam Paylaşım', sumShares].map(escape).join(d));
    rows.push(['Toplam Etkileşim', totalEng].map(escape).join(d));
    rows.push(['Ortalama Etkileşim Oranı', avgRate].map(escape).join(d));
    rows.push(['Raporlama Tarihi', new Date().toLocaleString('tr-TR')].map(escape).join(d));

    return '\uFEFF' + rows.join('\r\n');
  }
}

export const analyticsService = new AnalyticsService();
