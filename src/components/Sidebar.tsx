'use client';

import React, { useEffect, useState } from 'react';
import {
  LayoutDashboard,
  Send,
  RotateCcw,
  Rocket,
  Rss,
  Share2,
  CalendarDays,
  FileText,
  Folder,
  Sparkles,
  Wrench,
  Users,
  Settings,
  X,
  Globe,
  Inbox,
  Radio,
  BarChart3,
  ChevronDown
} from 'lucide-react';
import { OmniPostLogo } from './OmniPostLogo';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: string;
  onSelectTab: (tabId: string) => void;
  onOpenLanding?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  activeTab,
  onSelectTab,
  onOpenLanding,
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Exact 12 items matching Screenshots 1, 2, and 3
  const mainNavItems = [
    {
      id: 'dashboard',
      label: 'Kontrol Paneli',
      icon: LayoutDashboard,
      iconColor: 'text-[#0284c7]',
    },
    {
      id: 'studio',
      label: 'Gönderi Paneli',
      icon: Send,
      iconColor: 'text-[#ef4444]',
    },
    {
      id: 'automations',
      label: 'Otomasyonlar',
      icon: RotateCcw,
      iconColor: 'text-[#8b5cf6]',
    },
    {
      id: 'bulk',
      label: 'Toplu Gönderi',
      icon: Rocket,
      iconColor: 'text-[#22c55e]',
      targetTab: 'studio',
    },
    {
      id: 'rss',
      label: 'RSS Paylaşımı',
      icon: Rss,
      iconColor: 'text-[#f97316]',
      targetTab: 'automations',
    },
    {
      id: 'accounts',
      label: 'Sosyal Hesaplar',
      icon: Share2,
      iconColor: 'text-[#2563eb]',
    },
    {
      id: 'schedule',
      label: 'Planlama',
      icon: CalendarDays,
      iconColor: 'text-[#ec4899]',
    },
    {
      id: 'drafts',
      label: 'Taslaklarım',
      icon: FileText,
      iconColor: 'text-[#0d9488]',
    },
    {
      id: 'files',
      label: 'Dosyalarım',
      icon: Folder,
      iconColor: 'text-[#3b82f6]',
    },
    {
      id: 'ai',
      label: 'Yapay Zeka',
      icon: Sparkles,
      iconColor: 'text-[#f59e0b]',
    },
    {
      id: 'tools',
      label: 'Araçlarım',
      icon: Wrench,
      iconColor: 'text-[#10b981]',
    },
    {
      id: 'approvals',
      label: 'Ekip Yönetimi',
      icon: Users,
      iconColor: 'text-[#0284c7]',
    },
  ];

  const advancedNavItems = [
    {
      id: 'dijitalpanelim',
      label: '360° Vitrin & Tarifeler',
      icon: Globe,
      iconColor: 'text-[#0284c7]',
    },
    {
      id: 'inbox',
      label: 'Gelen Kutusu',
      icon: Inbox,
      iconColor: 'text-[#6366f1]',
    },
    {
      id: 'streams',
      label: 'Canlı Dinleme Akışı',
      icon: Radio,
      iconColor: 'text-[#f97316]',
    },
    {
      id: 'analytics',
      label: 'Gönderi Raporları',
      icon: BarChart3,
      iconColor: 'text-[#f43f5e]',
    },
    {
      id: 'settings',
      label: 'Uygulama Ayarları',
      icon: Settings,
      iconColor: 'text-[#64748b]',
    },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs md:hidden modal-backdrop"
          onClick={onClose}
        />
      )}

      {/* Sidebar Content */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-60 bg-white border-r border-slate-200/90 flex flex-col transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] md:translate-x-0 md:static md:z-10 ${isOpen ? 'translate-x-0 shadow-2xl shadow-slate-900/20' : '-translate-x-full md:shadow-none'
          }`}
      >
        {/* Brand Header: OmniPost PRO */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <div
            onClick={() => {
              onSelectTab('dashboard');
              onClose();
            }}
            className="flex items-center space-x-2.5 animate-fade-in group cursor-pointer"
          >
            <OmniPostLogo size={34} animated />
            <div className="flex flex-col">
              <span className="font-black text-slate-900 text-sm tracking-tight leading-none">
                Omni<span className="text-blue-600">Post</span>
              </span>
              <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider mt-1">
                Sosyal Medya
              </span>
            </div>
            <span className="px-1.5 py-0.5 rounded text-[9px] font-black uppercase tracking-wider bg-blue-600 text-white leading-none ml-1 shadow-2xs">
              PRO
            </span>
          </div>

          <button
            onClick={onClose}
            className="md:hidden icon-btn p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Clean 12 Navigation Items Matching Screenshots */}
        <div className="p-3 space-y-1 flex-1 overflow-y-auto">
          {mainNavItems.map((item) => {
            const Icon = item.icon;
            const targetId = item.targetTab || item.id;
            const isActive = activeTab === targetId;

            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelectTab(targetId);
                  onClose();
                }}
                className={`
                  w-full flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-semibold
                  transition-all duration-150 active:scale-[0.99] group text-left cursor-pointer
                  ${isActive
                    ? 'bg-[#f0f6ff] text-[#1864e4] font-bold shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }
                `}
              >
                <div
                  className={`
                    w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors
                    ${isActive ? 'text-[#1864e4]' : item.iconColor}
                  `}
                >
                  <Icon className="w-4 h-4" />
                </div>

                <span className="truncate flex-1">{item.label}</span>
              </button>
            );
          })}

          {/* Toggle for Advanced Ecosphere Tools */}
          <div className="pt-2 border-t border-slate-100">
            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="w-full flex items-center justify-between px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider hover:text-slate-600 cursor-pointer"
            >
              <span>Diğer Modüller</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${showAdvanced ? 'rotate-180' : ''
                  }`}
              />
            </button>

            {showAdvanced && (
              <div className="space-y-1 mt-1">
                {advancedNavItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        onSelectTab(item.id);
                        onClose();
                      }}
                      className={`
                        w-full flex items-center space-x-3 px-3 py-1.5 rounded-xl text-xs font-semibold
                        transition-all duration-150 text-left cursor-pointer
                        ${isActive
                          ? 'bg-[#f0f6ff] text-[#1864e4] font-bold'
                          : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                        }
                      `}
                    >
                      <div className={`w-5 h-5 flex items-center justify-center ${item.iconColor}`}>
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <span className="truncate">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Giriş & Tanıtım Sayfası Switch Button */}
        {onOpenLanding && (
          <div className="p-2.5 border-t border-slate-100 bg-white">
            <button
              onClick={() => {
                onOpenLanding();
                onClose();
              }}
              className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-slate-900 to-[#1c2838] hover:from-slate-800 hover:to-slate-700 text-white font-bold text-xs flex items-center justify-center space-x-2 transition-all shadow-xs cursor-pointer group"
            >
              <Globe className="w-3.5 h-3.5 text-blue-400 group-hover:rotate-45 transition-transform" />
              <span>Giriş Sayfası (Vitrin)</span>
            </button>
          </div>
        )}

        {/* Bottom User / Tariff Expiration Info */}
        <div className="p-3 border-t border-slate-100 bg-slate-50/50">
          <div className="text-[10px] text-slate-400 text-center font-medium">
            OmniPost Pro SaaS v4.2 • Lisans Aktif
          </div>
        </div>
      </aside>
    </>
  );
};
