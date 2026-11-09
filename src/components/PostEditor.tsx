'use client';

import React, { useState, useRef } from 'react';
import { PostContent, SocialPlatformId, MediaItem } from '@/types';
import { PLATFORMS_CONFIG, SAMPLE_MEDIAS } from '@/lib/constants';
import { PlatformIcon } from '@/components/PlatformIcon';
import {
  Upload,
  Image as ImageIcon,
  Video,
  X,
  Link2,
  Hash,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  Send,
  Calendar,
  Layers,
  Edit3,
  Camera,
  Wand2,
  Smile,
  ShieldCheck,
  Check,
  FileText,
  Code,
} from 'lucide-react';
import { AiStudioModal } from './AiStudioModal';
import { ApiCodeModal } from './ApiCodeModal';

interface PostEditorProps {
  content: PostContent;
  onChange: (updated: Partial<PostContent>) => void;
  selectedPlatforms: SocialPlatformId[];
  onPublish: () => void;
  onOpenSchedule: () => void;
  onSaveDraft?: () => void;
  isPublishing?: boolean;
}

export const PostEditor: React.FC<PostEditorProps> = ({
  content,
  onChange,
  selectedPlatforms,
  onPublish,
  onOpenSchedule,
  onSaveDraft,
  isPublishing = false,
}) => {
  const [activeTextTab, setActiveTextTab] = useState<'common' | SocialPlatformId>('common');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isApiCodeOpen, setIsApiCodeOpen] = useState(false);

  // Active text being edited
  const isEditingSpecificPlatform = activeTextTab !== 'common';
  const currentEditingText = isEditingSpecificPlatform
    ? (content.platformOverrides[activeTextTab] ?? content.caption)
    : content.caption;

  const currentLimit = isEditingSpecificPlatform
    ? PLATFORMS_CONFIG[activeTextTab].maxChars
    : selectedPlatforms.reduce((min, id) => {
      const limit = PLATFORMS_CONFIG[id].maxChars;
      return limit < min ? limit : min;
    }, 100000);

  const lowestPlatform = isEditingSpecificPlatform
    ? activeTextTab
    : selectedPlatforms.find((id) => PLATFORMS_CONFIG[id].maxChars === currentLimit);

  const currentLength = currentEditingText.length;
  const isOverLimit = currentLength > currentLimit && selectedPlatforms.length > 0;
  const charPercent = Math.min(100, Math.round((currentLength / (currentLimit || 1)) * 100));

  // Title & Media requirements
  const isTitleRequired = selectedPlatforms.some((id) => PLATFORMS_CONFIG[id].requiresTitle);
  const isMediaRequired = selectedPlatforms.some((id) => PLATFORMS_CONFIG[id].requiresMedia);
  const hasMedia = content.media.length > 0;
  const hasTitle = content.title.trim().length > 0;

  const handleTextChange = (newVal: string) => {
    if (isEditingSpecificPlatform) {
      onChange({
        platformOverrides: {
          ...content.platformOverrides,
          [activeTextTab]: newVal,
        },
      });
    } else {
      onChange({ caption: newVal });
    }
  };

  const handleResetOverride = (platformId: SocialPlatformId) => {
    const updated = { ...content.platformOverrides };
    delete updated[platformId];
    onChange({ platformOverrides: updated });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newMedia: MediaItem[] = Array.from(files).map((file, idx) => {
      const isVideo = file.type.startsWith('video');
      return {
        id: `upload-${Date.now()}-${idx}`,
        name: file.name,
        type: isVideo ? 'video' : 'image',
        url: URL.createObjectURL(file),
        size: file.size,
      };
    });

    onChange({ media: [...content.media, ...newMedia] });
  };

  const handleAddSampleMedia = (sample: typeof SAMPLE_MEDIAS[0]) => {
    if (content.media.some((m) => m.url === sample.url)) return;
    onChange({
      media: [
        ...content.media,
        {
          id: `sample-${Date.now()}`,
          name: sample.name,
          type: sample.type,
          url: sample.url,
        },
      ],
    });
  };

  const handleRemoveMedia = (id: string) => {
    onChange({ media: content.media.filter((m) => m.id !== id) });
  };

  const addHashtag = (tag: string) => {
    const space = currentEditingText.length > 0 && !currentEditingText.endsWith(' ') ? ' ' : '';
    handleTextChange(currentEditingText + space + tag);
  };

  const addEmoji = (emoji: string) => {
    handleTextChange(currentEditingText + ' ' + emoji);
  };

  const quickTags = ['#teknoloji', '#yazılım', '#pazarlama', '#omnipost', '#ai', '#growth', '#developer'];
  const quickEmojis = ['🚀', '✨', '🔥', '💡', '📈', '🎯', '📱', '⚡'];

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-sm card-interactive space-y-5 animate-fade-in relative overflow-hidden">
      {/* Top Pre-Flight Status Checklist Ticker */}
      <div className="p-3 rounded-2xl bg-gradient-to-r from-slate-50 via-blue-50/40 to-indigo-50/40 border border-slate-200/80 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center space-x-2 font-bold text-slate-800">
          <ShieldCheck className="w-4 h-4 text-blue-600" />
          <span>Paylaşım Öncesi Doğrulama:</span>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold">
          <span
            className={`px-2 py-0.5 rounded-lg flex items-center space-x-1 ${hasTitle || !isTitleRequired
                ? 'bg-emerald-100/70 text-emerald-800 border border-emerald-200'
                : 'bg-amber-100/70 text-amber-800 border border-amber-200'
              }`}
          >
            <Check className="w-3 h-3" />
            <span>Başlık {hasTitle ? 'Hazır' : isTitleRequired ? 'Gerekli' : 'Opsiyonel'}</span>
          </span>

          <span
            className={`px-2 py-0.5 rounded-lg flex items-center space-x-1 ${hasMedia
                ? 'bg-emerald-100/70 text-emerald-800 border border-emerald-200'
                : isMediaRequired
                  ? 'bg-rose-100/70 text-rose-800 border border-rose-200'
                  : 'bg-slate-100 text-slate-600'
              }`}
          >
            <Check className="w-3 h-3" />
            <span>{hasMedia ? `${content.media.length} Medya Eklendi` : 'Medya Yok'}</span>
          </span>

          <span
            className={`px-2 py-0.5 rounded-lg flex items-center space-x-1 ${!isOverLimit
                ? 'bg-emerald-100/70 text-emerald-800 border border-emerald-200'
                : 'bg-rose-100/70 text-rose-800 border border-rose-200 font-bold'
              }`}
          >
            <Check className="w-3 h-3" />
            <span>Karakter Limiti {isOverLimit ? 'Aşıldı!' : 'Uygun'}</span>
          </span>

          <span className="px-2 py-0.5 rounded-lg bg-blue-100/70 text-blue-800 border border-blue-200 flex items-center space-x-1">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-ping" />
            <span>{selectedPlatforms.length} Kanal Hazır</span>
          </span>
        </div>
      </div>

      {/* Title Input (Shown prominently if YouTube or Pinterest is selected) */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center space-x-1.5">
            <span>İçerik Başlığı</span>
            {isTitleRequired && (
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-red-100 text-red-700 font-semibold">
                YouTube & Pinterest için Zorunlu
              </span>
            )}
          </label>
          <span className="text-xs text-slate-400 font-mono">
            {content.title.length} / 100
          </span>
        </div>
        <input
          type="text"
          value={content.title}
          maxLength={100}
          onChange={(e) => onChange({ title: e.target.value })}
          placeholder="Örn: Yeni Nesil Çoklu Sosyal Medya Dağıtım Motoru Lansmanı 🚀"
          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-slate-50/50 hover:bg-white"
        />
      </div>

      {/* Platform-Specific Text Adaptation Tabs (Faz 3 Feature) */}
      <div>
        {/* AI Banner Shortcut */}
        <div className="mb-3 p-3 rounded-2xl bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 text-white flex items-center justify-between shadow-md shadow-indigo-500/15">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-amber-300 animate-spin-slow" />
            </div>
            <div>
              <div className="font-extrabold text-xs">Plexorin AI Kanca & Viral Hashtag Sihirbazı</div>
              <div className="text-[11px] text-indigo-100">5 kanca türü ve viral etiketlerle anında yüksek etkileşimli kopya üretin</div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsAiModalOpen(true)}
            className="px-3 py-1.5 rounded-xl bg-white text-indigo-700 hover:bg-indigo-50 font-extrabold text-xs shadow-sm transition-all flex items-center space-x-1.5"
          >
            <Wand2 className="w-3.5 h-3.5" />
            <span>AI Studio Aç</span>
          </button>
        </div>

        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-1.5">
            <Edit3 className="w-3.5 h-3.5 text-blue-600" />
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Açıklama & Platform Özelleştirme
            </span>
          </div>

          {/* Character counter & alert */}
          <div className="flex items-center space-x-2 text-xs">
            {isOverLimit && (
              <span className="text-red-600 font-bold flex items-center space-x-1 animate-pulse">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>{lowestPlatform ? PLATFORMS_CONFIG[lowestPlatform].shortName : ''} limitini aştınız!</span>
              </span>
            )}
            <span
              className={`font-mono px-2.5 py-0.5 rounded-lg text-xs font-semibold ${isOverLimit
                  ? 'bg-red-100 text-red-700 font-bold'
                  : charPercent > 85
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-slate-100 text-slate-600'
                }`}
            >
              {currentLength} / {currentLimit >= 10000 ? 'Limitsiz' : currentLimit}
            </span>
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="flex space-x-1.5 overflow-x-auto pb-2 mb-2.5 scrollbar-none">
          <button
            type="button"
            onClick={() => setActiveTextTab('common')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 flex items-center space-x-1.5 active:scale-95 ${activeTextTab === 'common'
                ? 'bg-blue-600 text-white shadow-xs scale-105'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Ortak Metin (Tümü)</span>
          </button>

          {selectedPlatforms.map((id) => {
            const p = PLATFORMS_CONFIG[id];
            const isTabActive = activeTextTab === id;
            const hasCustomText = !!content.platformOverrides[id];

            return (
              <button
                key={id}
                type="button"
                onClick={() => setActiveTextTab(id)}
                className={`relative px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 flex items-center space-x-1.5 active:scale-95 ${isTabActive
                    ? 'bg-slate-900 text-white shadow-xs scale-105'
                    : 'bg-slate-100/80 text-slate-600 hover:bg-slate-200'
                  }`}
              >
                <PlatformIcon platformId={id} size={13} />
                <span>{p.shortName}</span>
                {hasCustomText && (
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" title="Özel metin tanımlandı" />
                )}
              </button>
            );
          })}
        </div>

        {/* Context info for specific tab */}
        {isEditingSpecificPlatform && (
          <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-blue-50/80 border border-blue-200/70 text-[11px] text-blue-900 mb-2.5">
            <span>
              <strong>{PLATFORMS_CONFIG[activeTextTab].name}</strong> için özel metin düzenliyorsunuz. Diğer platformlar ortak metni kullanır.
            </span>
            {content.platformOverrides[activeTextTab] && (
              <button
                type="button"
                onClick={() => handleResetOverride(activeTextTab)}
                className="text-red-600 hover:underline font-bold ml-2"
              >
                Ortak Metne Dön
              </button>
            )}
          </div>
        )}

        {/* Textarea */}
        <div className="relative">
          <textarea
            rows={5}
            value={currentEditingText}
            onChange={(e) => handleTextChange(e.target.value)}
            placeholder={
              isEditingSpecificPlatform
                ? `${PLATFORMS_CONFIG[activeTextTab].name} için özel açıklama yazın...`
                : 'Tüm platformlarda aynı anda paylaşılacak mesajınızı, açıklamaları ve detayları buraya yazın...'
            }
            className={`w-full p-4 rounded-2xl border text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 transition-all resize-y leading-relaxed ${isOverLimit
                ? 'border-red-400 focus:ring-red-400/20 bg-red-50/20'
                : 'border-slate-200 focus:ring-blue-500/20 focus:border-blue-500 bg-white'
              }`}
          />
        </div>

        {/* Quick Hashtags & Quick Emoji Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 mt-2 pt-2 border-t border-slate-100">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] text-slate-400 flex items-center mr-1">
              <Hash className="w-3 h-3 mr-0.5" /> Etiketler:
            </span>
            {quickTags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => addHashtag(tag)}
                className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-600 font-medium transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-1">
            <span className="text-[11px] text-slate-400 mr-1 flex items-center">
              <Smile className="w-3 h-3 mr-0.5" /> Emoji:
            </span>
            {quickEmojis.map((emoji) => (
              <button
                key={emoji}
                type="button"
                onClick={() => addEmoji(emoji)}
                className="w-6 h-6 rounded-md hover:bg-slate-100 flex items-center justify-center text-xs transition-colors"
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Media Attachments & Gallery */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center space-x-1.5">
            <ImageIcon className="w-3.5 h-3.5 text-blue-600" />
            <span>Medya Dosyaları (Görsel & Video)</span>
            {isMediaRequired && !hasMedia && (
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 font-semibold">
                Instagram / TikTok / YouTube için Zorunlu
              </span>
            )}
          </label>

          <span className="text-xs text-slate-400 font-medium">
            {content.media.length} Dosya Eklendi
          </span>
        </div>

        {/* Drag/Drop & Upload Trigger Box */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          {/* File Upload (Gallery / Files) */}
          <div
            onClick={() => fileInputRef.current?.click()}
            className="sm:col-span-1 border-2 border-dashed border-slate-200 hover:border-blue-400 hover:bg-blue-50/30 rounded-2xl p-3.5 flex flex-col items-center justify-center cursor-pointer transition-all text-center group"
          >
            <div className="w-9 h-9 rounded-xl bg-slate-100 group-hover:bg-blue-100 flex items-center justify-center text-slate-500 group-hover:text-blue-600 mb-1.5 transition-colors">
              <Upload className="w-4.5 h-4.5" />
            </div>
            <span className="text-xs font-bold text-slate-800 group-hover:text-blue-600">
              Dosya Seç
            </span>
            <span className="text-[10px] text-slate-400 mt-0.5">Galeri & Masaüstü</span>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              multiple
              accept="image/*,video/*"
              className="hidden"
            />
          </div>

          {/* Mobile Direct Camera Capture */}
          <div
            onClick={() => cameraInputRef.current?.click()}
            className="sm:col-span-1 border-2 border-dashed border-purple-200 hover:border-purple-400 hover:bg-purple-50/30 bg-purple-50/10 rounded-2xl p-3.5 flex flex-col items-center justify-center cursor-pointer transition-all text-center group"
          >
            <div className="w-9 h-9 rounded-xl bg-purple-100 group-hover:bg-purple-200 flex items-center justify-center text-purple-600 mb-1.5 transition-colors">
              <Camera className="w-4.5 h-4.5" />
            </div>
            <span className="text-xs font-bold text-purple-900 group-hover:text-purple-700 flex items-center space-x-1">
              <span>Kamera ile Çek</span>
            </span>
            <span className="text-[10px] text-purple-500 mt-0.5">Mobil Anlık Çekim</span>
            <input
              type="file"
              ref={cameraInputRef}
              onChange={handleFileUpload}
              accept="image/*,video/*"
              capture="environment"
              className="hidden"
            />
          </div>

          {/* Quick Sample Media for instant test */}
          <div className="sm:col-span-2 border border-slate-200 rounded-2xl p-3 bg-slate-50/50 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-bold text-slate-700 flex items-center space-x-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Test Amaçlı Hazır Medyalar:</span>
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {SAMPLE_MEDIAS.map((sample) => (
                <button
                  key={sample.id}
                  type="button"
                  onClick={() => handleAddSampleMedia(sample)}
                  className="flex items-center space-x-1.5 p-1.5 rounded-xl border border-slate-200 bg-white hover:border-blue-400 hover:bg-blue-50/40 text-left transition-all text-xs"
                >
                  <span className="w-6 h-6 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 flex-shrink-0">
                    {sample.type === 'video' ? (
                      <Video className="w-3 h-3 text-red-500" />
                    ) : (
                      <ImageIcon className="w-3 h-3 text-blue-500" />
                    )}
                  </span>
                  <span className="truncate text-[11px] font-semibold text-slate-700">
                    {sample.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Selected Media Previews */}
        {content.media.length > 0 && (
          <div className="flex flex-wrap gap-2.5 mt-3 pt-3 border-t border-slate-100">
            {content.media.map((item) => (
              <div
                key={item.id}
                className="relative group w-20 h-20 rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 shadow-xs"
              >
                {item.type === 'video' ? (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-slate-800 text-white p-1">
                    <Video className="w-5 h-5 text-red-400 mb-1" />
                    <span className="text-[9px] truncate max-w-full text-center">{item.name}</span>
                  </div>
                ) : (
                  <img
                    src={item.url}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                )}
                <button
                  type="button"
                  onClick={() => handleRemoveMedia(item.id)}
                  className="absolute top-1 right-1 w-5 h-5 rounded-full bg-slate-900/80 hover:bg-red-600 text-white flex items-center justify-center opacity-80 group-hover:opacity-100 transition-all"
                  title="Kaldır"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Target Destination Link (Pinterest & Facebook) */}
      <div>
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center space-x-1.5 mb-1.5">
          <Link2 className="w-3.5 h-3.5 text-blue-600" />
          <span>Hedef Web Adresi (URL) - Opsiyonel</span>
        </label>
        <input
          type="url"
          value={content.destinationUrl || ''}
          onChange={(e) => onChange({ destinationUrl: e.target.value })}
          placeholder="https://siteniz.com/yazi-veya-urun-linki"
          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 placeholder-slate-400 bg-slate-50/50 hover:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
        />
      </div>

      {/* Actions Bar */}
      <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center space-x-2 text-xs text-slate-500 w-full sm:w-auto">
          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          <span className="font-semibold">OmniPublisher Motoru Hazır</span>
        </div>

        <div className="flex items-center space-x-2.5 w-full sm:w-auto justify-end">
          {/* Developer API Code Generator Button */}
          <button
            type="button"
            onClick={() => setIsApiCodeOpen(true)}
            className="flex-1 sm:flex-none px-3.5 py-2.5 rounded-xl border border-indigo-200 hover:border-indigo-300 bg-indigo-50/70 hover:bg-indigo-100/80 text-indigo-700 font-bold text-xs transition-all flex items-center justify-center space-x-1.5 group cursor-pointer shadow-2xs hover:shadow-xs"
            title="Geliştiriciler için bu paylaşımın cURL, Node.js, Python kodunu üret"
          >
            <Code className="w-4 h-4 text-indigo-600 group-hover:rotate-12 transition-transform" />
            <span>&lt;/&gt; API Kodu Gör</span>
          </button>

          {onSaveDraft && (
            <button
              type="button"
              onClick={onSaveDraft}
              className="flex-1 sm:flex-none px-3.5 py-2.5 rounded-xl border border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs transition-all flex items-center justify-center space-x-1.5 group cursor-pointer"
              title="Mevcut gönderiyi taslak olarak kaydet"
            >
              <FileText className="w-4 h-4 text-teal-600 group-hover:scale-110 transition-transform" />
              <span>Taslak Kaydet</span>
            </button>
          )}

          <button
            type="button"
            onClick={onOpenSchedule}
            className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs transition-all flex items-center justify-center space-x-1.5 group"
          >
            <Calendar className="w-4 h-4 text-slate-500 group-hover:text-blue-500 transition-colors" />
            <span>İçeriği Zamanla</span>
          </button>

          <button
            type="button"
            disabled={selectedPlatforms.length === 0 || isPublishing}
            onClick={onPublish}
            className={`btn-glow-primary flex-1 sm:flex-none px-6 py-2.5 rounded-xl font-bold text-xs text-white shadow-md transition-all flex items-center justify-center space-x-2 ${selectedPlatforms.length === 0 || isPublishing
                ? 'opacity-50 cursor-not-allowed shadow-none'
                : 'cursor-pointer'
              }`}
          >
            {isPublishing ? (
              <>
                <span className="spinner-ring !border-white/20 !border-t-white w-3.5 h-3.5" />
                <span>Yayınlanıyor...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Tümünde Paylaş ({selectedPlatforms.length} Platform)</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Plexorin AI Hook & Hashtag Studio Modal */}
      <AiStudioModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        onApplyToPost={(text) => handleTextChange(text)}
        currentCaption={currentEditingText}
      />

      {/* Developer API Code Generator Modal (cURL, Node.js, Python, PHP) */}
      <ApiCodeModal
        isOpen={isApiCodeOpen}
        onClose={() => setIsApiCodeOpen(false)}
        content={content}
        selectedPlatforms={selectedPlatforms}
      />
    </div>
  );
};
