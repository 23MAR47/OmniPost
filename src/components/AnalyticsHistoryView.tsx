'use client';

import React, { useState, useEffect } from 'react';
import { PostHistoryItem, AnalyticsSummary, SocialPlatformId } from '@/types';
import { PLATFORMS_CONFIG } from '@/lib/constants';
import { PlatformIcon } from '@/components/PlatformIcon';
import { AnimatedCounter, PulsingBadge } from '@/components/AnimatedUI';
import {
  BarChart3,
  TrendingUp,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Download,
  FileSpreadsheet,
  Loader2,
  Search,
  Eye,
  Heart,
  MessageCircle,
  Share2,
  ExternalLink,
  RotateCcw,
  Sparkles,
  Layers,
  Filter,
  RefreshCw,
  Clock,
  ArrowUpRight,
} from 'lucide-react';

export const AnalyticsHistoryView: React.FC = () => {
  const [history, setHistory] = useState<PostHistoryItem[]>([]);
  const [summary, setSummary] = useState<AnalyticsSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [platformFilter, setPlatformFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [retryingKey, setRetryingKey] = useState<string | null>(null);
  const [notification, setNotification] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/analytics');
      const data = await res.json();
      if (data.success && data.data) {
        setHistory(data.data.history);
        setSummary(data.data.summary);
      }
    } catch (e) {
      showToast('error', 'Analitik verileri yüklenemedi.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const showToast = (type: 'success' | 'error' | 'info', text: string) => {
    setNotification({ type, text });
    setTimeout(() => {
      setNotification((curr) => (curr?.text === text ? null : curr));
    }, 4000);
  };

  // Retry a failed platform
  const handleRetry = async (historyId: string, platformId: SocialPlatformId) => {
    try {
      const key = `${historyId}-${platformId}`;
      setRetryingKey(key);

      const res = await fetch('/api/analytics/retry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ historyId, platformId }),
      });

      const data = await res.json();
      if (data.success) {
        showToast('success', `${PLATFORMS_CONFIG[platformId].name} için tekrar dağıtım başarılı oldu!`);
        fetchData();
      } else {
        showToast('error', data.error || 'Tekrar deneme başarısız.');
      }
    } catch (e) {
      showToast('error', 'Tekrar deneme sırasında hata oluştu.');
    } finally {
      setRetryingKey(null);
    }
  };



  // Filter history
  const filteredHistory = history.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.caption.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesPlatform =
      platformFilter === 'all'
        ? true
        : item.platforms.some((p) => p.platformId === platformFilter);

    const matchesStatus =
      statusFilter === 'all' ? true : item.status === statusFilter;

    return matchesSearch && matchesPlatform && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {notification && (
        <div
          className={`p-4 rounded-xl text-xs font-semibold flex items-center justify-between shadow-lg toast-enter ${
            notification.type === 'success'
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 toast-success'
              : notification.type === 'error'
              ? 'bg-rose-50 text-rose-800 border border-rose-200 toast-error'
              : 'bg-blue-50 text-blue-800 border border-blue-200 toast-info'
          }`}
        >
          <div className="flex items-center space-x-2">
            {notification.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
            {notification.type === 'error' && <AlertTriangle className="w-4 h-4 text-rose-600" />}
            {notification.type === 'info' && <TrendingUp className="w-4 h-4 text-blue-600" />}
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

      {/* Top Banner & KPI Performance Cards */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-100">
          <div>
            <div className="flex items-center space-x-2.5">
              <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
                <BarChart3 className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-slate-900">
                  Gönderi Geçmişi & Çoklu Kanal Analitiği
                </h1>
                <p className="text-xs text-slate-500 mt-0.5">
                  Tüm platformlarda yayınlanan içeriklerin performans, etkileşim ve erişim metrikleri.
                </p>
              </div>
            </div>
          </div>

          {/* Export Buttons - JavaScript Fetch + Blob for reliable download */}
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={async () => {
                showToast('info', 'Excel raporu hazırlanıyor...');
                try {
                  const res = await fetch('/api/analytics/download-xlsx');
                  if (!res.ok) throw new Error('Sunucu hatası');
                  const blob = await res.blob();
                  const dateSlug = new Date().toISOString().slice(0, 10);
                  const fileName = `OmniPost_Raporu_${dateSlug}.xlsx`;
                  const url = window.URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = fileName;
                  document.body.appendChild(a);
                  a.click();
                  setTimeout(() => {
                    document.body.removeChild(a);
                    window.URL.revokeObjectURL(url);
                  }, 200);
                  showToast('success', `✅ ${fileName} başarıyla indirildi!`);
                } catch (err) {
                  showToast('error', 'Excel raporu indirilemedi. Lütfen tekrar deneyin.');
                }
              }}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white text-xs font-bold transition-all flex items-center space-x-2 shadow-sm shadow-emerald-600/30 cursor-pointer"
              title="Excel (.xlsx) dosyası olarak indir"
            >
              <FileSpreadsheet className="w-4 h-4 text-white" />
              <span>Excel Raporu İndir (.xlsx)</span>
            </button>

            <button
              type="button"
              onClick={async () => {
                showToast('info', 'CSV raporu hazırlanıyor...');
                try {
                  const res = await fetch('/api/analytics/download-csv');
                  if (!res.ok) throw new Error('Sunucu hatası');
                  const blob = await res.blob();
                  const dateSlug = new Date().toISOString().slice(0, 10);
                  const fileName = `OmniPost_Raporu_${dateSlug}.csv`;
                  const url = window.URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = fileName;
                  document.body.appendChild(a);
                  a.click();
                  setTimeout(() => {
                    document.body.removeChild(a);
                    window.URL.revokeObjectURL(url);
                  }, 200);
                  showToast('success', `✅ ${fileName} başarıyla indirildi!`);
                } catch (err) {
                  showToast('error', 'CSV raporu indirilemedi.');
                }
              }}
              className="px-3 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-900 text-xs font-semibold transition-all flex items-center space-x-1 shadow-xs cursor-pointer"
              title="CSV formatında indir"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              <span>CSV</span>
            </button>
          </div>
        </div>

        {/* 4 Core KPI Metric Cards */}
        {summary && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* KPI 1: Toplam Gönderi */}
            <div className="glow-card p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex flex-col justify-between animate-fade-in-up stagger-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500">Toplam Paylaşım</span>
                <span className="p-2 rounded-xl bg-blue-50 text-blue-600 border border-blue-100">
                  <Layers className="w-4 h-4" />
                </span>
              </div>
              <div className="mt-3">
                <span className="text-2xl font-bold text-slate-900 tracking-tight block">
                  <AnimatedCounter value={summary.totalPosts} suffix=" Gönderi" />
                </span>
                <span className="text-[11px] text-emerald-600 font-semibold flex items-center space-x-1 mt-1">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>Bu hafta +18 artış</span>
                </span>
              </div>
            </div>

            {/* KPI 2: Dağıtım Başarı Oranı */}
            <div className="glow-card p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex flex-col justify-between animate-fade-in-up stagger-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500">Dağıtım Başarı Oranı</span>
                <span className="p-2 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100">
                  <CheckCircle2 className="w-4 h-4" />
                </span>
              </div>
              <div className="mt-3">
                <span className="text-2xl font-bold text-slate-900 tracking-tight block">
                  %<AnimatedCounter value={summary.successRate} />
                </span>
                <span className="text-[11px] text-slate-500 font-medium mt-1 block">
                  {summary.totalSuccess} Başarılı / {summary.totalFailed} Hatalı
                </span>
              </div>
            </div>

            {/* KPI 3: Toplam Görüntülenme / Erişim */}
            <div className="glow-card p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex flex-col justify-between animate-fade-in-up stagger-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500">Toplam Erişim & İzlenme</span>
                <span className="p-2 rounded-xl bg-purple-50 text-purple-600 border border-purple-100">
                  <Eye className="w-4 h-4" />
                </span>
              </div>
              <div className="mt-3">
                <span className="text-2xl font-bold text-slate-900 tracking-tight block">
                  <AnimatedCounter value={summary.totalViews} />
                </span>
                <span className="text-[11px] text-purple-600 font-semibold mt-1 block">
                  7 Platformdan konsolide
                </span>
              </div>
            </div>

            {/* KPI 4: Toplam Etkileşim */}
            <div className="glow-card p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex flex-col justify-between animate-fade-in-up stagger-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500">Toplam Etkileşim</span>
                <span className="p-2 rounded-xl bg-rose-50 text-rose-600 border border-rose-100">
                  <Heart className="w-4 h-4" />
                </span>
              </div>
              <div className="mt-3">
                <span className="text-2xl font-bold text-slate-900 tracking-tight block">
                  <AnimatedCounter value={summary.totalLikes + summary.totalComments + summary.totalShares} />
                </span>
                <span className="text-[11px] text-slate-500 font-medium mt-1 block">
                  {summary.totalLikes} Beğeni · {summary.totalComments} Yorum
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Platform Share Visual Breakdown */}
        {summary && (
          <div className="pt-2">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2.5">
              Platform Bazında Dağıtım Payı
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
              {Object.entries(summary.platformDistribution).map(([platId, count]) => {
                const config = PLATFORMS_CONFIG[platId as SocialPlatformId];
                return (
                  <div
                    key={platId}
                    className="p-3 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-white hover:border-blue-300 hover:shadow-xs hover:-translate-y-0.5 transition-all duration-200 flex items-center space-x-2.5 group"
                  >
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-white border border-slate-200/80 shadow-2xs shrink-0 group-hover:scale-105 transition-transform">
                      <PlatformIcon platformId={platId} size={18} />
                    </div>
                    <div className="min-w-0">
                      <span className="text-xs font-bold text-slate-800 block truncate">
                        {config?.shortName || platId}
                      </span>
                      <span className="text-[10px] text-slate-500 font-medium">{count} Dağıtım</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Search & Filters Deck */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-slate-100">
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Başlık veya metin ara..."
                className="pl-8 pr-3 py-1.5 text-xs border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 w-48 sm:w-64"
              />
            </div>

            <select
              value={platformFilter}
              onChange={(e) => setPlatformFilter(e.target.value)}
              className="text-xs border border-slate-200 rounded-xl px-2.5 py-1.5 bg-white text-slate-700 focus:outline-hidden"
            >
              <option value="all">Tüm Platformlar</option>
              {Object.values(PLATFORMS_CONFIG).map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="text-xs border border-slate-200 rounded-xl px-2.5 py-1.5 bg-white text-slate-700 focus:outline-hidden"
            >
              <option value="all">Tüm Durumlar</option>
              <option value="success">Başarılı</option>
              <option value="partial">Kısmi Hata</option>
              <option value="failed">Başarısız</option>
            </select>
          </div>

          <span className="text-xs text-slate-400">
            Toplam {filteredHistory.length} kayıt listeleniyor
          </span>
        </div>
      </div>

      {/* DETAILED POST HISTORY TABLE */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        {loading ? (
          <div className="p-12 text-center text-slate-400 text-xs flex flex-col items-center justify-center space-y-2">
            <RefreshCw className="w-6 h-6 animate-spin text-blue-600" />
            <span>Gönderi Geçmişi Yükleniyor...</span>
          </div>
        ) : filteredHistory.length === 0 ? (
          <div className="p-12 text-center text-slate-400 text-xs space-y-1">
            <p className="font-semibold text-slate-600">Aranan kriterlere uygun gönderi bulunamadı.</p>
            <p className="text-[11px]">Filtreleri temizleyerek tekrar deneyebilirsiniz.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/70 text-slate-500 font-semibold">
                  <th className="py-3 px-4">Gönderi İçeriği</th>
                  <th className="py-3 px-3">Yayınlanan Platformlar & Durum</th>
                  <th className="py-3 px-3">Konsolide Etkileşim</th>
                  <th className="py-3 px-3">Yayın Tarihi</th>
                  <th className="py-3 px-4 text-right">Durum</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredHistory.map((item) => {
                  const dateObj = new Date(item.publishedAt);
                  const isRetrying = retryingKey?.startsWith(item.id);

                  return (
                    <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                      {/* Post Thumbnail, Title & Caption */}
                      <td className="py-3.5 px-4 max-w-xs sm:max-w-md">
                        <div className="flex items-start space-x-3">
                          {item.mediaThumbnail && (
                            <img
                              src={item.mediaThumbnail}
                              alt={item.title}
                              className="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0"
                            />
                          )}
                          <div className="min-w-0">
                            <span className="font-bold text-slate-900 block truncate">
                              {item.title}
                            </span>
                            <span className="text-[11px] text-slate-500 line-clamp-2 mt-0.5">
                              {item.caption}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Platforms Detail with Direct Links and Retry Buttons */}
                      <td className="py-3.5 px-3">
                        <div className="flex flex-wrap items-center gap-1.5 max-w-xs">
                          {item.platforms.map((plat) => {
                            const config = PLATFORMS_CONFIG[plat.platformId];
                            const isPlatRetrying = retryingKey === `${item.id}-${plat.platformId}`;

                            return (
                              <div
                                key={plat.platformId}
                                className={`inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-lg border text-[11px] font-medium transition-all ${
                                  plat.status === 'success'
                                    ? 'bg-slate-50/80 border-slate-200 text-slate-700 hover:bg-slate-100/80'
                                    : 'bg-rose-50 border-rose-200 text-rose-700'
                                }`}
                              >
                                <PlatformIcon platformId={plat.platformId} size={14} className="shrink-0" />
                                <span className="font-semibold">{config?.shortName || plat.platformId}</span>

                                {plat.status === 'success' && plat.postUrl && (
                                  <a
                                    href={plat.postUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-slate-400 hover:text-blue-600 ml-0.5"
                                    title="Gönderiyi aç"
                                  >
                                    <ExternalLink className="w-2.5 h-2.5" />
                                  </a>
                                )}

                                {plat.status === 'failed' && (
                                  <button
                                    onClick={() => handleRetry(item.id, plat.platformId)}
                                    disabled={isPlatRetrying}
                                    className="p-0.5 hover:bg-rose-200 rounded text-rose-700 font-bold ml-1"
                                    title={`Hata: ${plat.errorMessage || 'Bilinmiyor'}. Tekrar dene.`}
                                  >
                                    <RotateCcw
                                      className={`w-2.5 h-2.5 ${isPlatRetrying ? 'animate-spin' : ''}`}
                                    />
                                  </button>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </td>

                      {/* Consolidated Metrics */}
                      <td className="py-3.5 px-3 whitespace-nowrap">
                        <div className="space-y-1 text-[11px] font-mono">
                          <div className="flex items-center space-x-1.5 text-slate-600">
                            <Eye className="w-3.5 h-3.5 text-slate-400" />
                            <span className="font-bold">{item.totalViews.toLocaleString('tr-TR')}</span>
                            <span className="text-[10px] text-slate-400">erişim</span>
                          </div>
                          <div className="flex items-center space-x-2 text-[10px] text-slate-500">
                            <span className="flex items-center space-x-0.5">
                              <Heart className="w-3 h-3 text-rose-400" />
                              <span>{item.totalLikes}</span>
                            </span>
                            <span className="flex items-center space-x-0.5">
                              <MessageCircle className="w-3 h-3 text-blue-400" />
                              <span>{item.totalComments}</span>
                            </span>
                            <span className="flex items-center space-x-0.5">
                              <Share2 className="w-3 h-3 text-emerald-400" />
                              <span>{item.totalShares}</span>
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Published Date */}
                      <td className="py-3.5 px-3 whitespace-nowrap">
                        <div className="text-slate-800 font-medium">
                          {dateObj.toLocaleDateString('tr-TR', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </div>
                        <div className="text-[10px] font-mono text-slate-400">
                          {dateObj.toLocaleTimeString('tr-TR', {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </div>
                      </td>

                      {/* Overall Status */}
                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        {item.status === 'success' && (
                          <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold inline-flex items-center space-x-1">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Tam Dağıtıldı</span>
                          </span>
                        )}
                        {item.status === 'partial' && (
                          <span className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-bold inline-flex items-center space-x-1">
                            <AlertTriangle className="w-3 h-3" />
                            <span>Kısmi Dağıtım</span>
                          </span>
                        )}
                        {item.status === 'failed' && (
                          <span className="px-2.5 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-200 text-[10px] font-bold inline-flex items-center space-x-1">
                            <XCircle className="w-3 h-3" />
                            <span>Başarısız</span>
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
