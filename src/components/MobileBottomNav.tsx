'use client';

import React from 'react';
import { LayoutDashboard, Send, Share2, Calendar, Settings } from 'lucide-react';

interface MobileBottomNavProps {
  activeTab: string;
  onSelectTab: (tabId: string) => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeTab,
  onSelectTab,
}) => {
  const navItems = [
    { id: 'dashboard', label: 'Kontrol', icon: LayoutDashboard },
    { id: 'studio', label: 'Gönderi', icon: Send },
    { id: 'accounts', label: 'Hesaplar', icon: Share2 },
    { id: 'schedule', label: 'Planlama', icon: Calendar },
    { id: 'settings', label: 'Ayarlar', icon: Settings },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-slate-200 px-2 py-1.5 shadow-[0_-4px_16px_rgba(0,0,0,0.05)]">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all duration-200 relative ${isActive
                  ? 'text-blue-600 font-bold scale-105'
                  : 'text-slate-500 hover:text-slate-800 font-medium'
                }`}
            >
              {isActive && (
                <span className="absolute -top-1.5 w-8 h-1 bg-blue-600 rounded-full animate-in fade-in zoom-in-50" />
              )}
              <div
                className={`p-1 rounded-lg transition-colors ${isActive ? 'bg-blue-50 text-blue-600' : 'bg-transparent'
                  }`}
              >
                <Icon className="w-4 h-4" />
              </div>
              <span className="text-[10px] mt-0.5 tracking-tight">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
