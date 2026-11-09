'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  PenTool,
  Inbox,
  Radio,
  Repeat,
  ShieldCheck,
  Globe,
  Zap,
  KeyRound,
  CalendarDays,
  BarChart3,
  Settings,
  Sparkles,
  CheckSquare,
  Bell,
  ArrowRight,
  CornerDownLeft,
  X,
  Terminal,
} from 'lucide-react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTab: (tabId: string) => void;
  onOpenAiStudio?: () => void;
  onSelectAllPlatforms?: () => void;
  onTriggerNotification?: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onSelectTab,
  onOpenAiStudio,
  onSelectAllPlatforms,
  onTriggerNotification,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  const items = [
    // Navigasyon
    {
      id: 'nav-studio',
      category: 'Navigasyon & Sayfalar',
      title: 'Gönderi Stüdyosu',
      description: 'Çoklu içerik editörü, medya yükleyici ve canlı önizleme',
      icon: PenTool,
      color: 'text-blue-600 bg-blue-50',
      action: () => {
        onSelectTab('studio');
        onClose();
      },
    },
    {
      id: 'nav-inbox',
      category: 'Navigasyon & Sayfalar',
      title: 'Birleşik Gelen Kutusu (Unified Inbox)',
      description: '12 platform için tek gelen kutusu, SLA geri sayımı & AI yanıt asistanı',
      icon: Inbox,
      color: 'text-indigo-600 bg-indigo-50',
      badge: 'Gelen Kutusu',
      action: () => {
        onSelectTab('inbox');
        onClose();
      },
    },
    {
      id: 'nav-streams',
      category: 'Navigasyon & Sayfalar',
      title: 'Canlı Dinleme Akışı (Social Streams)',
      description: 'Çok sütunlu canlı dinleme masası, hashtag, anahtar kelime & trend takibi',
      icon: Radio,
      color: 'text-amber-600 bg-amber-50',
      badge: 'Canlı Radar',
      action: () => {
        onSelectTab('streams');
        onClose();
      },
    },
    {
      id: 'nav-evergreen',
      category: 'Navigasyon & Sayfalar',
      title: 'Evergreen İçerik Geri Dönüşümü',
      description: 'Otomatik içerik döngüsü havuzları ve 72 saatlik koruma kalkanı',
      icon: Repeat,
      color: 'text-emerald-600 bg-emerald-50',
      badge: 'Otomasyon',
      action: () => {
        onSelectTab('evergreen');
        onClose();
      },
    },
    {
      id: 'nav-approvals',
      category: 'Navigasyon & Sayfalar',
      title: 'Ekip Onay Motoru (Kanban Board)',
      description: 'Editör, Yönetici ve Müşteri onay akışları, revizyon ve audit log',
      icon: ShieldCheck,
      color: 'text-violet-600 bg-violet-50',
      badge: 'Yönetişim',
      action: () => {
        onSelectTab('approvals');
        onClose();
      },
    },
    {
      id: 'nav-dijitalpanelim',
      category: 'Navigasyon & Sayfalar',
      title: '360° Ekosistem & Büyüme (12 Ağ & 3D Vitrin)',
      description: '12 platform, 3D özellik vitrini, hesap grupları, ROI tasarruf hesabı & tarifeler',
      icon: Globe,
      color: 'text-blue-600 bg-blue-50',
      badge: '12 Platform',
      action: () => {
        onSelectTab('dijitalpanelim');
        onClose();
      },
    },
    {
      id: 'nav-showcase',
      category: 'Navigasyon & Sayfalar',
      title: 'Tanıtım Videosu & Remotion Sunumu',
      description: '9:16 ve 16:9 formatlarında yazılımsal video vitrini',
      icon: Zap,
      color: 'text-sky-600 bg-sky-50',
      action: () => {
        onSelectTab('showcase');
        onClose();
      },
    },
    {
      id: 'nav-accounts',
      category: 'Navigasyon & Sayfalar',
      title: 'Bağlı Hesaplar & API Kasası',
      description: 'AES-256 şifreli OAuth token deposu ve 7 platform entegrasyonu',
      icon: KeyRound,
      color: 'text-purple-600 bg-purple-50',
      action: () => {
        onSelectTab('accounts');
        onClose();
      },
    },
    {
      id: 'nav-rea',
      category: 'Navigasyon & Sayfalar',
      title: 'API & Ağ Denetim Masası (REA Engine)',
      description: 'Canlı network izleme, JSON payload analizi, HAR yükleyici ve zero-leak kanıtları',
      icon: Terminal,
      color: 'text-cyan-600 bg-cyan-50',
      badge: 'REA Engine',
      action: () => {
        onSelectTab('rea');
        onClose();
      },
    },
    {
      id: 'nav-schedule',
      category: 'Navigasyon & Sayfalar',
      title: 'Akıllı Zamanlayıcı & İçerik Takvimi',
      description: '7x24 en iyi paylaşım saati ısı haritası ve takvim kuyruğu',
      icon: CalendarDays,
      color: 'text-teal-600 bg-teal-50',
      action: () => {
        onSelectTab('schedule');
        onClose();
      },
    },
    {
      id: 'nav-analytics',
      category: 'Navigasyon & Sayfalar',
      title: 'Gönderi Geçmişi & Raporlama',
      description: 'Etkileşim analitiği, başarı oranı ve Excel (.xlsx) dışa aktarım',
      icon: BarChart3,
      color: 'text-pink-600 bg-pink-50',
      action: () => {
        onSelectTab('analytics');
        onClose();
      },
    },
    {
      id: 'nav-settings',
      category: 'Navigasyon & Sayfalar',
      title: 'Sistem & Geliştirici Ayarları',
      description: 'PWA, mobil kamera ve simülatör tercihleri',
      icon: Settings,
      color: 'text-slate-600 bg-slate-50',
      action: () => {
        onSelectTab('settings');
        onClose();
      },
    },

    // Hızlı Aksiyonlar
    {
      id: 'act-ai',
      category: 'Hızlı Eylemler',
      title: 'AI Viral Kanca & Hashtag Stüdyosu',
      description: '5 kanca türü ve 15 viral etiket ile otomatik metin üret',
      icon: Sparkles,
      color: 'text-amber-500 bg-amber-50',
      badge: 'Yapay Zeka',
      action: () => {
        onSelectTab('studio');
        onOpenAiStudio?.();
        onClose();
      },
    },
    {
      id: 'act-select-all',
      category: 'Hızlı Eylemler',
      title: 'Tüm Sosyal Medya Platformlarını Seç (7/7)',
      description: 'YouTube, X, Instagram, TikTok, Facebook, Pinterest ve Threads',
      icon: CheckSquare,
      color: 'text-blue-500 bg-blue-50',
      action: () => {
        onSelectAllPlatforms?.();
        onClose();
      },
    },
    {
      id: 'act-push',
      category: 'Hızlı Eylemler',
      title: 'Test Web Push Bildirimi Tetikle',
      description: 'Tarayıcı veya mobil cihazına anlık başarı bildirimi gönder',
      icon: Bell,
      color: 'text-indigo-500 bg-indigo-50',
      action: () => {
        onTriggerNotification?.();
        onClose();
      },
    },
  ];

  const filteredItems = items.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < filteredItems.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : filteredItems.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        filteredItems[selectedIndex].action();
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 sm:px-6">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-md transition-opacity duration-200"
        onClick={onClose}
      />

      {/* Palette Modal */}
      <div className="relative w-full max-w-2xl bg-white/95 backdrop-blur-2xl rounded-3xl border border-slate-200/90 shadow-2xl shadow-slate-900/20 overflow-hidden z-10 animate-scale-in">
        {/* Top search input */}
        <div className="flex items-center px-5 py-4 border-b border-slate-100 space-x-3">
          <Search className="w-5 h-5 text-blue-600 flex-shrink-0 animate-pulse" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Sayfa, araç veya özellik ara... (Örn: 'stüdyo', 'inbox', 'takvim', 'ai')"
            className="w-full bg-transparent text-sm text-slate-800 placeholder-slate-400 font-medium outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <span className="kbd-shortcut hidden sm:inline-flex">ESC</span>
        </div>

        {/* Results List */}
        <div className="max-h-[380px] overflow-y-auto p-2.5 space-y-1">
          {filteredItems.length === 0 ? (
            <div className="py-12 text-center text-slate-400 text-xs">
              <Search className="w-8 h-8 mx-auto mb-2 opacity-30" />
              <p className="font-semibold text-slate-600">Eşleşen komut bulunamadı</p>
              <p className="mt-1">Farklı bir anahtar kelime deneyin.</p>
            </div>
          ) : (
            filteredItems.map((item, index) => {
              const Icon = item.icon;
              const isSelected = index === selectedIndex;

              return (
                <button
                  key={item.id}
                  onClick={item.action}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`w-full flex items-center justify-between p-3 rounded-2xl text-left transition-all duration-150 ${isSelected
                      ? 'bg-blue-50/80 text-blue-900 shadow-sm border border-blue-200/60 translate-x-1'
                      : 'hover:bg-slate-50 text-slate-700'
                    }`}
                >
                  <div className="flex items-center space-x-3 min-w-0">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${item.color} shadow-xs`}
                    >
                      <Icon className="w-4.5 h-4.5" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-xs text-slate-900 truncate">
                          {item.title}
                        </span>
                        {item.badge && (
                          <span className="px-1.5 py-0.5 rounded-md text-[9px] font-extrabold bg-blue-100 text-blue-700 leading-none">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 truncate mt-0.5">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 flex-shrink-0 ml-3">
                    <span className="text-[10px] text-slate-400 font-medium hidden sm:inline">
                      {item.category}
                    </span>
                    {isSelected && (
                      <span className="w-6 h-6 rounded-lg bg-blue-600 text-white flex items-center justify-center shadow-xs">
                        <CornerDownLeft className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-5 py-2.5 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1">
              <span className="kbd-shortcut">↑</span>
              <span className="kbd-shortcut">↓</span>
              <span>Gezin</span>
            </span>
            <span className="flex items-center space-x-1">
              <span className="kbd-shortcut">↵</span>
              <span>Seç</span>
            </span>
          </div>
          <div className="flex items-center space-x-1 text-slate-500 font-semibold">
            <span>OmniPost</span>
            <span className="text-blue-600">Hızlı Komut Masası</span>
          </div>
        </div>
      </div>
    </div>
  );
};
