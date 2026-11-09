import { SocialPlatformId, PostContent } from './index';

export type UserRole = 'editor' | 'manager' | 'client';

export type ApprovalStatus =
  | 'draft'
  | 'pending_review'
  | 'needs_changes'
  | 'approved'
  | 'published';

export interface PostComment {
  id: string;
  authorName: string;
  authorRole: UserRole;
  authorAvatar?: string;
  text: string;
  createdAt: string;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  actorName: string;
  actorRole: UserRole;
  action: string;
  previousStatus?: ApprovalStatus;
  newStatus?: ApprovalStatus;
  note?: string;
}

export interface ApprovalPost {
  id: string;
  title: string;
  content: PostContent;
  platforms: SocialPlatformId[];
  targetDate: string;
  status: ApprovalStatus;
  submittedBy: string;
  reviewedBy?: string;
  clientApprovedBy?: string;
  comments: PostComment[];
  auditLogs: AuditLogEntry[];
  workspaceId: string;
}

export interface Workspace {
  id: string;
  name: string;
  clientName: string;
  logo: string;
  plan: 'Starter' | 'Pro' | 'Enterprise';
}
