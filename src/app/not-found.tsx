import React from 'react';
import Link from 'next/link';
import { Send, ArrowLeft, Home, HelpCircle, Sparkles, AlertTriangle } from 'lucide-react';
import { OmniPostLogo } from '@/components/OmniPostLogo';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 - Sayfa Bulunamadı | OmniPost',
  description: 'Aradığınız sayfa mevcut değil veya taşınmış olabilir.',
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col justify-between selection:bg-blue-500 selection:text-white">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/90 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2.5 group">
            <OmniPostLogo size={34} animated />
            <div className="flex items-center space-x-1.5">
              <span className="font-extrabold text-base text-slate-900 tracking-tight">
                Omni<span className="text-blue-600">Post</span>
              </span>
              <span className="px-1.5 py-0.5 rounded text-[8px] font-black uppercase tracking-wider bg-blue-50 text-blue-600 border border-blue-200/50 leading-none">
                PRO
              </span>
            </div>
          </Link>

          <Link
            href="/"
            className="text-xs font-semibold text-slate-600 hover:text-blue-600 flex items-center space-x-1.5"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Stüdyo&apos;ya Dön</span>
          </Link>
        </div>
      </header>

      {/* Main 404 Body */}
      <main className="flex-1 max-w-xl mx-auto px-4 py-16 flex flex-col items-center justify-center text-center">
        {/* Glow Number */}
        <div className="relative mb-6">
          <div className="text-8xl sm:text-9xl font-black text-slate-200 select-none tracking-tighter">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-xl shadow-blue-500/30">
              <AlertTriangle className="w-8 h-8 text-amber-300" />
            </div>
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-3">
          Aradığınız Sayfa Bulunamadı
        </h1>

        <p className="text-xs sm:text-sm text-slate-600 max-w-md leading-relaxed mb-8">
          Ulaşmaya çalıştığınız sayfa kaldırılmış, adı değiştirilmiş veya geçici olarak kullanım dışı kalmış olabilir. Sosyal medya içeriklerinizi yönetmek için ana stüdyomuza dönebilirsiniz.
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-all flex items-center space-x-2"
          >
            <Home className="w-4 h-4" />
            <span>Ana Sayfaya Dön</span>
          </Link>

          <Link
            href="/privacy"
            className="px-5 py-2.5 rounded-xl bg-white border border-slate-200 hover:border-slate-300 text-slate-700 font-bold text-xs shadow-sm transition-all"
          >
            Gizlilik Politikası
          </Link>
        </div>
      </main>

      {/* Footer minimal */}
      <footer className="py-6 border-t border-slate-200 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} OmniPost Multi-Platform Publishing Studio.
      </footer>
    </div>
  );
}
