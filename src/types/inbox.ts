import { SocialPlatformId } from './index';

export type MessageStatus = 'unread' | 'pending' | 'resolved';
export type MessagePriority = 'urgent' | 'normal' | 'low';
export type SentimentType = 'positive' | 'neutral' | 'negative';

export interface ChatMessage {
  id: string;
  fromUser: boolean; // true = incoming customer, false = our team/bot reply
  text: string;
  sentAt: string;
  senderName: string;
  senderAvatar?: string;
}

export interface InboxConversation {
  id: string;
  platformId: SocialPlatformId;
  senderName: string;
  senderHandle: string;
  senderAvatar: string;
  lastMessageSnippet: string;
  lastMessageAt: string;
  status: MessageStatus;
  priority: MessagePriority;
  sentiment: SentimentType;
  slaMinutesWaiting: number; // minutes elapsed since last unanswered incoming message
  assignedTo?: string;
  tags: string[];
  unreadCount: number;
  messages: ChatMessage[];
}
