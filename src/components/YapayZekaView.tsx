'use client';

import React, { useState } from 'react';
import { Sparkles, Wand2, Copy, Check, ArrowRight, RefreshCw, Hash, MessageSquare } from 'lucide-react';

interface YapayZekaViewProps {
  onApplyToComposer: (text: string) => void;
}

export const YapayZekaView: React.FC<YapayZekaViewProps> = ({ onApplyToComposer }) => {
  const [prompt, setPrompt] = useState('2026 sosyal medya pazarlama stratejileri ve çoklu kanal dağıtımının önemi');
  const [tone, setTone] = useState('Etkileyici & Profesyonel');
  const [generating, setGenerating] = useState(false);
  const [generatedText, setGeneratedText] = useState(
    '🚀 Çoklu platform stratejisiyle markanızı 2026 zirvesine taşıyın! Tek bir stüdyodan YouTube, X, Instagram, LinkedIn ve TikTok akışlarınızı eş zamanlı yöneterek organik erişiminizi %400 artırın. OmniPost ile zaman kazanın, içeriğe odaklanın! ✨\n\n#sosyalmedya #dijitalpazarlama #yapayzeka #growth #omnipost'
  );
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      setGeneratedText(
        `🌟 ${prompt} hakkında yeni nesil içerik hazır!\n\nMarkalar için dijital dünyada fark yaratmanın sırrı tutarlı ve dinamik varlık göstermektir. OmniPost yapay zeka asistanı ile hazırlanan bu kampanya, hedef kitlenizle doğrudan bağ kuracak şekilde tasarlandı.\n\n#trend #dijitaldönüşüm #${prompt.slice(0, 10).replace(/\s+/g, '')} #omnipost #pazarlama`
      );
    }, 700);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-6 space-y-6 animate-fade-in text-slate-800">
      {/* Top Header */}
      <div className="pb-4 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-900">Yapay Zeka İçerik Stüdyosu</h1>
            <p className="text-xs text-slate-400">GPT-4o & Claude 3.5 Sonnet destekli Türkçe sosyal medya metin motoru</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Prompt & Settings */}
        <div className="lg:col-span-5 space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">İçerik Konusu veya Fikri</label>
            <textarea
              rows={4}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Örn: Hafta sonu %20 indirim kampanyası, yeni ürün lansmanı..."
              className="w-full p-3 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Hitap & İletişim Tonu</label>
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 text-xs text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>Etkileyici & Profesyonel</option>
              <option>Samimi & Dinamik</option>
              <option>Esprili & Viral</option>
              <option>B2B Kurumsal</option>
              <option>E-Ticaret & İndirim Odaklı</option>
            </select>
          </div>

          <button
            onClick={handleGenerate}
            disabled={generating}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-xs shadow-md shadow-orange-500/20 active:scale-[0.99] transition-all flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-70"
          >
            {generating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Yapay Zeka Yazıyor...</span>
              </>
            ) : (
              <>
                <Wand2 className="w-4 h-4" />
                <span>İçerik & Hashtag Üret</span>
              </>
            )}
          </button>
        </div>

        {/* Right: Output & Composer Export */}
        <div className="lg:col-span-7 bg-[#f8fafc] rounded-2xl border border-slate-200/90 p-5 space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 flex items-center space-x-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-blue-600" />
                <span>Üretilen Gönderi Metni</span>
              </span>
              <button
                onClick={handleCopy}
                className="text-xs text-slate-500 hover:text-slate-800 flex items-center space-x-1 cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Kopyalandı' : 'Kopyala'}</span>
              </button>
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 whitespace-pre-wrap leading-relaxed min-h-[160px] shadow-2xs font-sans">
              {generatedText}
            </div>
          </div>

          <div className="pt-2 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-[11px] text-slate-400">
              Bu metni doğrudan Gönderi Stüdyosu editörüne aktarabilirsiniz.
            </span>
            <button
              onClick={() => onApplyToComposer(generatedText)}
              className="w-full sm:w-auto py-2.5 px-5 rounded-full bg-[#1864e4] hover:bg-[#1351be] text-white font-bold text-xs tracking-wide shadow-xs transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
            >
              <span>Gönderi Stüdyosuna Aktar</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
