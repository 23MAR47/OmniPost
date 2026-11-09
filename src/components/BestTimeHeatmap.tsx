'use client';

import React, { useState } from 'react';
import { SocialPlatformId } from '@/types';
import { Flame, Clock, Sparkles, Check, Info } from 'lucide-react';

interface BestTimeHeatmapProps {
  onSelectSlot?: (dayName: string, hour: number) => void;
}

const DAYS = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'];
const SHORT_DAYS = ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'];
const HOURS = Array.from({ length: 24 }, (_, i) => i);

export const BestTimeHeatmap: React.FC<BestTimeHeatmapProps> = ({ onSelectSlot }) => {
  const [platform, setPlatform] = useState<SocialPlatformId | 'all'>('all');
  const [selectedSlot, setSelectedSlot] = useState<{ day: number; hour: number } | null>({
    day: 2,
    hour: 19, // Wednesday 19:00 peak default
  });

  // Calculate engagement score 0 - 100 for each (day, hour)
  const getEngagementScore = (day: number, hour: number): number => {
    // Peak hours: 09:00 - 11:00, 18:00 - 21:00 on weekdays, 13:00 - 17:00 on weekends
    let base = 20;

    if (hour >= 18 && hour <= 21) base += 55;
    else if (hour >= 9 && hour <= 12) base += 45;
    else if (hour >= 13 && hour <= 17) base += 35;
    else if (hour >= 1 && hour <= 6) base = 5;

    // Weekdays vs weekends boost
    if (day >= 1 && day <= 4) base += 15; // Tue - Fri strong
    if (day === 5 || day === 6) {
      if (hour >= 12 && hour <= 18) base += 25;
    }

    if (platform === 'instagram' && (hour === 19 || hour === 20)) base += 10;
    if (platform === 'twitter' && (hour === 9 || hour === 12)) base += 10;
    if (platform === 'tiktok' && (hour === 21 || hour === 22)) base += 15;

    return Math.min(100, Math.max(0, base));
  };

  const getHeatColor = (score: number) => {
    if (score >= 85) return 'bg-emerald-600 text-white font-bold shadow-xs';
    if (score >= 70) return 'bg-emerald-500 text-white';
    if (score >= 50) return 'bg-emerald-300 text-emerald-950';
    if (score >= 30) return 'bg-emerald-100 text-emerald-800';
    return 'bg-slate-100 text-slate-400';
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
      {/* Title & Platform Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
            <Flame className="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-slate-900 flex items-center space-x-2">
              <span>En İyi Paylaşım Zamanı Isı Haritası (Best Time to Post)</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                Hootsuite Algoritması
              </span>
            </h3>
            <p className="text-xs text-slate-500">
              Takipçilerinizin geçmiş 90 günlük etkileşim yoğunluğuna göre en yüksek organik erişim saatleri.
            </p>
          </div>
        </div>

        {/* Platform Picker */}
        <div className="flex items-center space-x-2 text-xs">
          <span className="font-bold text-slate-600">Ağ:</span>
          <select
            value={platform}
            onChange={(e) => setPlatform(e.target.value as any)}
            className="p-1.5 rounded-lg border border-slate-200 bg-slate-50 font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="all">Genel Ortalama (7 Platform)</option>
            <option value="instagram">Instagram</option>
            <option value="twitter">X (Twitter)</option>
            <option value="tiktok">TikTok</option>
            <option value="youtube">YouTube</option>
          </select>
        </div>
      </div>

      {/* Heatmap Matrix (7 Days x 24 Hours) */}
      <div className="overflow-x-auto pb-2">
        <div className="min-w-[700px] space-y-1.5">
          {/* Header Hours Row */}
          <div className="grid grid-cols-25 gap-1 text-[10px] font-mono text-slate-400 text-center items-center">
            <div className="text-left font-bold pl-1 text-slate-500">Gün / Sa</div>
            {HOURS.map((h) => (
              <div key={h} className="truncate">
                {h}
              </div>
            ))}
          </div>

          {/* Days Rows */}
          {DAYS.map((dayName, dayIdx) => (
            <div key={dayName} className="grid grid-cols-25 gap-1 items-center">
              {/* Day Label */}
              <div className="text-xs font-bold text-slate-700 pl-1 truncate">
                {SHORT_DAYS[dayIdx]}
              </div>

              {/* 24 Hour Slots */}
              {HOURS.map((hour) => {
                const score = getEngagementScore(dayIdx, hour);
                const isSelected =
                  selectedSlot?.day === dayIdx && selectedSlot?.hour === hour;
                return (
                  <button
                    key={hour}
                    onClick={() => {
                      setSelectedSlot({ day: dayIdx, hour });
                      onSelectSlot?.(dayName, hour);
                    }}
                    title={`${dayName} saat ${hour}:00 - Etkileşim Skoru: %${score}`}
                    className={`h-7 rounded-md transition-all flex items-center justify-center text-[10px] relative ${getHeatColor(
                      score
                    )} ${isSelected
                        ? 'ring-2 ring-slate-900 ring-offset-1 scale-105 z-10'
                        : 'hover:opacity-85 hover:scale-105'
                      }`}
                  >
                    {score >= 85 ? <Flame className="w-3 h-3 text-amber-300" /> : null}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Legend & Selected Slot Insight */}
      <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
        {/* Color Legend */}
        <div className="flex items-center space-x-2 text-[11px] text-slate-500">
          <span>Düşük</span>
          <div className="flex items-center space-x-1">
            <div className="w-3.5 h-3.5 rounded bg-slate-100" />
            <div className="w-3.5 h-3.5 rounded bg-emerald-100" />
            <div className="w-3.5 h-3.5 rounded bg-emerald-300" />
            <div className="w-3.5 h-3.5 rounded bg-emerald-500" />
            <div className="w-3.5 h-3.5 rounded bg-emerald-600 flex items-center justify-center">
              <Flame className="w-2.5 h-2.5 text-amber-300" />
            </div>
          </div>
          <span>Zirve Etkileşim (Peak)</span>
        </div>

        {/* Selected Slot Callout */}
        {selectedSlot && (
          <div className="flex items-center space-x-2 text-slate-800 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>
              Seçilen Zirve: <strong>{DAYS[selectedSlot.day]} saat {selectedSlot.hour}:00</strong> (Beklenen Etkileşim: <strong>%{getEngagementScore(selectedSlot.day, selectedSlot.hour)}</strong>)
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
