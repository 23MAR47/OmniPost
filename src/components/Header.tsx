'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  Menu,
  Sparkles,
  ChevronDown,
  Check,
  Search,
  Bell,
  Radio,
  Zap,
  Globe,
} from 'lucide-react';
import { OmniPostLogo } from './OmniPostLogo';
import { NotificationsCenter } from './NotificationsCenter';

interface HeaderProps {
  onToggleSidebar?: () => void;
  activeCount?: number;
  totalPlatforms?: number;
  onOpenContact?: () => void;
  onOpenShowcase?: () => void;
  onSelectTab?: (tab: string) => void;
  onOpenCommandPalette?: () => void;
  onOpenTarife?: () => void;
  tariffExpiry?: string;
  onOpenLanding?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onToggleSidebar,
  activeCount = 7,
  totalPlatforms = 7,
  onOpenContact,
  onOpenShowcase,
  onSelectTab,
  onOpenCommandPalette,
  onOpenTarife,
  tariffExpiry = '09-11-2026',
  onOpenLanding,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [logoHovered, setLogoHovered] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 4);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close notifications if clicked outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setIsNotifOpen(false);
      }
    };
    if (isNotifOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isNotifOpen]);

  return (
    <header
      className={`sticky top-0 z-30 transition-all duration-300 ${scrolled
        ? 'bg-white/95 backdrop-blur-xl border-b border-slate-200/90 shadow-sm shadow-slate-900/5'
        : 'bg-white/90 backdrop-blur-md border-b border-slate-200'
        }`}
    >
      {/* Top progress accent line */}
      <div className="h-0.5 bg-gradient-to-r from-blue-600 via-indigo-500 to-violet-500 animate-gradient" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 py-2">
          {/* Left: Brand & Mobile Trigger */}
          <div className="flex items-center space-x-3">
            <button
              onClick={onToggleSidebar}
              className="md:hidden icon-btn p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 focus:outline-none focus-ring"
              aria-label="Menüyü Aç"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div
              className="flex items-center space-x-3 cursor-pointer group"
              onMouseEnter={() => setLogoHovered(true)}
              onMouseLeave={() => setLogoHovered(false)}
              onClick={() => onSelectTab?.('studio')}
            >
              <div
                className={`transition-all duration-300 ${logoHovered ? 'scale-105 -rotate-3' : 'scale-100 rotate-0'
                  }`}
              >
                <OmniPostLogo size={38} animated />
              </div>
              <div className="animate-fade-in">
                <div className="flex items-center space-x-1.5">
                  <span className="font-extrabold text-lg text-slate-900 tracking-tight block leading-tight">
                    Omni<span className="text-blue-600">Post</span>
                  </span>
                  <span className="px-1.5 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xs leading-none">
                    PRO
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 hidden sm:block font-medium">
                  Çoklu Sosyal Medya Paylaşım & Yönetim Stüdyosu
                </p>
              </div>
            </div>
          </div>

          {/* Middle: Quick Search & Workspace Selector */}
          <div className="flex items-center space-x-2.5">
            {/* Command Palette Trigger (Cmd+K) */}
            <button
              onClick={onOpenCommandPalette}
              className="hidden sm:flex items-center space-x-2 px-3 py-1.5 rounded-xl border border-slate-200/90 bg-slate-50/80 hover:bg-slate-100 text-xs text-slate-500 transition-all hover:border-slate-300 group"
            >
              <Search className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 transition-colors" />
              <span className="font-medium text-slate-600">Hızlı Arama & Komutlar</span>
              <span className="kbd-shortcut">⌘K</span>
            </button>
          </div>

          {/* Right: Tariff status, Tariff renew button, User avatar & controls matching user screenshots */}
          <div className="flex items-center space-x-3 animate-fade-in stagger-2">
            {/* Tarife Bitişi (from screenshots) */}
            <span className="hidden sm:inline-block text-xs text-slate-500 font-medium">
              Tarife Bitişi: <strong className="text-slate-800 font-bold">{tariffExpiry}</strong>
            </span>

            {/* Giriş & Tanıtım Sayfası Button */}
            {onOpenLanding && (
              <button
                type="button"
                onClick={onOpenLanding}
                className="hidden sm:flex items-center space-x-1.5 py-1.5 px-3.5 rounded-xl border border-slate-200/90 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs transition-all hover:border-slate-300 shadow-2xs cursor-pointer group"
                title="Tanıtım & Giriş Sayfasına Geç"
              >
                <Globe className="w-3.5 h-3.5 text-blue-600 group-hover:rotate-45 transition-transform" />
                <span>Giriş Sayfası</span>
              </button>
            )}

            {/* TARİFE YENİLE Button (from screenshots) */}
            <button
              onClick={() => (onOpenTarife ? onOpenTarife() : onSelectTab?.('dijitalpanelim'))}
              className="py-1.5 px-4 rounded-xl bg-[#0ea5e9] hover:bg-[#0284c7] text-white font-extrabold text-xs tracking-wider shadow-xs transition-all cursor-pointer"
            >
              TARİFE YENİLE
            </button>

            {/* Notifications Center Bell */}
            <div className="relative" ref={notifRef}>
              <button
                onClick={() => setIsNotifOpen(!isNotifOpen)}
                className={`p-2 rounded-xl border transition-all relative ${isNotifOpen
                  ? 'bg-blue-50 border-blue-300 text-blue-600 shadow-sm'
                  : 'bg-white border-slate-200/80 text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                aria-label="Bildirim Merkezi"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-blue-600 text-white text-[9px] font-black flex items-center justify-center animate-pulse">
                  3
                </span>
              </button>

              <NotificationsCenter
                isOpen={isNotifOpen}
                onClose={() => setIsNotifOpen(false)}
                onSelectTab={onSelectTab || (() => { })}
              />
            </div>

            {/* User Profile Avatar with Online Badge & Login Link (from screenshots) */}
            <div className="relative flex items-center space-x-2 pl-1 border-l border-slate-200">
              <Link
                href="/login"
                title="Giriş Sayfası & Profil"
                className="relative w-8 h-8 rounded-full p-0.5 bg-gradient-to-tr from-emerald-500 via-amber-400 to-sky-500 hover:ring-2 hover:ring-blue-400 transition-all flex items-center justify-center shadow-xs"
              >
                <div className="w-full h-full rounded-full overflow-hidden bg-white">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                    alt="Kullanıcı Profili"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
