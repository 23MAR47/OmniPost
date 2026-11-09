import { SocialPlatformId } from './index';

export type StreamColumnType = 'mentions' | 'keywords' | 'competitor' | 'trend' | 'timeline';

export interface StreamItem {
  id: string;
  platformId: SocialPlatformId;
  authorName: string;
  authorHandle: string;
  authorAvatar: string;
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  shares: number;
  sentiment: 'positive' | 'neutral' | 'negative';
  mediaUrl?: string;
  isLikedByMe?: boolean;
  reachEstimate?: number;
}

export interface StreamColumn {
  id: string;
  title: string;
  type: StreamColumnType;
  platformId: SocialPlatformId;
  queryParam: string; // e.g., "@omnipost", "#yapayzeka", "Rakip: Buffer"
  refreshIntervalSec: number;
  items: StreamItem[];
}
