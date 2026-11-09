'use client';

import React, { useState } from 'react';
import {
  Bell,
  CheckCheck,
  Inbox,
  Radio,
  Repeat,
  ShieldCheck,
  Sparkles,
  ExternalLink,
  X,
  Clock,
} from 'lucide-react';

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  category: 'inbox' | 'approvals' | 'streams' | 'system';
  unread: boolean;
  targetTab: string;
}

interface NotificationsCenterProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTab: (tabId: string) => void;
}

export const NotificationsCenter: React.FC<NotificationsCenterProps> = ({
  isOpen,
  onClose,
  onSelectTab,
}) => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'notif-1',
      title: 'Acil Müşteri Talebi (SLA Uyarısı)',
      message: 'Glamour Kozmetik için Instagram DM üzerinden kargo sorgusu geldi. 14 dakika içinde yanıtlanmalı.',
      time: '3 dk önce',
      category: 'inbox',
      unread: true,
      targetTab: 'inbox',
    },
    {
      id: 'notif-2',
      title: 'İçerik Onayı Bekleniyor',
      message: 'Yarın sabah 09:30 için zamanlanan "Yapay Zeka Kampanyası" taslağı müşteri onayını bekliyor.',
      time: '18 dk önce',
      category: 'approvals',
      unread: true,
      targetTab: 'approvals',
    },
    {
      id: 'notif-3',
      title: 'Viral Trend Sinyali Tespit Edildi',
      message: 'Canlı dinleme akışınızda #YapayZeka etiketi X üzerinde son 1 saatte %280 etkileşim artışı kaydetti.',
      time: '42 dk önce',
      category: 'streams',
      unread: true,
      targetTab: 'streams',
    },
    {
      id: 'notif-4',
      title: 'Evergreen Havuzu Geri Dönüşümü Tamamlandı',
      message: 'Tükenme kalkanı (72 saat) onaylanan 2 yüksek etkileşimli gönderi yeniden dağıtıma alındı.',
      time: '2 saat önce',
      category: 'system',
      unread: false,
      targetTab: 'evergreen',
    },
  ]);

  const [filter, setFilter] = useState<'all' | 'inbox' | 'approvals' | 'streams'>('all');

  const unreadCount = notifications.filter((n) => n.unread).length;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const handleItemClick = (item: NotificationItem) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === item.id ? { ...n, unread: false } : n))
    );
    onSelectTab(item.targetTab);
    onClose();
  };

  const filtered = filter === 'all'
    ? notifications
    : notifications.filter((n) => n.category === filter);

  if (!isOpen) return null;

  return (
    <div className="absolute right-0 top-12 w-80 sm:w-96 bg-white/95 backdrop-blur-2xl rounded-3xl border border-slate-200/90 shadow-2xl shadow-slate-900/15 p-4 z-50 animate-scale-in">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center space-x-2">
          <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
            <Bell className="w-4 h-4" />
          </div>
          <span className="font-bold text-sm text-slate-800">Bildirimler</span>
          {unreadCount > 0 && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-600 text-white">
              {unreadCount} yeni
            </span>
          )}
        </div>

        <div className="flex items-center space-x-1">
          {unreadCount > 0 && (
            <button
              onClick={markAllRead}
              className="text-[11px] text-blue-600 hover:text-blue-700 font-semibold px-2 py-1 rounded-lg hover:bg-blue-50 transition-colors flex items-center space-x-1"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              <span>Okundu Yap</span>
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center space-x-1 pt-2.5 pb-2 overflow-x-auto scrollbar-none">
        <button
          onClick={() => setFilter('all')}
          className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
            filter === 'all'
              ? 'bg-slate-900 text-white'
              : 'text-slate-500 hover:bg-slate-100'
          }`}
        >
          Tümü ({notifications.length})
        </button>
        <button
          onClick={() => setFilter('inbox')}
          className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
            filter === 'inbox'
              ? 'bg-indigo-600 text-white'
              : 'text-slate-500 hover:bg-slate-100'
          }`}
        >
          Gelen Kutusu
        </button>
        <button
          onClick={() => setFilter('approvals')}
          className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
            filter === 'approvals'
              ? 'bg-violet-600 text-white'
              : 'text-slate-500 hover:bg-slate-100'
          }`}
        >
          Onaylar
        </button>
        <button
          onClick={() => setFilter('streams')}
          className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
            filter === 'streams'
              ? 'bg-amber-600 text-white'
              : 'text-slate-500 hover:bg-slate-100'
          }`}
        >
          Akışlar
        </button>
      </div>

      {/* Notification List */}
      <div className="max-h-80 overflow-y-auto space-y-1.5 py-1">
        {filtered.map((item) => (
          <div
            key={item.id}
            onClick={() => handleItemClick(item)}
            className={`p-3 rounded-2xl border transition-all cursor-pointer text-left relative ${
              item.unread
                ? 'bg-blue-50/50 border-blue-200/80 hover:bg-blue-50 hover:border-blue-300'
                : 'bg-white border-slate-100 hover:bg-slate-50'
            }`}
          >
            {item.unread && (
              <span className="absolute top-3 right-3 w-2 h-2 rounded-full bg-blue-600" />
            )}

            <div className="flex items-start space-x-2.5">
              <div className="w-7 h-7 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                {item.category === 'inbox' && <Inbox className="w-3.5 h-3.5 text-indigo-600" />}
                {item.category === 'approvals' && <ShieldCheck className="w-3.5 h-3.5 text-violet-600" />}
                {item.category === 'streams' && <Radio className="w-3.5 h-3.5 text-amber-600" />}
                {item.category === 'system' && <Sparkles className="w-3.5 h-3.5 text-emerald-600" />}
              </div>
              <div className="min-w-0 flex-1 pr-3">
                <div className="font-bold text-xs text-slate-900 leading-snug">
                  {item.title}
                </div>
                <div className="text-[11px] text-slate-500 mt-1 leading-relaxed line-clamp-2">
                  {item.message}
                </div>
                <div className="flex items-center space-x-2 mt-1.5 text-[10px] text-slate-400">
                  <Clock className="w-3 h-3" />
                  <span>{item.time}</span>
                  <span>·</span>
                  <span className="text-blue-600 font-semibold hover:underline flex items-center space-x-0.5">
                    <span>Aç</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-2 text-center border-t border-slate-100 text-[10px] text-slate-400 font-medium">
        Otomatik anlık bildirim sistemi aktiftir
      </div>
    </div>
  );
};
