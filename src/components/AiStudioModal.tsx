'use client';

import React, { useState } from 'react';
import { AiCopyService, AiGenerationResult } from '@/lib/aiCopyService';
import {
  Sparkles,
  X,
  Wand2,
  Copy,
  Check,
  Hash,
  ArrowRight,
  Flame,
  HelpCircle,
  AlertCircle,
  Lightbulb,
} from 'lucide-react';

interface AiStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyToPost: (fullText: string) => void;
  currentCaption?: string;
}

export const AiStudioModal: React.FC<AiStudioModalProps> = ({
  isOpen,
  onClose,
  onApplyToPost,
  currentCaption = '',
}) => {
  const [topic, setTopic] = useState('Yapay Zeka Destekli Sosyal Medya Yönetimi');
  const [niche, setNiche] = useState<any>('tech');
  const [tone, setTone] = useState<any>('hype');
  const [hookType, setHookType] = useState<any>('bold_claim');
  const [result, setResult] = useState<AiGenerationResult | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  if (!isOpen) return null;

  const handleGenerate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const generated = AiCopyService.generateContent({
      topic,
      niche,
      tone,
      hookType,
    });
    setResult(generated);
  };

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(result.fullCaption);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleApply = () => {
    if (!result) return;
    onApplyToPost(result.fullCaption);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-3xl w-full p-6 sm:p-7 space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 text-white flex items-center justify-center shadow-md">
              <Sparkles className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
                <span>AI Viral Kanca & Hashtag Stüdyosu</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-violet-100 text-violet-800">
                  Plexorin Engine
                </span>
              </h2>
              <p className="text-xs text-slate-500">
                İlk 3 saniye kancası (Hook), akıcı gövde metni ve 15 viral hashtag ile erişiminizi katlayın.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Input Parameters Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          {/* Topic */}
          <div className="sm:col-span-2">
            <label className="font-bold text-slate-800 block mb-1">
              İçerik Konusu / Ana Fikir
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Örn: 2026 sosyal medya pazarlama trendleri ve yeni nesil AI araçları..."
              className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
            />
          </div>

          {/* Niche */}
          <div>
            <label className="font-bold text-slate-800 block mb-1">Sektör / Niş</label>
            <select
              value={niche}
              onChange={(e) => setNiche(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 bg-white font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="tech">💻 Teknoloji & Yazılım</option>
              <option value="ecommerce">🛍️ E-Ticaret & Satış</option>
              <option value="marketing">📈 Pazarlama & Ajans</option>
              <option value="lifestyle">✨ Yaşam Tarzı & İlham</option>
              <option value="fitness">💪 Spor & Sağlıklı Yaşam</option>
              <option value="finance">💰 Finans & Yatırım</option>
            </select>
          </div>

          {/* Tone */}
          <div>
            <label className="font-bold text-slate-800 block mb-1">İletişim Tonu</label>
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 bg-white font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="hype">🔥 Heyecanlı & Yüksek Enerji (Hype)</option>
              <option value="professional">👔 Profesyonel & Kurumsal</option>
              <option value="educational">💡 Eğitici & Rehber (3 Adımda)</option>
              <option value="storytelling">📖 Hikaye Anlatımı (Vaka)</option>
              <option value="humorous">😄 Esprili & Mizahi</option>
            </select>
          </div>

          {/* Hook Type */}
          <div className="sm:col-span-2">
            <label className="font-bold text-slate-800 block mb-1">Kanca (Hook) Türü</label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {[
                { id: 'bold_claim', label: '⚡ İddialı Önerme' },
                { id: 'question', label: '❓ Soru Kancası' },
                { id: 'mistake', label: '🛑 Yaygın Hata' },
                { id: 'statistic', label: '📊 İstatistik' },
                { id: 'curiosity', label: '🤫 Merak Uyandırma' },
              ].map((h) => (
                <button
                  key={h.id}
                  type="button"
                  onClick={() => setHookType(h.id)}
                  className={`p-2 rounded-xl border text-[11px] font-bold transition-all text-center ${hookType === h.id
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                      : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200'
                    }`}
                >
                  {h.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Generate Button */}
        <div>
          <button
            onClick={() => handleGenerate()}
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 hover:opacity-95 text-white font-bold text-xs flex items-center justify-center space-x-2 shadow-md transition-all"
          >
            <Wand2 className="w-4 h-4 text-amber-300" />
            <span>Kancayı, Gövdeyi ve 15 Hashtag&apos;i Oluştur</span>
          </button>
        </div>

        {/* Generated Result Container */}
        {result && (
          <div className="space-y-4 pt-3 border-t border-slate-100">
            {/* Hook Block */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-violet-50 to-indigo-50 border border-indigo-100 space-y-2">
              <span className="text-[10px] font-bold text-indigo-700 uppercase tracking-wider block">
                🎯 Kazanan Açılış Kancası (Hook):
              </span>
              <p className="font-bold text-sm text-slate-900 leading-snug">{result.hook}</p>

              {result.alternativeHooks.length > 0 && (
                <div className="pt-2 border-t border-indigo-100/60 text-[11px] text-slate-600 space-y-1">
                  <span className="font-medium text-slate-400 block">Alternatif Kancalar:</span>
                  {result.alternativeHooks.map((alt, i) => (
                    <div
                      key={i}
                      onClick={() =>
                        setResult((prev) =>
                          prev
                            ? {
                              ...prev,
                              hook: alt,
                              fullCaption: `${alt}\n\n${prev.body}\n\n${prev.cta}\n\n${prev.hashtags.slice(0, 8).join(' ')}`,
                            }
                            : null
                        )
                      }
                      className="cursor-pointer hover:text-indigo-600 hover:underline flex items-center space-x-1"
                    >
                      <span>• {alt}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Full Preview Textarea */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-700">Üretilen Gönderi Taslağı:</span>
                <button
                  onClick={handleCopy}
                  className="text-indigo-600 hover:text-indigo-700 font-bold flex items-center space-x-1"
                >
                  {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{isCopied ? 'Kopyalandı!' : 'Kopyala'}</span>
                </button>
              </div>

              <textarea
                value={result.fullCaption}
                onChange={(e) =>
                  setResult((prev) =>
                    prev ? { ...prev, fullCaption: e.target.value } : null
                  )
                }
                rows={7}
                className="w-full p-3.5 rounded-2xl border border-slate-200 text-xs text-slate-800 leading-relaxed font-normal bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* 15 Viral Hashtags Cloud */}
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-slate-700 flex items-center space-x-1">
                <Hash className="w-3.5 h-3.5 text-indigo-500" />
                <span>15 Viral Hashtag Havuzu:</span>
              </span>
              <div className="flex flex-wrap gap-1.5">
                {result.hashtags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 rounded-lg bg-indigo-50 text-indigo-700 text-[11px] font-mono border border-indigo-100"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Footer Action Buttons */}
            <div className="pt-2 flex items-center justify-end space-x-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-bold text-xs"
              >
                Kapat
              </button>
              <button
                type="button"
                onClick={handleApply}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:opacity-95 text-white font-bold text-xs flex items-center space-x-2 shadow-md"
              >
                <span>Editöre Aktar & Uygula</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
