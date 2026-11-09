'use client';

import React, { useState, useEffect } from 'react';
import {
  Terminal,
  Activity,
  Zap,
  ShieldCheck,
  Code,
  Copy,
  Check,
  X,
  ChevronUp,
  ChevronDown,
  RefreshCw,
  Send,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  Play,
  KeyRound,
  Layers,
  Sparkles,
  Keyboard
} from 'lucide-react';
import { SocialPlatformId } from '@/types';

export interface DevRequestLog {
  id: string;
  time: string;
  method: 'POST' | 'GET' | 'PUT' | 'DELETE';
  url: string;
  status: 200 | 201 | 400 | 429;
  latencyMs: number;
  payload: any;
}

const INITIAL_REQUEST_LOGS: DevRequestLog[] = [
  {
    id: 'req-1',
    time: '12:01:22',
    method: 'POST',
    url: '/api/publish/batch_cluster',
    status: 200,
    latencyMs: 38,
    payload: { platforms: ['twitter', 'instagram'], immediate: true, version: '1.4' },
  },
  {
    id: 'req-2',
    time: '12:00:45',
    method: 'POST',
    url: '/api/accounts/ping',
    status: 200,
    latencyMs: 14,
    payload: { platformId: 'facebook', mode: 'aes256_live' },
  },
  {
    id: 'req-3',
    time: '11:58:10',
    method: 'GET',
    url: '/api/accounts',
    status: 200,
    latencyMs: 22,
    payload: { filter: 'connected_only' },
  },
  {
    id: 'req-4',
    time: '11:55:02',
    method: 'POST',
    url: '/api/media/upload_multipart',
    status: 201,
    latencyMs: 120,
    payload: { filename: 'kampanya-banner.jpg', size: '2.4MB' },
  },
];

interface DevConsoleDrawerProps {
  onDevModeToggle?: (enabled: boolean) => void;
  devModeEnabled?: boolean;
  onInjectDemoData?: () => void;
  onTriggerToast?: (msg: string) => void;
}

export const DevConsoleDrawer: React.FC<DevConsoleDrawerProps> = ({
  onDevModeToggle,
  devModeEnabled = false,
  onInjectDemoData,
  onTriggerToast,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [activeTab, setActiveTab] = useState<'network' | 'webhook' | 'vault' | 'shortcuts' | 'mock'>('network');
  const [logs, setLogs] = useState<DevRequestLog[]>(INITIAL_REQUEST_LOGS);
  const [selectedLog, setSelectedLog] = useState<DevRequestLog | null>(INITIAL_REQUEST_LOGS[0]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Webhook Simulator State
  const [webhookEvent, setWebhookEvent] = useState('instagram.comment.created');
  const [isFiringWebhook, setIsFiringWebhook] = useState(false);

  // Listen to keyboard shortcut: Ctrl + ~ or Ctrl + J
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === '`' || e.key === '~' || e.key === 'j' || e.key === 'J')) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleCopyCurl = (log: DevRequestLog) => {
    const curl = `curl -X ${log.method} https://api.omnipost.io${log.url} \\
  -H "Authorization: Bearer omni_live_sec_8949201948201" \\
  -H "Content-Type: application/json" \\
  -d '${JSON.stringify(log.payload)}'`;

    navigator.clipboard.writeText(curl);
    setCopiedId(log.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleFireWebhook = () => {
    setIsFiringWebhook(true);
    setTimeout(() => {
      const newLog: DevRequestLog = {
        id: `wh-${Date.now()}`,
        time: new Date().toLocaleTimeString('tr-TR'),
        method: 'POST',
        url: `/api/webhooks/${webhookEvent}`,
        status: 200,
        latencyMs: Math.floor(10 + Math.random() * 25),
        payload: {
          event: webhookEvent,
          deliveryId: `del_${Math.random().toString(36).substring(2, 9)}`,
          timestamp: new Date().toISOString(),
          status: 'SUCCESS_DELIVERED',
        },
      };

      setLogs((prev) => [newLog, ...prev]);
      setSelectedLog(newLog);
      setIsFiringWebhook(false);
      onTriggerToast?.(`Webhook Olayı Başarıyla Tetiklendi: ${webhookEvent}`);
    }, 450);
  };

  return (
    <>
      {/* ─── Floating Developer Badge Trigger (Bottom-Right) ─── */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-5 right-5 z-40 px-3.5 py-2 rounded-2xl bg-slate-900/90 hover:bg-slate-900 text-white border border-slate-700/80 shadow-2xl backdrop-blur-md flex items-center space-x-2 text-xs font-mono font-bold transition-all hover:scale-105 hover:shadow-blue-500/20 hover:border-blue-500 cursor-pointer group"
          title="Geliştirici Konsolunu Aç (Kısayol: Ctrl + ~ veya Ctrl + J)"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
          </span>
          <span className="text-blue-400">⚡ DEV TOOLS</span>
          <span className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-slate-800 text-[10px] text-slate-400">
            Ctrl+~
          </span>
        </button>
      )}

      {/* ─── Sliding Developer Console Bottom Drawer ─── */}
      {isOpen && (
        <div
          className={`fixed bottom-0 left-0 right-0 z-50 bg-[#090d16] text-slate-100 border-t border-slate-700 shadow-2xl transition-all duration-300 font-mono ${
            isMinimized ? 'h-12' : 'h-[440px]'
          }`}
        >
          {/* Top Header Bar */}
          <div className="flex items-center justify-between px-4 h-12 bg-slate-900/90 border-b border-slate-800 select-none">
            {/* Left: Title & Live Indicators */}
            <div className="flex items-center space-x-3 text-xs">
              <div className="flex items-center space-x-1.5 font-bold text-white">
                <Terminal className="w-4 h-4 text-blue-400" />
                <span>OmniPost Geliştirici Konsolu</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-600/30 text-blue-400 border border-blue-500/30">
                  v2.4 Live
                </span>
              </div>

              <div className="hidden sm:flex items-center space-x-2 text-[11px] text-slate-400 border-l border-slate-800 pl-3">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>API Gateway: <strong>200 OK (14ms)</strong></span>
                <span>•</span>
                <span>Rate: <strong>142/200 req/m</strong></span>
              </div>
            </div>

            {/* Right: Controls & Dev Mode Toggle */}
            <div className="flex items-center space-x-3 text-xs">
              {/* Dev Mode Switch */}
              <button
                onClick={() => onDevModeToggle?.(!devModeEnabled)}
                className={`px-2.5 py-1 rounded-xl text-[11px] font-bold flex items-center space-x-1.5 transition-all ${
                  devModeEnabled
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-700'
                }`}
                title="Geliştirici Modunu Aç/Kapat (Arayüz kartlarında latency ve JSON rozetleri gösterir)"
              >
                <Zap className="w-3 h-3 text-emerald-400" />
                <span>Geliştirici Modu: {devModeEnabled ? 'AÇIK' : 'KAPALI'}</span>
              </button>

              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1 text-slate-400 hover:text-white transition-colors"
                title={isMinimized ? 'Genişlet' : 'Küçült'}
              >
                {isMinimized ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1 text-slate-400 hover:text-rose-400 transition-colors"
                title="Kapat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Drawer Body (Visible when not minimized) */}
          {!isMinimized && (
            <div className="flex flex-col h-[calc(440px-48px)]">
              {/* Sub-Header Tabs */}
              <div className="flex items-center space-x-1 px-4 py-2 bg-slate-900/60 border-b border-slate-800 text-xs">
                <button
                  onClick={() => setActiveTab('network')}
                  className={`px-3 py-1.5 rounded-lg font-bold flex items-center space-x-1.5 transition-colors ${
                    activeTab === 'network'
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <Activity className="w-3.5 h-3.5" />
                  <span>Ağ Trafiği ({logs.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('webhook')}
                  className={`px-3 py-1.5 rounded-lg font-bold flex items-center space-x-1.5 transition-colors ${
                    activeTab === 'webhook'
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Webhook Simülatörü</span>
                </button>

                <button
                  onClick={() => setActiveTab('vault')}
                  className={`px-3 py-1.5 rounded-lg font-bold flex items-center space-x-1.5 transition-colors ${
                    activeTab === 'vault'
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <KeyRound className="w-3.5 h-3.5" />
                  <span>Token & Kasa</span>
                </button>

                <button
                  onClick={() => setActiveTab('mock')}
                  className={`px-3 py-1.5 rounded-lg font-bold flex items-center space-x-1.5 transition-colors ${
                    activeTab === 'mock'
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Mock Veri Yükleyici</span>
                </button>

                <button
                  onClick={() => setActiveTab('shortcuts')}
                  className={`px-3 py-1.5 rounded-lg font-bold flex items-center space-x-1.5 transition-colors ${
                    activeTab === 'shortcuts'
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <Keyboard className="w-3.5 h-3.5" />
                  <span>Kısayollar</span>
                </button>
              </div>

              {/* TAB 1: NETWORK INSPECTOR */}
              {activeTab === 'network' && (
                <div className="flex-1 flex overflow-hidden divide-x divide-slate-800">
                  {/* Left Requests List */}
                  <div className="w-1/2 overflow-y-auto divide-y divide-slate-800/80 text-xs">
                    {logs.map((log) => {
                      const isSelected = selectedLog?.id === log.id;
                      return (
                        <div
                          key={log.id}
                          onClick={() => setSelectedLog(log)}
                          className={`p-3 flex items-center justify-between cursor-pointer transition-colors ${
                            isSelected ? 'bg-blue-900/30 text-white border-l-2 border-blue-500' : 'hover:bg-slate-800/40 text-slate-300'
                          }`}
                        >
                          <div className="flex items-center space-x-2.5 truncate">
                            <span
                              className={`px-1.5 py-0.5 rounded text-[10px] font-black ${
                                log.method === 'POST' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-sky-500/20 text-sky-400'
                              }`}
                            >
                              {log.method}
                            </span>
                            <span className="truncate font-semibold text-xs">{log.url}</span>
                          </div>

                          <div className="flex items-center space-x-2 flex-shrink-0 text-[11px] text-slate-400">
                            <span className="text-emerald-400 font-bold">{log.status}</span>
                            <span>{log.latencyMs}ms</span>
                            <span className="text-slate-500">{log.time}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Right Request Details & JSON */}
                  <div className="w-1/2 p-4 overflow-y-auto space-y-3 bg-[#070b12] text-xs">
                    {selectedLog ? (
                      <>
                        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                          <div>
                            <span className="text-slate-400 text-[10px] block">İstek Detayı</span>
                            <span className="font-bold text-white text-xs">
                              {selectedLog.method} {selectedLog.url}
                            </span>
                          </div>

                          <button
                            onClick={() => handleCopyCurl(selectedLog)}
                            className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-bold flex items-center space-x-1 transition-colors"
                          >
                            {copiedId === selectedLog.id ? (
                              <>
                                <Check className="w-3 h-3 text-emerald-400" />
                                <span>Kopyalandı</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span>cURL Kopyala</span>
                              </>
                            )}
                          </button>
                        </div>

                        <div>
                          <span className="text-[10px] font-bold text-slate-400 block mb-1">
                            Payload (JSON)
                          </span>
                          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-blue-200 font-mono text-[11px] overflow-x-auto">
                            <pre>{JSON.stringify(selectedLog.payload, null, 2)}</pre>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="text-center py-12 text-slate-500">İstek seçin</div>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 2: WEBHOOK SIMULATOR */}
              {activeTab === 'webhook' && (
                <div className="flex-1 p-6 overflow-y-auto max-w-2xl mx-auto w-full space-y-4">
                  <div>
                    <h4 className="font-bold text-white text-sm">Gelen Webhook Simülatörü</h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Instagram, TikTok veya X webhook olaylarını simüle edin ve otomasyon motorunu canlı test edin.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        Olay Tipi (Event Type)
                      </label>
                      <select
                        value={webhookEvent}
                        onChange={(e) => setWebhookEvent(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 px-3 py-2 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                      >
                        <option value="instagram.comment.created">instagram.comment.created (Yeni Yorum)</option>
                        <option value="tiktok.video.published">tiktok.video.published (Video Yayınlandı)</option>
                        <option value="twitter.mention.detected">twitter.mention.detected (X Bahsetme)</option>
                        <option value="rss.feed.new_article">rss.feed.new_article (Yeni RSS Makalesi)</option>
                      </select>
                    </div>

                    <button
                      onClick={handleFireWebhook}
                      disabled={isFiringWebhook}
                      className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center space-x-2 transition-all shadow-md shadow-blue-500/20 cursor-pointer disabled:opacity-50"
                    >
                      {isFiringWebhook ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          <span>Olay Gönderiliyor...</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3.5 h-3.5 fill-white" />
                          <span>Test Webhook&apos;unu Tetikle</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 3: TOKEN & VAULT STATUS */}
              {activeTab === 'vault' && (
                <div className="flex-1 p-6 overflow-y-auto max-w-2xl mx-auto w-full space-y-4 text-xs">
                  <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between text-white font-bold">
                      <span className="flex items-center space-x-2">
                        <ShieldCheck className="w-4 h-4 text-emerald-400" />
                        <span>AES-256-GCM Donanım Kasası</span>
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400">
                        Korumalı
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-slate-300 text-[11px]">
                      <div>
                        <span className="text-slate-500 block">Kasa Durumu:</span>
                        <strong className="text-white">12 Platform Aktif</strong>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Şifreleme Algoritması:</span>
                        <strong className="text-white">AES-256-GCM / PBKDF2</strong>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Token Sızıntı Koruması:</span>
                        <strong className="text-emerald-400">Aktif (Zero-Leak)</strong>
                      </div>
                      <div>
                        <span className="text-slate-500 block">API Rate Limit Kota:</span>
                        <strong className="text-blue-400">200 req / dakika</strong>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: MOCK DATA INJECTOR */}
              {activeTab === 'mock' && (
                <div className="flex-1 p-6 overflow-y-auto max-w-2xl mx-auto w-full space-y-4 text-xs text-center">
                  <div className="space-y-2">
                    <h4 className="font-bold text-white text-sm">Geliştirici Mock Veri Tohumlayıcı</h4>
                    <p className="text-slate-400 text-xs">
                      Tek tıkla tüm paneli canlı örnek gönderiler, taslaklar ve test verileriyle doldurun.
                    </p>
                  </div>

                  <div className="pt-2 flex justify-center space-x-3">
                    <button
                      onClick={() => {
                        onInjectDemoData?.();
                        onTriggerToast?.('Demo gönderiler ve test hesapları başarıyla yüklendi!');
                      }}
                      className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs transition-all shadow-md shadow-amber-500/20 cursor-pointer flex items-center space-x-1.5"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Tam Demo Veri Tohumla</span>
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 5: KEYBOARD SHORTCUTS */}
              {activeTab === 'shortcuts' && (
                <div className="flex-1 p-6 overflow-y-auto max-w-2xl mx-auto w-full space-y-3 text-xs">
                  <h4 className="font-bold text-white text-sm">Klavye Kısayolları (Geliştirici Hızlandırıcılar)</h4>
                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                      <span className="text-slate-300">Komut Paleti:</span>
                      <kbd className="px-2 py-0.5 rounded bg-slate-800 text-blue-400 border border-slate-700 font-bold">⌘K</kbd>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                      <span className="text-slate-300">Geliştirici Konsolu:</span>
                      <kbd className="px-2 py-0.5 rounded bg-slate-800 text-blue-400 border border-slate-700 font-bold">Ctrl+~</kbd>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                      <span className="text-slate-300">İçeriği Yayınla:</span>
                      <kbd className="px-2 py-0.5 rounded bg-slate-800 text-blue-400 border border-slate-700 font-bold">⌘+Enter</kbd>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                      <span className="text-slate-300">Taslak Kaydet:</span>
                      <kbd className="px-2 py-0.5 rounded bg-slate-800 text-blue-400 border border-slate-700 font-bold">⌘+S</kbd>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
};
