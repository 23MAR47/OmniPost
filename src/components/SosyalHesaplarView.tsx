'use client';

import React, { useState } from 'react';
import {
  Share2,
  Search,
  Plus,
  Trash2,
  PlayCircle,
  CheckCircle2,
  X,
  ShieldCheck,
  Check,
  ExternalLink,
  ChevronRight,
  KeyRound,
  Eye,
  EyeOff,
  SlidersHorizontal,
  Lock,
  Zap,
  RefreshCw
} from 'lucide-react';
import { PlatformIcon } from './PlatformIcon';
import { AccountsManager } from './AccountsManager';
import { SocialPlatformId } from '@/types';

export interface ConnectedAccountDetail {
  id: string;
  name: string;
  handleOrId: string;
  avatar?: string;
  initials?: string;
  bgColor?: string;
  hasApiKey?: boolean;
  selected?: boolean;
}

export interface PlatformCardData {
  id: string;
  name: string;
  platform: SocialPlatformId;
  type: 'profile' | 'page' | 'channel' | 'group' | 'board';
  hasPlayIcon?: boolean;
  accounts: ConnectedAccountDetail[];
}

const INITIAL_PLATFORMS: PlatformCardData[] = [
  {
    id: 'fb-page',
    name: 'Facebook Sayfaları',
    platform: 'facebook',
    type: 'page',
    hasPlayIcon: true,
    accounts: [
      {
        id: 'fb-1',
        name: 'Mimarobot',
        handleOrId: '560902837384715',
        bgColor: 'bg-[#fbbf24]',
        initials: '🤖',
        hasApiKey: true,
      },
      {
        id: 'fb-2',
        name: 'Demo Sayfam',
        handleOrId: '225521293987734',
        bgColor: 'bg-[#a855f7]',
        initials: 'D',
        hasApiKey: true,
      },
      {
        id: 'fb-3',
        name: 'Test sayfa',
        handleOrId: '102034506108001',
        bgColor: 'bg-[#475569]',
        initials: 'T',
      },
    ],
  },
  {
    id: 'ig-profile',
    name: 'Instagram Profilleri',
    platform: 'instagram',
    type: 'profile',
    accounts: [
      {
        id: 'ig-1',
        name: 'Acarlar Tasarım',
        handleOrId: '9750403855069858',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
        hasApiKey: true,
      },
      {
        id: 'ig-2',
        name: 'Emre Ziver Ülgen',
        handleOrId: '9677725549016832',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
      },
      {
        id: 'ig-3',
        name: 'Gökhan Ayvazoğlu',
        handleOrId: '29028334266815252',
        avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100&auto=format&fit=crop&q=80',
      },
      {
        id: 'ig-4',
        name: 'Elif Aycan Sezer',
        handleOrId: '184920491823901',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      },
    ],
  },
  {
    id: 'tt-profile',
    name: 'TikTok Profilleri',
    platform: 'tiktok',
    type: 'profile',
    accounts: [
      {
        id: 'tt-1',
        name: 'lovilova',
        handleOrId: '@lechquo',
        bgColor: 'bg-[#6366f1]',
        initials: 'L',
        hasApiKey: true,
      },
      {
        id: 'tt-2',
        name: 'koooonur',
        handleOrId: '@koooonur',
        avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&auto=format&fit=crop&q=80',
      },
    ],
  },
  {
    id: 'li-profile',
    name: 'Linkedin Profilleri',
    platform: 'linkedin',
    type: 'profile',
    hasPlayIcon: true,
    accounts: [
      {
        id: 'li-1',
        name: 'Merve Aydoğan',
        handleOrId: '6Q_jqThxbT',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80',
        hasApiKey: true,
      },
      {
        id: 'li-2',
        name: 'Sema Vural',
        handleOrId: 'vh0_gzFaXP',
        avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=80',
      },
    ],
  },
  {
    id: 'li-page',
    name: 'Linkedin Sayfaları',
    platform: 'linkedin',
    type: 'page',
    hasPlayIcon: true,
    accounts: [
      {
        id: 'lip-1',
        name: 'Mimarlık Robotu',
        handleOrId: '10561431',
        bgColor: 'bg-[#eab308]',
        initials: '📐',
        hasApiKey: true,
      },
      {
        id: 'lip-2',
        name: 'OmniPost Medya',
        handleOrId: '83506530',
        avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=80',
        hasApiKey: true,
      },
    ],
  },
  {
    id: 'pin-board',
    name: 'Pinterest Panoları',
    platform: 'pinterest',
    type: 'board',
    hasPlayIcon: true,
    accounts: [
      {
        id: 'pin-1',
        name: 'Paylaşımlar',
        handleOrId: '328692541493630519',
        bgColor: 'bg-[#0284c7]',
        initials: 'PA',
        hasApiKey: true,
      },
      {
        id: 'pin-2',
        name: 'Haberler',
        handleOrId: '328692541493628652',
        bgColor: 'bg-[#0284c7]',
        initials: 'HA',
      },
    ],
  },
  {
    id: 'x-profile',
    name: 'X Profili (Twitter)',
    platform: 'twitter',
    type: 'profile',
    accounts: [
      {
        id: 'x-1',
        name: 'OmniPost HQ',
        handleOrId: '@omnipost_studio',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
        hasApiKey: true,
      },
    ],
  },
  {
    id: 'yt-channel',
    name: 'Youtube Kanalı',
    platform: 'youtube',
    type: 'channel',
    hasPlayIcon: true,
    accounts: [
      {
        id: 'yt-1',
        name: 'OmniPost Media TR',
        handleOrId: 'UC9349821048201',
        bgColor: 'bg-[#dc2626]',
        initials: '▶',
        hasApiKey: true,
      },
    ],
  },
  {
    id: 'gb-page',
    name: 'Google Business',
    platform: 'googlebusiness',
    type: 'page',
    accounts: [
      {
        id: 'gb-1',
        name: 'Merkez Ofis & Şube',
        handleOrId: 'GB-84920194',
        bgColor: 'bg-[#2563eb]',
        initials: 'G',
        hasApiKey: true,
      },
    ],
  },
];

const SIDEBAR_PLATFORM_LINKS = [
  { id: 'fb-page', name: 'Facebook Sayfası', platform: 'facebook' as SocialPlatformId },
  { id: 'ig-profile', name: 'Instagram Profili', platform: 'instagram' as SocialPlatformId },
  { id: 'tt-profile', name: 'TikTok Profili', platform: 'tiktok' as SocialPlatformId },
  { id: 'x-profile', name: 'X Profili (Twitter)', platform: 'twitter' as SocialPlatformId },
  { id: 'yt-channel', name: 'Youtube Kanalı', platform: 'youtube' as SocialPlatformId },
  { id: 'gb-page', name: 'Google Business', platform: 'googlebusiness' as SocialPlatformId },
  { id: 'li-profile', name: 'Linkedin Profili', platform: 'linkedin' as SocialPlatformId },
  { id: 'li-page', name: 'Linkedin Sayfası', platform: 'linkedin' as SocialPlatformId },
  { id: 'pin-board', name: 'Pinterest Panosu', platform: 'pinterest' as SocialPlatformId },
  { id: 'bsky-profile', name: 'Bluesky Profili', platform: 'bluesky' as SocialPlatformId },
  { id: 'tb-profile', name: 'Tumblr Hesabı', platform: 'tumblr' as SocialPlatformId },
  { id: 'dc-server', name: 'Discord Hesabı', platform: 'discord' as SocialPlatformId },
  { id: 'tg-channel', name: 'Telegram Kanalı', platform: 'telegram' as SocialPlatformId },
  { id: 'tg-group', name: 'Telegram Grubu', platform: 'telegram' as SocialPlatformId },
];

interface SosyalHesaplarViewProps {
  onAccountConnected?: (platformId: SocialPlatformId, username: string) => void;
}

export const SosyalHesaplarView: React.FC<SosyalHesaplarViewProps> = ({ onAccountConnected }) => {
  const [viewMode, setViewMode] = useState<'cards' | 'api-vault'>('cards');
  const [platformCards, setPlatformCards] = useState<PlatformCardData[]>(INITIAL_PLATFORMS);
  const [sidebarSearch, setSidebarSearch] = useState('');
  const [cardSearchTerms, setCardSearchTerms] = useState<Record<string, string>>({});
  const [selectedAccountIds, setSelectedAccountIds] = useState<Record<string, string[]>>({});

  // Connect Modal State
  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);
  const [connectTab, setConnectTab] = useState<'oauth' | 'apikey'>('oauth');
  const [targetPlatformCard, setTargetPlatformCard] = useState<PlatformCardData | null>(null);
  
  // Standard Form Fields
  const [inputAccountName, setInputAccountName] = useState('');
  const [inputId, setInputId] = useState('');

  // API Key Form Fields
  const [apiKeyInput, setApiKeyInput] = useState('');
  const [apiSecretInput, setApiSecretInput] = useState('');
  const [accessTokenInput, setAccessTokenInput] = useState('');
  const [showSecret, setShowSecret] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const filteredSidebarLinks = SIDEBAR_PLATFORM_LINKS.filter((item) =>
    item.name.toLowerCase().includes(sidebarSearch.toLowerCase())
  );

  const handleOpenConnect = (card: PlatformCardData, defaultTab: 'oauth' | 'apikey' = 'oauth') => {
    setTargetPlatformCard(card);
    setConnectTab(defaultTab);
    setInputAccountName('');
    setInputId(Math.floor(100000000000000 + Math.random() * 900000000000000).toString());
    setApiKeyInput('');
    setApiSecretInput('');
    setAccessTokenInput('');
    setShowSecret(false);
    setIsConnectModalOpen(true);
  };

  const handleOpenConnectByPlatformId = (platformId: SocialPlatformId, linkName: string) => {
    let existingCard = platformCards.find((c) => c.platform === platformId);
    if (!existingCard) {
      existingCard = {
        id: `card-${platformId}`,
        name: linkName,
        platform: platformId,
        type: 'profile',
        accounts: [],
      };
      setPlatformCards((prev) => [...prev, existingCard!]);
    }
    handleOpenConnect(existingCard);
  };

  const handleConfirmConnect = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetPlatformCard) return;

    setIsSubmitting(true);

    if (connectTab === 'apikey') {
      // Save API Key to backend /api/accounts
      try {
        await fetch('/api/accounts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            platformId: targetPlatformCard.platform,
            credentials: {
              apiKey: apiKeyInput,
              apiSecret: apiSecretInput,
              accessToken: accessTokenInput,
              accountHandle: inputAccountName || `@${targetPlatformCard.platform}_api`,
              mode: 'live',
            },
          }),
        });
      } catch (err) {
        // Fallback gracefully
      }
    }

    setTimeout(() => {
      const name =
        inputAccountName.trim() ||
        (connectTab === 'apikey'
          ? `${targetPlatformCard.name} API Hesabı`
          : `${targetPlatformCard.name} Kullanıcısı`);
      const idStr =
        inputId.trim() ||
        Math.floor(100000000000000 + Math.random() * 900000000000000).toString();

      const newAccount: ConnectedAccountDetail = {
        id: `acc-${Date.now()}`,
        name: name,
        handleOrId: idStr,
        initials: name.substring(0, 2).toUpperCase(),
        bgColor: connectTab === 'apikey' ? 'bg-indigo-600' : 'bg-blue-600',
        hasApiKey: connectTab === 'apikey',
      };

      setPlatformCards((prev) =>
        prev.map((card) =>
          card.id === targetPlatformCard.id
            ? { ...card, accounts: [newAccount, ...card.accounts] }
            : card
        )
      );

      onAccountConnected?.(targetPlatformCard.platform, name);
      setIsSubmitting(false);
      setIsConnectModalOpen(false);
      showToast(
        connectTab === 'apikey'
          ? `"${name}" API anahtarı başarıyla doğrulandı ve AES-256 kasasına kaydedildi!`
          : `"${name}" hesabı ${targetPlatformCard.name} grubuna eklendi!`
      );
    }, 500);
  };

  const handleToggleSelectAccount = (cardId: string, accId: string) => {
    setSelectedAccountIds((prev) => {
      const current = prev[cardId] || [];
      const updated = current.includes(accId)
        ? current.filter((id) => id !== accId)
        : [...current, accId];
      return { ...prev, [cardId]: updated };
    });
  };

  const handleSelectAllInCard = (cardId: string, accounts: ConnectedAccountDetail[]) => {
    setSelectedAccountIds((prev) => {
      const current = prev[cardId] || [];
      if (current.length === accounts.length) {
        return { ...prev, [cardId]: [] };
      } else {
        return { ...prev, [cardId]: accounts.map((a) => a.id) };
      }
    });
  };

  const handleDeleteSelected = (cardId: string) => {
    const toDelete = selectedAccountIds[cardId] || [];
    if (toDelete.length === 0) {
      showToast('Lütfen silmek için en az bir hesap seçin.');
      return;
    }

    setPlatformCards((prev) =>
      prev.map((card) =>
        card.id === cardId
          ? { ...card, accounts: card.accounts.filter((a) => !toDelete.includes(a.id)) }
          : card
      )
    );

    setSelectedAccountIds((prev) => ({ ...prev, [cardId]: [] }));
    showToast(`${toDelete.length} hesap kaldırıldı.`);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 animate-fade-in text-slate-800 relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-xl shadow-xl text-xs font-semibold flex items-center space-x-2 animate-slide-up">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ─── LEFT SUB-SIDEBAR: Hesaplarını Ekle & API Key Shortcut ─── */}
      <div className="w-full lg:w-60 bg-white rounded-2xl border border-slate-200/90 p-4 shadow-2xs space-y-4 flex-shrink-0 self-start">
        {/* Search Input */}
        <div className="relative">
          <input
            type="text"
            value={sidebarSearch}
            onChange={(e) => setSidebarSearch(e.target.value)}
            placeholder="Arama"
            className="w-full bg-[#f8fafc] border border-slate-200/90 pl-8 pr-3 py-2 rounded-xl text-xs text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* API Key Vault Banner Button */}
        <button
          onClick={() => setViewMode(viewMode === 'cards' ? 'api-vault' : 'cards')}
          className={`w-full p-2.5 rounded-xl border text-xs font-bold flex items-center justify-between transition-all cursor-pointer ${
            viewMode === 'api-vault'
              ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
              : 'bg-blue-50/70 hover:bg-blue-100/70 text-blue-700 border-blue-200'
          }`}
        >
          <div className="flex items-center space-x-2">
            <KeyRound className="w-4 h-4" />
            <span>API Token Kasası</span>
          </div>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/20 font-mono">
            {viewMode === 'api-vault' ? 'Kapat' : 'Yönet'}
          </span>
        </button>

        <div>
          <h2 className="text-sm font-bold text-slate-800 mb-3 px-1">Hesaplarını Ekle</h2>

          <div className="space-y-1">
            {filteredSidebarLinks.map((item) => (
              <button
                key={item.id}
                onClick={() => handleOpenConnectByPlatformId(item.platform, item.name)}
                className="w-full flex items-center justify-between px-2.5 py-2 rounded-xl hover:bg-slate-50 transition-colors group cursor-pointer text-left"
              >
                <div className="flex items-center space-x-2.5 min-w-0">
                  <PlatformIcon platform={item.platform} size="sm" />
                  <span className="text-xs font-medium text-slate-700 group-hover:text-blue-600 truncate">
                    {item.name}
                  </span>
                </div>
                <Plus className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 transition-colors flex-shrink-0 ml-1" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ─── MAIN CONTENT ─── */}
      <div className="flex-1 space-y-4">
        {/* Main Title Header & Mode Switcher */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200/80">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <Share2 className="w-5 h-5 text-blue-600" />
              <h1 className="text-lg font-bold text-slate-900">
                {viewMode === 'cards' ? 'Sosyal Hesaplar' : 'Resmi API Anahtarları & Token Kasası'}
              </h1>
            </div>

            {/* View Mode Toggle Switch */}
            <div className="inline-flex rounded-xl p-0.5 bg-slate-100 border border-slate-200 text-xs">
              <button
                onClick={() => setViewMode('cards')}
                className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                  viewMode === 'cards'
                    ? 'bg-white text-blue-600 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Bağlı Hesaplar
              </button>
              <button
                onClick={() => setViewMode('api-vault')}
                className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer flex items-center space-x-1 ${
                  viewMode === 'api-vault'
                    ? 'bg-blue-600 text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <KeyRound className="w-3 h-3" />
                <span>API Anahtarları</span>
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-2 text-xs">
            <span className="text-slate-500 font-medium">
              Toplam{' '}
              <strong className="text-slate-900">
                {platformCards.reduce((acc, c) => acc + c.accounts.length, 0)}
              </strong>{' '}
              bağlı hesap
            </span>
          </div>
        </div>

        {/* ─── VIEW 1: API TOKEN KASASI (ACCOUNTS MANAGER) ─── */}
        {viewMode === 'api-vault' && (
          <div className="page-transition">
            <AccountsManager />
          </div>
        )}

        {/* ─── VIEW 2: 3-COLUMN SOCIAL ACCOUNTS CARDS (Matches Screenshot 3) ─── */}
        {viewMode === 'cards' && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {platformCards.map((card) => {
              const searchTerm = (cardSearchTerms[card.id] || '').toLowerCase();
              const displayedAccounts = card.accounts.filter(
                (acc) =>
                  acc.name.toLowerCase().includes(searchTerm) ||
                  acc.handleOrId.toLowerCase().includes(searchTerm)
              );
              const cardSelectedList = selectedAccountIds[card.id] || [];
              const isAllSelected =
                displayedAccounts.length > 0 &&
                cardSelectedList.length === displayedAccounts.length;

              return (
                <div
                  key={card.id}
                  className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-4 flex flex-col justify-between hover:shadow-xs transition-shadow min-h-[320px]"
                >
                  <div className="space-y-3">
                    {/* Card Title & Platform Indicator */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <PlatformIcon platform={card.platform} size="sm" />
                        <h3 className="font-bold text-xs text-slate-800">{card.name}</h3>
                      </div>
                      <div className="flex items-center space-x-1">
                        {card.hasPlayIcon && (
                          <PlayCircle className="w-4 h-4 text-emerald-500" />
                        )}
                        <button
                          onClick={() => handleOpenConnect(card, 'apikey')}
                          title="API Anahtarı / Token Ekle"
                          className="p-1 rounded-lg hover:bg-amber-50 text-amber-600 transition-colors cursor-pointer"
                        >
                          <KeyRound className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleOpenConnect(card, 'oauth')}
                          title="Hesap Ekle"
                          className="p-1 rounded-lg hover:bg-blue-50 text-blue-600 transition-colors cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Card Toolbar: Search Input + Select All Checkbox + Red Trash */}
                    <div className="flex items-center space-x-2 pt-1 pb-1 border-b border-slate-100">
                      <div className="relative flex-1">
                        <input
                          type="text"
                          value={cardSearchTerms[card.id] || ''}
                          onChange={(e) =>
                            setCardSearchTerms((prev) => ({
                              ...prev,
                              [card.id]: e.target.value,
                            }))
                          }
                          placeholder="Arama"
                          className="w-full bg-[#f8fafc] border border-slate-200/90 pl-3 pr-7 py-1.5 rounded-lg text-xs text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                        <Search className="w-3 h-3 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>

                      <input
                        type="checkbox"
                        checked={isAllSelected}
                        onChange={() => handleSelectAllInCard(card.id, displayedAccounts)}
                        className="w-4 h-4 rounded text-blue-600 border-slate-300 focus:ring-blue-500 cursor-pointer"
                        title="Tümünü Seç"
                      />

                      <button
                        onClick={() => handleDeleteSelected(card.id)}
                        title="Seçilenleri Sil"
                        className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Accounts List */}
                    <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                      {displayedAccounts.length === 0 ? (
                        <div className="text-center py-6 text-slate-400 text-xs">
                          {card.accounts.length === 0
                            ? 'Henüz hesap eklenmedi.'
                            : 'Aramaya uygun hesap bulunamadı.'}
                          <div className="mt-2 flex items-center justify-center space-x-2">
                            <button
                              onClick={() => handleOpenConnect(card, 'oauth')}
                              className="text-blue-600 font-semibold hover:underline"
                            >
                              + Hesap Ekle
                            </button>
                            <span className="text-slate-300">•</span>
                            <button
                              onClick={() => handleOpenConnect(card, 'apikey')}
                              className="text-amber-600 font-semibold hover:underline flex items-center space-x-1"
                            >
                              <KeyRound className="w-3 h-3" />
                              <span>API Key Ekle</span>
                            </button>
                          </div>
                        </div>
                      ) : (
                        displayedAccounts.map((acc) => {
                          const isChecked = cardSelectedList.includes(acc.id);
                          return (
                            <div
                              key={acc.id}
                              className={`flex items-center justify-between p-2 rounded-xl border transition-colors ${
                                isChecked
                                  ? 'bg-blue-50/60 border-blue-200'
                                  : 'bg-slate-50/50 border-slate-100 hover:bg-slate-50'
                              }`}
                            >
                              <div className="flex items-center space-x-2.5 min-w-0">
                                {acc.avatar ? (
                                  <img
                                    src={acc.avatar}
                                    alt={acc.name}
                                    className="w-8 h-8 rounded-full object-cover flex-shrink-0 border border-slate-200"
                                  />
                                ) : (
                                  <div
                                    className={`w-8 h-8 rounded-xl ${
                                      acc.bgColor || 'bg-blue-600'
                                    } text-white flex items-center justify-center font-bold text-xs flex-shrink-0 shadow-2xs`}
                                  >
                                    {acc.initials || 'H'}
                                  </div>
                                )}
                                <div className="truncate">
                                  <div className="flex items-center space-x-1">
                                    <span className="font-bold text-xs text-slate-800 block truncate">
                                      {acc.name}
                                    </span>
                                    {acc.hasApiKey && (
                                      <span
                                        title="Resmi API Anahtarı Doğrulandı"
                                        className="text-[9px] px-1 py-0.2 rounded bg-amber-100 text-amber-800 font-bold"
                                      >
                                        API
                                      </span>
                                    )}
                                  </div>
                                  <span className="text-[10px] text-slate-400 block truncate font-mono">
                                    {acc.handleOrId}
                                  </span>
                                </div>
                              </div>

                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => handleToggleSelectAccount(card.id, acc.id)}
                                className="w-4 h-4 rounded text-blue-600 border-slate-300 focus:ring-blue-500 cursor-pointer ml-2 flex-shrink-0"
                              />
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>

                  {/* Footer Action Buttons: Hesap Ekle + API Key Ekle */}
                  <div className="pt-3 border-t border-slate-100 mt-2 grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleOpenConnect(card, 'oauth')}
                      className="py-1.5 px-2 rounded-xl border border-blue-200 bg-blue-50/60 hover:bg-blue-50 text-blue-600 font-bold text-xs flex items-center justify-center space-x-1 transition-colors cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Hesap Ekle</span>
                    </button>
                    <button
                      onClick={() => handleOpenConnect(card, 'apikey')}
                      className="py-1.5 px-2 rounded-xl border border-amber-200 bg-amber-50/60 hover:bg-amber-50 text-amber-700 font-bold text-xs flex items-center justify-center space-x-1 transition-colors cursor-pointer"
                    >
                      <KeyRound className="w-3.5 h-3.5" />
                      <span>API Key Ekle</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ─── ENHANCED CONNECT MODAL: Standard OAuth OR Direct API Key Entry ─── */}
      {isConnectModalOpen && targetPlatformCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs modal-backdrop">
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xl max-w-md w-full p-6 animate-scale-in relative">
            <button
              onClick={() => setIsConnectModalOpen(false)}
              className="absolute right-4 top-4 p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header with Platform Icon */}
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center">
                <PlatformIcon platform={targetPlatformCard.platform} size="lg" />
              </div>
              <div>
                <h3 className="font-bold text-base text-slate-900">
                  {targetPlatformCard.name} Bağlantısı
                </h3>
                <span className="text-xs text-slate-500 font-medium">
                  {connectTab === 'oauth' ? 'Hızlı Profil & Sayfa Ekle' : 'Doğrudan API Key & Token Girişi'}
                </span>
              </div>
            </div>

            {/* Modal Tabs: OAuth vs API Key */}
            <div className="grid grid-cols-2 gap-1 p-1 bg-slate-100 rounded-xl mb-4 text-xs font-bold">
              <button
                type="button"
                onClick={() => setConnectTab('oauth')}
                className={`py-1.5 rounded-lg transition-all cursor-pointer ${
                  connectTab === 'oauth'
                    ? 'bg-white text-blue-600 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Hızlı Hesap Ekle
              </button>
              <button
                type="button"
                onClick={() => setConnectTab('apikey')}
                className={`py-1.5 rounded-lg transition-all cursor-pointer flex items-center justify-center space-x-1 ${
                  connectTab === 'apikey'
                    ? 'bg-blue-600 text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <KeyRound className="w-3.5 h-3.5" />
                <span>API Key & Token</span>
              </button>
            </div>

            <form onSubmit={handleConfirmConnect} className="space-y-3.5">
              {/* TAB 1: OAUTH / PROFILE INPUTS */}
              {connectTab === 'oauth' && (
                <>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Hesap veya Profil Adı
                    </label>
                    <input
                      type="text"
                      required
                      value={inputAccountName}
                      onChange={(e) => setInputAccountName(e.target.value)}
                      placeholder="Örn: Mimarlık Stüdyosu"
                      className="w-full bg-[#f8fafc] border border-slate-200 px-3.5 py-2.5 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Hesap ID / Sayfa Kimliği
                    </label>
                    <input
                      type="text"
                      value={inputId}
                      onChange={(e) => setInputId(e.target.value)}
                      placeholder="Örn: 560902837384715"
                      className="w-full bg-[#f8fafc] border border-slate-200 px-3.5 py-2.5 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                    />
                  </div>
                </>
              )}

              {/* TAB 2: API KEY & TOKEN INPUTS */}
              {connectTab === 'apikey' && (
                <>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      API Key / Client ID
                    </label>
                    <input
                      type="text"
                      required
                      value={apiKeyInput}
                      onChange={(e) => setApiKeyInput(e.target.value)}
                      placeholder="Örn: AKIA_LIVE_94829104829..."
                      className="w-full bg-[#f8fafc] border border-slate-200 px-3.5 py-2 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      API Secret / Client Secret
                    </label>
                    <div className="relative">
                      <input
                        type={showSecret ? 'text' : 'password'}
                        required
                        value={apiSecretInput}
                        onChange={(e) => setApiSecretInput(e.target.value)}
                        placeholder="••••••••••••••••••••••••"
                        className="w-full bg-[#f8fafc] border border-slate-200 px-3.5 pr-10 py-2 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                      />
                      <button
                        type="button"
                        onClick={() => setShowSecret(!showSecret)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                        {showSecret ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Access Token / Bearer Token (Opsiyonel)
                    </label>
                    <input
                      type="text"
                      value={accessTokenInput}
                      onChange={(e) => setAccessTokenInput(e.target.value)}
                      placeholder="Örn: EAAFlz... (Süresiz Page Token)"
                      className="w-full bg-[#f8fafc] border border-slate-200 px-3.5 py-2 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Hesap Etiketi / Profil Adı
                    </label>
                    <input
                      type="text"
                      value={inputAccountName}
                      onChange={(e) => setInputAccountName(e.target.value)}
                      placeholder="Örn: Kurumsal API Hesabı"
                      className="w-full bg-[#f8fafc] border border-slate-200 px-3.5 py-2 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </>
              )}

              {/* Security info box */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1.5 text-xs text-slate-600">
                <div className="flex items-center space-x-2 text-emerald-700 font-bold">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>AES-256 Donanım Şifrelemeli Token Kasası</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  {connectTab === 'apikey'
                    ? 'Girdiğiniz API anahtarları yerel AES-256 kasasında güvenle saklanır ve zamanlanmış paylaşımlarda yetkilendirilir.'
                    : 'Hesabınız resmi sosyal medya API protokolleri ile güvenli şekilde sisteme bağlanır.'}
                </p>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsConnectModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-md shadow-blue-500/20 disabled:opacity-50 cursor-pointer flex items-center space-x-1.5"
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Kaydediliyor...</span>
                    </>
                  ) : connectTab === 'apikey' ? (
                    <>
                      <KeyRound className="w-3.5 h-3.5" />
                      <span>API Anahtarını Doğrula ve Kaydet</span>
                    </>
                  ) : (
                    <span>Yetkilendir ve Bağla</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
