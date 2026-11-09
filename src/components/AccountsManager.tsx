'use client';

import React, { useState, useEffect } from 'react';
import {
  PlatformCredential,
  SocialPlatformId,
  PingResult,
  ConnectionStatus,
  AuthMode,
} from '@/types';
import { PLATFORMS_CONFIG } from '@/lib/constants';
import { PlatformIcon } from '@/components/PlatformIcon';
import {
  KeyRound,
  ShieldCheck,
  RefreshCw,
  Zap,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ExternalLink,
  PlusCircle,
  SlidersHorizontal,
  Lock,
  Eye,
  EyeOff,
  Clock,
  Sparkles,
  Wifi,
  Trash2,
  Check,
  Info,
} from 'lucide-react';

export const AccountsManager: React.FC = () => {
  const [accounts, setAccounts] = useState<PlatformCredential[]>([]);
  const [loading, setLoading] = useState(true);
  const [pingingId, setPingingId] = useState<string | null>(null);
  const [isPingingAll, setIsPingingAll] = useState(false);
  const [filterMode, setFilterMode] = useState<'all' | 'connected' | 'disconnected'>('all');
  const [notification, setNotification] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);

  // Modals state
  const [oauthModalPlatform, setOauthModalPlatform] = useState<PlatformCredential | null>(null);
  const [oauthHandleInput, setOauthHandleInput] = useState('');
  const [isConnectingOAuth, setIsConnectingOAuth] = useState(false);

  const [manualModalPlatform, setManualModalPlatform] = useState<PlatformCredential | null>(null);
  const [manualForm, setManualForm] = useState({
    clientId: '',
    clientSecret: '',
    apiKey: '',
    accessToken: '',
    accountHandle: '',
    mode: 'live' as AuthMode,
  });
  const [showSecret, setShowSecret] = useState(false);
  const [isSavingManual, setIsSavingManual] = useState(false);

  // Load accounts from backend vault
  const fetchAccounts = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/accounts');
      const data = await res.json();
      if (data.success && data.data) {
        setAccounts(data.data);
      }
    } catch (err) {
      showToast('error', 'Hesap bilgileri yüklenemedi.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  const showToast = (type: 'success' | 'error' | 'info', text: string) => {
    setNotification({ type, text });
    setTimeout(() => {
      setNotification((current) => (current?.text === text ? null : current));
    }, 4000);
  };

  // Ping a single platform
  const handlePing = async (platformId: SocialPlatformId) => {
    try {
      setPingingId(platformId);
      const res = await fetch('/api/accounts/ping', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ platformId }),
      });
      const data = await res.json();
      if (data.success && data.data) {
        const pingRes: PingResult = data.data;
        setAccounts((prev) =>
          prev.map((acc) =>
            acc.platformId === platformId
              ? {
                ...acc,
                status: pingRes.status,
                lastPingMs: pingRes.pingMs,
                lastTestedAt: pingRes.timestamp,
                lastError: pingRes.success ? undefined : pingRes.message,
              }
              : acc
          )
        );
        if (pingRes.success) {
          showToast('success', `${PLATFORMS_CONFIG[platformId].name} aktif! Yanıt süresi: ${pingRes.pingMs}ms`);
        } else {
          showToast('error', `${PLATFORMS_CONFIG[platformId].name}: ${pingRes.message}`);
        }
      }
    } catch (e: any) {
      showToast('error', 'Ping işlemi sırasında hata oluştu.');
    } finally {
      setPingingId(null);
    }
  };

  // Ping all platforms concurrently
  const handlePingAll = async () => {
    try {
      setIsPingingAll(true);
      const res = await fetch('/api/accounts/ping', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      });
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        const results: PingResult[] = data.data;
        setAccounts((prev) =>
          prev.map((acc) => {
            const found = results.find((r) => r.platformId === acc.platformId);
            if (found) {
              return {
                ...acc,
                status: found.status,
                lastPingMs: found.pingMs,
                lastTestedAt: found.timestamp,
                lastError: found.success ? undefined : found.message,
              };
            }
            return acc;
          })
        );
        showToast('success', `Tüm platformlar test edildi. (${results.filter((r) => r.success).length}/${results.length} aktif)`);
      }
    } catch (e) {
      showToast('error', 'Toplu ping testi başarısız.');
    } finally {
      setIsPingingAll(false);
    }
  };

  // Disconnect account
  const handleDisconnect = async (platformId: SocialPlatformId) => {
    if (!confirm(`${PLATFORMS_CONFIG[platformId].name} hesabının bağlantısını kesmek istediğinize emin misiniz?`)) {
      return;
    }
    try {
      const res = await fetch(`/api/accounts?platformId=${platformId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) {
        showToast('info', `${PLATFORMS_CONFIG[platformId].name} bağlantısı kesildi.`);
        fetchAccounts();
      }
    } catch (e) {
      showToast('error', 'Bağlantı kesilemedi.');
    }
  };

  // Open OAuth Simulator Modal
  const openOAuthModal = (account: PlatformCredential) => {
    setOauthModalPlatform(account);
    setOauthHandleInput(account.accountHandle || `@omnipost_${account.platformId}`);
  };

  // Execute Simulated OAuth Handshake
  const handleCompleteOAuth = async () => {
    if (!oauthModalPlatform) return;
    try {
      setIsConnectingOAuth(true);
      const res = await fetch('/api/accounts/connect-mock', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          platformId: oauthModalPlatform.platformId,
          accountHandle: oauthHandleInput,
        }),
      });
      const data = await res.json();
      if (data.success) {
        showToast('success', `${oauthModalPlatform.platformName} OAuth ile başarıyla bağlandı!`);
        setOauthModalPlatform(null);
        fetchAccounts();
      } else {
        showToast('error', data.error || 'Bağlantı kurulamadı.');
      }
    } catch (e) {
      showToast('error', 'OAuth el sıkışma hatası.');
    } finally {
      setIsConnectingOAuth(false);
    }
  };

  // Refresh expired token
  const handleRefreshToken = async (platformId: SocialPlatformId) => {
    try {
      const res = await fetch('/api/accounts/refresh-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ platformId }),
      });
      const data = await res.json();
      if (data.success) {
        showToast('success', `${PLATFORMS_CONFIG[platformId].name} erişim token'ı 30 gün uzatıldı.`);
        fetchAccounts();
      }
    } catch (e) {
      showToast('error', 'Token yenilenemedi.');
    }
  };

  // Open Manual Credential Modal
  const openManualModal = (account: PlatformCredential) => {
    setManualModalPlatform(account);
    setManualForm({
      clientId: account.clientId || '',
      clientSecret: '',
      apiKey: '',
      accessToken: '',
      accountHandle: account.accountHandle || '',
      mode: 'live',
    });
    setShowSecret(false);
  };

  // Save Manual Credentials
  const handleSaveManual = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualModalPlatform) return;
    try {
      setIsSavingManual(true);
      const res = await fetch('/api/accounts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          platformId: manualModalPlatform.platformId,
          mode: manualForm.mode,
          clientId: manualForm.clientId,
          clientSecret: manualForm.clientSecret,
          apiKey: manualForm.apiKey,
          accessToken: manualForm.accessToken,
          accountHandle: manualForm.accountHandle,
        }),
      });
      const data = await res.json();
      if (data.success) {
        showToast('success', `${manualModalPlatform.platformName} anahtarları AES-256 kasasına kaydedildi!`);
        setManualModalPlatform(null);
        fetchAccounts();
      } else {
        showToast('error', data.error || 'Kaydedilemedi.');
      }
    } catch (e) {
      showToast('error', 'Kaydetme sırasında bir hata oluştu.');
    } finally {
      setIsSavingManual(false);
    }
  };

  // Reset to default sample vault
  const handleResetDefaults = async () => {
    if (!confirm('Token kasasını varsayılan güvenli ayarlarına sıfırlamak istiyor musunuz?')) return;
    try {
      const res = await fetch('/api/accounts/reset', { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        showToast('info', 'Token kasası sıfırlandı.');
        fetchAccounts();
      }
    } catch (e) {
      showToast('error', 'Sıfırlama başarısız.');
    }
  };

  // Filtered accounts
  const filteredAccounts = accounts.filter((acc) => {
    if (filterMode === 'connected') return acc.status === 'connected';
    if (filterMode === 'disconnected') return acc.status !== 'connected';
    return true;
  });

  const connectedCount = accounts.filter((a) => a.status === 'connected').length;

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {notification && (
        <div
          className={`p-4 rounded-xl text-xs font-semibold flex items-center justify-between shadow-md transition-all animate-in fade-in slide-in-from-top-2 ${notification.type === 'success'
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
              : notification.type === 'error'
                ? 'bg-rose-50 text-rose-800 border border-rose-200'
                : 'bg-blue-50 text-blue-800 border border-blue-200'
            }`}
        >
          <div className="flex items-center space-x-2">
            {notification.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
            {notification.type === 'error' && <AlertTriangle className="w-4 h-4 text-rose-600" />}
            {notification.type === 'info' && <Info className="w-4 h-4 text-blue-600" />}
            <span>{notification.text}</span>
          </div>
          <button
            onClick={() => setNotification(null)}
            className="text-slate-400 hover:text-slate-600 ml-4 font-bold"
          >
            ✕
          </button>
        </div>
      )}

      {/* Top Banner & Control Deck */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-100">
          <div>
            <div className="flex items-center space-x-2.5">
              <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
                <KeyRound className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-slate-900">
                  Sosyal Medya API & Bağlı Hesaplar Kasası
                </h1>
                <p className="text-xs text-slate-500 mt-0.5">
                  OAuth 2.0 kimlik bilgileri, API anahtarları ve şifrelenmiş token kasası yönetimi.
                </p>
              </div>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePingAll}
              disabled={isPingingAll}
              className="px-3.5 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 disabled:opacity-50 transition-all flex items-center space-x-2 shadow-xs"
            >
              <Zap className={`w-3.5 h-3.5 ${isPingingAll ? 'animate-bounce' : ''}`} />
              <span>{isPingingAll ? 'Test Ediliyor...' : 'Tümünü Test Et (Ping All)'}</span>
            </button>
            <button
              onClick={handleResetDefaults}
              className="px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-600 text-xs font-medium hover:bg-slate-100 transition-colors"
              title="Varsayılan simüle hesapları geri yükle"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Status Metrics Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          {/* Metric 1: Connection Health */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-medium text-slate-500 block">Bağlı Hesap Durumu</span>
              <span className="text-base font-bold text-slate-800">
                {connectedCount} / {accounts.length} Platform Aktif
              </span>
            </div>
            <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
              %{Math.round((connectedCount / (accounts.length || 1)) * 100)}
            </div>
          </div>

          {/* Metric 2: Security Vault */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-medium text-slate-500 block">Token Kasası Güvenliği</span>
              <span className="text-base font-bold text-slate-800 flex items-center space-x-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>AES-256-CBC Aktif</span>
              </span>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
              Şifreli Depo
            </span>
          </div>

          {/* Metric 3: Protocol Support */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-medium text-slate-500 block">Protokol & Motor</span>
              <span className="text-base font-bold text-slate-800">OAuth 2.0 PKCE + Mock</span>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-bold border border-blue-200">
              Hibrit Mod
            </span>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center space-x-1.5 bg-slate-100 p-1 rounded-xl text-xs font-medium">
            <button
              onClick={() => setFilterMode('all')}
              className={`px-3 py-1.5 rounded-lg transition-all ${filterMode === 'all'
                  ? 'bg-white text-slate-900 font-bold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
                }`}
            >
              Tüm Platformlar ({accounts.length})
            </button>
            <button
              onClick={() => setFilterMode('connected')}
              className={`px-3 py-1.5 rounded-lg transition-all ${filterMode === 'connected'
                  ? 'bg-white text-slate-900 font-bold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
                }`}
            >
              Bağlı Olanlar ({connectedCount})
            </button>
            <button
              onClick={() => setFilterMode('disconnected')}
              className={`px-3 py-1.5 rounded-lg transition-all ${filterMode === 'disconnected'
                  ? 'bg-white text-slate-900 font-bold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
                }`}
            >
              Bağlantı Bekleyenler ({accounts.length - connectedCount})
            </button>
          </div>
          <span className="text-xs text-slate-400 hidden sm:inline">
            Canlı ve simülasyon hesapları birlikte yönetin
          </span>
        </div>
      </div>

      {/* Platform Cards Grid */}
      {loading ? (
        <div className="p-12 text-center text-slate-400 text-xs flex flex-col items-center justify-center space-y-2">
          <RefreshCw className="w-6 h-6 animate-spin text-blue-600" />
          <span>Token Kasası Yükleniyor...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredAccounts.map((account) => {
            const config = PLATFORMS_CONFIG[account.platformId];
            const isPinging = pingingId === account.platformId;
            const isConnected = account.status === 'connected';
            const isExpired = account.status === 'expired';

            return (
              <div
                key={account.platformId}
                className="glow-card bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between space-y-4 group"
              >
                {/* Header: Platform Logo, Name, Status Badge */}
                <div>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-11 h-11 rounded-2xl flex items-center justify-center bg-slate-50 border border-slate-200/80 shadow-2xs group-hover:scale-105 transition-transform shrink-0">
                        <PlatformIcon platformId={account.platformId} size={24} />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="font-bold text-sm text-slate-900">
                            {account.platformName}
                          </h3>
                          <span
                            className={`text-[10px] px-2 py-0.5 rounded-md font-bold uppercase tracking-wider ${account.mode === 'mock'
                                ? 'bg-amber-50 text-amber-700 border border-amber-200'
                                : 'bg-purple-50 text-purple-700 border border-purple-200'
                              }`}
                          >
                            {account.mode === 'mock' ? 'Simülatör' : 'Canlı API'}
                          </span>
                        </div>
                        <span className="text-xs text-slate-500 font-medium block mt-0.5">
                          {account.accountHandle || 'Bağlı hesap yok'}
                        </span>
                      </div>
                    </div>

                    {/* Status Badge */}
                    <div>
                      {isConnected && (
                        <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold flex items-center space-x-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Bağlı</span>
                        </span>
                      )}
                      {isExpired && (
                        <span className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-xs font-semibold flex items-center space-x-1">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          <span>Token Doldu</span>
                        </span>
                      )}
                      {!isConnected && !isExpired && (
                        <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200 text-xs font-medium flex items-center space-x-1">
                          <XCircle className="w-3.5 h-3.5" />
                          <span>Bağlı Değil</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Account Profile Snippet if connected */}
                  {isConnected && account.accountAvatar && (
                    <div className="mt-3.5 flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                      <div className="flex items-center space-x-2.5">
                        <img
                          src={account.accountAvatar}
                          alt={`${account.platformName} profil avatarı`}
                          className="w-8 h-8 rounded-full object-cover border border-slate-200"
                        />
                        <div>
                          <span className="text-xs font-bold text-slate-800 block leading-tight">
                            {account.accountName}
                          </span>
                          <span className="text-[10px] text-slate-400">
                            {account.accountFollowers || 'Yetkilendirilmiş Profil'}
                          </span>
                        </div>
                      </div>
                      {account.lastPingMs && (
                        <div className="text-right">
                          <span className="text-[10px] text-slate-400 block font-mono">Gecikme</span>
                          <span className="text-xs font-bold text-emerald-600 font-mono">
                            ⚡ {account.lastPingMs} ms
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Masked Credentials & Token Vault Info Box */}
                  <div className="mt-3 p-3 rounded-xl bg-slate-50/80 border border-slate-100 space-y-2 text-xs font-mono">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-slate-400 flex items-center space-x-1">
                        <Lock className="w-3 h-3 text-slate-400" />
                        <span>Client ID:</span>
                      </span>
                      <span className="text-slate-700 truncate max-w-[180px]">
                        {account.clientId || 'Yok / OAuth Otomatik'}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-slate-400 flex items-center space-x-1">
                        <ShieldCheck className="w-3 h-3 text-emerald-600" />
                        <span>Access Token:</span>
                      </span>
                      <span className="text-slate-800 font-bold">
                        {account.accessTokenMasked || '••••••••'}
                      </span>
                    </div>

                    {account.tokenExpiresAt && (
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-slate-400 flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>Geçerlilik:</span>
                        </span>
                        <span className="text-emerald-700 font-medium">
                          {new Date(account.tokenExpiresAt).toLocaleDateString('tr-TR')} (Aktif)
                        </span>
                      </div>
                    )}

                    {/* Quota Progress Bar if available */}
                    {account.quota && (
                      <div className="pt-2 border-t border-slate-200/60 space-y-1">
                        <div className="flex items-center justify-between text-[10px]">
                          <span className="text-slate-500 font-sans">Kota Kullanımı:</span>
                          <span className="font-bold text-slate-700">
                            {account.quota.used} / {account.quota.limit} {account.quota.unit}
                          </span>
                        </div>
                        <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                          <div
                            className="bg-blue-600 h-full rounded-full transition-all"
                            style={{
                              width: `${Math.min(
                                100,
                                Math.round((account.quota.used / account.quota.limit) * 100)
                              )}%`,
                            }}
                          />
                        </div>
                      </div>
                    )}

                    {account.lastError && (
                      <div className="p-2 rounded-lg bg-rose-50 border border-rose-100 text-rose-700 text-[11px] font-sans flex items-start space-x-1.5">
                        <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                        <span>{account.lastError}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Bottom Card Actions */}
                <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-2">
                  {isConnected ? (
                    <>
                      <button
                        onClick={() => handlePing(account.platformId)}
                        disabled={isPinging}
                        className="flex-1 py-1.5 px-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 font-semibold text-xs text-slate-700 transition-colors flex items-center justify-center space-x-1.5 shadow-2xs"
                      >
                        <RefreshCw className={`w-3.5 h-3.5 ${isPinging ? 'animate-spin text-blue-600' : ''}`} />
                        <span>{isPinging ? 'Test Ediliyor...' : 'Ping Testi'}</span>
                      </button>

                      {isExpired && (
                        <button
                          onClick={() => handleRefreshToken(account.platformId)}
                          className="py-1.5 px-3 rounded-xl bg-amber-500 text-white font-semibold text-xs hover:bg-amber-600 transition-colors flex items-center space-x-1"
                        >
                          <RefreshCw className="w-3.5 h-3.5" />
                          <span>Yenile</span>
                        </button>
                      )}

                      <button
                        onClick={() => openManualModal(account)}
                        className="py-1.5 px-3 rounded-xl border border-slate-200 hover:border-slate-300 bg-slate-50 text-slate-700 font-semibold text-xs transition-colors flex items-center space-x-1"
                        title="API Anahtarlarını Düzenle"
                      >
                        <SlidersHorizontal className="w-3.5 h-3.5" />
                        <span>Düzenle</span>
                      </button>

                      <button
                        onClick={() => handleDisconnect(account.platformId)}
                        className="p-1.5 rounded-xl border border-slate-200 text-slate-400 hover:text-rose-600 hover:border-rose-200 transition-colors"
                        title="Hesap Bağlantısını Kes"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => openOAuthModal(account)}
                        className="flex-1 py-2 px-3 rounded-xl bg-blue-600 text-white font-semibold text-xs hover:bg-blue-700 transition-colors flex items-center justify-center space-x-1.5 shadow-xs"
                      >
                        <Zap className="w-3.5 h-3.5" />
                        <span>OAuth ile Hızlı Bağlan</span>
                      </button>

                      <button
                        onClick={() => openManualModal(account)}
                        className="py-2 px-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-colors"
                      >
                        Manuel Anahtar
                      </button>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* MODAL 1: OAuth 2.0 PKCE Handshake Simulator */}
      {oauthModalPlatform && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-md w-full border border-slate-200 shadow-xl overflow-hidden">
            {/* Modal Header */}
            <div className="p-6 bg-slate-50 border-b border-slate-100 flex items-center space-x-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm"
                style={{
                  backgroundColor:
                    PLATFORMS_CONFIG[oauthModalPlatform.platformId]?.color || '#3b82f6',
                }}
              >
                {PLATFORMS_CONFIG[oauthModalPlatform.platformId]?.shortName?.slice(0, 2)}
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900">
                  {oauthModalPlatform.platformName} OAuth Yetkilendirmesi
                </h3>
                <span className="text-xs text-slate-500">OAuth 2.0 PKCE İzin Onayı</span>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-100 text-xs text-blue-900 space-y-1">
                <span className="font-bold block">OmniPost İzin İstiyor:</span>
                <p className="text-[11px] text-blue-700">
                  OmniPost, seçtiğiniz bu platforma gönderi gönderebilmek ve kotaları takip edebilmek için aşağıdaki izinleri talep ediyor:
                </p>
              </div>

              {/* Scopes List */}
              <div className="space-y-2 text-xs">
                {(oauthModalPlatform.scopes.length > 0
                  ? oauthModalPlatform.scopes
                  : ['publish_content', 'read_profile', 'offline_access']
                ).map((scope, idx) => (
                  <div key={idx} className="flex items-center space-x-2 text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="font-mono text-[11px] bg-slate-100 px-1.5 py-0.5 rounded">
                      {scope}
                    </span>
                  </div>
                ))}
              </div>

              {/* Account Handle Input */}
              <div className="space-y-1 pt-2">
                <label className="text-xs font-semibold text-slate-700 block">
                  Bağlanacak Kullanıcı Adı / Kanal:
                </label>
                <input
                  type="text"
                  value={oauthHandleInput}
                  onChange={(e) => setOauthHandleInput(e.target.value)}
                  placeholder="@kullanici_adiniz"
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end space-x-2">
              <button
                type="button"
                onClick={() => setOauthModalPlatform(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-200 transition-colors"
              >
                İptal
              </button>
              <button
                type="button"
                onClick={handleCompleteOAuth}
                disabled={isConnectingOAuth}
                className="px-5 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 disabled:opacity-50 transition-colors flex items-center space-x-2 shadow-xs"
              >
                {isConnectingOAuth && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
                <span>{isConnectingOAuth ? 'Yetkilendiriliyor...' : 'İzin Ver & Bağlan'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: Manual API Key / Secret Form */}
      {manualModalPlatform && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <form
            onSubmit={handleSaveManual}
            className="bg-white rounded-2xl max-w-lg w-full border border-slate-200 shadow-xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="p-6 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
                  <SlidersHorizontal className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900">
                    {manualModalPlatform.platformName} API Anahtarları
                  </h3>
                  <span className="text-xs text-slate-500">
                    AES-256 Korumalı Token Kasası Tanımlama
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setManualModalPlatform(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              {/* Mode Toggle */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div>
                  <span className="text-xs font-bold text-slate-800 block">Çalışma Modu</span>
                  <span className="text-[11px] text-slate-500">
                    Gerçek API kotalarını harcamadan simülasyon veya canlı üretim API.
                  </span>
                </div>
                <div className="flex items-center space-x-1 bg-white p-1 rounded-lg border border-slate-200">
                  <button
                    type="button"
                    onClick={() => setManualForm((f) => ({ ...f, mode: 'mock' }))}
                    className={`px-2.5 py-1 text-xs rounded-md font-semibold transition-all ${manualForm.mode === 'mock'
                        ? 'bg-amber-100 text-amber-900 shadow-xs'
                        : 'text-slate-500 hover:text-slate-800'
                      }`}
                  >
                    Simülasyon
                  </button>
                  <button
                    type="button"
                    onClick={() => setManualForm((f) => ({ ...f, mode: 'live' }))}
                    className={`px-2.5 py-1 text-xs rounded-md font-semibold transition-all ${manualForm.mode === 'live'
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'text-slate-500 hover:text-slate-800'
                      }`}
                  >
                    Canlı API
                  </button>
                </div>
              </div>

              {/* Account Handle */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 block">
                  Hesap Adı / Kullanıcı Adı
                </label>
                <input
                  type="text"
                  value={manualForm.accountHandle}
                  onChange={(e) => setManualForm({ ...manualForm, accountHandle: e.target.value })}
                  placeholder="@hesap_adi"
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              {/* Client ID / App ID */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 block">
                  Client ID / App ID
                </label>
                <input
                  type="text"
                  value={manualForm.clientId}
                  onChange={(e) => setManualForm({ ...manualForm, clientId: e.target.value })}
                  placeholder="Örn: 882190-apps.googleusercontent.com veya App ID"
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl font-mono focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              {/* Client Secret */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-700 block">
                    Client Secret / App Secret
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowSecret(!showSecret)}
                    className="text-[11px] text-blue-600 flex items-center space-x-1"
                  >
                    {showSecret ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                    <span>{showSecret ? 'Gizle' : 'Göster'}</span>
                  </button>
                </div>
                <input
                  type={showSecret ? 'text' : 'password'}
                  value={manualForm.clientSecret}
                  onChange={(e) => setManualForm({ ...manualForm, clientSecret: e.target.value })}
                  placeholder="Gizli Anahtar (Şifrelenerek saklanır)"
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl font-mono focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              {/* Access Token / Bearer */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 block">
                  Access Token / Bearer Token (Opsiyonel)
                </label>
                <input
                  type={showSecret ? 'text' : 'password'}
                  value={manualForm.accessToken}
                  onChange={(e) => setManualForm({ ...manualForm, accessToken: e.target.value })}
                  placeholder="ya29... veya Bearer token"
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl font-mono focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600 flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  Girdiğiniz tüm gizli anahtarlar sunucuda <strong>AES-256-CBC</strong> ile şifrelenir ve arayüze yalnızca maskeli şekilde sunulur.
                </span>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end space-x-2">
              <button
                type="button"
                onClick={() => setManualModalPlatform(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-200 transition-colors"
              >
                Vazgeç
              </button>
              <button
                type="submit"
                disabled={isSavingManual}
                className="px-5 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 disabled:opacity-50 transition-colors flex items-center space-x-2 shadow-xs"
              >
                {isSavingManual && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
                <span>{isSavingManual ? 'Şifreleniyor...' : 'Kasaya Kaydet & Test Et'}</span>
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
