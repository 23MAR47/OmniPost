'use client';

import React, { useState, useEffect } from 'react';
import {
  InboxConversation,
  MessageStatus,
  SentimentType,
} from '@/types/inbox';
import { SocialPlatformId } from '@/types';
import { PLATFORMS_CONFIG } from '@/lib/constants';
import { PlatformIcon } from './PlatformIcon';
import {
  Inbox,
  Clock,
  Send,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Filter,
  Search,
  MessageSquare,
  User,
  Zap,
  Tag,
  Smile,
  Meh,
  Frown,
  RefreshCw,
} from 'lucide-react';

export const SocialInboxView: React.FC = () => {
  const [conversations, setConversations] = useState<InboxConversation[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [filterPlatform, setFilterPlatform] = useState<SocialPlatformId | 'all'>('all');
  const [filterStatus, setFilterStatus] = useState<MessageStatus | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [replyInput, setReplyInput] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isAiGenerating, setIsAiGenerating] = useState(false);

  const fetchConversations = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/inbox');
      const data = await res.json();
      if (data.success) {
        setConversations(data.data);
        if (!selectedId && data.data.length > 0) {
          setSelectedId(data.data[0].id);
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchConversations();
  }, []);

  const activeConv = conversations.find((c) => c.id === selectedId);

  const filteredConversations = conversations.filter((c) => {
    if (filterPlatform !== 'all' && c.platformId !== filterPlatform) return false;
    if (filterStatus !== 'all' && c.status !== filterStatus) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        c.senderName.toLowerCase().includes(q) ||
        c.senderHandle.toLowerCase().includes(q) ||
        c.lastMessageSnippet.toLowerCase().includes(q) ||
        c.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const handleSendReply = async () => {
    if (!selectedId || !replyInput.trim()) return;
    try {
      const res = await fetch('/api/inbox', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ conversationId: selectedId, replyText: replyInput }),
      });
      const data = await res.json();
      if (data.success) {
        setConversations((prev) =>
          prev.map((c) => (c.id === selectedId ? data.data : c))
        );
        setReplyInput('');
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleUpdateStatus = async (status: MessageStatus) => {
    if (!selectedId) return;
    try {
      const res = await fetch('/api/inbox', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ conversationId: selectedId, status }),
      });
      const data = await res.json();
      if (data.success) {
        setConversations((prev) =>
          prev.map((c) => (c.id === selectedId ? data.data : c))
        );
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleAiSmartReply = () => {
    if (!activeConv) return;
    setIsAiGenerating(true);
    setTimeout(() => {
      let smartText = '';
      if (activeConv.lastMessageSnippet.includes('fiyat') || activeConv.lastMessageSnippet.includes('ajans')) {
        smartText = `Merhaba ${activeConv.senderName}! OmniPost çoklu kullanıcı ve ajans lisansımız ayda sınırsız paylaşım ve 7 platform entegrasyonu içermektedir. Detaylı broşür ve özel indirim teklifimizi profilimizdeki bağlantıdan hemen inceleyebilirsiniz! 🚀`;
      } else if (activeConv.lastMessageSnippet.includes('Shorts') || activeConv.lastMessageSnippet.includes('video')) {
        smartText = `Harika bir soru ${activeConv.senderName}! OmniPost üzerinden 4K/60fps'e kadar tüm dikey video formatlarını (YouTube Shorts, Reels, TikTok) otomatik optimizasyon ve Remotion desteğiyle anında yükleyebilirsiniz.`;
      } else {
        smartText = `Değerli geri bildiriminiz ve ilginiz için çok teşekkür ederiz ${activeConv.senderName}! Sorunuzu hemen teknik ekibimize ilettik, en kısa sürede detaylı çözümü sizinle paylaşacağız. ✨`;
      }
      setReplyInput(smartText);
      setIsAiGenerating(false);
    }, 600);
  };

  const renderSentimentBadge = (sentiment: SentimentType) => {
    switch (sentiment) {
      case 'positive':
        return (
          <span className="inline-flex items-center space-x-1 px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <Smile className="w-3 h-3 text-emerald-600" />
            <span>Pozitif</span>
          </span>
        );
      case 'negative':
        return (
          <span className="inline-flex items-center space-x-1 px-1.5 py-0.5 rounded text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
            <Frown className="w-3 h-3 text-rose-600" />
            <span>Kritik</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center space-x-1 px-1.5 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
            <Meh className="w-3 h-3 text-slate-500" />
            <span>Nötr</span>
          </span>
        );
    }
  };

  const renderSlaBadge = (minutes: number, status: MessageStatus) => {
    if (status === 'resolved') {
      return (
        <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-800">
          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
          <span>Çözüldü</span>
        </span>
      );
    }

    if (minutes > 120) {
      return (
        <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800 animate-pulse border border-rose-300">
          <AlertCircle className="w-3 h-3 text-rose-600" />
          <span>SLA Aşıldı: {(minutes / 60).toFixed(1)} sa</span>
        </span>
      );
    }

    if (minutes > 30) {
      return (
        <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300">
          <Clock className="w-3 h-3 text-amber-600" />
          <span>{minutes} dk bekliyor</span>
        </span>
      );
    }

    return (
      <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
        <Clock className="w-3 h-3 text-blue-500" />
        <span>{minutes} dk (Taze)</span>
      </span>
    );
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[780px]">
      {/* Top Header Bar */}
      <div className="p-4 sm:p-5 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-indigo-50/30 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 text-white flex items-center justify-center shadow-md">
            <Inbox className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-lg font-bold text-slate-900">Birleşik Sosyal Gelen Kutusu (Unified Inbox)</h1>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-100 text-indigo-700 border border-indigo-200">
                Plexorin Engine
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              7 sosyal ağdan gelen DM, yorum ve geri bildirimleri tek ekranda yanıtlayın, SLA sürelerini denetleyin.
            </p>
          </div>
        </div>

        {/* Global Controls */}
        <div className="flex items-center space-x-2">
          <button
            onClick={fetchConversations}
            className="p-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 transition-colors"
            title="Yenile"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Grid: Left List (35%) & Right Active Thread (65%) */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Left Column: Filter & List */}
        <div className="w-full md:w-96 border-r border-slate-200 flex flex-col bg-slate-50/50">
          {/* Search Box */}
          <div className="p-3 border-b border-slate-200 bg-white">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="İsim, kullanıcı adı, etiket ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              />
            </div>

            {/* Filter Pills */}
            <div className="flex items-center space-x-1.5 mt-2.5 overflow-x-auto pb-1 text-[11px]">
              <button
                onClick={() => setFilterStatus('all')}
                className={`px-2.5 py-1 rounded-md font-medium transition-all ${filterStatus === 'all'
                    ? 'bg-slate-800 text-white shadow-sm'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
              >
                Tümü ({conversations.length})
              </button>
              <button
                onClick={() => setFilterStatus('unread')}
                className={`px-2.5 py-1 rounded-md font-medium transition-all ${filterStatus === 'unread'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
              >
                Okunmamış
              </button>
              <button
                onClick={() => setFilterStatus('resolved')}
                className={`px-2.5 py-1 rounded-md font-medium transition-all ${filterStatus === 'resolved'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
              >
                Çözüldü
              </button>
            </div>
          </div>

          {/* Conversation List */}
          <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
            {isLoading ? (
              <div className="p-8 text-center text-xs text-slate-400">Yükleniyor...</div>
            ) : filteredConversations.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-400">Eşleşen konuşma bulunamadı.</div>
            ) : (
              filteredConversations.map((conv) => {
                const isSelected = conv.id === selectedId;
                return (
                  <button
                    key={conv.id}
                    onClick={() => setSelectedId(conv.id)}
                    className={`w-full text-left p-3.5 transition-all flex items-start space-x-3 ${isSelected
                        ? 'bg-indigo-50/70 border-l-4 border-indigo-600 shadow-sm'
                        : 'hover:bg-white bg-transparent'
                      }`}
                  >
                    {/* Avatar with Platform badge */}
                    <div className="relative flex-shrink-0">
                      <img
                        src={conv.senderAvatar}
                        alt={conv.senderName}
                        className="w-10 h-10 rounded-full object-cover border border-slate-200"
                      />
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-white shadow-sm flex items-center justify-center p-0.5 border border-slate-100">
                        <PlatformIcon platform={conv.platformId} className="w-3.5 h-3.5" />
                      </div>
                    </div>

                    {/* Metadata & Snippet */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <h4 className="font-bold text-xs text-slate-900 truncate">
                          {conv.senderName}
                        </h4>
                        <span className="text-[10px] text-slate-400 flex-shrink-0 ml-1">
                          {new Date(conv.lastMessageAt).toLocaleTimeString('tr-TR', {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      </div>

                      <div className="text-[11px] text-slate-500 font-mono truncate">
                        {conv.senderHandle}
                      </div>

                      <p className="text-xs text-slate-600 line-clamp-1 mt-1 font-normal">
                        {conv.lastMessageSnippet}
                      </p>

                      {/* Badges Bar */}
                      <div className="flex items-center space-x-1.5 mt-2 flex-wrap gap-y-1">
                        {renderSlaBadge(conv.slaMinutesWaiting, conv.status)}
                        {renderSentimentBadge(conv.sentiment)}
                      </div>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column: Active Conversation */}
        {activeConv ? (
          <div className="flex-1 flex flex-col bg-white">
            {/* Conversation Header */}
            <div className="p-3.5 sm:p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/60">
              <div className="flex items-center space-x-3">
                <img
                  src={activeConv.senderAvatar}
                  alt={activeConv.senderName}
                  className="w-11 h-11 rounded-full object-cover border border-slate-200"
                />
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-bold text-sm text-slate-900">{activeConv.senderName}</h3>
                    <div className="flex items-center space-x-1 px-2 py-0.5 rounded bg-white border border-slate-200 text-[11px] font-mono text-slate-600">
                      <PlatformIcon platform={activeConv.platformId} className="w-3.5 h-3.5" />
                      <span>{activeConv.senderHandle}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-slate-500 mt-1">
                    <span>Atanan: <strong>{activeConv.assignedTo || 'Atanmadı'}</strong></span>
                    <span>•</span>
                    <div className="flex items-center space-x-1">
                      {activeConv.tags.map((tag) => (
                        <span key={tag} className="px-1.5 py-0.5 bg-slate-200/70 rounded text-[10px] text-slate-700">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Status Actions */}
              <div className="flex items-center space-x-2">
                {activeConv.status !== 'resolved' ? (
                  <button
                    onClick={() => handleUpdateStatus('resolved')}
                    className="px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-xs border border-emerald-200 transition-colors flex items-center space-x-1.5"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Çözüldü Olarak İşaretle</span>
                  </button>
                ) : (
                  <button
                    onClick={() => handleUpdateStatus('pending')}
                    className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors"
                  >
                    Yeniden Aç
                  </button>
                )}
              </div>
            </div>

            {/* Message Thread History */}
            <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-slate-50/20">
              {activeConv.messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.fromUser ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-[80%] sm:max-w-[70%] rounded-2xl p-3.5 shadow-sm text-xs leading-relaxed ${msg.fromUser
                        ? 'bg-white border border-slate-200 text-slate-800 rounded-tl-sm'
                        : 'bg-indigo-600 text-white rounded-tr-sm shadow-indigo-100'
                      }`}
                  >
                    <div className="flex items-center justify-between mb-1 text-[10px] opacity-75">
                      <span className="font-bold">{msg.senderName}</span>
                      <span>{new Date(msg.sentAt).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                    <p className="whitespace-pre-wrap">{msg.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Macro Templates & AI Reply Bar */}
            <div className="p-3 border-t border-slate-100 bg-slate-50/80 flex items-center justify-between flex-wrap gap-2 text-xs">
              <div className="flex items-center space-x-1.5">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center space-x-1">
                  <Zap className="w-3 h-3 text-amber-500" />
                  <span>Hızlı Şablonlar:</span>
                </span>
                <button
                  onClick={() =>
                    setReplyInput(
                      'Merhaba! İlginiz için teşekkürler. OmniPost tüm paket fiyatlarına ve özelliklerine profilimizdeki linkten ulaşabilirsiniz.'
                    )
                  }
                  className="px-2 py-1 rounded bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-[11px]"
                >
                  Fiyat Bilgisi
                </button>
                <button
                  onClick={() =>
                    setReplyInput(
                      'Harika geri bildiriminiz için teşekkürler! Ekibimizle paylaştık, en kısa sürede yayında olacak.'
                    )
                  }
                  className="px-2 py-1 rounded bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-[11px]"
                >
                  Teşekkür Et
                </button>
              </div>

              {/* AI Copilot Trigger */}
              <button
                onClick={handleAiSmartReply}
                disabled={isAiGenerating}
                className="px-2.5 py-1 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold text-[11px] shadow-sm hover:opacity-95 transition-all flex items-center space-x-1.5"
              >
                <Sparkles className="w-3 h-3 text-amber-300 animate-spin" />
                <span>{isAiGenerating ? 'AI Yanıtı Üretiyor...' : '✨ AI Yanıt Asistanı'}</span>
              </button>
            </div>

            {/* Input Composer */}
            <div className="p-3 sm:p-4 border-t border-slate-200 bg-white flex items-end space-x-2">
              <textarea
                value={replyInput}
                onChange={(e) => setReplyInput(e.target.value)}
                placeholder={`${activeConv.senderName} kişisine yanıt yazın...`}
                rows={2}
                className="flex-1 p-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendReply();
                  }
                }}
              />
              <button
                onClick={handleSendReply}
                disabled={!replyInput.trim()}
                className="p-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold transition-all shadow-sm"
                title="Yanıtı Gönder"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-slate-400 text-xs">
            Görüntülemek için bir konuşma seçin.
          </div>
        )}
      </div>
    </div>
  );
};
