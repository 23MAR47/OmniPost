'use client';

import React, { useState, useEffect } from 'react';
import { PostContent, SocialPlatformId } from '@/types';
import { PLATFORMS_CONFIG, SAMPLE_MEDIAS } from '@/lib/constants';
import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
import { PlatformSelector } from '@/components/PlatformSelector';
import { PostEditor } from '@/components/PostEditor';
import { LivePreviewPanel } from '@/components/LivePreviewPanel';
import { PublishModal } from '@/components/PublishModal';
import { AccountsManager } from '@/components/AccountsManager';
import { ScheduleCalendarView } from '@/components/ScheduleCalendarView';
import { ScheduleModal } from '@/components/ScheduleModal';
import { AnalyticsHistoryView } from '@/components/AnalyticsHistoryView';
import { PwaRegister } from '@/components/PwaRegister';
import { MobileBottomNav } from '@/components/MobileBottomNav';
import { Footer } from '@/components/Footer';
import { FaqSection } from '@/components/FaqSection';
import { ContactModal } from '@/components/ContactModal';
import { ShowcaseVideoView } from '@/components/ShowcaseVideoView';
import { SocialInboxView } from '@/components/SocialInboxView';
import { ListeningStreamsView } from '@/components/ListeningStreamsView';
import { EvergreenQueueView } from '@/components/EvergreenQueueView';
import { ApprovalEngineView } from '@/components/ApprovalEngineView';
import { DijitalPanelimView } from '@/components/DijitalPanelimView';
import { KontrolPaneliView } from '@/components/KontrolPaneliView';
import { SosyalHesaplarView } from '@/components/SosyalHesaplarView';
import { PlanlamaView } from '@/components/PlanlamaView';
import { OtomasyonlarView } from '@/components/OtomasyonlarView';
import { TaslaklarView, DraftItem } from '@/components/TaslaklarView';
import { DosyalarView } from '@/components/DosyalarView';
import { YapayZekaView } from '@/components/YapayZekaView';
import { ReaInspectorView } from '@/components/ReaInspectorView';
import { TarifeModal } from '@/components/TarifeModal';
import { CommandPalette } from '@/components/CommandPalette';
import { AiStudioModal } from '@/components/AiStudioModal';
import { GirisSayfasiView } from '@/components/GirisSayfasiView';
import {
  KeyRound,
  Calendar,
  BarChart3,
  Settings,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Shield,
  Layers,
  Sparkles,
  RefreshCw,
  PlusCircle,
  Smartphone,
  Bell,
  Wifi,
  Camera,
} from 'lucide-react';

export default function HomePage() {
  const [viewMode, setViewMode] = useState<'landing' | 'panel'>('landing');
  const [devModeEnabled, setDevModeEnabled] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isAiStudioOpen, setIsAiStudioOpen] = useState(false);
  const [showVaultModal, setShowVaultModal] = useState(false);
  const [showCalendarQueue, setShowCalendarQueue] = useState(false);
  const [isTarifeModalOpen, setIsTarifeModalOpen] = useState(false);
  const [tariffExpiry, setTariffExpiry] = useState('09-11-2026');
  const [draftToast, setDraftToast] = useState<string | null>(null);

  // Check URL hash for direct panel navigation
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (window.location.hash === '#panel' || window.location.search.includes('panel=true')) {
        setViewMode('panel');
      }
    }
  }, []);

  const handleInjectDemoData = () => {
    setDrafts([
      {
        id: 'demo-1',
        title: 'Yapay Zeka Destekli Sosyal Medya Kampanyası',
        caption: 'OmniPost Pro API ile 12 kanala tek tıkla dağıtım yapıyoruz! 🔥 #omnipost #dev #saas',
        media: [{ id: 'm1', url: SAMPLE_MEDIAS[0].url, type: 'image' }],
        platforms: ['instagram', 'twitter', 'linkedin', 'facebook'],
        createdAt: 'Bugün 12:00',
      },
      {
        id: 'demo-2',
        title: 'Haftalık Ürün Bülteni #48',
        caption: 'Yeni webhook entegrasyonu ve sıfır sızıntılı token kasası canlıya alındı. 🚀 Detaylar blogumuzda!',
        media: [],
        platforms: ['twitter', 'telegram'],
        createdAt: 'Dün 18:30',
      },
      {
        id: 'demo-3',
        title: 'Topluluk Canlı Yayını Duyurusu',
        caption: 'Yarın 20:00’de YouTube & Twitch eş zamanlı canlı yayınımıza davetlisiniz! 🎙️',
        media: [{ id: 'm2', url: SAMPLE_MEDIAS[1].url, type: 'image' }],
        platforms: ['youtube', 'threads'],
        createdAt: '28-10-2026',
      },
    ]);
  };
  const [drafts, setDrafts] = useState<DraftItem[]>([
    {
      id: 'draft-initial-1',
      title: 'Hafta Sonu Kampanyası',
      caption: 'Özel indirim fırsatları ve çok kanallı sosyal medya lansmanı hazır! 🔥 #kampanya #omnipost',
      media: [{ id: 'm1', url: SAMPLE_MEDIAS[0].url, type: 'image' }],
      platforms: ['instagram', 'twitter', 'facebook'],
      createdAt: '30-10-2026',
    },
  ]);

  const handleSaveDraft = () => {
    const newDraft: DraftItem = {
      id: `draft-${Date.now()}`,
      title: content.title || 'Başlıksız Taslak',
      caption: content.caption || '',
      media: content.media.map((m) => ({ id: m.id, url: m.url, type: (m.type as 'image' | 'video') || 'image' })),
      platforms: selectedPlatforms,
      createdAt: 'Bugün ' + new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
    };
    setDrafts((prev) => [newDraft, ...prev]);
    setDraftToast('Taslak başarıyla kaydedildi!');
    setTimeout(() => setDraftToast(null), 3000);
  };

  const handleLoadDraft = (draft: DraftItem) => {
    setContent({
      title: draft.title,
      caption: draft.caption,
      media: draft.media.map((m, idx) => ({ id: m.id, url: m.url, type: m.type, name: `Medya ${idx + 1}` })),
      destinationUrl: '',
      platformOverrides: {},
    });
    setSelectedPlatforms(draft.platforms);
    setActiveTab('studio');
    setDraftToast('Taslak stüdyoya aktarıldı!');
    setTimeout(() => setDraftToast(null), 3000);
  };

  const handleDeleteDraft = (id: string) => {
    setDrafts((prev) => prev.filter((d) => d.id !== id));
  };

  const handleInsertMediaToPost = (item: { id: string; name: string; type: 'image' | 'video'; url: string }) => {
    setContent((prev) => ({
      ...prev,
      media: [...prev.media, item],
    }));
    setActiveTab('studio');
  };

  // Selected platforms (default all 7 active)
  const [selectedPlatforms, setSelectedPlatforms] = useState<SocialPlatformId[]>([
    'twitter',
    'instagram',
    'youtube',
    'facebook',
    'tiktok',
    'pinterest',
    'threads',
  ]);

  // Post content state
  const [content, setContent] = useState<PostContent>({
    title: 'Yeni Nesil Sosyal Medya Yönetim Paneli Duyurusu! 🚀',
    caption:
      'OmniPost ile tek tıkla YouTube, X, Instagram, Facebook, TikTok, Pinterest, LinkedIn ve diğer tüm hesaplarınıza aynı anda içerik dağıtın! 📱✨ Gönderi stüdyosu ve API kasası hazır. #teknoloji #sosyalmedya #büyüme #omnipost #ai',
    media: [
      {
        id: 'sample-default',
        name: 'Tech Banner',
        type: 'image',
        url: SAMPLE_MEDIAS[0].url,
      },
    ],
    destinationUrl: 'https://github.com/omnipost-studio',
    platformOverrides: {},
  });

  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [scheduledDate, setScheduledDate] = useState('');

  // Platform toggles
  const handleTogglePlatform = (id: SocialPlatformId) => {
    setSelectedPlatforms((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    setSelectedPlatforms(Object.keys(PLATFORMS_CONFIG) as SocialPlatformId[]);
  };

  const handleClearAll = () => {
    setSelectedPlatforms([]);
  };

  const handleUpdateContent = (updated: Partial<PostContent>) => {
    setContent((prev) => ({ ...prev, ...updated }));
  };

  const [notificationStatus, setNotificationStatus] = useState<string | null>(null);

  const handleTestPushNotification = async () => {
    if (typeof window === 'undefined' || !('Notification' in window)) {
      setNotificationStatus('Tarayıcınız bildirimleri desteklemiyor.');
      return;
    }

    try {
      const perm = await Notification.requestPermission();
      if (perm === 'granted') {
        new Notification('OmniPost Mobil Bildirim 🚀', {
          body: 'Zamanlanmış gönderiniz 7 platformda (YouTube, X, Instagram, TikTok...) başarıyla yayınlandı!',
          icon: '/icons/icon-192x192.svg',
        });
        setNotificationStatus('Bildirim başarıyla tetiklendi!');
      } else {
        setNotificationStatus('Bildirim izni reddedildi.');
      }
    } catch (e: any) {
      setNotificationStatus('Bildirim hatası: ' + e.message);
    }
    setTimeout(() => setNotificationStatus(null), 4000);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/70 text-slate-900 bg-mesh-gradient bg-dot-grid relative overflow-x-hidden">
      {/* Decorative Floating Ambient Aura Orbs */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none animate-float" />
      <div className="absolute top-80 right-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-40 left-10 w-80 h-80 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* PWA Lifecycle & Offline/Install Prompter */}
      <PwaRegister />

      {viewMode === 'landing' ? (
        <GirisSayfasiView
          onEnterPanel={() => {
            setViewMode('panel');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onOpenContact={() => setIsContactModalOpen(true)}
        />
      ) : (
        <>
          {/* Top Header */}
          <Header
            onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
            activeCount={selectedPlatforms.length}
            totalPlatforms={Object.keys(PLATFORMS_CONFIG).length}
            onOpenContact={() => setIsContactModalOpen(true)}
            onOpenShowcase={() => setViewMode('landing')}
            onSelectTab={setActiveTab}
            onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
            onOpenTarife={() => setIsTarifeModalOpen(true)}
            tariffExpiry={tariffExpiry}
            onOpenLanding={() => setViewMode('landing')}
          />

          {/* Main Container with Sidebar + Content */}
          <div className="flex-1 flex max-w-7xl w-full mx-auto relative z-10">
            {/* Sidebar */}
            <Sidebar
              isOpen={isSidebarOpen}
              onClose={() => setIsSidebarOpen(false)}
              activeTab={activeTab}
              onSelectTab={(tab) => {
                if (tab === 'dijitalpanelim') {
                  setViewMode('landing');
                } else {
                  setActiveTab(tab);
                }
              }}
              onOpenLanding={() => setViewMode('landing')}
            />

            {/* Dynamic Content Views */}
            <main id="main-content" tabIndex={-1} className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto space-y-6 pb-24 md:pb-8 outline-none">
              {/* TAB: KONTROL PANELİ (PAYLAŞIM RAPORU - SCREENSHOT 2) */}
              {activeTab === 'dashboard' && (
                <div className="page-transition">
                  <KontrolPaneliView
                    onOpenComposer={() => setActiveTab('studio')}
                    devModeEnabled={devModeEnabled}
                    onOpenAccounts={() => setActiveTab('accounts')}
                    onOpenSchedule={() => setActiveTab('schedule')}
                    onOpenLanding={() => setViewMode('landing')}
                  />
                </div>
              )}

          {/* TAB: GÖNDERİ STÜDYOSU & 360 EKOSİSTEM */}
          {activeTab === 'studio' && (
            <div className="page-transition">
              <DijitalPanelimView>
                {/* Platform Selector with 12 Networks & Live Account Groups */}
                <PlatformSelector
                  selectedPlatforms={selectedPlatforms}
                  onTogglePlatform={handleTogglePlatform}
                  onSelectAll={handleSelectAll}
                  onClearAll={handleClearAll}
                  onSelectGroup={(platforms) => setSelectedPlatforms(platforms)}
                />

                {/* Two Column Layout: Editor (Left) & Live Preview (Right) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  {/* Left: Post Editor */}
                  <div className="lg:col-span-7">
                    <PostEditor
                      content={content}
                      onChange={handleUpdateContent}
                      selectedPlatforms={selectedPlatforms}
                      onPublish={() => setIsPublishModalOpen(true)}
                      onOpenSchedule={() => setIsScheduleModalOpen(true)}
                      onSaveDraft={handleSaveDraft}
                    />
                  </div>

                  {/* Right: Live Preview Panel */}
                  <div className="lg:col-span-5 sticky top-24">
                    <LivePreviewPanel
                      content={content}
                      selectedPlatforms={selectedPlatforms}
                    />
                  </div>
                </div>
              </DijitalPanelimView>
            </div>
          )}

          {/* TAB: OTOMASYONLAR (SERİ GÖNDERİLER - SCREENSHOT 1) */}
          {activeTab === 'automations' && (
            <div className="page-transition">
              <OtomasyonlarView />
            </div>
          )}

          {/* TAB: SOSYAL HESAPLAR (HESAPLARINI EKLE - SCREENSHOT 4) */}
          {activeTab === 'accounts' && (
            <div className="page-transition">
              <SosyalHesaplarView
                onAccountConnected={(platformId) => {
                  if (!selectedPlatforms.includes(platformId)) {
                    setSelectedPlatforms((prev) => [...prev, platformId]);
                  }
                }}
              />
            </div>
          )}

          {/* TAB: PLANLAMA (AYLIK TAKVİM - SCREENSHOT 3) */}
          {activeTab === 'schedule' && (
            <div className="page-transition space-y-4">
              <div className="flex justify-end">
                <button
                  onClick={() => setShowCalendarQueue(!showCalendarQueue)}
                  className="text-xs text-blue-600 hover:text-blue-800 font-bold underline cursor-pointer"
                >
                  {showCalendarQueue ? '← Aylık Planlama Matrisine Dön' : 'Detaylı Zamanlama Kuyruğunu Göster →'}
                </button>
              </div>
              {showCalendarQueue ? (
                <ScheduleCalendarView onOpenNewSchedule={() => setIsScheduleModalOpen(true)} />
              ) : (
                <PlanlamaView
                  onOpenComposer={() => setActiveTab('studio')}
                  onOpenApiSettings={() => setActiveTab('accounts')}
                />
              )}
            </div>
          )}

          {/* TAB: TASLAKLARIM (SCREENSHOT 5) */}
          {activeTab === 'drafts' && (
            <div className="page-transition">
              <TaslaklarView
                onOpenComposer={() => setActiveTab('studio')}
                drafts={drafts}
                onLoadDraft={handleLoadDraft}
                onDeleteDraft={handleDeleteDraft}
              />
            </div>
          )}

          {/* TAB: DOSYALARIM (MEDYA KÜTÜPHANESİ) */}
          {activeTab === 'files' && (
            <div className="page-transition">
              <DosyalarView onInsertToPost={handleInsertMediaToPost} />
            </div>
          )}

          {/* TAB: YAPAY ZEKA (AI İÇERİK MOTORU) */}
          {activeTab === 'ai' && (
            <div className="page-transition">
              <YapayZekaView
                onApplyToComposer={(text) => {
                  handleUpdateContent({ caption: text });
                  setActiveTab('studio');
                }}
              />
            </div>
          )}

          {/* TAB: ARAÇLARIM (REA API & NETWORK DENETİM MASASI) */}
          {activeTab === 'tools' && (
            <div className="page-transition">
              <ReaInspectorView />
            </div>
          )}

          {/* TAB: GÖNDERİ GEÇMİŞİ & RAPORLAR */}
          {activeTab === 'analytics' && (
            <div className="page-transition">
              <AnalyticsHistoryView />
            </div>
          )}

          {/* TAB: ÜRÜN TANITIM VİDEOSU & PITCH VITRINI (REMOTION) */}
          {activeTab === 'showcase' && (
            <div className="page-transition">
              <ShowcaseVideoView />
            </div>
          )}

          {/* TAB: PLEXORIN UNIFIED INBOX */}
          {activeTab === 'inbox' && (
            <div className="page-transition">
              <SocialInboxView />
            </div>
          )}

          {/* TAB: HOOTSUITE SOCIAL LISTENING STREAMS */}
          {activeTab === 'streams' && (
            <div className="page-transition">
              <ListeningStreamsView />
            </div>
          )}

          {/* TAB: PLEXORIN EVERGREEN RECYCLING QUEUE */}
          {activeTab === 'evergreen' && (
            <div className="page-transition">
              <EvergreenQueueView />
            </div>
          )}

          {/* TAB: HOOTSUITE TEAM APPROVAL ENGINE */}
          {activeTab === 'approvals' && (
            <div className="page-transition">
              <ApprovalEngineView />
            </div>
          )}

          {/* TAB: 360 EKOSISTEM & BÜYÜME (12 PLATFORM & 3D VITRIN) */}
          {activeTab === 'dijitalpanelim' && (
            <div className="page-transition">
              <DijitalPanelimView />
            </div>
          )}

          {/* TAB: REA API & NETWORK INSPECTOR */}
          {activeTab === 'rea' && (
            <div className="page-transition">
              <ReaInspectorView />
            </div>
          )}

          {/* TAB 5: KURUMSAL UYGULAMA AYARLARI & GÜVENLİK MASASI */}
          {activeTab === 'settings' && (
            <div className="space-y-6 max-w-4xl mx-auto page-transition pb-12">
              {/* Profil & Marka Tercihleri */}
              <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center space-x-2">
                    <Settings className="w-5 h-5 text-indigo-600" />
                    <span>Kurumsal Hesap & Profil Tercihleri</span>
                  </h2>
                  <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                    Hesap Aktif (Kurumsal)
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
                    <span className="text-slate-500 font-semibold block text-[11px]">Şirket / Marka Ünvanı</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200 text-sm">OmniPost Medya & İletişim A.Ş.</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
                    <span className="text-slate-500 font-semibold block text-[11px]">Yetkili İletişim E-Postası</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200 text-sm">kurumsal@omnipost.pro</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
                    <span className="text-slate-500 font-semibold block text-[11px]">Varsayılan Saat Dilimi</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200 text-sm">Europe / Istanbul (UTC+03:00)</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
                    <span className="text-slate-500 font-semibold block text-[11px]">Panel Varsayılan Dili</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200 text-sm">Türkçe (TR)</span>
                  </div>
                </div>
              </div>

              {/* Yayın & Otomasyon Standartları */}
              <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-5">
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2 pb-3 border-b border-slate-100 dark:border-slate-800">
                  <Sparkles className="w-5 h-5 text-amber-500" />
                  <span>Akıllı Otomasyon & Yayın Tercihleri</span>
                </h3>

                <div className="space-y-3 text-xs">
                  <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                    <div>
                      <span className="font-bold text-slate-800 dark:text-slate-200 block text-sm">Akıllı Zamanlama Motoru</span>
                      <span className="text-slate-500 text-xs mt-0.5 block">
                        Gönderileri her platformun en yüksek etkileşim saatlerinde otomatik olarak kuyruğa alır.
                      </span>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs">
                      AKTİF
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                    <div>
                      <span className="font-bold text-slate-800 dark:text-slate-200 block text-sm">Otomatik UTM & Link Analitiği</span>
                      <span className="text-slate-500 text-xs mt-0.5 block">
                        Paylaşılan bağlantılara platform ve kampanya bazlı Google Analytics UTM parametreleri ekler.
                      </span>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 font-bold text-xs">
                      AÇIK
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                    <div>
                      <span className="font-bold text-slate-800 dark:text-slate-200 block text-sm">WebP & 4K Görsel Optimizasyonu</span>
                      <span className="text-slate-500 text-xs mt-0.5 block">
                        Yüklenen medyaları platform limitlerine göre kalite kaybı olmadan optimize eder.
                      </span>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs">
                      AKTİF
                    </span>
                  </div>
                </div>
              </div>

              {/* Güvenlik & Push Bildirim Masası */}
              <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2">
                    <Shield className="w-5 h-5 text-indigo-600" />
                    <span>Güvenlik & Gerçek Zamanlı Bildirimler</span>
                  </h3>
                  <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 font-bold text-xs">
                    AES-256 Korumalı
                  </span>
                </div>

                <div className="space-y-4 text-xs">
                  {/* Push Notification Trigger */}
                  <div className="p-4 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <span className="font-bold text-slate-900 dark:text-white flex items-center space-x-1.5 text-sm">
                        <Bell className="w-4 h-4 text-indigo-600" />
                        <span>Masaüstü & Mobil Web Push Bildirimleri</span>
                      </span>
                      <span className="text-slate-600 dark:text-slate-300 text-xs block mt-1">
                        Zamanlanmış içerikler 12 sosyal ağda tamamlandığında anlık durum bildirimi iletir.
                      </span>
                    </div>
                    <button
                      onClick={handleTestPushNotification}
                      className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center space-x-1.5 flex-shrink-0"
                    >
                      <Bell className="w-3.5 h-3.5" />
                      <span>Test Bildirimi Gönder</span>
                    </button>
                  </div>

                  {notificationStatus && (
                    <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold flex items-center space-x-2">
                      <Sparkles className="w-4 h-4 text-blue-600" />
                      <span>{notificationStatus}</span>
                    </div>
                  )}

                  {/* Security Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                    <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 flex items-start space-x-3">
                      <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Shield className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-800 dark:text-slate-200 text-sm">Sıfır Sızıntı Token Kasası</div>
                        <div className="text-xs text-slate-500 mt-1">
                          12 platforma ait tüm API anahtarları donanım anahtarlı AES-256 ile şifrelenir.
                        </div>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 flex items-start space-x-3">
                      <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <KeyRound className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-800 dark:text-slate-200 text-sm">İki Aşamalı Giriş Doğrulama (2FA)</div>
                        <div className="text-xs text-slate-500 mt-1">
                          Hesabınıza sadece yetkili cihazlar ve onay kodu ile güvenli erişim sağlanır.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar (Visible on mobile screens) */}
      <MobileBottomNav activeTab={activeTab} onSelectTab={setActiveTab} />
    </>
  )}

      {/* High-Converting SEO Footer (Only on Public Showcase tab inside panel) */}
      {viewMode === 'panel' && activeTab === 'dijitalpanelim' && (
        <Footer
          onOpenContact={() => setIsContactModalOpen(true)}
          onSelectTab={setActiveTab}
        />
      )}

      {/* Publish Live Progress & Result Modal */}
      <PublishModal
        isOpen={isPublishModalOpen}
        onClose={() => setIsPublishModalOpen(false)}
        selectedPlatforms={selectedPlatforms}
        content={content}
      />

      {/* Schedule Modal */}
      <ScheduleModal
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
        content={content}
        selectedPlatforms={selectedPlatforms}
        onScheduledSuccess={() => {
          setIsScheduleModalOpen(false);
          setActiveTab('schedule');
        }}
      />

      {/* Interactive Contact & Support Modal */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />

      {/* Tarife Yenile Modal */}
      <TarifeModal
        isOpen={isTarifeModalOpen}
        onClose={() => setIsTarifeModalOpen(false)}
        onRenewSuccess={(newDate) => setTariffExpiry(newDate)}
      />

      {/* Global Command Palette (Cmd + K) */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onSelectTab={setActiveTab}
        onOpenAiStudio={() => setIsAiStudioOpen(true)}
        onSelectAllPlatforms={handleSelectAll}
        onTriggerNotification={handleTestPushNotification}
      />

      {/* Global AI Studio Modal */}
      <AiStudioModal
        isOpen={isAiStudioOpen}
        onClose={() => setIsAiStudioOpen(false)}
        onApplyToPost={(generatedCaption) => {
          handleUpdateContent({ caption: generatedCaption });
        }}
        currentCaption={content.caption}
      />


      {/* Global Toast Notification */}
      {draftToast && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-slate-900 text-white font-bold text-xs shadow-2xl border border-slate-700 flex items-center space-x-2 animate-bounce-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{draftToast}</span>
        </div>
      )}
    </div>
  );
}
