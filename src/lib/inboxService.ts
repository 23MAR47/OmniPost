import { InboxConversation, MessageStatus } from '@/types/inbox';

const INITIAL_CONVERSATIONS: InboxConversation[] = [
  {
    id: 'conv-1',
    platformId: 'instagram',
    senderName: 'Selin Yılmaz',
    senderHandle: '@selin.ylmz',
    senderAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
    lastMessageSnippet: 'Merhaba, OmniPost projenizin ajans paket fiyatları ve çoklu kullanıcı lisansı hakkında bilgi alabilir miyim?',
    lastMessageAt: new Date(Date.now() - 14 * 60 * 1000).toISOString(),
    status: 'unread',
    priority: 'urgent',
    sentiment: 'positive',
    slaMinutesWaiting: 14,
    assignedTo: 'Müşteri Temsilcisi',
    tags: ['Satış', 'Fiyat Bilgisi', 'Ajans'],
    unreadCount: 1,
    messages: [
      {
        id: 'msg-101',
        fromUser: true,
        text: 'İyi günler! Sosyal medya ajansımız için tek panelden 7 ağa içerik dağıtan bir sistem arıyoruz.',
        sentAt: new Date(Date.now() - 16 * 60 * 1000).toISOString(),
        senderName: 'Selin Yılmaz',
      },
      {
        id: 'msg-102',
        fromUser: true,
        text: 'Merhaba, OmniPost projenizin ajans paket fiyatları ve çoklu kullanıcı lisansı hakkında bilgi alabilir miyim?',
        sentAt: new Date(Date.now() - 14 * 60 * 1000).toISOString(),
        senderName: 'Selin Yılmaz',
      },
    ],
  },
  {
    id: 'conv-2',
    platformId: 'twitter',
    senderName: 'Barış Demir',
    senderHandle: '@baris_tech',
    senderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    lastMessageSnippet: '@omnipost_official YouTube Shorts yüklerken video çözünürlüğü ve başlık limiti nedir? Çok pratik görünüyor.',
    lastMessageAt: new Date(Date.now() - 48 * 60 * 1000).toISOString(),
    status: 'pending',
    priority: 'normal',
    sentiment: 'positive',
    slaMinutesWaiting: 48,
    assignedTo: 'Teknik Destek',
    tags: ['Teknik', 'YouTube', 'Shorts'],
    unreadCount: 0,
    messages: [
      {
        id: 'msg-201',
        fromUser: true,
        text: '@omnipost_official YouTube Shorts yüklerken video çözünürlüğü ve başlık limiti nedir? Çok pratik görünüyor.',
        sentAt: new Date(Date.now() - 48 * 60 * 1000).toISOString(),
        senderName: 'Barış Demir',
      },
    ],
  },
  {
    id: 'conv-3',
    platformId: 'youtube',
    senderName: 'Kadir Karaca',
    senderHandle: '@kadirkodluyor',
    senderAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
    lastMessageSnippet: 'Harika bir sosyal medya platformu! OpenXML Excel ihracı ve AES-256 istemci kasası mimarisi çok başarılı olmuş. Tebrikler!',
    lastMessageAt: new Date(Date.now() - 150 * 60 * 1000).toISOString(),
    status: 'unread',
    priority: 'urgent',
    sentiment: 'positive',
    slaMinutesWaiting: 150,
    tags: ['Tebrik', 'Geri Bildirim'],
    unreadCount: 1,
    messages: [
      {
        id: 'msg-301',
        fromUser: true,
        text: 'Harika bir sosyal medya platformu! OpenXML Excel ihracı ve AES-256 istemci kasası mimarisi çok başarılı olmuş. Tebrikler!',
        sentAt: new Date(Date.now() - 150 * 60 * 1000).toISOString(),
        senderName: 'Kadir Karaca',
      },
    ],
  },
  {
    id: 'conv-4',
    platformId: 'tiktok',
    senderName: 'Melisa Aksoy',
    senderHandle: '@melisadesign',
    senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face',
    lastMessageSnippet: 'TikTok için dikey 9:16 video önizlemesi ve kapak seçimi eklenecek mi?',
    lastMessageAt: new Date(Date.now() - 360 * 60 * 1000).toISOString(),
    status: 'resolved',
    priority: 'low',
    sentiment: 'neutral',
    slaMinutesWaiting: 0,
    tags: ['Özellik İsteği', 'TikTok'],
    unreadCount: 0,
    messages: [
      {
        id: 'msg-401',
        fromUser: true,
        text: 'TikTok için dikey 9:16 video önizlemesi ve kapak seçimi eklenecek mi?',
        sentAt: new Date(Date.now() - 360 * 60 * 1000).toISOString(),
        senderName: 'Melisa Aksoy',
      },
      {
        id: 'msg-402',
        fromUser: false,
        text: 'Merhaba Melisa Hanım, evet! 9:16 Remotion kompozisyon motorumuz ve stüdyo önizlememiz şu anda aktif olarak kullanılabilir.',
        sentAt: new Date(Date.now() - 340 * 60 * 1000).toISOString(),
        senderName: 'OmniPost Ekibi',
      },
    ],
  },
  {
    id: 'conv-5',
    platformId: 'facebook',
    senderName: 'E-Ticaret Danışmanlık A.Ş.',
    senderHandle: 'eticaret_tr',
    senderAvatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face',
    lastMessageSnippet: 'Kurumsal sunucumuza on-premise kurabilir miyiz? Verilerimizin şirket dışına çıkmaması gerekiyor.',
    lastMessageAt: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
    status: 'unread',
    priority: 'urgent',
    sentiment: 'neutral',
    slaMinutesWaiting: 25,
    assignedTo: 'Kurumsal Çözümler',
    tags: ['On-Premise', 'Kurumsal', 'GDPR'],
    unreadCount: 1,
    messages: [
      {
        id: 'msg-501',
        fromUser: true,
        text: 'Kurumsal sunucumuza on-premise kurabilir miyiz? Verilerimizin şirket dışına çıkmaması gerekiyor.',
        sentAt: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
        senderName: 'E-Ticaret Danışmanlık A.Ş.',
      },
    ],
  },
];

const STORAGE_KEY = 'omnipost_inbox_v1';

export class InboxService {
  private static getStored(): InboxConversation[] {
    if (typeof window === 'undefined') return INITIAL_CONVERSATIONS;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_CONVERSATIONS));
        return INITIAL_CONVERSATIONS;
      }
      return JSON.parse(raw);
    } catch {
      return INITIAL_CONVERSATIONS;
    }
  }

  private static setStored(items: InboxConversation[]) {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save inbox', e);
    }
  }

  static getConversations(): InboxConversation[] {
    return this.getStored();
  }

  static sendReply(conversationId: string, replyText: string): InboxConversation {
    const items = this.getStored();
    const conv = items.find((c) => c.id === conversationId);
    if (!conv) throw new Error('Konuşma bulunamadı');

    const newMsg = {
      id: 'msg-' + Date.now(),
      fromUser: false,
      text: replyText,
      sentAt: new Date().toISOString(),
      senderName: 'OmniPost Temsilcisi',
    };

    conv.messages.push(newMsg);
    conv.lastMessageSnippet = replyText;
    conv.lastMessageAt = newMsg.sentAt;
    conv.status = 'resolved';
    conv.unreadCount = 0;
    conv.slaMinutesWaiting = 0;

    this.setStored(items);
    return conv;
  }

  static updateStatus(conversationId: string, status: MessageStatus): InboxConversation {
    const items = this.getStored();
    const conv = items.find((c) => c.id === conversationId);
    if (!conv) throw new Error('Konuşma bulunamadı');

    conv.status = status;
    if (status === 'resolved') {
      conv.unreadCount = 0;
      conv.slaMinutesWaiting = 0;
    }
    this.setStored(items);
    return conv;
  }
}
