'use client';

import React, { useState } from 'react';
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Calendar,
  ChevronDown,
  Plus,
  BarChart3,
  TrendingUp,
  FileText,
  Link as LinkIcon,
  Image as ImageIcon,
  Zap,
  Code,
  Terminal,
  Sparkles,
  Database,
  ExternalLink,
  Layers,
  Activity,
  Download,
  Users,
  Clock,
  Filter,
  Check
} from 'lucide-react';
import { EmptyBoxIllustration } from './EmptyBoxIllustration';
import { AnimatedCounter, PulsingBadge } from './AnimatedUI';

interface KontrolPaneliViewProps {
  onOpenComposer: () => void;
  devModeEnabled?: boolean;
  onOpenAccounts?: () => void;
  onOpenSchedule?: () => void;
  onOpenLanding?: () => void;
}

export const KontrolPaneliView: React.FC<KontrolPaneliViewProps> = ({
  onOpenComposer,
  devModeEnabled = false,
  onOpenAccounts,
  onOpenSchedule,
  onOpenLanding,
}) => {
  const [selectedReportType, setSelectedReportType] = useState('Tüm Raporlar');
  const [dateRange, setDateRange] = useState('Ekim 3, 2026 - Ekim 30, 2026');
  const [timeFilter, setTimeFilter] = useState<'today' | 'week' | 'month' | 'all'>('month');
  const [useDemoData, setUseDemoData] = useState(true);
  const [chartView, setChartView] = useState<'line' | 'bar'>('line');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Dynamic metrics based on time filter
  const statsMap = {
    today: { success: 48, failed: 1, total: 49 },
    week: { success: 382, failed: 3, total: 385 },
    month: { success: 1482, failed: 14, total: 1496 },
    all: { success: 12480, failed: 92, total: 12572 },
  };

  const stats = useDemoData
    ? statsMap[timeFilter]
    : { success: 0, failed: 0, total: 0 };

  const recentPosts = [
    {
      id: 'p1',
      platform: 'Instagram',
      color: 'bg-gradient-to-r from-purple-500 to-pink-500',
      title: 'Yapay Zeka Destekli Çoklu Sosyal Medya Kampanyası',
      time: '12 dk önce',
      status: 'Başarılı',
      reach: '3.4K Görüntülenme',
    },
    {
      id: 'p2',
      platform: 'X (Twitter)',
      color: 'bg-black text-white',
      title: 'Çoklu Kanal Dağıtım Motoru v4.2 Lansmanı',
      time: '45 dk önce',
      status: 'Başarılı',
      reach: '1.8K Etkileşim',
    },
    {
      id: 'p3',
      platform: 'LinkedIn',
      color: 'bg-blue-700 text-white',
      title: 'B2B SaaS Sosyal Medya Otomasyon Rehberi #48',
      time: '2 saat önce',
      status: 'Başarılı',
      reach: '920 Okunma',
    },
    {
      id: 'p4',
      platform: 'TikTok',
      color: 'bg-slate-900 text-white',
      title: 'Hızlı Kanca Trend Video Serisi #12',
      time: '4 saat önce',
      status: 'Başarılı',
      reach: '14.2K İzlenme',
    },
  ];

  const handleExportReport = () => {
    setToastMessage('Rapor başarıyla hazırlandı! İndiriliyor...');
    setTimeout(() => {
      setToastMessage('omnipost_rapor_ekim2026.csv başarıyla kaydedildi.');
      setTimeout(() => setToastMessage(null), 3500);
    }, 1500);
  };

  return (
    <div className="space-y-6 animate-fade-in text-slate-800">
      {/* Developer HUD Notice if Dev Mode Active */}
      {devModeEnabled && (
        <div className="p-3.5 rounded-2xl bg-slate-900 border border-indigo-500/30 text-white flex flex-col sm:flex-row items-center justify-between text-xs shadow-lg shadow-indigo-950/20 gap-2 animate-fade-in-down">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-mono text-emerald-400 font-bold">DEV HUD [AKTİF]</span>
            <span className="text-slate-500">|</span>
            <span className="font-mono text-slate-300">GET /api/v1/metrics/aggregate • 200 OK (18ms)</span>
          </div>
          <div className="flex items-center space-x-3 font-mono text-[11px]">
            <span className="text-indigo-400 bg-indigo-950/80 px-2 py-0.5 rounded border border-indigo-800">
              Redis: HIT (0.4ms)
            </span>
            <span className="text-amber-400 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-800">
              AES-256 Vault: LOCKED
            </span>
          </div>
        </div>
      )}

      {/* ─── QUICK ACTION BAR ─── */}
      <div className="p-4 rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-slate-900 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-11 h-11 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center font-bold text-white shadow-inner">
            <Zap className="w-6 h-6 text-amber-300" />
          </div>
          <div>
            <h2 className="text-base font-black tracking-tight text-white">
              OmniPost Pro Kontrol Masası
            </h2>
            <p className="text-xs text-blue-100">
              12 kanalda toplam 1.482 gönderi başarıyla yayınlandı • %99.98 Uptime
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={onOpenComposer}
            className="px-4 py-2 rounded-xl bg-white text-blue-700 hover:bg-blue-50 font-black text-xs shadow-md transition-transform hover:scale-105 active:scale-95 cursor-pointer flex items-center space-x-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Yeni Gönderi Oluştur</span>
          </button>
          {onOpenSchedule && (
            <button
              onClick={onOpenSchedule}
              className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs backdrop-blur-md transition-colors cursor-pointer flex items-center space-x-1.5"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Aylık Takvim</span>
            </button>
          )}
          {onOpenAccounts && (
            <button
              onClick={onOpenAccounts}
              className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs backdrop-blur-md transition-colors cursor-pointer flex items-center space-x-1.5"
            >
              <Users className="w-3.5 h-3.5" />
              <span>Hesap Ekle</span>
            </button>
          )}
          {onOpenLanding && (
            <button
              onClick={onOpenLanding}
              className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-blue-200 font-bold text-xs backdrop-blur-md transition-colors cursor-pointer flex items-center space-x-1.5"
              title="Açıklama & Tarifeler sayfasına dön"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Giriş Sayfası</span>
            </button>
          )}
        </div>
      </div>

      {/* Top Header & Filters Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div className="flex items-center space-x-2.5">
          <Send className="w-5 h-5 text-rose-500 fill-rose-500 animate-pulse" />
          <h1 className="text-xl font-bold text-slate-900">Paylaşım Raporu</h1>
          {useDemoData && (
            <span className="px-2.5 py-0.5 text-[10px] font-bold rounded-full bg-blue-100 text-blue-700 animate-pulse">
              Canlı Simülasyon
            </span>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs">
          {/* Export Report button */}
          <button
            onClick={handleExportReport}
            className="px-3 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold flex items-center space-x-1.5 transition-all shadow-2xs cursor-pointer active:scale-95"
          >
            <Download className="w-3.5 h-3.5 text-blue-600" />
            <span>Raporu Dışa Aktar</span>
          </button>

          {/* Quick Demo Toggle */}
          <button
            onClick={() => setUseDemoData(!useDemoData)}
            className={`px-3 py-2 rounded-xl font-bold flex items-center space-x-1.5 transition-all cursor-pointer border ${
              useDemoData
                ? 'bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
            title="Boş durum ile zengin grafikli demo durumunu anlık değiştir"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>{useDemoData ? 'Simülasyon Verisi Açık' : 'Boş Görünüm'}</span>
          </button>

          {/* Report Type Dropdown */}
          <div className="relative">
            <select
              value={selectedReportType}
              onChange={(e) => setSelectedReportType(e.target.value)}
              className="appearance-none bg-white border border-slate-200 px-3.5 py-2 pr-8 rounded-xl font-medium text-slate-700 shadow-2xs hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              <option>Tüm Raporlar</option>
              <option>Sosyal Ağ Bazlı</option>
              <option>Zamanlanmış Raporlar</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Date Range Picker */}
          <div className="flex items-center space-x-2 bg-white border border-slate-200 px-3.5 py-2 rounded-xl font-medium text-slate-700 shadow-2xs hover:border-slate-300 cursor-pointer">
            <Calendar className="w-4 h-4 text-emerald-600" />
            <span>{dateRange}</span>
          </div>
        </div>
      </div>

      {/* 3 Summary Stat Cards (Enhanced with 3D Hover & Animated Counters) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Card 1: Başarılı */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-2xs relative overflow-hidden flex flex-col justify-between h-36 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-default">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <CheckCircle2 className="w-6 h-6 text-emerald-500" />
              </div>
              <div>
                <div className="flex items-baseline space-x-2">
                  <AnimatedCounter
                    value={stats.success}
                    duration={1000}
                    className="text-3xl font-black text-slate-900 font-mono"
                  />
                  <span className="text-sm font-bold text-slate-800">Başarılı</span>
                </div>
                <span className="text-[11px] text-slate-400 block mt-1">Ekim 2026 Dağıtımı</span>
              </div>
            </div>
            {useDemoData && (
              <span className="text-xs font-bold text-emerald-700 bg-emerald-100/80 px-2.5 py-1 rounded-full flex items-center space-x-1">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>%99.1</span>
              </span>
            )}
          </div>
          <div className="h-1.5 w-full bg-emerald-400 rounded-full group-hover:h-2 transition-all" />
        </div>

        {/* Card 2: Başarısız */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-2xs relative overflow-hidden flex flex-col justify-between h-36 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-default">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <AlertCircle className="w-6 h-6 text-rose-500" />
              </div>
              <div>
                <div className="flex items-baseline space-x-2">
                  <AnimatedCounter
                    value={stats.failed}
                    duration={800}
                    className="text-3xl font-black text-slate-900 font-mono"
                  />
                  <span className="text-sm font-bold text-slate-800">Başarısız</span>
                </div>
                <span className="text-[11px] text-slate-400 block mt-1">Token veya API Hatası</span>
              </div>
            </div>
            {useDemoData && (
              <span className="text-xs font-bold text-rose-700 bg-rose-100/80 px-2.5 py-1 rounded-full">
                %0.9
              </span>
            )}
          </div>
          <div className="h-1.5 w-full bg-rose-400 rounded-full group-hover:h-2 transition-all" />
        </div>

        {/* Card 3: Toplam */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-2xs relative overflow-hidden flex flex-col justify-between h-36 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-default">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <Calendar className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <div className="flex items-baseline space-x-2">
                  <AnimatedCounter
                    value={stats.total}
                    duration={1200}
                    className="text-3xl font-black text-slate-900 font-mono"
                  />
                  <span className="text-sm font-bold text-slate-800">Toplam</span>
                </div>
                <span className="text-[11px] text-slate-400 block mt-1">Tüm Gönderi Talepleri</span>
              </div>
            </div>
            <span className="text-[10px] font-mono text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full font-bold">
              12 Kanal
            </span>
          </div>
          <div className="h-1.5 w-full bg-blue-500 rounded-full group-hover:h-2 transition-all" />
        </div>
      </div>

      {/* Middle Card: Gönderi Durumu (Interactive Dynamic Line Chart with Time Range Filter) */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-2xs space-y-5 hover:shadow-md transition-shadow">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-slate-900">Gönderi Dağılımı ve Başarı Trendi</h2>
            <p className="text-xs text-slate-500">Zamana bağlı olarak 12 platformdaki eşzamanlı yayın hacmi</p>
          </div>

          <div className="flex items-center space-x-2">
            {/* Time Filter Pills */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-bold text-slate-600">
              {(['today', 'week', 'month', 'all'] as const).map((tf) => (
                <button
                  key={tf}
                  onClick={() => setTimeFilter(tf)}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    timeFilter === tf ? 'bg-white text-blue-700 shadow-2xs' : 'hover:text-slate-900'
                  }`}
                >
                  {tf === 'today' ? 'Bugün' : tf === 'week' ? 'Bu Hafta' : tf === 'month' ? 'Bu Ay' : 'Tümü'}
                </button>
              ))}
            </div>

            {/* Chart Type Toggle */}
            <div className="hidden sm:flex items-center bg-slate-100 p-1 rounded-xl text-xs font-bold text-slate-600">
              <button
                onClick={() => setChartView('line')}
                className={`px-2.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                  chartView === 'line' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500'
                }`}
                title="Çizgi Grafik"
              >
                Çizgi
              </button>
              <button
                onClick={() => setChartView('bar')}
                className={`px-2.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                  chartView === 'bar' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500'
                }`}
                title="Sütun Grafik"
              >
                Sütun
              </button>
            </div>
          </div>
        </div>

        <div className="relative pt-4 pb-2">
          {/* Y Axis Grid & Chart */}
          <div className="h-60 w-full flex flex-col justify-between border-l border-b border-slate-200/80 pl-2 pb-1 relative">
            {[100, 80, 60, 40, 20, 0].map((val) => (
              <div key={val} className="w-full flex items-center text-[10px] text-slate-400">
                <span className="w-6 -ml-8 text-right font-mono">{useDemoData ? val : 0}</span>
                <div className="w-full h-px bg-slate-100 ml-2" />
              </div>
            ))}

            {useDemoData ? (
              chartView === 'line' ? (
                <div className="absolute inset-x-0 bottom-2 px-4 inset-y-4">
                  <svg viewBox="0 0 900 180" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="emeraldGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                      </linearGradient>
                      <linearGradient id="roseGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.15" />
                        <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>

                    <path
                      d="M 20,130 C 100,110 160,80 230,65 C 300,50 380,90 460,45 C 540,20 620,70 700,30 C 780,15 840,40 880,25 L 880,175 L 20,175 Z"
                      fill="url(#emeraldGradient)"
                    />
                    <path
                      d="M 20,130 C 100,110 160,80 230,65 C 300,50 380,90 460,45 C 540,20 620,70 700,30 C 780,15 840,40 880,25"
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 20,170 C 100,165 230,168 350,160 C 470,165 590,158 710,162 C 800,164 880,160 880,160"
                      fill="none"
                      stroke="#f43f5e"
                      strokeWidth="2"
                      strokeDasharray="4 4"
                    />
                    <circle cx="880" cy="25" r="5" fill="#10b981" className="animate-ping" />
                    <circle cx="880" cy="25" r="5" fill="#10b981" />
                  </svg>
                </div>
              ) : (
                /* Bar chart representation */
                <div className="absolute inset-x-0 bottom-2 px-6 h-52 flex items-end justify-between gap-2">
                  {[45, 65, 80, 55, 90, 70, 85, 95, 60, 75, 88, 92, 100].map((h, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1 group/bar">
                      <div
                        className="w-full bg-gradient-to-t from-emerald-600 to-teal-400 rounded-t-lg transition-all duration-300 group-hover/bar:brightness-110"
                        style={{ height: `${h * 1.8}px` }}
                      />
                    </div>
                  ))}
                </div>
              )
            ) : (
              <div className="absolute inset-x-0 bottom-2 px-4">
                <svg viewBox="0 0 900 120" className="w-full h-28 overflow-visible">
                  <path d="M0,110 L900,110" fill="none" stroke="#e2e8f0" strokeWidth="2" />
                </svg>
              </div>
            )}
          </div>

          {/* X Axis Dates */}
          <div className="flex justify-between text-[10px] font-mono text-slate-400 pt-2 px-1 overflow-x-auto">
            {['Eki 3', 'Eki 6', 'Eki 9', 'Eki 12', 'Eki 15', 'Eki 18', 'Eki 21', 'Eki 24', 'Eki 27', 'Eki 30'].map((d) => (
              <span key={d}>{d}</span>
            ))}
          </div>

          {/* Legend */}
          <div className="flex items-center justify-center space-x-6 pt-4 text-xs font-semibold text-slate-600">
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
              <span>Başarılı gönderi ({stats.success.toLocaleString('tr-TR')})</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-rose-500" />
              <span>Başarısız gönderi ({stats.failed.toLocaleString('tr-TR')})</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Grid: Gönderi Dağılımı (Donut) & Güncel Paylaşımlar */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Gönderi Dağılımı (Donut Chart & Table) */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-2xs space-y-6 flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900">İçerik Türü Dağılımı</h2>
            <span className="text-xs text-slate-400 font-mono">%100 Dağıtılmış</span>
          </div>

          <div className="flex flex-col items-center justify-center py-2">
            <div className="relative w-44 h-44 flex items-center justify-center">
              {useDemoData ? (
                <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    stroke="#10b981"
                    strokeWidth="12"
                    strokeDasharray="155 240"
                    strokeDashoffset="0"
                    fill="none"
                    className="transition-all duration-1000"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    stroke="#f43f5e"
                    strokeWidth="12"
                    strokeDasharray="60 240"
                    strokeDashoffset="-155"
                    fill="none"
                    className="transition-all duration-1000"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    stroke="#3b82f6"
                    strokeWidth="12"
                    strokeDasharray="25 240"
                    strokeDashoffset="-215"
                    fill="none"
                    className="transition-all duration-1000"
                  />
                </svg>
              ) : (
                <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                  <circle cx="50" cy="50" r="38" stroke="#f1f5f9" strokeWidth="12" fill="none" />
                </svg>
              )}

              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-2xl font-black font-mono text-slate-800">
                  {useDemoData ? '1.4K' : '0'}
                </span>
                <span className="text-[10px] text-slate-400 font-semibold">Toplam Paylaşım</span>
              </div>
            </div>

            <div className="flex items-center space-x-4 pt-4 text-xs font-semibold text-slate-600">
              <div className="flex items-center space-x-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span>Görsel/Video (%65)</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                <span>Bağlantı (%25)</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                <span>Metin (%10)</span>
              </div>
            </div>
          </div>

          <div className="border border-slate-100 rounded-2xl overflow-hidden text-xs">
            <div className="grid grid-cols-4 bg-slate-50 p-3 font-bold text-slate-500 border-b border-slate-100 text-center">
              <span className="text-left">Tür</span>
              <span>Görsel/Video</span>
              <span>Bağlantı</span>
              <span>Metin</span>
            </div>
            <div className="grid grid-cols-4 p-3 text-slate-700 font-mono text-center font-bold">
              <span className="text-left font-sans font-medium text-slate-600">Toplam</span>
              <span>{useDemoData ? '963' : '0'}</span>
              <span>{useDemoData ? '371' : '0'}</span>
              <span>{useDemoData ? '148' : '0'}</span>
            </div>
          </div>
        </div>

        {/* Right: Güncel Paylaşımlar (Interactive Live Feed) */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-2xs space-y-4 flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900">Güncel Paylaşımlar</h2>
            {useDemoData && (
              <span className="text-[11px] font-bold text-emerald-600 flex items-center space-x-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                <span>Canlı Akış</span>
              </span>
            )}
          </div>

          {useDemoData ? (
            <div className="space-y-3 py-1 flex-1">
              {recentPosts.map((post) => (
                <div
                  key={post.id}
                  className="p-3.5 rounded-2xl border border-slate-100 bg-slate-50/70 hover:bg-white hover:border-slate-300 hover:shadow-md transition-all duration-200 flex items-center justify-between group"
                >
                  <div className="flex items-center space-x-3.5 min-w-0">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs ${post.color} shadow-xs flex-shrink-0`}>
                      {post.platform[0]}
                    </div>
                    <div className="min-w-0">
                      <div className="font-bold text-xs text-slate-800 truncate group-hover:text-blue-600 transition-colors">
                        {post.title}
                      </div>
                      <div className="text-[11px] text-slate-400 flex items-center space-x-2 mt-0.5">
                        <span className="font-semibold text-slate-500">{post.platform}</span>
                        <span>•</span>
                        <span>{post.time}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right flex-shrink-0 ml-3">
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/70 px-2.5 py-0.5 rounded-full">
                      {post.status}
                    </span>
                    <div className="text-[10px] text-slate-500 font-mono mt-1 font-bold">
                      {post.reach}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-6">
              <EmptyBoxIllustration size={170} />
            </div>
          )}

          <div className="w-full pt-2">
            <button
              onClick={onOpenComposer}
              className="w-full py-3 px-6 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-black text-xs tracking-wide shadow-md shadow-blue-500/20 active:scale-[0.99] transition-all flex items-center justify-center space-x-2 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Yeni Gönderi Oluştur</span>
            </button>
          </div>
        </div>
      </div>

      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-slate-900 text-white font-bold text-xs shadow-2xl border border-slate-700 flex items-center space-x-2 animate-bounce-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};
