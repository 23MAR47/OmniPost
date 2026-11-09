'use client';

import React, { useState } from 'react';
import { PostContent, SocialPlatformId } from '@/types';
import { PLATFORMS_CONFIG } from '@/lib/constants';
import { PlatformIcon } from '@/components/PlatformIcon';
import {
  Eye,
  Heart,
  MessageCircle,
  Repeat2,
  Bookmark,
  Share2,
  MoreHorizontal,
  Play,
  ThumbsUp,
  ThumbsDown,
  Volume2,
  Music,
  ExternalLink,
  CheckCircle,
  Clock,
  Send,
  Image as ImageIcon,
  Smartphone,
  Monitor,
  Wifi,
  Battery,
  Sparkles,
  Check,
} from 'lucide-react';

interface LivePreviewPanelProps {
  content: PostContent;
  selectedPlatforms: SocialPlatformId[];
}

export const LivePreviewPanel: React.FC<LivePreviewPanelProps> = ({
  content,
  selectedPlatforms,
}) => {
  // Default to first selected platform or twitter
  const [activeTab, setActiveTab] = useState<SocialPlatformId>(
    selectedPlatforms[0] || 'twitter'
  );
  const [deviceMode, setDeviceMode] = useState<'mobile' | 'desktop'>('mobile');
  const [isLiked, setIsLiked] = useState(false);
  const [likeCountOffset, setLikeCountOffset] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);

  // If activeTab is no longer in selectedPlatforms, fall back
  const currentPlatformId = selectedPlatforms.includes(activeTab)
    ? activeTab
    : selectedPlatforms[0] || 'twitter';

  const currentPlatform = PLATFORMS_CONFIG[currentPlatformId];
  const hasMedia = content.media.length > 0;
  const firstMedia = content.media[0];

  const isOverrideActive = !!content.platformOverrides[currentPlatformId];
  const displayText =
    content.platformOverrides[currentPlatformId] ||
    content.caption ||
    'Gönderi metniniz burada bu platforma özel biçimlendirilmiş olarak görünecektir...';
  const displayTitle = content.title || 'İçerik Başlığı';

  const handleToggleLike = () => {
    setIsLiked((prev) => {
      const next = !prev;
      setLikeCountOffset((c) => (next ? c + 1 : c - 1));
      return next;
    });
  };

  const handleShare = () => {
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-sm card-interactive flex flex-col h-full relative overflow-hidden">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-slate-100">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 shadow-2xs">
            <Eye className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-slate-900 tracking-tight">
              Canlı Önizleme Stüdyosu
            </h3>
            <p className="text-[11px] text-slate-500">
              Gerçek platform akışında ve cihaz ekranında görünüm
            </p>
          </div>
        </div>

        {/* Device Switcher (Mobile vs Desktop) */}
        <div className="flex items-center p-1 rounded-xl bg-slate-100 border border-slate-200/80">
          <button
            type="button"
            onClick={() => setDeviceMode('mobile')}
            className={`p-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1 ${
              deviceMode === 'mobile'
                ? 'bg-white text-blue-600 shadow-xs'
                : 'text-slate-500 hover:text-slate-900'
            }`}
            title="iPhone 16 Mobil Ekran Önizlemesi"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="text-[10px] hidden sm:inline">Mobil</span>
          </button>
          <button
            type="button"
            onClick={() => setDeviceMode('desktop')}
            className={`p-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1 ${
              deviceMode === 'desktop'
                ? 'bg-white text-blue-600 shadow-xs'
                : 'text-slate-500 hover:text-slate-900'
            }`}
            title="Masaüstü Web Akış Önizlemesi"
          >
            <Monitor className="w-3.5 h-3.5" />
            <span className="text-[10px] hidden sm:inline">Masaüstü</span>
          </button>
        </div>
      </div>

      {/* Platform Switcher Tabs */}
      {selectedPlatforms.length > 0 ? (
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-2.5 mb-3 scrollbar-none">
          {selectedPlatforms.map((id) => {
            const p = PLATFORMS_CONFIG[id];
            const isTabActive = currentPlatformId === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => setActiveTab(id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap flex items-center space-x-1.5 transition-all duration-200 active:scale-95 ${
                  isTabActive
                    ? 'bg-slate-900 text-white shadow-xs scale-105'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70 hover:text-slate-900'
                }`}
              >
                <PlatformIcon platformId={id} size={14} />
                <span>{p.shortName}</span>
              </button>
            );
          })}
        </div>
      ) : (
        <div className="p-3.5 rounded-xl bg-amber-50 text-amber-800 border border-amber-200 text-xs mb-3">
          Önizlemeyi görüntülemek için lütfen yukarıdan en az 1 platform seçin.
        </div>
      )}

      {/* Share Toast Feedback */}
      {copiedLink && (
        <div className="absolute top-4 right-4 z-50 bg-slate-900 text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-xl flex items-center space-x-1.5 animate-scale-in">
          <Check className="w-3.5 h-3.5 text-emerald-400" />
          <span>Bağlantı Panoya Kopyalandı!</span>
        </div>
      )}

      {/* Main Preview Container */}
      <div className="flex-1 bg-gradient-to-b from-slate-100/90 to-slate-200/50 rounded-2xl border border-slate-200/80 p-3 sm:p-5 flex items-center justify-center overflow-y-auto min-h-[460px]">
        {/* Device wrapper: If Mobile mode is active, wrap inside realistic iPhone chassis */}
        {deviceMode === 'mobile' ? (
          <div className="phone-chassis my-auto animate-scale-in">
            {/* Dynamic Island */}
            <div className="phone-dynamic-island">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-800" />
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500/80 animate-pulse" />
            </div>

            {/* Mobile Status Bar */}
            <div className="pt-3 px-6 pb-1 flex items-center justify-between text-white text-[11px] font-bold z-30 select-none">
              <span>09:41</span>
              <div className="flex items-center space-x-1.5 text-slate-300">
                <Wifi className="w-3 h-3" />
                <span className="text-[10px]">5G</span>
                <Battery className="w-3.5 h-3.5 text-emerald-400" />
              </div>
            </div>

            {/* Mobile App Header */}
            <div className="px-4 py-2 border-b border-white/10 bg-slate-900/60 backdrop-blur-md flex items-center justify-between text-white text-xs z-30">
              <div className="flex items-center space-x-1.5 font-bold">
                <PlatformIcon platformId={currentPlatformId} size={15} />
                <span className="capitalize">{currentPlatform.name}</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="text-[10px]">Canlı</span>
              </div>
            </div>

            {/* Scrollable Phone Feed Content */}
            <div className="flex-1 overflow-y-auto p-3 bg-white text-slate-900 relative">
              {renderPlatformPost()}
            </div>

            {/* Home Indicator */}
            <div className="phone-home-indicator" />
          </div>
        ) : (
          /* Desktop Clean Feed View */
          <div className="w-full max-w-lg bg-white rounded-2xl border border-slate-200/90 shadow-lg p-5 animate-scale-in">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100 text-xs font-bold text-slate-500">
              <div className="flex items-center space-x-2">
                <PlatformIcon platformId={currentPlatformId} size={16} />
                <span className="text-slate-800">{currentPlatform.name} Masaüstü Beslemesi</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px]">
                Web Önizleme
              </span>
            </div>
            {renderPlatformPost()}
          </div>
        )}
      </div>
    </div>
  );

  function renderPlatformPost() {
    return (
      <>
        {/* ==================== 1. X (TWITTER) PREVIEW ==================== */}
        {currentPlatformId === 'twitter' && (
          <div className="text-slate-900">
            {/* Tweet Author */}
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xs shadow-xs">
                  OP
                </div>
                <div>
                  <div className="flex items-center space-x-1">
                    <span className="font-bold text-xs text-slate-900">OmniPost Studio</span>
                    <span className="w-3.5 h-3.5 rounded-full bg-blue-500 text-white flex items-center justify-center text-[9px] font-bold">
                      ✓
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400">@omnipost_official · Şimdi</span>
                </div>
              </div>
              <MoreHorizontal className="w-4 h-4 text-slate-400 cursor-pointer" />
            </div>

            {/* Tweet Content */}
            <div className="mt-2.5 text-xs text-slate-800 whitespace-pre-wrap leading-relaxed">
              {displayText}
            </div>

            {/* Tweet Media */}
            {hasMedia && (
              <div className="mt-2.5 rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 max-h-56 flex items-center justify-center">
                {firstMedia.type === 'video' ? (
                  <div className="relative w-full h-48 bg-slate-900 flex items-center justify-center text-white">
                    <img
                      src={firstMedia.url}
                      alt="Video kapağı"
                      className="w-full h-full object-cover opacity-75"
                    />
                    <div className="absolute w-11 h-11 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center">
                      <Play className="w-5 h-5 fill-current text-white translate-x-0.5" />
                    </div>
                  </div>
                ) : (
                  <img
                    src={firstMedia.url}
                    alt="X gönderi görseli"
                    className="w-full h-full object-cover max-h-56"
                  />
                )}
              </div>
            )}

            {/* Tweet Actions */}
            <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 px-1">
              <span className="flex items-center space-x-1 hover:text-blue-500 cursor-pointer">
                <MessageCircle className="w-3.5 h-3.5" /> <span>14</span>
              </span>
              <span className="flex items-center space-x-1 hover:text-emerald-500 cursor-pointer">
                <Repeat2 className="w-3.5 h-3.5" /> <span>38</span>
              </span>
              <button
                type="button"
                onClick={handleToggleLike}
                className={`flex items-center space-x-1 cursor-pointer transition-colors ${
                  isLiked ? 'text-rose-600 font-bold' : 'hover:text-rose-500'
                }`}
              >
                <Heart
                  className={`w-3.5 h-3.5 ${isLiked ? 'fill-current text-rose-600 scale-125' : ''}`}
                />
                <span>{218 + likeCountOffset}</span>
              </button>
              <span className="flex items-center space-x-1 hover:text-blue-500 cursor-pointer">
                <Bookmark className="w-3.5 h-3.5" /> <span>45</span>
              </span>
              <button type="button" onClick={handleShare} className="hover:text-blue-500 cursor-pointer">
                <Share2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* ==================== 2. INSTAGRAM PREVIEW ==================== */}
        {currentPlatformId === 'instagram' && (
          <div className="text-slate-900">
            {/* Header */}
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <div className="w-7 h-7 rounded-full p-[1.5px] bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600">
                  <div className="w-full h-full rounded-full bg-white p-[1px]">
                    <div className="w-full h-full rounded-full bg-slate-900 text-white text-[9px] font-bold flex items-center justify-center">
                      OP
                    </div>
                  </div>
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-900 block leading-tight">
                    omnipost_studio
                  </span>
                  <span className="text-[9px] text-slate-400">Orijinal Ses</span>
                </div>
              </div>
              <MoreHorizontal className="w-4 h-4 text-slate-400" />
            </div>

            {/* Media Box */}
            <div className="relative aspect-square bg-slate-100 rounded-xl flex items-center justify-center overflow-hidden mb-2.5">
              {hasMedia ? (
                firstMedia.type === 'video' ? (
                  <div className="relative w-full h-full bg-slate-900 flex items-center justify-center">
                    <img
                      src={firstMedia.url}
                      alt="Instagram video önizlemesi"
                      className="w-full h-full object-cover opacity-75"
                    />
                    <div className="absolute w-11 h-11 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white">
                      <Play className="w-5 h-5 fill-current translate-x-0.5" />
                    </div>
                  </div>
                ) : (
                  <img
                    src={firstMedia.url}
                    alt="Instagram gönderi görseli"
                    className="w-full h-full object-cover"
                  />
                )
              ) : (
                <div className="text-center p-4 text-slate-400 text-xs">
                  <ImageIcon className="w-6 h-6 mx-auto mb-1.5 opacity-50" />
                  <span>Görsel veya video ekleyin</span>
                </div>
              )}
            </div>

            {/* Actions Bar */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center space-x-3 text-slate-800">
                  <button
                    type="button"
                    onClick={handleToggleLike}
                    className={`transition-colors ${isLiked ? 'text-rose-600' : 'hover:text-rose-500'}`}
                  >
                    <Heart
                      className={`w-4.5 h-4.5 ${isLiked ? 'fill-current text-rose-600 scale-110' : ''}`}
                    />
                  </button>
                  <MessageCircle className="w-4.5 h-4.5 hover:text-slate-600 cursor-pointer" />
                  <Send className="w-4.5 h-4.5 hover:text-slate-600 cursor-pointer" />
                </div>
                <Bookmark className="w-4.5 h-4.5 text-slate-800 cursor-pointer" />
              </div>

              <div className="text-xs font-bold text-slate-900 mb-1">
                {(1842 + likeCountOffset).toLocaleString('tr-TR')} beğenme
              </div>

              <div className="text-xs text-slate-800 leading-snug">
                <span className="font-bold mr-1.5">omnipost_studio</span>
                <span className="whitespace-pre-wrap">{displayText}</span>
              </div>

              <div className="text-[10px] text-slate-400 mt-1.5 uppercase tracking-wide">
                12 DAKİKA ÖNCE
              </div>
            </div>
          </div>
        )}

        {/* ==================== 3. YOUTUBE PREVIEW ==================== */}
        {currentPlatformId === 'youtube' && (
          <div className="text-slate-900">
            {/* Player Frame */}
            <div className="relative aspect-video bg-slate-900 rounded-xl overflow-hidden flex items-center justify-center text-white mb-2.5">
              {hasMedia ? (
                <img
                  src={firstMedia.url}
                  alt="YouTube video küçük resmi"
                  className="w-full h-full object-cover opacity-85"
                />
              ) : (
                <div className="text-xs text-slate-400 flex flex-col items-center">
                  <Play className="w-8 h-8 text-red-500 mb-1.5 fill-current" />
                  <span>Video dosyası gereklidir</span>
                </div>
              )}
              <div className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/80 text-[10px] font-mono">
                12:45
              </div>
            </div>

            {/* Video Meta */}
            <div>
              <h4 className="font-bold text-xs text-slate-900 line-clamp-2 leading-snug mb-1">
                {displayTitle}
              </h4>
              <div className="flex items-center space-x-2 text-[11px] text-slate-500 mb-2">
                <span>OmniPost TV</span>
                <span>·</span>
                <span>4.8 B görüntüleme</span>
                <span>·</span>
                <span>1 gün önce</span>
              </div>

              <div className="p-2 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-600 line-clamp-3">
                {displayText}
              </div>
            </div>
          </div>
        )}

        {/* ==================== 4. TIKTOK PREVIEW ==================== */}
        {currentPlatformId === 'tiktok' && (
          <div className="relative rounded-2xl bg-black text-white p-3 aspect-[9/16] max-h-[420px] mx-auto overflow-hidden flex flex-col justify-between shadow-md">
            {hasMedia ? (
              <img
                src={firstMedia.url}
                alt="TikTok dikey video besleme"
                className="absolute inset-0 w-full h-full object-cover opacity-80"
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 text-xs">
                <Music className="w-8 h-8 text-cyan-400 mb-2 animate-bounce" />
                <span>TikTok dikey video bekliyor</span>
              </div>
            )}

            {/* Floating Top Header */}
            <div className="relative z-10 flex items-center justify-center space-x-4 text-xs font-bold">
              <span className="text-slate-400">Takip Edilen</span>
              <span className="text-white border-b-2 border-white pb-0.5">Sizin İçin</span>
            </div>

            {/* Floating Right Actions */}
            <div className="relative z-10 self-end flex flex-col items-center space-y-3.5 mb-8 text-[10px]">
              <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-800 flex items-center justify-center font-bold text-xs">
                OP
              </div>
              <button
                type="button"
                onClick={handleToggleLike}
                className="flex flex-col items-center"
              >
                <Heart
                  className={`w-6 h-6 ${isLiked ? 'fill-current text-rose-500' : 'text-white'}`}
                />
                <span>42.8K</span>
              </button>
              <div className="flex flex-col items-center">
                <MessageCircle className="w-6 h-6 text-white" />
                <span>892</span>
              </div>
              <div className="flex flex-col items-center">
                <Bookmark className="w-6 h-6 text-white" />
                <span>3.4K</span>
              </div>
              <div className="flex flex-col items-center">
                <Share2 className="w-6 h-6 text-white" />
                <span>Paylaş</span>
              </div>
            </div>

            {/* Floating Bottom Captions */}
            <div className="relative z-10 text-xs pr-12">
              <span className="font-bold block mb-1">@omnipost_official</span>
              <p className="text-[11px] line-clamp-2 text-slate-200">{displayText}</p>
              <div className="flex items-center space-x-1.5 mt-2 text-[10px] text-slate-300">
                <Music className="w-3 h-3 animate-spin-slow" />
                <span className="truncate">Orijinal Ses - OmniPost Ses Efektleri</span>
              </div>
            </div>
          </div>
        )}

        {/* ==================== 5. FACEBOOK PREVIEW ==================== */}
        {currentPlatformId === 'facebook' && (
          <div className="text-slate-900">
            {/* Header */}
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
                  f
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-900 block leading-tight">
                    OmniPost Bilişim Grubu
                  </span>
                  <div className="flex items-center space-x-1 text-[10px] text-slate-400">
                    <span>5d</span>
                    <span>·</span>
                    <span>🌐</span>
                  </div>
                </div>
              </div>
              <MoreHorizontal className="w-4 h-4 text-slate-400" />
            </div>

            <p className="text-xs text-slate-800 whitespace-pre-wrap mb-2.5">{displayText}</p>

            {hasMedia && (
              <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-100 mb-2.5">
                <img
                  src={firstMedia.url}
                  alt="Facebook gönderi görseli"
                  className="w-full max-h-56 object-cover"
                />
              </div>
            )}

            <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs text-slate-600">
              <span
                onClick={handleToggleLike}
                className="flex items-center space-x-1 py-1 px-2.5 rounded-lg hover:bg-slate-50 cursor-pointer"
              >
                <ThumbsUp
                  className={`w-3.5 h-3.5 ${isLiked ? 'text-blue-600 fill-current' : 'text-blue-600'}`}
                />
                <span>Beğen</span>
              </span>
              <span className="flex items-center space-x-1 py-1 px-2.5 rounded-lg hover:bg-slate-50 cursor-pointer">
                <MessageCircle className="w-3.5 h-3.5" /> <span>Yorum Yap</span>
              </span>
              <span
                onClick={handleShare}
                className="flex items-center space-x-1 py-1 px-2.5 rounded-lg hover:bg-slate-50 cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" /> <span>Paylaş</span>
              </span>
            </div>
          </div>
        )}

        {/* ==================== 6. PINTEREST PREVIEW ==================== */}
        {currentPlatformId === 'pinterest' && (
          <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="relative group bg-slate-100">
              {hasMedia ? (
                <img
                  src={firstMedia.url}
                  alt="Pinterest pin görseli"
                  className="w-full h-56 object-cover"
                />
              ) : (
                <div className="h-48 flex flex-col items-center justify-center p-4 text-slate-400 text-xs text-center">
                  <Bookmark className="w-6 h-6 text-red-500 mb-1.5" />
                  <span>Pinterest için görsel ekleyin</span>
                </div>
              )}
              <button className="absolute top-2.5 right-2.5 px-3 py-1 rounded-full bg-red-600 text-white font-bold text-[11px] shadow-md hover:bg-red-700">
                Kaydet
              </button>
            </div>

            <div className="p-3">
              <h4 className="font-bold text-xs text-slate-900 mb-1">{displayTitle}</h4>
              <p className="text-[11px] text-slate-600 line-clamp-2 mb-2">{displayText}</p>
              <div className="flex items-center space-x-2 pt-2 border-t border-slate-100">
                <div className="w-5 h-5 rounded-full bg-red-600 text-white text-[9px] font-bold flex items-center justify-center">
                  P
                </div>
                <span className="text-[11px] font-medium text-slate-800">OmniPost Boards</span>
              </div>
            </div>
          </div>
        )}

        {/* ==================== 7. THREADS PREVIEW ==================== */}
        {currentPlatformId === 'threads' && (
          <div className="text-slate-900">
            <div className="flex items-start space-x-2.5">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-neutral-900 text-white font-bold text-xs flex items-center justify-center">
                  @
                </div>
                <div className="w-0.5 flex-1 bg-slate-200 mt-1.5 min-h-10" />
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1.5">
                    <span className="font-bold text-xs text-slate-900">omnipost_threads</span>
                    <span className="w-3.5 h-3.5 rounded-full bg-blue-500 text-white flex items-center justify-center text-[9px] font-bold">
                      ✓
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400">3d</span>
                </div>

                <div className="mt-1 text-xs text-slate-800 whitespace-pre-wrap leading-relaxed">
                  {displayText}
                </div>

                {hasMedia && (
                  <div className="mt-2 rounded-xl overflow-hidden border border-slate-200 max-h-52 bg-slate-100">
                    <img
                      src={firstMedia.url}
                      alt="Threads görseli"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <div className="flex items-center space-x-4 mt-2.5 text-slate-600 text-xs">
                  <button
                    type="button"
                    onClick={handleToggleLike}
                    className={isLiked ? 'text-rose-500' : 'hover:text-rose-500'}
                  >
                    <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                  </button>
                  <MessageCircle className="w-4 h-4 hover:text-slate-900 cursor-pointer" />
                  <Repeat2 className="w-4 h-4 hover:text-emerald-500 cursor-pointer" />
                  <Send className="w-4 h-4 hover:text-slate-900 cursor-pointer" />
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
};
