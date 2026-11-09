'use client';

import React from 'react';
import Link from 'next/link';
import { Send, Shield, FileText, Cookie, Heart, Sparkles, ExternalLink, MessageSquare } from 'lucide-react';
import { OmniPostLogo } from './OmniPostLogo';

interface FooterProps {
  onOpenContact?: () => void;
  onSelectTab?: (tabId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenContact, onSelectTab }) => {
  return (
    <footer className="bg-white border-t border-slate-200 mt-12 text-slate-600 text-xs">
      {/* CTA Conversion Banner */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left space-y-2">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[11px] font-bold">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Çoklu Sosyal Medya Gücü</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black tracking-tight">
              Sosyal Medya Dağıtımınızı Otomatize Etmeye Hazır mısınız?
            </h3>
            <p className="text-xs sm:text-sm text-blue-100 max-w-xl">
              YouTube, X, Instagram, Facebook, TikTok, Pinterest ve Threads hesaplarınızı tek tıkla senkronize edin.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => onSelectTab && onSelectTab('studio')}
              className="px-5 py-2.5 rounded-xl bg-white text-blue-700 hover:bg-blue-50 font-bold text-xs shadow-md transition-all flex items-center space-x-2"
            >
              <Send className="w-4 h-4 transform -rotate-12" />
              <span>Gönderi Stüdyosunu Aç</span>
            </button>
            <button
              onClick={onOpenContact}
              className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-all flex items-center space-x-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Bize Ulaşın / Destek</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Brand Info */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center space-x-2.5">
              <OmniPostLogo size={32} animated />
              <div className="flex items-center space-x-1.5">
                <span className="font-extrabold text-base text-slate-900 tracking-tight">
                  Omni<span className="text-blue-600">Post</span>
                </span>
                <span className="px-1.5 py-0.5 rounded text-[8px] font-black uppercase tracking-wider bg-blue-50 text-blue-600 border border-blue-200/50 leading-none">
                  PRO
                </span>
              </div>
            </div>
            <p className="text-slate-500 text-[11px] leading-relaxed">
              İçerik üreticileri, sosyal medya yöneticileri ve ajanslar için geliştirilmiş çoklu yayınlama ve otomasyon stüdyosu.
            </p>
            <div className="flex items-center space-x-2 text-[11px] text-emerald-700 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Tüm Dağıtım Motorları Aktif</span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="font-bold text-slate-900 mb-3 text-xs tracking-wider uppercase">Platform</h4>
            <ul className="space-y-2 text-slate-500">
              <li>
                <button onClick={() => onSelectTab && onSelectTab('studio')} className="hover:text-blue-600 transition-colors">
                  Gönderi Stüdyosu
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab && onSelectTab('accounts')} className="hover:text-blue-600 transition-colors">
                  Token Kasası (Vault)
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab && onSelectTab('schedule')} className="hover:text-blue-600 transition-colors">
                  Zamanlama & Takvim
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab && onSelectTab('analytics')} className="hover:text-blue-600 transition-colors">
                  Analitik & Raporlama
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Legal & Security */}
          <div>
            <h4 className="font-bold text-slate-900 mb-3 text-xs tracking-wider uppercase">Yasal & Güvenlik</h4>
            <ul className="space-y-2 text-slate-500">
              <li>
                <Link href="/privacy" className="hover:text-blue-600 transition-colors flex items-center space-x-1.5">
                  <Shield className="w-3.5 h-3.5 text-blue-500" />
                  <span>Gizlilik Politikası (KVKK/GDPR)</span>
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-blue-600 transition-colors flex items-center space-x-1.5">
                  <FileText className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Kullanım Şartları</span>
                </Link>
              </li>
              <li>
                <Link href="/sitemap.xml" className="hover:text-blue-600 transition-colors">
                  Site Haritası (Sitemap.xml)
                </Link>
              </li>
              <li>
                <Link href="/llms.txt" className="hover:text-blue-600 transition-colors">
                  LLM & AI İndeksi (llms.txt)
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Support & Enterprise */}
          <div>
            <h4 className="font-bold text-slate-900 mb-3 text-xs tracking-wider uppercase">Kurumsal & Destek</h4>
            <ul className="space-y-2 text-slate-500">
              <li>
                <button onClick={onOpenContact} className="hover:text-blue-600 transition-colors">
                  Canlı Destek & İletişim
                </button>
              </li>
              <li>
                <span className="text-[11px] text-slate-400 block">OmniPost Enterprise • v4.2 Pro</span>
              </li>
              <li>
                <span className="text-[11px] text-slate-400 block">AES-256 Şifreleme Standardı</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-2">
          <div>
            © {new Date().getFullYear()} OmniPost. Tüm hakları saklıdır.
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/privacy" className="hover:underline">Gizlilik</Link>
            <span>•</span>
            <Link href="/terms" className="hover:underline">Koşullar</Link>
            <span>•</span>
            <Link href="/robots.txt" className="hover:underline">Robots.txt</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
