import { SocialPlatformId } from './index';

export interface EvergreenPost {
  id: string;
  bucketId: string;
  caption: string;
  mediaUrl?: string;
  platforms: SocialPlatformId[];
  timesRecycled: number;
  maxRecycles: number; // 0 = unlimited
  lastSharedAt?: string;
  nextScheduledAt: string;
  isPaused: boolean;
  engagementScore: number; // percentage (e.g. 94%)
}

export interface EvergreenBucket {
  id: string;
  name: string;
  color: string;
  description: string;
  recycleIntervalDays: number; // e.g. every 14 days
  cooldownHours: number; // min hours between posts from this bucket (Exhaustion Shield)
  postCount: number;
  isActive: boolean;
}
