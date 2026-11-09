import { SocialPlatformId, MediaItem } from './index';
import type { PublishExecutionResult } from '@/lib/adapters/base';

export type ScheduledStatus = 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled';

export interface ScheduledPost {
  id: string;
  title: string;
  caption: string;
  media: MediaItem[];
  platforms: SocialPlatformId[];
  destinationUrl?: string;
  platformOverrides?: Partial<Record<SocialPlatformId, string>>;
  scheduledFor: string; // ISO String (Tarih ve Saat)
  status: ScheduledStatus;
  createdAt: string;
  executedAt?: string;
  publishResults?: PublishExecutionResult[];
  errorDetails?: string;
}

export interface CreateScheduleRequest {
  title: string;
  caption: string;
  media: MediaItem[];
  platforms: SocialPlatformId[];
  destinationUrl?: string;
  platformOverrides?: Partial<Record<SocialPlatformId, string>>;
  scheduledFor: string;
}

export interface UpdateScheduleRequest {
  id: string;
  title?: string;
  caption?: string;
  platforms?: SocialPlatformId[];
  scheduledFor?: string;
  destinationUrl?: string;
  status?: ScheduledStatus;
}
