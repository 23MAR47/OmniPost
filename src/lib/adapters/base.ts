import { PostContent, SocialPlatformId } from '@/types';

export interface PlatformValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

export interface FormattedPayload {
  platformId: SocialPlatformId;
  formattedText: string;
  title?: string;
  mediaUrls: string[];
  destinationUrl?: string;
  metadata: Record<string, any>;
}

export interface PublishExecutionResult {
  platformId: SocialPlatformId;
  status: 'success' | 'failed';
  postId?: string;
  postUrl?: string;
  executionTimeMs: number;
  message: string;
  logs: string[];
  errorDetails?: string;
  payloadPreview?: Record<string, any>;
  httpStatus?: number;
}

export interface SocialPlatformAdapter {
  platformId: SocialPlatformId;
  platformName: string;

  /**
   * Validates the post content against the platform's specific limits and rules
   */
  validate(post: PostContent): PlatformValidationResult;

  /**
   * Adapts/transforms the general post into platform-specific payload format
   */
  formatPayload(post: PostContent): FormattedPayload;

  /**
   * Publishes the content (handles real API call if keys available, or realistic simulator)
   */
  publish(post: PostContent, credentials?: any): Promise<PublishExecutionResult>;
}
