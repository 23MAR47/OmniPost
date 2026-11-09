import { SocialPlatformId } from './index';

export interface PlatformMetric {
  views: number;
  likes: number;
  comments: number;
  shares: number;
}

export interface PlatformHistoryDetail {
  platformId: SocialPlatformId;
  status: 'success' | 'failed';
  postId?: string;
  postUrl?: string;
  errorMessage?: string;
  executionTimeMs?: number;
  metrics?: PlatformMetric;
}

export interface PostHistoryItem {
  id: string;
  title: string;
  caption: string;
  mediaCount: number;
  mediaThumbnail?: string;
  publishedAt: string;
  status: 'success' | 'partial' | 'failed';
  platforms: PlatformHistoryDetail[];
  totalViews: number;
  totalLikes: number;
  totalComments: number;
  totalShares: number;
}

export interface AnalyticsSummary {
  totalPosts: number;
  totalSuccess: number;
  totalFailed: number;
  successRate: number;
  totalViews: number;
  totalLikes: number;
  totalComments: number;
  totalShares: number;
  platformDistribution: Record<SocialPlatformId, number>;
  dailyTrend: {
    date: string;
    postsCount: number;
    viewsCount: number;
  }[];
}
