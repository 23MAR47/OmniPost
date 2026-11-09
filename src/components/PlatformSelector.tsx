'use client';

import React, { useState } from 'react';
import { PLATFORMS_CONFIG } from '@/lib/constants';
import { SocialPlatformId } from '@/types';
import { PlatformIcon } from '@/components/PlatformIcon';
import {
  Check,
  CheckSquare,
  Square,
  Video,
  Image as ImageIcon,
  Type,
  Zap,
  Filter,
  Layers,
} from 'lucide-react';

interface PlatformSelectorProps {
  selectedPlatforms: SocialPlatformId[];
  onTogglePlatform: (platformId: SocialPlatformId) => void;
  onSelectAll: () => void;
  onClearAll: () => void;
  onSelectGroup?: (platformIds: SocialPlatformId[]) => void;
}

export const PlatformSelector: React.FC<PlatformSelectorProps> = ({
  selectedPlatforms,
  onTogglePlatform,
  onSelectAll,
  onClearAll,
  onSelectGroup,
}) => {
  const allPlatforms = Object.values(PLATFORMS_CONFIG);
  const [hoveredPlatform, setHoveredPlatform] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<'all' | 'video' | 'text' | 'visual'>('all');

  const filteredPlatforms = allPlatforms.filter((p) => {
    if (activeFilter === 'video') return p.mediaTypes.includes('video');
    if (activeFilter === 'text') return p.id === 'twitter' || p.id === 'threads' || p.id === 'bluesky' || p.id === 'telegram';
    if (activeFilter === 'visual') return p.id === 'instagram' || p.id === 'pinterest' || p.id === 'facebook' || p.id === 'googlebusiness';
    return true;
  });

  const platformBrandStyles: Record<string, { bgGlow: string; ring: string }> = {
    twitter: { bgGlow: 'from-slate-900/10 to-slate-800/5', ring: 'ring-slate-900/30' },
    instagram: { bgGlow: 'from-pink-500/10 to-amber-500/10', ring: 'ring-pink-500/30' },
    youtube: { bgGlow: 'from-red-600/10 to-red-500/5', ring: 'ring-red-600/30' },
    facebook: { bgGlow: 'from-blue-600/10 to-indigo-600/5', ring: 'ring-blue-600/30' },
    tiktok: { bgGlow: 'from-cyan-500/10 to-pink-500/10', ring: 'ring-cyan-500/30' },
    pinterest: { bgGlow: 'from-red-500/10 to-rose-500/5', ring: 'ring-red-500/30' },
    threads: { bgGlow: 'from-slate-800/10 to-slate-900/5', ring: 'ring-slate-800/30' },
    linkedin: { bgGlow: 'from-blue-700/10 to-cyan-600/5', ring: 'ring-blue-700/30' },
    googlebusiness: { bgGlow: 'from-blue-500/10 to-emerald-500/5', ring: 'ring-blue-500/30' },
    telegram: { bgGlow: 'from-sky-500/10 to-blue-500/5', ring: 'ring-sky-500/30' },
    bluesky: { bgGlow: 'from-sky-600/10 to-indigo-500/5', ring: 'ring-sky-600/30' },
    discord: { bgGlow: 'from-indigo-600/10 to-purple-500/5', ring: 'ring-indigo-600/30' },
    tumblr: { bgGlow: 'from-slate-900/10 to-blue-900/5', ring: 'ring-slate-900/30' },
  };

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-sm card-interactive animate-fade-in relative overflow-hidden">
      {/* Ambient background aura */}
      <div className="absolute top-0 right-0 w-80 h-32 bg-blue-50/50 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header & Toggles */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping" />
            <h2 className="text-sm font-extrabold text-slate-900 tracking-tight flex items-center space-x-2">
              <span>Hedef Dağıtım Kanalları</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 font-bold border border-blue-200/80">
                {selectedPlatforms.length} / {allPlatforms.length} Aktif
              </span>
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            İçeriğinizin tek tıkla aynı anda yayınlanacağı sosyal platformları belirleyin veya hesap grubu seçin.
          </p>
        </div>

        {/* Action Controls & Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Category Filter Pills */}
          <div className="flex items-center p-1 rounded-xl bg-slate-100/90 border border-slate-200/60 text-[11px] font-semibold text-slate-600">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                activeFilter === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'hover:text-slate-900'
              }`}
            >
              Tümü ({allPlatforms.length})
            </button>
            <button
              onClick={() => setActiveFilter('video')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                activeFilter === 'video' ? 'bg-white text-slate-900 shadow-xs' : 'hover:text-slate-900'
              }`}
            >
              🎬 Video
            </button>
            <button
              onClick={() => setActiveFilter('text')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                activeFilter === 'text' ? 'bg-white text-slate-900 shadow-xs' : 'hover:text-slate-900'
              }`}
            >
              ✍️ Metin
            </button>
            <button
              onClick={() => setActiveFilter('visual')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                activeFilter === 'visual' ? 'bg-white text-slate-900 shadow-xs' : 'hover:text-slate-900'
              }`}
            >
              📸 Görsel
            </button>
          </div>

          {/* Quick Select All / Clear Buttons */}
          <div className="flex items-center space-x-1.5">
            <button
              type="button"
              onClick={onSelectAll}
              className="text-xs px-3 py-1.5 rounded-xl font-bold text-slate-700 hover:text-blue-600 hover:bg-blue-50 border border-slate-200 bg-white transition-all duration-200 active:scale-95 flex items-center space-x-1.5"
            >
              <CheckSquare className="w-3.5 h-3.5" />
              <span>Tümünü Seç</span>
            </button>
            <button
              type="button"
              onClick={onClearAll}
              className="text-xs px-3 py-1.5 rounded-xl font-bold text-slate-700 hover:text-rose-600 hover:bg-rose-50 border border-slate-200 bg-white transition-all duration-200 active:scale-95 flex items-center space-x-1.5"
            >
              <Square className="w-3.5 h-3.5" />
              <span>Temizle</span>
            </button>
          </div>
        </div>
      </div>

      {/* Account Groups Bar (Grup Özelliği) */}
      <div className="flex flex-wrap items-center gap-2 mb-4 p-2.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs">
        <span className="font-bold text-slate-700 flex items-center space-x-1.5 pl-1 pr-2">
          <Layers className="w-3.5 h-3.5 text-rose-500" />
          <span>Hesap Grupları:</span>
        </span>
        <button
          type="button"
          onClick={() => onSelectGroup?.(['instagram', 'facebook', 'pinterest', 'tiktok'])}
          className="px-3 py-1.5 rounded-xl bg-white hover:bg-rose-50 hover:text-rose-700 border border-slate-200 font-semibold text-slate-700 shadow-2xs transition-all flex items-center space-x-1"
        >
          <span>🛒 E-Ticaret (4 Ağ)</span>
        </button>
        <button
          type="button"
          onClick={() => onSelectGroup?.(['linkedin', 'twitter', 'googlebusiness', 'youtube', 'telegram'])}
          className="px-3 py-1.5 rounded-xl bg-white hover:bg-blue-50 hover:text-blue-700 border border-slate-200 font-semibold text-slate-700 shadow-2xs transition-all flex items-center space-x-1"
        >
          <span>💼 B2B & Kurumsal (5 Ağ)</span>
        </button>
        <button
          type="button"
          onClick={() => onSelectGroup?.(['tiktok', 'instagram', 'threads', 'discord', 'bluesky'])}
          className="px-3 py-1.5 rounded-xl bg-white hover:bg-purple-50 hover:text-purple-700 border border-slate-200 font-semibold text-slate-700 shadow-2xs transition-all flex items-center space-x-1"
        >
          <span>⚡ Genç Kitle & Trendler (5 Ağ)</span>
        </button>
        <button
          type="button"
          onClick={() => onSelectGroup?.(['twitter', 'threads', 'telegram', 'tumblr'])}
          className="px-3 py-1.5 rounded-xl bg-white hover:bg-sky-50 hover:text-sky-700 border border-slate-200 font-semibold text-slate-700 shadow-2xs transition-all flex items-center space-x-1"
        >
          <span>📰 Haber & Blog (4 Ağ)</span>
        </button>
      </div>

      {/* Grid of Platform Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {filteredPlatforms.map((platform, index) => {
          const isSelected = selectedPlatforms.includes(platform.id);
          const brandStyle = platformBrandStyles[platform.id] || {
            bgGlow: 'from-blue-500/10 to-indigo-500/10',
            ring: 'ring-blue-500/30',
          };

          return (
            <button
              key={platform.id}
              type="button"
              onClick={() => onTogglePlatform(platform.id)}
              onMouseEnter={() => setHoveredPlatform(platform.id)}
              onMouseLeave={() => setHoveredPlatform(null)}
              className={`
                relative flex flex-col p-3.5 rounded-2xl border text-left transition-all duration-200 cursor-pointer overflow-hidden
                ${
                  isSelected
                    ? `border-blue-400 bg-gradient-to-b from-blue-50/90 to-indigo-50/60 shadow-md shadow-blue-500/10 ring-2 ${brandStyle.ring} -translate-y-1`
                    : 'border-slate-200/80 bg-white hover:border-slate-300 hover:bg-slate-50/80 hover:-translate-y-0.5'
                }
              `}
            >
              {/* Top active color stripe */}
              {isSelected && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600" />
              )}

              {/* Checkmark badge */}
              <div
                className={`absolute top-2.5 right-2.5 w-5 h-5 rounded-lg flex items-center justify-center transition-all duration-200 ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-xs scale-100'
                    : 'border border-slate-300 bg-white scale-90 opacity-40 hover:opacity-80'
                }`}
              >
                {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
              </div>

              {/* Icon & Name */}
              <div className="flex items-center space-x-2.5 mb-2.5 pr-6">
                <div
                  className={`
                    w-9 h-9 rounded-xl flex items-center justify-center bg-white border transition-all duration-200 shrink-0
                    ${
                      isSelected
                        ? 'border-blue-200 shadow-sm scale-105'
                        : 'border-slate-200/80 shadow-2xs'
                    }
                  `}
                >
                  <PlatformIcon platformId={platform.id} size={20} />
                </div>
                <span className="text-xs font-extrabold text-slate-900 truncate">
                  {platform.shortName}
                </span>
              </div>

              {/* Requirement Pills */}
              <div className="flex flex-wrap items-center gap-1 mt-auto text-[10px] text-slate-500">
                <span className="px-1.5 py-0.5 rounded-md bg-slate-100 font-mono text-slate-600 text-[9px] font-semibold">
                  {platform.maxChars >= 10000 ? 'Limitsiz' : `${platform.maxChars} krkt`}
                </span>
                {platform.requiresMedia && (
                  <span className="px-1.5 py-0.5 rounded-md bg-amber-50 text-amber-700 border border-amber-200/80 flex items-center space-x-0.5 text-[9px] font-bold">
                    {platform.mediaTypes.includes('video') && !platform.mediaTypes.includes('image') ? (
                      <Video className="w-2.5 h-2.5" />
                    ) : (
                      <ImageIcon className="w-2.5 h-2.5" />
                    )}
                    <span>Medya</span>
                  </span>
                )}
                {platform.requiresTitle && (
                  <span className="px-1.5 py-0.5 rounded-md bg-purple-50 text-purple-700 border border-purple-200/80 flex items-center space-x-0.5 text-[9px] font-bold">
                    <Type className="w-2.5 h-2.5" />
                    <span>Başlık</span>
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
