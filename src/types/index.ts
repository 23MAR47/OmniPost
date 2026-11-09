export type SocialPlatformId =
  | 'youtube'
  | 'twitter'
  | 'instagram'
  | 'facebook'
  | 'tiktok'
  | 'pinterest'
  | 'threads'
  | 'linkedin'
  | 'googlebusiness'
  | 'telegram'
  | 'bluesky'
  | 'discord'
  | 'tumblr';

export interface PlatformMetadata {
  id: SocialPlatformId;
  name: string;
  shortName: string;
  icon: string;
  color: string;
  bgColor: string;
  borderColor: string;
  maxChars: number;
  requiresTitle: boolean;
  requiresMedia: boolean;
  mediaTypes: ('image' | 'video')[];
  placeholder: string;
  isConnected: boolean;
  accountHandle?: string;
}

export interface MediaItem {
  id: string;
  url: string;
  type: 'image' | 'video';
  name: string;
  size?: number;
}

export interface PostContent {
  title: string;
  caption: string;
  media: MediaItem[];
  destinationUrl?: string; // For Pinterest or Facebook
  platformOverrides: Partial<Record<SocialPlatformId, string>>;
}

export type PublishStatusType = 'idle' | 'uploading' | 'publishing' | 'success' | 'partial' | 'error';

export interface PlatformPublishResult {
  platformId: SocialPlatformId;
  status: 'pending' | 'success' | 'failed';
  message?: string;
  postUrl?: string;
  timestamp?: string;
}

export * from './accounts';
export * from './schedule';
export * from './analytics';
export * from './inbox';
export * from './streams';
export * from './evergreen';
export * from './approvals';
