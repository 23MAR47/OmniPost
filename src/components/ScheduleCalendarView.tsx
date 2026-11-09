'use client';

import React, { useState, useEffect } from 'react';
import { ScheduledPost, SocialPlatformId } from '@/types';
import { PLATFORMS_CONFIG } from '@/lib/constants';
import { PlatformIcon } from '@/components/PlatformIcon';
import {
  Calendar as CalendarIcon,
  Clock,
  Play,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  PlusCircle,
  ChevronLeft,
  ChevronRight,
  Trash2,
  Edit2,
  Search,
  Zap,
  RefreshCw,
  ExternalLink,
  Layers,
  CalendarDays,
  ListOrdered,
  Flame,
} from 'lucide-react';
import { BestTimeHeatmap } from './BestTimeHeatmap';

interface ScheduleCalendarViewProps {
  onOpenNewSchedule?: () => void;
}

export const ScheduleCalendarView: React.FC<ScheduleCalendarViewProps> = ({
  onOpenNewSchedule,
}) => {
  const [posts, setPosts] = useState<ScheduledPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'queue' | 'calendar' | 'heatmap'>('queue');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'completed' | 'cancelled'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isWorkerRunning, setIsWorkerRunning] = useState(false);
  const [triggeringId, setTriggeringId] = useState<string | null>(null);
  const [notification, setNotification] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);

  // Edit Modal State
  const [editingPost, setEditingPost] = useState<ScheduledPost | null>(null);
  const [editDate, setEditDate] = useState('');
  const [editTime, setEditTime] = useState('');

  // Calendar State (Current month)
  const [calendarDate, setCalendarDate] = useState(new Date());

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/schedule');
      const data = await res.json();
      if (data.success && data.data) {
        setPosts(data.data);
      }
    } catch (e) {
      showToast('error', 'Zamanlanmış içerikler yüklenemedi.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const showToast = (type: 'success' | 'error' | 'info', text: string) => {
    setNotification({ type, text });
    setTimeout(() => {
      setNotification((current) => (current?.text === text ? null : current));
    }, 4000);
  };

  // Trigger post now
  const handleTriggerNow = async (id: string, title: string) => {
    try {
      setTriggeringId(id);
      const res = await fetch('/api/schedule/trigger', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (data.success) {
        showToast('success', `"${title}" OmniPublisher motoruyla başarıyla yayınlandı!`);
        fetchPosts();
      } else {
        showToast('error', data.error || 'Yayınlama başarısız oldu.');
      }
    } catch (e) {
      showToast('error', 'Tetikleme isteği başarısız oldu.');
    } finally {
      setTriggeringId(null);
    }
  };

  // Cancel scheduled post
  const handleCancel = async (id: string) => {
    try {
      const res = await fetch(`/api/schedule?id=${id}&action=cancel`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) {
        showToast('info', 'Gönderi zamanlaması iptal edildi.');
        fetchPosts();
      }
    } catch (e) {
      showToast('error', 'İptal edilemedi.');
    }
  };

  // Delete from queue
  const handleDelete = async (id: string) => {
    if (!confirm('Bu gönderiyi kuyruktan tamamen silmek istediğinize emin misiniz?')) return;
    try {
      const res = await fetch(`/api/schedule?id=${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) {
        showToast('info', 'Gönderi kuyruktan silindi.');
        fetchPosts();
      }
    } catch (e) {
      showToast('error', 'Silme başarısız.');
    }
  };

  // Run Worker Check manually
  const handleRunWorker = async () => {
    try {
      setIsWorkerRunning(true);
      const res = await fetch('/api/schedule/worker', { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        showToast(
          'success',
          `Kuyruk worker'ı çalıştırıldı. ${data.data?.processedCount || 0} adet süresi dolan gönderi işlendi.`
        );
        fetchPosts();
      }
    } catch (e) {
      showToast('error', 'Worker çalıştırma hatası.');
    } finally {
      setIsWorkerRunning(false);
    }
  };

  // Open Edit Modal
  const openEditModal = (post: ScheduledPost) => {
    setEditingPost(post);
    const d = new Date(post.scheduledFor);
    setEditDate(d.toISOString().split('T')[0]);
    const hours = String(d.getHours()).padStart(2, '0');
    const mins = String(d.getMinutes()).padStart(2, '0');
    setEditTime(`${hours}:${mins}`);
  };

  // Save Edit
  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPost) return;

    try {
      const newDateTime = new Date(`${editDate}T${editTime}:00`).toISOString();
      const res = await fetch('/api/schedule', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: editingPost.id,
          title: editingPost.title,
          scheduledFor: newDateTime,
          status: 'pending', // Re-activate if was cancelled
        }),
      });

      const data = await res.json();
      if (data.success) {
        showToast('success', 'Planlama tarihi güncellendi.');
        setEditingPost(null);
        fetchPosts();
      }
    } catch (e) {
      showToast('error', 'Güncelleme başarısız oldu.');
    }
  };

  // Filter posts
  const filteredPosts = posts.filter((p) => {
    const matchesStatus =
      statusFilter === 'all' ? true : p.status === statusFilter;
    const matchesSearch =
      (p.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.caption.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const pendingCount = posts.filter((p) => p.status === 'pending').length;
  const completedCount = posts.filter((p) => p.status === 'completed').length;

  // Calendar Helpers
  const year = calendarDate.getFullYear();
  const month = calendarDate.getMonth();
  const firstDayIndex = new Date(year, month, 1).getDay(); // 0 is Sun, 1 is Mon
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const adjustedFirstDay = firstDayIndex === 0 ? 6 : firstDayIndex - 1; // Mon-first

  const monthNames = [
    'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
    'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
  ];

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {notification && (
        <div
          className={`p-4 rounded-xl text-xs font-semibold flex items-center justify-between shadow-md transition-all animate-in fade-in slide-in-from-top-2 ${notification.type === 'success'
            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
            : notification.type === 'error'
              ? 'bg-rose-50 text-rose-800 border border-rose-200'
              : 'bg-blue-50 text-blue-800 border border-blue-200'
            }`}
        >
          <div className="flex items-center space-x-2">
            {notification.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
            {notification.type === 'error' && <AlertTriangle className="w-4 h-4 text-rose-600" />}
            {notification.type === 'info' && <Clock className="w-4 h-4 text-blue-600" />}
            <span>{notification.text}</span>
          </div>
          <button
            onClick={() => setNotification(null)}
            className="text-slate-400 hover:text-slate-600 ml-4 font-bold"
          >
            ✕
          </button>
        </div>
      )}

      {/* Top Banner & Control Deck */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-100">
          <div>
            <div className="flex items-center space-x-2.5">
              <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
                <CalendarDays className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-slate-900">
                  Zamanlanmış İçerikler & Takvim Kuyruğu
                </h1>
                <p className="text-xs text-slate-500 mt-0.5">
                  Arka plan worker servisi ile otomatik zamanlanmış çoklu sosyal medya dağıtımı.
                </p>
              </div>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center space-x-2">
            <button
              onClick={handleRunWorker}
              disabled={isWorkerRunning}
              className="px-3.5 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 disabled:opacity-50 transition-all flex items-center space-x-2 shadow-xs"
              title="Kuyrukta bekleme süresi dolmuş tüm gönderileri kontrol et ve yayınla"
            >
              <Zap className={`w-3.5 h-3.5 text-amber-400 ${isWorkerRunning ? 'animate-bounce' : ''}`} />
              <span>{isWorkerRunning ? 'Worker Çalışıyor...' : 'Kuyruğu Kontrol Et (Run Worker)'}</span>
            </button>

            {onOpenNewSchedule && (
              <button
                onClick={onOpenNewSchedule}
                className="px-3.5 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition-all flex items-center space-x-1.5 shadow-xs"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Yeni Planlama</span>
              </button>
            )}
          </div>
        </div>

        {/* Stats Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-medium text-slate-500 block">Kuyrukta Bekleyenler</span>
              <span className="text-base font-bold text-amber-600">
                {pendingCount} Gönderi Hazır
              </span>
            </div>
            <div className="w-9 h-9 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xs">
              <Clock className="w-4 h-4" />
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-medium text-slate-500 block">Yayınlanan / Tamamlanan</span>
              <span className="text-base font-bold text-emerald-700">
                {completedCount} Gönderi
              </span>
            </div>
            <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-medium text-slate-500 block">Toplam Planlı İçerik</span>
              <span className="text-base font-bold text-slate-800">
                {posts.length} Gönderi
              </span>
            </div>
            <div className="w-9 h-9 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
              <CalendarIcon className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Controls: Search, Status Filter & View Toggle */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
          {/* View Toggle (Queue List vs Calendar) */}
          <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
            <button
              onClick={() => setViewMode('queue')}
              className={`px-3 py-1.5 rounded-lg flex items-center space-x-1.5 transition-all ${viewMode === 'queue'
                ? 'bg-white text-slate-900 shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
                }`}
            >
              <ListOrdered className="w-3.5 h-3.5" />
              <span>Kuyruk Listesi</span>
            </button>
            <button
              onClick={() => setViewMode('calendar')}
              className={`px-3 py-1.5 rounded-lg flex items-center space-x-1.5 transition-all ${viewMode === 'calendar'
                ? 'bg-white text-slate-900 shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
                }`}
            >
              <CalendarIcon className="w-3.5 h-3.5" />
              <span>Aylık Takvim</span>
            </button>
            <button
              onClick={() => setViewMode('heatmap')}
              className={`px-3 py-1.5 rounded-lg flex items-center space-x-1.5 transition-all ${viewMode === 'heatmap'
                ? 'bg-emerald-600 text-white shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
                }`}
            >
              <Flame className="w-3.5 h-3.5 text-amber-300" />
              <span>🔥 En İyi Zaman (Heatmap)</span>
            </button>
          </div>

          {/* Search & Status Pill Filters */}
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Başlık veya metin ara..."
                className="pl-8 pr-3 py-1.5 text-xs border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 w-44 sm:w-56"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="text-xs border border-slate-200 rounded-xl px-2.5 py-1.5 bg-white text-slate-700 focus:outline-hidden"
            >
              <option value="all">Tüm Durumlar</option>
              <option value="pending">Bekleyenler</option>
              <option value="completed">Tamamlananlar</option>
              <option value="cancelled">İptal Edilenler</option>
            </select>
          </div>
        </div>
      </div>

      {/* VIEW 1: QUEUE LIST TABLE */}
      {viewMode === 'queue' && (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
          {loading ? (
            <div className="p-12 text-center text-slate-400 text-xs flex flex-col items-center justify-center space-y-2">
              <RefreshCw className="w-6 h-6 animate-spin text-blue-600" />
              <span>Kuyruk Yükleniyor...</span>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="p-12 text-center text-slate-400 text-xs space-y-2">
              <CalendarDays className="w-8 h-8 text-slate-300 mx-auto" />
              <p className="font-semibold text-slate-600">Planlanmış gönderi bulunamadı.</p>
              <p className="text-[11px]">Gönderi Stüdyosu&apos;ndan veya &quot;Yeni Planlama&quot; butonundan içerik zamanlayabilirsiniz.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/70 text-slate-500 font-semibold">
                    <th className="py-3 px-4">İçerik Başlığı & Açıklama</th>
                    <th className="py-3 px-3">Hedef Platformlar</th>
                    <th className="py-3 px-3">Planlanan Tarih & Saat</th>
                    <th className="py-3 px-3">Durum</th>
                    <th className="py-3 px-4 text-right">İşlemler</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {filteredPosts.map((post) => {
                    const isTriggering = triggeringId === post.id;
                    const dateObj = new Date(post.scheduledFor);
                    const isPast = dateObj.getTime() < Date.now();

                    return (
                      <tr key={post.id} className="hover:bg-slate-50/80 transition-colors">
                        {/* Title & Caption */}
                        <td className="py-3.5 px-4 max-w-xs sm:max-w-md">
                          <span className="font-bold text-slate-900 block truncate">
                            {post.title || 'Başlıksız Gönderi'}
                          </span>
                          <span className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                            {post.caption}
                          </span>
                          {post.media.length > 0 && (
                            <span className="inline-block mt-1 text-[10px] text-blue-600 font-semibold">
                              📷 {post.media.length} Medya Ekli
                            </span>
                          )}
                        </td>

                        {/* Platforms */}
                        <td className="py-3.5 px-3">
                          <div className="flex items-center space-x-1.5">
                            {post.platforms.map((id) => (
                              <div
                                key={id}
                                className="w-7 h-7 rounded-lg bg-slate-50 border border-slate-200/80 flex items-center justify-center shadow-2xs hover:scale-110 transition-transform"
                                title={PLATFORMS_CONFIG[id]?.name || id}
                              >
                                <PlatformIcon platformId={id} size={15} />
                              </div>
                            ))}
                          </div>
                        </td>

                        {/* Scheduled Date */}
                        <td className="py-3.5 px-3 whitespace-nowrap">
                          <div className="font-medium text-slate-800">
                            {dateObj.toLocaleDateString('tr-TR', {
                              weekday: 'short',
                              day: 'numeric',
                              month: 'short',
                            })}
                          </div>
                          <div className="text-[11px] font-mono text-slate-500">
                            {dateObj.toLocaleTimeString('tr-TR', {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </div>
                        </td>

                        {/* Status Badge */}
                        <td className="py-3.5 px-3 whitespace-nowrap">
                          {post.status === 'pending' && (
                            <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-bold flex items-center space-x-1 w-max">
                              <Clock className="w-3 h-3" />
                              <span>{isPast ? 'Süresi Geldi' : 'Kuyrukta'}</span>
                            </span>
                          )}
                          {post.status === 'completed' && (
                            <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold flex items-center space-x-1 w-max">
                              <CheckCircle2 className="w-3 h-3" />
                              <span>Yayınlandı</span>
                            </span>
                          )}
                          {post.status === 'cancelled' && (
                            <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200 text-[10px] font-semibold flex items-center space-x-1 w-max">
                              <XCircle className="w-3 h-3" />
                              <span>İptal Edildi</span>
                            </span>
                          )}
                          {post.status === 'processing' && (
                            <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-[10px] font-bold flex items-center space-x-1 w-max">
                              <RefreshCw className="w-3 h-3 animate-spin" />
                              <span>İşleniyor</span>
                            </span>
                          )}
                        </td>

                        {/* Actions */}
                        <td className="py-3.5 px-4 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end space-x-1.5">
                            {post.status === 'pending' && (
                              <button
                                onClick={() => handleTriggerNow(post.id, post.title)}
                                disabled={isTriggering}
                                className="px-2.5 py-1 rounded-lg bg-blue-600 text-white font-semibold text-[11px] hover:bg-blue-700 disabled:opacity-50 transition-colors flex items-center space-x-1"
                                title="Zamanı beklemeden şimdi hemen yayınla"
                              >
                                <Play className={`w-3 h-3 ${isTriggering ? 'animate-spin' : ''}`} />
                                <span>{isTriggering ? 'Yayınlanıyor...' : 'Şimdi Yayınla'}</span>
                              </button>
                            )}

                            <button
                              onClick={() => openEditModal(post)}
                              className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 transition-colors"
                              title="Tarih / Saati Düzenle"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>

                            {post.status === 'pending' && (
                              <button
                                onClick={() => handleCancel(post.id)}
                                className="p-1.5 rounded-lg border border-slate-200 hover:bg-amber-50 hover:text-amber-700 text-slate-400 transition-colors"
                                title="İptal Et"
                              >
                                <XCircle className="w-3.5 h-3.5" />
                              </button>
                            )}

                            <button
                              onClick={() => handleDelete(post.id)}
                              className="p-1.5 rounded-lg border border-slate-200 hover:bg-rose-50 hover:text-rose-600 text-slate-400 transition-colors"
                              title="Sil"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* VIEW 2: INTERACTIVE CALENDAR VIEW */}
      {viewMode === 'calendar' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          {/* Calendar Header with Month Navigation */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h2 className="text-base font-bold text-slate-900">
              {monthNames[month]} {year}
            </h2>
            <div className="flex items-center space-x-1">
              <button
                onClick={() => setCalendarDate(new Date(year, month - 1, 1))}
                className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setCalendarDate(new Date())}
                className="px-2.5 py-1 text-xs font-semibold rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700"
              >
                Bugün
              </button>
              <button
                onClick={() => setCalendarDate(new Date(year, month + 1, 1))}
                className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Days of Week Header */}
          <div className="grid grid-cols-7 text-center text-xs font-bold text-slate-400 pb-2">
            <div>Pzt</div>
            <div>Sal</div>
            <div>Çar</div>
            <div>Per</div>
            <div>Cum</div>
            <div>Cmt</div>
            <div>Paz</div>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1.5">
            {/* Empty cells before first day */}
            {Array.from({ length: adjustedFirstDay }).map((_, idx) => (
              <div key={`empty-${idx}`} className="h-24 p-2 rounded-xl bg-slate-50/50 border border-slate-100/50" />
            ))}

            {/* Days in Month */}
            {Array.from({ length: daysInMonth }).map((_, idx) => {
              const day = idx + 1;
              const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
              const dayPosts = posts.filter((p) => p.scheduledFor.startsWith(dateStr));
              const isToday =
                new Date().getDate() === day &&
                new Date().getMonth() === month &&
                new Date().getFullYear() === year;

              return (
                <div
                  key={`day-${day}`}
                  className={`h-24 p-2 rounded-xl border flex flex-col justify-between transition-all ${isToday
                    ? 'border-blue-500 bg-blue-50/30'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-xs font-bold ${isToday
                        ? 'w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px]'
                        : 'text-slate-700'
                        }`}
                    >
                      {day}
                    </span>
                    {dayPosts.length > 0 && (
                      <span className="text-[10px] font-bold text-blue-600 font-mono">
                        {dayPosts.length} Gönderi
                      </span>
                    )}
                  </div>

                  {/* Badges of posts on this day */}
                  <div className="space-y-1 overflow-hidden">
                    {dayPosts.slice(0, 2).map((p) => (
                      <div
                        key={p.id}
                        onClick={() => openEditModal(p)}
                        className="p-1 rounded-md bg-slate-100 hover:bg-slate-200 cursor-pointer text-[10px] font-semibold text-slate-800 truncate flex items-center space-x-1"
                        title={p.title}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full shrink-0 ${p.status === 'completed' ? 'bg-emerald-500' : 'bg-amber-500'
                            }`}
                        />
                        <span className="truncate">{p.title || p.caption.slice(0, 20)}</span>
                      </div>
                    ))}
                    {dayPosts.length > 2 && (
                      <span className="text-[9px] text-slate-400 block text-right">
                        +{dayPosts.length - 2} daha
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* VIEW 3: HOOTSUITE BEST TIME TO POST HEATMAP */}
      {viewMode === 'heatmap' && (
        <BestTimeHeatmap onSelectSlot={() => onOpenNewSchedule?.()} />
      )}

      {/* EDIT SCHEDULE MODAL */}
      {editingPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
          <form
            onSubmit={handleSaveEdit}
            className="bg-white rounded-3xl max-w-md w-full border border-slate-200 shadow-2xl overflow-hidden p-6 space-y-4"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-sm text-slate-900">Zamanlamayı Düzenle</h3>
              <button
                type="button"
                onClick={() => setEditingPost(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 block">Başlık:</label>
              <input
                type="text"
                value={editingPost.title}
                onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 block">Tarih:</label>
                <input
                  type="date"
                  value={editDate}
                  onChange={(e) => setEditDate(e.target.value)}
                  required
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 block">Saat:</label>
                <input
                  type="time"
                  value={editTime}
                  onChange={(e) => setEditTime(e.target.value)}
                  required
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-end space-x-2">
              <button
                type="button"
                onClick={() => setEditingPost(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                Vazgeç
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700"
              >
                Güncelle
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
