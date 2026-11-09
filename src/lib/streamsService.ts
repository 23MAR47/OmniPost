import { StreamColumn, StreamItem } from '@/types/streams';

const INITIAL_COLUMNS: StreamColumn[] = [
  {
    id: 'col-1',
    title: 'OmniPost Bahsetmeleri',
    type: 'mentions',
    platformId: 'twitter',
    queryParam: '@omnipost_app OR #omnipost',
    refreshIntervalSec: 60,
    items: [
      {
        id: 's-101',
        platformId: 'twitter',
        authorName: 'Eren Yurt',
        authorHandle: '@erenyurt_dev',
        authorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face',
        content: 'OmniPost ile 7 ağa aynı anda video ve metin dağıttık. Buffer ve Hootsuite’e kıyasla arayüz hızı ve PWA stabilitesi şaşırtıcı seviyede iyi! 🔥',
        timestamp: '12 dk önce',
        likes: 42,
        comments: 6,
        shares: 11,
        sentiment: 'positive',
        reachEstimate: 14200,
      },
      {
        id: 's-102',
        platformId: 'twitter',
        authorName: 'Dijital Ajans TR',
        authorHandle: '@dijitalajans_ist',
        authorAvatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&h=100&fit=crop&crop=face',
        content: 'Instagram carouselleri ve YouTube Shorts için tek bir paneli müşterilerimize açtık. Onay akışı harika çalışıyor. @omnipost_app',
        timestamp: '45 dk önce',
        likes: 19,
        comments: 2,
        shares: 4,
        sentiment: 'positive',
        reachEstimate: 8500,
      },
    ],
  },
  {
    id: 'col-2',
    title: 'Trend Konular: #SosyalMedya & AI',
    type: 'keywords',
    platformId: 'instagram',
    queryParam: '#sosyalmedyayonetimi #yapayzeka',
    refreshIntervalSec: 120,
    items: [
      {
        id: 's-201',
        platformId: 'instagram',
        authorName: 'Gizem Tasarım',
        authorHandle: '@gizemdesigns',
        authorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face',
        content: '2026 sosyal medya algoritmalarında dikey video ve ilk 3 saniye kancası (hook) her zamankinden daha kritik. Yapay zeka destekli başlık kurguları etkileşimi %240 artırıyor.',
        timestamp: '1 saat önce',
        likes: 184,
        comments: 31,
        shares: 28,
        sentiment: 'neutral',
        reachEstimate: 29000,
      },
      {
        id: 's-202',
        platformId: 'instagram',
        authorName: 'Pazarlama Bülteni',
        authorHandle: '@pazarlamabulteni',
        authorAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&h=100&fit=crop&crop=face',
        content: 'Omnichannel içerik yayını yapan markalar tek kanala odaklananlara kıyasla 4.2 kat daha hızlı büyüyor. #pazarlama #growth #ai',
        timestamp: '2 saat önce',
        likes: 310,
        comments: 44,
        shares: 62,
        sentiment: 'positive',
        reachEstimate: 52000,
      },
    ],
  },
  {
    id: 'col-3',
    title: 'Rakip Radarı: Hootsuite & Buffer',
    type: 'competitor',
    platformId: 'threads',
    queryParam: 'Hootsuite pricing OR Buffer alternatives',
    refreshIntervalSec: 180,
    items: [
      {
        id: 's-301',
        platformId: 'threads',
        authorName: 'Can Teknoloji',
        authorHandle: '@cantekno',
        authorAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face',
        content: 'Hootsuite kurumsal paket fiyatları küçük ajanslar için çok yükseldi. Yerli ve istemci tarafında şifrelenen (client-vault) modern alternatifler aranıyor.',
        timestamp: '3 saat önce',
        likes: 78,
        comments: 18,
        shares: 9,
        sentiment: 'neutral',
        reachEstimate: 16500,
      },
      {
        id: 's-302',
        platformId: 'threads',
        authorName: 'Mert Aksoy',
        authorHandle: '@mert_social',
        authorAvatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop&crop=face',
        content: 'Plexorin ve Hootsuite özelliklerini birleştiren açık kaynak ya da uygun lisanslı bir platform olsa hemen geçerim.',
        timestamp: '4 saat önce',
        likes: 122,
        comments: 29,
        shares: 15,
        sentiment: 'positive',
        reachEstimate: 21000,
      },
    ],
  },
];

const STORAGE_KEY = 'omnipost_streams_v1';

export class StreamsService {
  private static getStored(): StreamColumn[] {
    if (typeof window === 'undefined') return INITIAL_COLUMNS;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_COLUMNS));
        return INITIAL_COLUMNS;
      }
      return JSON.parse(raw);
    } catch {
      return INITIAL_COLUMNS;
    }
  }

  private static setStored(cols: StreamColumn[]) {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cols));
    } catch (e) {
      console.error('Failed to save streams', e);
    }
  }

  static getColumns(): StreamColumn[] {
    return this.getStored();
  }

  static addColumn(newCol: Omit<StreamColumn, 'id' | 'items'>): StreamColumn {
    const cols = this.getStored();
    const created: StreamColumn = {
      ...newCol,
      id: 'col-' + Date.now(),
      items: [
        {
          id: 'item-' + Date.now(),
          platformId: newCol.platformId,
          authorName: 'Sosyal Bot Radar',
          authorHandle: '@radar_bot',
          authorAvatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&h=100&fit=crop',
          content: `Takip edilen sorgu için ilk canlı sinyal yakalandı: "${newCol.queryParam}".`,
          timestamp: 'Az önce',
          likes: 3,
          comments: 0,
          shares: 1,
          sentiment: 'positive',
          reachEstimate: 1200,
        },
      ],
    };
    cols.push(created);
    this.setStored(cols);
    return created;
  }

  static deleteColumn(columnId: string): void {
    const cols = this.getStored().filter((c) => c.id !== columnId);
    this.setStored(cols);
  }

  static toggleLike(columnId: string, itemId: string): StreamItem | undefined {
    const cols = this.getStored();
    const col = cols.find((c) => c.id === columnId);
    if (!col) return undefined;
    const item = col.items.find((i) => i.id === itemId);
    if (!item) return undefined;

    item.isLikedByMe = !item.isLikedByMe;
    item.likes += item.isLikedByMe ? 1 : -1;
    this.setStored(cols);
    return item;
  }
}
