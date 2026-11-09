'use client';

import React, { useState } from 'react';
import {
  Search,
  ChevronLeft,
  ChevronRight,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Clock,
  ExternalLink,
  X,
  KeyRound,
  ShieldCheck
} from 'lucide-react';
import { PlatformIcon } from './PlatformIcon';
import { SocialPlatformId } from '@/types';

export interface PlanlamaPostItem {
  id: string;
  author: string;
  authorAvatar: string;
  platform: SocialPlatformId;
  platformName: string;
  datetime: string;
  dateKey: string;
  content: string;
  image: string;
  status: 'queue' | 'sent' | 'failed';
}

const SAMPLE_POSTS: PlanlamaPostItem[] = [
  {
    id: 'p-1',
    author: 'Mimarobot',
    authorAvatar: '🤖',
    platform: 'facebook',
    platformName: 'Facebook',
    datetime: '02/08/2025 1:10 PM',
    dateKey: '09-08-2025',
    content:
      'Birden fazla işlevi içerisinde barındıran, çok amaçlı yapılar tasarım sevenlerin oldukça ilgisini çekmektedir. Aynı alan içerisinde farklı işlevleri olan mekanların birlikte var olabildiği bu özel yapıların kimliği, işin en başında yani projenin konsept',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500&auto=format&fit=crop&q=80',
    status: 'queue',
  },
  {
    id: 'p-2',
    author: 'Mimarobot',
    authorAvatar: '🤖',
    platform: 'facebook',
    platformName: 'Facebook',
    datetime: '03/08/2025 9:09 AM',
    dateKey: '09-08-2025',
    content:
      'Tasarım Fikirleri: Yemek Alanı\nYemek mobilyalarının iç mekan tasarımı ile uyumlu olması, doğru ışık kullanımı ve konsepte uygun renk ve dokuların seçilmesi keyifli bir yemek alanı oluşturmak için gereklidir. Ayrıca yemek masası ile',
    image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=500&auto=format&fit=crop&q=80',
    status: 'queue',
  },
  {
    id: 'p-3',
    author: 'Mimarobot',
    authorAvatar: '🤖',
    platform: 'facebook',
    platformName: 'Facebook',
    datetime: '03/08/2025 9:10 PM',
    dateKey: '09-08-2025',
    content:
      'Farklı tasarımcılar tarafından üretilen koltuk modelleri her zaman tasarım sevenlerin ilgisini çekmektedir. Yaşam mekanlarının oturma düzenlemesinin yapılması ve kişiye özel bir hale getirilmesini mümkün kılan çeşitli koltuk tasarımları',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&auto=format&fit=crop&q=80',
    status: 'queue',
  },
  {
    id: 'p-4',
    author: 'Pinterest Stüdyosu',
    authorAvatar: 'PA',
    platform: 'pinterest',
    platformName: 'Pinterest',
    datetime: '08/08/2025 4:00 PM',
    dateKey: '08-08-2025',
    content: 'Modern Villa ve Doğal Taş Duvar Tasarımları #mimari #tasarım #villa #içmekan',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=500&auto=format&fit=crop&q=80',
    status: 'queue',
  },
  {
    id: 'p-5',
    author: 'OmniPost Youtube',
    authorAvatar: '▶',
    platform: 'youtube',
    platformName: 'Youtube',
    datetime: '09/08/2025 6:30 PM',
    dateKey: '09-08-2025',
    content: 'Yeni Nesil Sosyal Medya Otomasyonu ile Zamandan %80 Tasarruf Edin! 4K İnceleme Videosu.',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&auto=format&fit=crop&q=80',
    status: 'queue',
  },
  {
    id: 'p-6',
    author: 'Twitter X Haber',
    authorAvatar: 'X',
    platform: 'twitter',
    platformName: 'Twitter X',
    datetime: '16/08/2025 11:15 AM',
    dateKey: '16-08-2025',
    content: 'Tek panelden 12 sosyal ağa eşzamanlı içerik dağıtımı başladı. Lansman fırsatını kaçırmayın.',
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=500&auto=format&fit=crop&q=80',
    status: 'queue',
  },
];

const PLATFORM_FILTERS: { id: string; name: string; platform?: SocialPlatformId }[] = [
  { id: 'all', name: 'Hepsi Birden' },
  { id: 'bluesky', name: 'Bluesky', platform: 'bluesky' },
  { id: 'facebook', name: 'Facebook', platform: 'facebook' },
  { id: 'googlebusiness', name: 'Google Business', platform: 'googlebusiness' },
  { id: 'instagram', name: 'Instagram', platform: 'instagram' },
  { id: 'linkedin', name: 'Linkedin', platform: 'linkedin' },
  { id: 'pinterest', name: 'Pinterest', platform: 'pinterest' },
  { id: 'discord', name: 'Discord', platform: 'discord' },
  { id: 'tiktok', name: 'TikTok', platform: 'tiktok' },
  { id: 'twitter', name: 'Twitter X', platform: 'twitter' },
  { id: 'youtube', name: 'Youtube', platform: 'youtube' },
];

const MONTHS = ['TEM 2025', 'AĞU 2025', 'EYL 2025', 'EKİ 2025', 'KAS 2025', 'ARA 2025'];

interface PlanlamaViewProps {
  onOpenComposer: () => void;
  onOpenApiSettings?: () => void;
}

export const PlanlamaView: React.FC<PlanlamaViewProps> = ({ onOpenComposer, onOpenApiSettings }) => {
  const [statusFilter, setStatusFilter] = useState<'queue' | 'sent' | 'failed'>('queue');
  const [selectedPlatformFilter, setSelectedPlatformFilter] = useState('all');
  const [monthIndex, setMonthIndex] = useState(1); // AĞU 2025 (matching Screenshot 1)
  const [selectedDate, setSelectedDate] = useState('09-08-2025');
  const [posts, setPosts] = useState<PlanlamaPostItem[]>(SAMPLE_POSTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [editPostModal, setEditPostModal] = useState<PlanlamaPostItem | null>(null);

  const daysOfWeek = ['PAZ', 'PTS', 'SAL', 'ÇAR', 'PER', 'CUM', 'CTS'];

  const handleDeletePost = (id: string) => {
    setPosts((prev) => prev.filter((p) => p.id !== id));
  };

  const filteredPosts = posts.filter((p) => {
    if (statusFilter !== p.status) return false;
    if (selectedPlatformFilter !== 'all' && p.platform !== selectedPlatformFilter) return false;
    if (searchQuery && !p.content.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const rightPanelPosts = filteredPosts.filter((p) => p.dateKey === selectedDate);

  return (
    <div className="flex flex-col xl:flex-row gap-5 animate-fade-in text-slate-800 relative">
      {/* ─── LEFT SUB-SIDEBAR: Planlama & Durumlar (Exact Match to Screenshot 1) ─── */}
      <div className="w-full xl:w-56 bg-white rounded-2xl border border-slate-200/90 p-4 shadow-2xs space-y-4 flex-shrink-0 self-start">
        {/* Search Input */}
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Arama"
            className="w-full bg-[#f8fafc] border border-slate-200/90 pl-8 pr-3 py-2 rounded-xl text-xs text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* Section: Planlama Status Filters */}
        <div className="space-y-2">
          <h2 className="text-sm font-bold text-slate-900 px-1">Planlama</h2>

          <div className="space-y-1">
            <button
              onClick={() => setStatusFilter('queue')}
              className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-colors text-left cursor-pointer ${
                statusFilter === 'queue'
                  ? 'bg-blue-50 text-blue-600 font-bold'
                  : 'hover:bg-slate-50 text-slate-700'
              }`}
            >
              <span className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center ${
                statusFilter === 'queue' ? 'border-blue-600' : 'border-slate-300'
              }`}>
                {statusFilter === 'queue' && <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />}
              </span>
              <span>Sıradakiler</span>
            </button>

            <button
              onClick={() => setStatusFilter('sent')}
              className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-colors text-left cursor-pointer ${
                statusFilter === 'sent'
                  ? 'bg-blue-50 text-blue-600 font-bold'
                  : 'hover:bg-slate-50 text-slate-700'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>Gönderilen</span>
            </button>

            <button
              onClick={() => setStatusFilter('failed')}
              className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-colors text-left cursor-pointer ${
                statusFilter === 'failed'
                  ? 'bg-blue-50 text-blue-600 font-bold'
                  : 'hover:bg-slate-50 text-slate-700'
              }`}
            >
              <AlertCircle className="w-3.5 h-3.5 text-sky-400" />
              <span>Hata Veren</span>
            </button>
          </div>
        </div>

        {/* Section: Platform Filters with Radio Circles on Right (Exact Match to Screenshot 1) */}
        <div className="space-y-1.5 pt-2 border-t border-slate-100">
          {PLATFORM_FILTERS.map((item) => {
            const isSelected = selectedPlatformFilter === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setSelectedPlatformFilter(item.id)}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs transition-colors cursor-pointer ${
                  isSelected ? 'text-blue-600 font-bold bg-blue-50/50' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center space-x-2 truncate">
                  {item.platform ? (
                    <PlatformIcon platform={item.platform} size="sm" />
                  ) : (
                    <span className="w-4 h-4 rounded bg-slate-800 text-white flex items-center justify-center text-[9px] font-bold">
                      H
                    </span>
                  )}
                  <span className="truncate">{item.name}</span>
                </div>

                <div
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ml-2 ${
                    isSelected ? 'border-blue-600' : 'border-slate-300'
                  }`}
                >
                  {isSelected && <div className="w-2 h-2 rounded-full bg-blue-600" />}
                </div>
              </button>
            );
          })}
        </div>

        {/* Section: API Key Status & Management Widget */}
        <div className="pt-3 border-t border-slate-100">
          <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-200/80 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-800">
              <span className="flex items-center space-x-1.5">
                <KeyRound className="w-3.5 h-3.5 text-blue-600" />
                <span>API Anahtarları</span>
              </span>
              <span className="px-1.5 py-0.5 rounded text-[9px] bg-emerald-100 text-emerald-800 font-bold">
                Aktif
              </span>
            </div>
            <p className="text-[11px] text-slate-500 leading-snug">
              Zamanlanmış paylaşımlar resmi platform API anahtarlarınız ile güvenle dağıtılır.
            </p>
            {onOpenApiSettings && (
              <button
                type="button"
                onClick={onOpenApiSettings}
                className="w-full py-1.5 px-2 rounded-lg bg-white border border-blue-200 hover:border-blue-400 text-blue-600 font-bold text-xs transition-colors flex items-center justify-center space-x-1 shadow-2xs cursor-pointer"
              >
                <KeyRound className="w-3 h-3" />
                <span>API Key Ekle & Düzenle</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ─── CENTER: Month Calendar Grid with Schedule Bars (Exact Match to Screenshot 1) ─── */}
      <div className="flex-1 bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden flex flex-col">
        {/* Calendar Top Navigator */}
        <div className="flex items-center justify-between px-6 py-3 border-b border-slate-100 bg-white">
          <button
            onClick={() => setMonthIndex((prev) => Math.max(0, prev - 1))}
            className="p-1.5 rounded-lg text-sky-500 hover:bg-sky-50 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="py-1 px-4 rounded-full bg-[#0284c7] text-white font-bold text-xs shadow-xs tracking-wider">
            {MONTHS[monthIndex]}
          </div>

          <button
            onClick={() => setMonthIndex((prev) => Math.min(MONTHS.length - 1, prev + 1))}
            className="p-1.5 rounded-lg text-sky-500 hover:bg-sky-50 transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Days of Week Header */}
        <div className="grid grid-cols-7 border-b border-slate-100 bg-[#f8fafc]/50 text-center py-2 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
          {daysOfWeek.map((day) => (
            <div key={day}>{day}</div>
          ))}
        </div>

        {/* Calendar Matrix with Visual Multi-Day Scheduling Bars */}
        <div className="grid grid-cols-7 flex-1 border-collapse text-xs divide-x divide-slate-100 divide-y">
          {/* Row 1 (Aug 1 - 2) */}
          <div className="p-1 min-h-[70px] bg-slate-50/30 text-slate-300"></div>
          <div className="p-1 min-h-[70px] bg-slate-50/30 text-slate-300"></div>
          <div className="p-1 min-h-[70px] bg-slate-50/30 text-slate-300"></div>
          <div className="p-1 min-h-[70px] bg-slate-50/30 text-slate-300"></div>
          <div className="p-1 min-h-[70px] bg-slate-50/30 text-slate-300"></div>
          <div
            onClick={() => setSelectedDate('01-08-2025')}
            className={`p-1.5 min-h-[70px] hover:bg-blue-50/30 transition-colors cursor-pointer ${
              selectedDate === '01-08-2025' ? 'bg-blue-50/40' : ''
            }`}
          >
            <span className="font-semibold text-slate-600">1</span>
          </div>
          <div
            onClick={() => setSelectedDate('02-08-2025')}
            className={`p-1.5 min-h-[70px] hover:bg-blue-50/30 transition-colors cursor-pointer relative ${
              selectedDate === '02-08-2025' ? 'bg-blue-50/40' : ''
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-600">2</span>
              <span className="w-4 h-4 rounded-full bg-blue-600 text-white text-[9px] font-bold flex items-center justify-center">
                2
              </span>
            </div>
            <div className="mt-1 px-1.5 py-0.5 rounded bg-[#3b5998] text-white text-[10px] font-semibold truncate flex items-center space-x-1 shadow-2xs">
              <span>📘</span>
              <span>Facebook...</span>
            </div>
          </div>

          {/* Row 2: Days 3 - 9 (With Multi-day horizontal bars from Screenshot 1) */}
          {[3, 4, 5, 6, 7, 8, 9].map((day) => {
            const dateStr = `${day < 10 ? '0' + day : day}-08-2025`;
            const isSelected = selectedDate === dateStr;

            return (
              <div
                key={day}
                onClick={() => setSelectedDate(dateStr)}
                className={`p-1.5 min-h-[160px] hover:bg-blue-50/30 transition-colors cursor-pointer flex flex-col justify-between ${
                  isSelected ? 'bg-blue-50/40 ring-1 ring-inset ring-blue-400' : ''
                }`}
              >
                <div>
                  <span className="font-bold text-slate-700">{day}</span>

                  {/* Scheduled Horizontal Multi-Day Layer Bars */}
                  <div className="space-y-1 mt-1">
                    {/* Top Facebook bar spanning across days 3 to 9 */}
                    <div className="py-0.5 px-1 rounded bg-[#3b5998] text-white text-[9px] font-bold truncate">
                      📘 Faceboo..
                    </div>

                    {/* Middle bar */}
                    {day >= 4 && (
                      <div className="py-0.5 px-1 rounded bg-[#2d4373] text-white text-[9px] font-semibold truncate">
                        📘 Faceboo..
                      </div>
                    )}

                    {/* Red Bars for Pinterest / Youtube on Day 8 & 9 */}
                    {day >= 8 && (
                      <>
                        <div className="py-0.5 px-1 rounded bg-[#dc2626] text-white text-[9px] font-semibold truncate">
                          📌 Pinterest..
                        </div>
                        <div className="py-0.5 px-1 rounded bg-[#b91c1c] text-white text-[9px] font-semibold truncate">
                          ▶ Youtube..
                        </div>
                      </>
                    )}

                    {day >= 5 && day <= 8 && (
                      <div className="py-0.5 px-1 rounded bg-[#1e293b] text-white text-[9px] font-semibold truncate">
                        📘 Faceboo..
                      </div>
                    )}
                  </div>
                </div>

                {isSelected && (
                  <span className="text-[9px] font-bold text-blue-600 block text-right">
                    Seçildi
                  </span>
                )}
              </div>
            );
          })}

          {/* Row 3: Days 10 - 16 */}
          {[10, 11, 12, 13, 14, 15, 16].map((day) => {
            const dateStr = `${day}-08-2025`;
            const isSelected = selectedDate === dateStr;

            return (
              <div
                key={day}
                onClick={() => setSelectedDate(dateStr)}
                className={`p-1.5 min-h-[160px] hover:bg-blue-50/30 transition-colors cursor-pointer flex flex-col justify-between ${
                  isSelected ? 'bg-blue-50/40 ring-1 ring-inset ring-blue-400' : ''
                }`}
              >
                <div>
                  <span className="font-bold text-slate-700">{day}</span>

                  <div className="space-y-1 mt-1">
                    {/* Continuous Red schedule bar across entire row 10-16 */}
                    <div className="py-0.5 px-1 rounded bg-[#b91c1c] text-white text-[9px] font-bold truncate">
                      Kampanya
                    </div>

                    {/* Blue horizontal bars */}
                    <div className="py-0.5 px-1 rounded bg-[#3b5998] text-white text-[9px] font-semibold truncate">
                      📘 Faceboo..
                    </div>

                    {day >= 11 && (
                      <div className="py-0.5 px-1 rounded bg-[#2d4373] text-white text-[9px] font-semibold truncate">
                        📘 Faceboo..
                      </div>
                    )}

                    {day >= 12 && (
                      <div className="py-0.5 px-1 rounded bg-[#1e293b] text-white text-[9px] font-semibold truncate">
                        📘 Faceboo..
                      </div>
                    )}

                    {day === 16 && (
                      <div className="py-0.5 px-1 rounded bg-[#0f172a] text-white text-[9px] font-bold truncate">
                        ✖ Twitter X..
                      </div>
                    )}
                  </div>
                </div>

                {isSelected && (
                  <span className="text-[9px] font-bold text-blue-600 block text-right">
                    Seçildi
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ─── RIGHT COLUMN: Scheduled Post Cards (Exact Match to Screenshot 1) ─── */}
      <div className="w-full xl:w-80 space-y-3 flex-shrink-0">
        {/* Header */}
        <div className="flex items-center space-x-2 text-xs font-bold text-slate-800 pb-1">
          <span className="text-blue-600 font-extrabold text-sm">⋮≡</span>
          <span className="tracking-wide">GÖNDERİ TARİHİ {selectedDate}</span>
        </div>

        {/* Cards List */}
        <div className="space-y-3">
          {rightPanelPosts.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200/90 p-8 text-center space-y-3 shadow-2xs">
              <Clock className="w-8 h-8 text-slate-300 mx-auto" />
              <div className="text-xs text-slate-500 font-medium">
                Bu tarihte ({selectedDate}) planlanmış gönderi bulunmuyor.
              </div>
              <button
                onClick={onOpenComposer}
                className="py-1.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors shadow-xs"
              >
                + Yeni Gönderi Planla
              </button>
            </div>
          ) : (
            rightPanelPosts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-2xl border border-slate-200/90 p-3.5 shadow-2xs space-y-2.5 hover:shadow-xs transition-shadow"
              >
                {/* Top: Status Circle + Author + Timestamp + Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="w-4 h-4 rounded-full border-2 border-sky-400 flex items-center justify-center flex-shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                    </span>

                    <div className="w-7 h-7 rounded-full bg-[#fbbf24] text-slate-900 flex items-center justify-center text-sm font-bold flex-shrink-0 shadow-2xs">
                      {post.authorAvatar}
                    </div>

                    <div>
                      <div className="text-xs font-bold text-slate-900 flex items-center space-x-1">
                        <PlatformIcon platform={post.platform} size="xs" />
                        <span>{post.author}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 block font-medium">
                        {post.datetime}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => setEditPostModal(post)}
                      className="p-1 text-sky-500 hover:bg-sky-50 rounded-lg transition-colors cursor-pointer"
                      title="Düzenle"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeletePost(post.id)}
                      className="p-1 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                      title="Sil"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Body: Thumbnail on left, multiline excerpt on right */}
                <div className="flex items-start space-x-2.5">
                  <div className="w-20 h-16 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0 border border-slate-100">
                    <img
                      src={post.image}
                      alt={post.author}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] text-slate-600 line-clamp-3 leading-relaxed">
                      {post.content}
                    </p>
                  </div>
                </div>

                {/* Carousel Navigation Dots matching Screenshot 1 */}
                <div className="flex items-center space-x-1 pt-0.5 justify-start pl-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* ─── EDIT POST MODAL ─── */}
      {editPostModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs modal-backdrop">
          <div className="bg-white rounded-3xl border border-slate-200 max-w-md w-full p-6 space-y-4 animate-scale-in relative">
            <button
              onClick={() => setEditPostModal(null)}
              className="absolute right-4 top-4 p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-base font-bold text-slate-900">Planlanmış Gönderiyi Düzenle</h3>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Yayın Zamanı
                </label>
                <input
                  type="text"
                  value={editPostModal.datetime}
                  onChange={(e) =>
                    setEditPostModal({ ...editPostModal, datetime: e.target.value })
                  }
                  className="w-full bg-[#f8fafc] border border-slate-200 px-3.5 py-2 rounded-xl text-xs text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Gönderi Metni
                </label>
                <textarea
                  rows={4}
                  value={editPostModal.content}
                  onChange={(e) =>
                    setEditPostModal({ ...editPostModal, content: e.target.value })
                  }
                  className="w-full bg-[#f8fafc] border border-slate-200 p-3 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-center justify-end space-x-2 pt-2">
                <button
                  onClick={() => setEditPostModal(null)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  İptal
                </button>
                <button
                  onClick={() => {
                    setPosts((prev) =>
                      prev.map((p) => (p.id === editPostModal.id ? editPostModal : p))
                    );
                    setEditPostModal(null);
                  }}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-xs"
                >
                  Değişiklikleri Kaydet
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
