import { ApprovalPost, ApprovalStatus, UserRole, Workspace, PostComment, AuditLogEntry } from '@/types/approvals';

export const WORKSPACES: Workspace[] = [
  { id: 'ws-1', name: 'OmniPost HQ', clientName: 'Ana Merkez / B2B SaaS', logo: '🏢', plan: 'Enterprise' },
  { id: 'ws-2', name: 'TechBrand E-Ticaret', clientName: 'TechBrand Bilişim A.Ş.', logo: '🛍️', plan: 'Pro' },
  { id: 'ws-3', name: 'Glamour Kozmetik', clientName: 'Glamour Ltd. Şti.', logo: '✨', plan: 'Pro' },
  { id: 'ws-4', name: 'FinTech Growth', clientName: 'Finansal Teknoloji Lab', logo: '🚀', plan: 'Enterprise' },
];

const INITIAL_APPROVAL_POSTS: ApprovalPost[] = [
  {
    id: 'app-1',
    title: 'Black Friday Erken Erişim Kampanyası',
    workspaceId: 'ws-2',
    targetDate: '2026-11-20T14:00:00Z',
    status: 'pending_review',
    submittedBy: 'Zeynep (İçerik Editörü)',
    reviewedBy: 'Emre (Pazarlama Müdürü)',
    platforms: ['instagram', 'twitter', 'tiktok'],
    content: {
      title: 'Erken Erişim Başladı! 🎉',
      caption: 'Yılın en büyük indirim festivali için VIP listemize katılanlara özel %50 erken erişim kodu açıldı! Bio’daki linke tıkla ve yerini ayırt. #blackfriday #indirim #fırsat',
      media: [
        {
          id: 'med-bf1',
          name: 'BlackFriday_Banner.png',
          type: 'image',
          url: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&h=600&fit=crop',
        },
      ],
      platformOverrides: {},
    },
    comments: [
      {
        id: 'c-1',
        authorName: 'Emre (Pazarlama Müdürü)',
        authorRole: 'manager',
        text: 'Görsel harika görünüyor! Başlıkta indirim yüzdesini ilk cümleye çekebilir miyiz?',
        createdAt: 'Bugün 11:20',
      },
    ],
    auditLogs: [
      {
        id: 'a-1',
        timestamp: 'Bugün 10:15',
        actorName: 'Zeynep (İçerik Editörü)',
        actorRole: 'editor',
        action: 'Taslak oluşturuldu ve incelemeye gönderildi.',
        previousStatus: 'draft',
        newStatus: 'pending_review',
      },
      {
        id: 'a-2',
        timestamp: 'Bugün 11:20',
        actorName: 'Emre (Pazarlama Müdürü)',
        actorRole: 'manager',
        action: 'Revizyon notu eklendi.',
        note: 'Görsel harika görünüyor...',
      },
    ],
  },
  {
    id: 'app-2',
    title: 'Yeni Sürüm v2.4 Lansman Duyurusu',
    workspaceId: 'ws-1',
    targetDate: '2026-11-05T09:00:00Z',
    status: 'approved',
    submittedBy: 'Ali (Teknik Yazar)',
    reviewedBy: 'Emre (Pazarlama Müdürü)',
    clientApprovedBy: 'Murat Bey (Müşteri Temsilcisi)',
    platforms: ['twitter', 'youtube', 'threads'],
    content: {
      title: 'OmniPost v2.4 Yayında!',
      caption: 'Hootsuite & Plexorin tersine mühendislik kabiliyetleri, canlı dinleme akışları ve SLA aciliyet sayacı artık devrede! 🚀 Detaylar blogumuzda. #saas #update #producthunt',
      media: [
        {
          id: 'med-v24',
          name: 'v24_Release.jpg',
          type: 'image',
          url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop',
        },
      ],
      platformOverrides: {},
    },
    comments: [
      {
        id: 'c-2',
        authorName: 'Murat Bey (Müşteri)',
        authorRole: 'client',
        text: 'Metin ve görseller onaylandı. Zamanlanan saatte yayına alınabilir.',
        createdAt: 'Dün 16:40',
      },
    ],
    auditLogs: [
      {
        id: 'a-3',
        timestamp: 'Dün 14:00',
        actorName: 'Ali (Teknik Yazar)',
        actorRole: 'editor',
        action: 'Taslak oluşturuldu.',
        newStatus: 'pending_review',
      },
      {
        id: 'a-4',
        timestamp: 'Dün 16:40',
        actorName: 'Murat Bey (Müşteri)',
        actorRole: 'client',
        action: 'Müşteri onayı verildi.',
        previousStatus: 'pending_review',
        newStatus: 'approved',
      },
    ],
  },
  {
    id: 'app-3',
    title: 'Sonbahar Cilt Bakım Serisi Çekilişi',
    workspaceId: 'ws-3',
    targetDate: '2026-11-12T18:00:00Z',
    status: 'needs_changes',
    submittedBy: 'Buse (Sosyal Medya Uzmanı)',
    reviewedBy: 'Emre (Pazarlama Müdürü)',
    platforms: ['instagram', 'tiktok'],
    content: {
      title: 'Cilt Bakım Çekilişi!',
      caption: '3 şanslı takipçimize yeni hyaluronik asit serum setimizi hediye ediyoruz! Katılmak için 2 arkadaşını etiketle ve bu postu beğen. 🌸💧',
      media: [],
      platformOverrides: {},
    },
    comments: [
      {
        id: 'c-3',
        authorName: 'Emre (Pazarlama Müdürü)',
        authorRole: 'manager',
        text: 'Milli Piyango yasal izin uyarısı ve çekiliş bitiş tarihi caption altına mutlaka eklenmeli!',
        createdAt: '2 saat önce',
      },
    ],
    auditLogs: [
      {
        id: 'a-5',
        timestamp: '3 saat önce',
        actorName: 'Buse (Uzman)',
        actorRole: 'editor',
        action: 'Gönderildi.',
        newStatus: 'pending_review',
      },
      {
        id: 'a-6',
        timestamp: '2 saat önce',
        actorName: 'Emre (Müdür)',
        actorRole: 'manager',
        action: 'Değişiklik talep edildi (Needs Changes).',
        previousStatus: 'pending_review',
        newStatus: 'needs_changes',
      },
    ],
  },
];

const STORAGE_KEY = 'omnipost_approvals_v1';

export class ApprovalsService {
  private static getStored(): ApprovalPost[] {
    if (typeof window === 'undefined') return INITIAL_APPROVAL_POSTS;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_APPROVAL_POSTS));
        return INITIAL_APPROVAL_POSTS;
      }
      return JSON.parse(raw);
    } catch {
      return INITIAL_APPROVAL_POSTS;
    }
  }

  private static setStored(posts: ApprovalPost[]) {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
    } catch (e) {
      console.error('Failed to save approval posts', e);
    }
  }

  static getPosts(workspaceId?: string): ApprovalPost[] {
    const posts = this.getStored();
    if (!workspaceId) return posts;
    return posts.filter((p) => p.workspaceId === workspaceId);
  }

  static updateStatus(
    postId: string,
    newStatus: ApprovalStatus,
    actorName: string,
    actorRole: UserRole,
    note?: string
  ): ApprovalPost {
    const posts = this.getStored();
    const post = posts.find((p) => p.id === postId);
    if (!post) throw new Error('Onay içeriği bulunamadı');

    const prev = post.status;
    post.status = newStatus;

    if (newStatus === 'approved') {
      if (actorRole === 'client') post.clientApprovedBy = actorName;
      else post.reviewedBy = actorName;
    }

    const logEntry: AuditLogEntry = {
      id: 'log-' + Date.now(),
      timestamp: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
      actorName,
      actorRole,
      action: `Durum "${prev}" -> "${newStatus}" olarak güncellendi.`,
      previousStatus: prev,
      newStatus,
      note,
    };
    post.auditLogs.unshift(logEntry);

    if (note) {
      const comment: PostComment = {
        id: 'c-' + Date.now(),
        authorName: actorName,
        authorRole: actorRole,
        text: note,
        createdAt: 'Az önce',
      };
      post.comments.push(comment);
    }

    this.setStored(posts);
    return post;
  }
}
