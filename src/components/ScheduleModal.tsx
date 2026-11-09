'use client';

import React, { useState } from 'react';
import { PostContent, SocialPlatformId } from '@/types';
import { PLATFORMS_CONFIG } from '@/lib/constants';
import { PlatformIcon } from '@/components/PlatformIcon';
import {
  Calendar as CalendarIcon,
  Clock,
  X,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Share2,
  Layers,
} from 'lucide-react';

interface ScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: PostContent;
  selectedPlatforms: SocialPlatformId[];
  onScheduledSuccess?: () => void;
}

export const ScheduleModal: React.FC<ScheduleModalProps> = ({
  isOpen,
  onClose,
  content,
  selectedPlatforms,
  onScheduledSuccess,
}) => {
  // Default to tomorrow 10:00 AM
  const getTomorrowDate = () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  };

  const [scheduleDate, setScheduleDate] = useState(getTomorrowDate());
  const [scheduleTime, setScheduleTime] = useState('10:00');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  // Preset quick selectors
  const applyPreset = (preset: 'tomorrow_morning' | 'friday_evening' | 'next_monday' | 'two_hours') => {
    const now = new Date();
    if (preset === 'tomorrow_morning') {
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);
      setScheduleDate(tomorrow.toISOString().split('T')[0]);
      setScheduleTime('10:00');
    } else if (preset === 'friday_evening') {
      const friday = new Date(now);
      const dayOfWeek = friday.getDay();
      const diff = (5 - dayOfWeek + 7) % 7 || 7;
      friday.setDate(friday.getDate() + diff);
      setScheduleDate(friday.toISOString().split('T')[0]);
      setScheduleTime('18:30');
    } else if (preset === 'next_monday') {
      const monday = new Date(now);
      const dayOfWeek = monday.getDay();
      const diff = (1 - dayOfWeek + 7) % 7 || 7;
      monday.setDate(monday.getDate() + diff);
      setScheduleDate(monday.toISOString().split('T')[0]);
      setScheduleTime('09:00');
    } else if (preset === 'two_hours') {
      const future = new Date(now.getTime() + 2 * 60 * 60 * 1000);
      setScheduleDate(future.toISOString().split('T')[0]);
      const hours = String(future.getHours()).padStart(2, '0');
      const mins = String(future.getMinutes()).padStart(2, '0');
      setScheduleTime(`${hours}:${mins}`);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (selectedPlatforms.length === 0) {
      setErrorMsg('En az bir hedef platform seçmelisiniz.');
      return;
    }

    if (!scheduleDate || !scheduleTime) {
      setErrorMsg('Lütfen geçerli bir tarih ve saat seçin.');
      return;
    }

    const scheduledDateTime = new Date(`${scheduleDate}T${scheduleTime}:00`);
    if (isNaN(scheduledDateTime.getTime())) {
      setErrorMsg('Geçersiz tarih formatı.');
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await fetch('/api/schedule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: content.title || 'Başlıksız Gönderi',
          caption: content.caption,
          media: content.media,
          platforms: selectedPlatforms,
          destinationUrl: content.destinationUrl,
          platformOverrides: content.platformOverrides,
          scheduledFor: scheduledDateTime.toISOString(),
        }),
      });

      const data = await res.json();
      if (data.success) {
        onClose();
        if (onScheduledSuccess) onScheduledSuccess();
      } else {
        setErrorMsg(data.error || 'Zamanlama başarısız oldu.');
      }
    } catch (err: any) {
      setErrorMsg('Ağ hatası: ' + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const minDate = new Date().toISOString().split('T')[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full border border-slate-200 shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 bg-slate-50/80 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-2xl bg-blue-100 text-blue-700">
              <CalendarIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900">
                Sosyal Medya Gönderisi Zamanlama
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Kuyruk sistemi belirlediğiniz saatte içeriği otomatik yayınlar
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Post Summary Snippet */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Zamanlanacak İçerik Özeti
            </span>
            <div className="text-xs font-bold text-slate-800 truncate">
              {content.title || 'Başlıksız Gönderi'}
            </div>
            <div className="text-[11px] text-slate-600 line-clamp-2">
              {content.caption || 'Açıklama girilmedi.'}
            </div>

            <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between">
              <div className="flex items-center space-x-1.5">
                <span className="text-[11px] text-slate-500">Hedef:</span>
                <div className="flex items-center -space-x-1">
                  {selectedPlatforms.map((id) => (
                    <div
                      key={id}
                      className="w-6 h-6 rounded-full bg-white border border-slate-200 flex items-center justify-center shadow-2xs"
                      title={PLATFORMS_CONFIG[id]?.name || id}
                    >
                      <PlatformIcon platformId={id} size={13} />
                    </div>
                  ))}
                </div>
                <span className="text-[11px] font-bold text-slate-700 ml-1">
                  ({selectedPlatforms.length} Platform)
                </span>
              </div>
              {content.media.length > 0 && (
                <span className="text-[11px] text-blue-600 font-semibold">
                  {content.media.length} Medya Ekli
                </span>
              )}
            </div>
          </div>

          {/* Quick Presets */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 block">
              Hızlı Zamanlama Ön Ayarları:
            </label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => applyPreset('tomorrow_morning')}
                className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-blue-50 hover:border-blue-300 text-slate-700 text-left transition-all"
              >
                <span className="font-bold block text-[11px]">Yarın Sabah</span>
                <span className="text-[10px] text-slate-400">10:00 (Yüksek Etkileşim)</span>
              </button>
              <button
                type="button"
                onClick={() => applyPreset('friday_evening')}
                className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-blue-50 hover:border-blue-300 text-slate-700 text-left transition-all"
              >
                <span className="font-bold block text-[11px]">Bu Cuma Akşamı</span>
                <span className="text-[10px] text-slate-400">18:30 (Hafta Sonu Öncesi)</span>
              </button>
              <button
                type="button"
                onClick={() => applyPreset('next_monday')}
                className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-blue-50 hover:border-blue-300 text-slate-700 text-left transition-all"
              >
                <span className="font-bold block text-[11px]">Gelecek Pazartesi</span>
                <span className="text-[10px] text-slate-400">09:00 (Haftalık Başlangıç)</span>
              </button>
              <button
                type="button"
                onClick={() => applyPreset('two_hours')}
                className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-blue-50 hover:border-blue-300 text-slate-700 text-left transition-all"
              >
                <span className="font-bold block text-[11px]">2 Saat Sonra</span>
                <span className="text-[10px] text-slate-400">Kısa vadeli planlama</span>
              </button>
            </div>
          </div>

          {/* Date & Time Input */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 flex items-center space-x-1">
                <CalendarIcon className="w-3.5 h-3.5 text-blue-600" />
                <span>Yayınlanma Tarihi</span>
              </label>
              <input
                type="date"
                min={minDate}
                value={scheduleDate}
                onChange={(e) => setScheduleDate(e.target.value)}
                required
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-medium text-slate-800"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 flex items-center space-x-1">
                <Clock className="w-3.5 h-3.5 text-blue-600" />
                <span>Yayınlanma Saati</span>
              </label>
              <input
                type="time"
                value={scheduleTime}
                onChange={(e) => setScheduleTime(e.target.value)}
                required
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-medium text-slate-800"
              />
            </div>
          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
            >
              Vazgeç
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 disabled:opacity-50 transition-all flex items-center space-x-2 shadow-xs"
            >
              <Clock className="w-3.5 h-3.5" />
              <span>{isSubmitting ? 'Kuyruğa Ekleniyor...' : 'Kuyruğa Ekle & Zamanla'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
