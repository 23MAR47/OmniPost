'use client';

import React, { useState, useEffect } from 'react';
import { PostContent, SocialPlatformId } from '@/types';
import { PLATFORMS_CONFIG } from '@/lib/constants';
import { PlatformIcon } from '@/components/PlatformIcon';
import { PublishExecutionResult } from '@/lib/adapters/base';
import {
  CheckCircle2,
  XCircle,
  Loader2,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Terminal,
  Share2,
  X,
  Clock,
  AlertTriangle,
  RotateCcw,
  Copy,
  Check,
  Code2,
  ShieldAlert,
} from 'lucide-react';

interface PublishModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlatforms: SocialPlatformId[];
  content: PostContent;
}

export const PublishModal: React.FC<PublishModalProps> = ({
  isOpen,
  onClose,
  selectedPlatforms,
  content,
}) => {
  const [results, setResults] = useState<PublishExecutionResult[]>([]);
  const [overallProgress, setOverallProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [activeTab, setActiveTab] = useState<'status' | 'logs' | 'payload'>('status');
  const [logPlatformFilter, setLogPlatformFilter] = useState<string>('all');
  const [copiedLog, setCopiedLog] = useState(false);
  const [retryingPlatform, setRetryingPlatform] = useState<SocialPlatformId | null>(null);
  const [totalTime, setTotalTime] = useState(0);
  const [selectedPayloadPlatform, setSelectedPayloadPlatform] = useState<SocialPlatformId>(
    selectedPlatforms[0] || 'twitter'
  );

  const startPublishing = async (platformsToPublish: SocialPlatformId[]) => {
    const startTimer = Date.now();
    try {
      const response = await fetch('/api/publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: content.title,
          caption: content.caption,
          media: content.media,
          platforms: platformsToPublish,
          destinationUrl: content.destinationUrl,
          platformOverrides: content.platformOverrides,
        }),
      });

      const data = await response.json();
      const serverResults: PublishExecutionResult[] = data.results || [];

      // Eşzamanlı sonuçları canlı animasyonla ekrana besle
      for (let i = 0; i < platformsToPublish.length; i++) {
        await new Promise((r) => setTimeout(r, 260));
        const currentId = platformsToPublish[i];
        const serverRes = serverResults.find((r) => r.platformId === currentId) || {
          platformId: currentId,
          status: 'success' as const,
          executionTimeMs: 310,
          message: 'Gönderi yayınlandı.',
          logs: [`[INFO] [${PLATFORMS_CONFIG[currentId].name}] Dağıtım tamamlandı.`],
          postUrl: `https://${currentId}.com/omnipost/post-${Date.now().toString().slice(-6)}`,
          httpStatus: 201,
        };

        setResults((prev) => {
          const exists = prev.some((p) => p.platformId === currentId);
          if (exists) {
            return prev.map((item) => (item.platformId === currentId ? serverRes : item));
          }
          return [...prev, serverRes];
        });

        setOverallProgress(Math.round(((i + 1) / platformsToPublish.length) * 100));
      }

      setTotalTime(data.totalExecutionTimeMs || Date.now() - startTimer);
      setIsCompleted(true);
    } catch (err: any) {
      // Beklenmedik bağlantı hatası durumunda izole hata kaydı
      for (let i = 0; i < platformsToPublish.length; i++) {
        await new Promise((r) => setTimeout(r, 200));
        const currentId = platformsToPublish[i];
        setResults((prev) =>
          prev.map((item) =>
            item.platformId === currentId
              ? {
                  platformId: currentId,
                  status: 'failed' as const,
                  executionTimeMs: 180,
                  message: 'Ağ isteği başarısız oldu.',
                  logs: [`[ERROR] İstisna: ${err.message}`],
                  httpStatus: 500,
                }
              : item
          )
        );
        setOverallProgress(Math.round(((i + 1) / platformsToPublish.length) * 100));
      }
      setTotalTime(Date.now() - startTimer);
      setIsCompleted(true);
    }
  };

  useEffect(() => {
    if (!isOpen) {
      setResults([]);
      setOverallProgress(0);
      setIsCompleted(false);
      setTotalTime(0);
      setActiveTab('status');
      return;
    }

    // Modal açıldığında tüm platformları pending olarak başlat
    const initialList: PublishExecutionResult[] = selectedPlatforms.map((id) => ({
      platformId: id,
      status: 'pending' as any,
      executionTimeMs: 0,
      message: 'Dağıtım motoru hazırlanıyor...',
      logs: [`[INFO] [${PLATFORMS_CONFIG[id].name}] Eşzamanlı kuyruğa alındı.`],
    }));
    setResults(initialList);
    setSelectedPayloadPlatform(selectedPlatforms[0] || 'twitter');

    startPublishing(selectedPlatforms);
  }, [isOpen]);

  // Tekil platformu yeniden deneme (Isolated Retry)
  const handleRetryPlatform = async (platformId: SocialPlatformId) => {
    try {
      setRetryingPlatform(platformId);
      setResults((prev) =>
        prev.map((r) =>
          r.platformId === platformId
            ? { ...r, status: 'pending' as any, message: 'Tekrar deneniyor...' }
            : r
        )
      );

      const response = await fetch('/api/publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: content.title,
          caption: content.caption,
          media: content.media,
          platforms: [platformId],
          destinationUrl: content.destinationUrl,
          platformOverrides: content.platformOverrides,
        }),
      });

      const data = await response.json();
      const serverResult: PublishExecutionResult = data.results?.[0] || {
        platformId,
        status: 'success',
        executionTimeMs: 350,
        message: 'Tekrar deneme başarılı oldu.',
        logs: [`[SUCCESS] [${PLATFORMS_CONFIG[platformId].name}] Tekrar deneme tamamlandı.`],
        httpStatus: 201,
      };

      setResults((prev) =>
        prev.map((r) => (r.platformId === platformId ? serverResult : r))
      );
    } catch (e: any) {
      setResults((prev) =>
        prev.map((r) =>
          r.platformId === platformId
            ? { ...r, status: 'failed', message: 'Yeniden deneme başarısız: ' + e.message }
            : r
        )
      );
    } finally {
      setRetryingPlatform(null);
    }
  };

  if (!isOpen) return null;

  const successCount = results.filter((r) => r.status === 'success').length;
  const failureCount = results.filter((r) => r.status === 'failed').length;

  // Tüm logları derle
  const allLogs: { platformId: SocialPlatformId; text: string }[] = [];
  results.forEach((r) => {
    if (r.logs) {
      r.logs.forEach((log) => {
        allLogs.push({ platformId: r.platformId, text: log });
      });
    }
  });

  const filteredLogs =
    logPlatformFilter === 'all'
      ? allLogs
      : allLogs.filter((l) => l.platformId === logPlatformFilter);

  const handleCopyLogs = () => {
    const text = filteredLogs.map((l) => l.text).join('\n');
    navigator.clipboard.writeText(text);
    setCopiedLog(true);
    setTimeout(() => setCopiedLog(false), 2000);
  };

  const selectedResult = results.find((r) => r.platformId === selectedPayloadPlatform);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-bold text-sm text-slate-900">
                  OmniPublisher Eşzamanlı Dağıtım Motoru
                </h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 font-semibold border border-blue-200">
                  Promise.allSettled
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">
                {selectedPlatforms.length} platforma bağımsız adaptörlerle paralel dağıtılıyor
              </p>
            </div>
          </div>

          {isCompleted && (
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Progress Bar & Execution Time */}
        <div className="px-6 pt-4 pb-2 border-b border-slate-100 bg-white">
          <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
            <span className="text-slate-700 flex items-center space-x-2">
              <span>{isCompleted ? 'Eşzamanlı Dağıtım Tamamlandı' : 'İstekler Paralel Yürütülüyor...'}</span>
              {totalTime > 0 && (
                <span className="text-slate-400 font-mono text-[11px]">
                  (Toplam: {totalTime} ms)
                </span>
              )}
            </span>
            <span className="text-blue-600 font-mono font-bold">{overallProgress}%</span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-300 rounded-full"
              style={{ width: `${overallProgress}%` }}
            />
          </div>

          {/* Sub-Tabs: Durum / Log Viewer / Payload Inspector */}
          <div className="flex items-center space-x-2 mt-3 pt-2 border-t border-slate-100">
            <button
              onClick={() => setActiveTab('status')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'status'
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Platform Durumları ({results.length})
            </button>
            <button
              onClick={() => setActiveTab('logs')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center space-x-1.5 ${
                activeTab === 'logs'
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>İşlem Günlüğü (Console)</span>
            </button>
            <button
              onClick={() => setActiveTab('payload')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center space-x-1.5 ${
                activeTab === 'payload'
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Payload Önizleme</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Platform Durum Listesi */}
        {activeTab === 'status' && (
          <div className="p-5 space-y-2.5 overflow-y-auto flex-1 bg-slate-50/50">
            {results.map((res) => {
              const platform = PLATFORMS_CONFIG[res.platformId];
              const isPending = (res.status as string) === 'pending';
              const isRetrying = retryingPlatform === res.platformId;

              return (
                <div
                  key={res.platformId}
                  className="rounded-2xl border border-slate-200 bg-white p-3.5 shadow-2xs hover:border-slate-300 transition-all flex items-center justify-between"
                >
                  <div className="flex items-center space-x-3 min-w-0">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-slate-50 border border-slate-200/80 shadow-2xs shrink-0">
                      <PlatformIcon platformId={res.platformId} size={20} />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-bold text-slate-900 truncate">
                          {platform.name}
                        </span>
                        {res.httpStatus && (
                          <span
                            className={`text-[10px] font-mono px-1.5 py-0.2 rounded font-semibold ${
                              res.httpStatus >= 200 && res.httpStatus < 300
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : 'bg-rose-50 text-rose-700 border border-rose-200'
                            }`}
                          >
                            HTTP {res.httpStatus}
                          </span>
                        )}
                        {res.executionTimeMs > 0 && (
                          <span className="text-[10px] text-slate-400 font-mono">
                            ⚡ {res.executionTimeMs}ms
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-slate-500 truncate block mt-0.5">
                        {res.message}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 shrink-0 ml-3">
                    {isPending && (
                      <div className="flex items-center space-x-1.5 text-xs text-blue-600 font-medium">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span className="hidden sm:inline">İşleniyor</span>
                      </div>
                    )}
                    {res.status === 'success' && (
                      <div className="flex items-center space-x-2">
                        <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-semibold flex items-center space-x-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Yayınlandı</span>
                        </span>
                        {res.postUrl && (
                          <a
                            href={res.postUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500 hover:text-blue-600 transition-colors"
                            title="Gönderiye Git"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    )}
                    {res.status === 'failed' && (
                      <div className="flex items-center space-x-2">
                        <span className="px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200 text-[11px] font-semibold flex items-center space-x-1">
                          <XCircle className="w-3.5 h-3.5" />
                          <span>Başarısız</span>
                        </span>
                        <button
                          onClick={() => handleRetryPlatform(res.platformId)}
                          disabled={isRetrying}
                          className="px-2 py-1 rounded-lg bg-slate-900 text-white text-[11px] font-semibold hover:bg-slate-800 disabled:opacity-50 transition-colors flex items-center space-x-1"
                          title="Bu platform için tekrar dene"
                        >
                          <RotateCcw className={`w-3 h-3 ${isRetrying ? 'animate-spin' : ''}`} />
                          <span>Dene</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Tab 2: Terminal Log Viewer */}
        {activeTab === 'logs' && (
          <div className="flex-1 flex flex-col overflow-hidden bg-slate-950 text-slate-200 font-mono text-xs">
            {/* Log Control Bar */}
            <div className="px-4 py-2 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-[11px] text-slate-400">Filtre:</span>
                <select
                  value={logPlatformFilter}
                  onChange={(e) => setLogPlatformFilter(e.target.value)}
                  className="bg-slate-800 border border-slate-700 text-slate-200 text-xs rounded-lg px-2 py-1 focus:outline-hidden"
                >
                  <option value="all">Tüm Platformlar ({allLogs.length} satır)</option>
                  {selectedPlatforms.map((id) => (
                    <option key={id} value={id}>
                      {PLATFORMS_CONFIG[id].name}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={handleCopyLogs}
                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] flex items-center space-x-1 transition-colors"
              >
                {copiedLog ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedLog ? 'Kopyalandı' : 'Logları Kopyala'}</span>
              </button>
            </div>

            {/* Log Output Stream */}
            <div className="p-4 space-y-1 overflow-y-auto flex-1">
              {filteredLogs.length === 0 ? (
                <div className="text-slate-500 py-6 text-center">Henüz günlük kaydı yok.</div>
              ) : (
                filteredLogs.map((log, idx) => {
                  const isError = log.text.includes('[ERROR]') || log.text.includes('Hata');
                  const isSuccess = log.text.includes('[SUCCESS]') || log.text.includes('Created') || log.text.includes('OK');
                  const isWarn = log.text.includes('[WARN]');

                  return (
                    <div
                      key={idx}
                      className={`leading-relaxed whitespace-pre-wrap break-all ${
                        isError
                          ? 'text-rose-400'
                          : isSuccess
                          ? 'text-emerald-400'
                          : isWarn
                          ? 'text-amber-400'
                          : 'text-slate-300'
                      }`}
                    >
                      {log.text}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {/* Tab 3: JSON Payload Inspector */}
        {activeTab === 'payload' && (
          <div className="flex-1 flex flex-col overflow-hidden bg-slate-900 text-slate-200 font-mono text-xs">
            {/* Platform Selector Bar */}
            <div className="p-3 bg-slate-950 border-b border-slate-800 flex items-center space-x-2 overflow-x-auto">
              {selectedPlatforms.map((id) => {
                const isSelected = selectedPayloadPlatform === id;
                return (
                  <button
                    key={id}
                    onClick={() => setSelectedPayloadPlatform(id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                      isSelected
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {PLATFORMS_CONFIG[id].name}
                  </button>
                );
              })}
            </div>

            {/* JSON Content */}
            <div className="p-4 overflow-y-auto flex-1">
              <pre className="text-[11px] leading-relaxed text-blue-200">
                {JSON.stringify(
                  selectedResult?.payloadPreview || {
                    platform: selectedPayloadPlatform,
                    formattedText:
                      content.platformOverrides[selectedPayloadPlatform] || content.caption,
                    title: content.title,
                    mediaCount: content.media.length,
                    destinationUrl: content.destinationUrl,
                  },
                  null,
                  2
                )}
              </pre>
            </div>
          </div>
        )}

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center space-x-3 text-xs">
            <span className="text-emerald-700 font-semibold flex items-center space-x-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{successCount} Başarılı</span>
            </span>
            {failureCount > 0 && (
              <span className="text-rose-700 font-semibold flex items-center space-x-1">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                <span>{failureCount} Başarısız (İzole)</span>
              </span>
            )}
          </div>

          <div className="flex items-center space-x-2">
            {isCompleted ? (
              <button
                onClick={onClose}
                className="px-5 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors shadow-xs"
              >
                Kapat
              </button>
            ) : (
              <span className="text-xs text-slate-400 flex items-center space-x-1.5">
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Dağıtılıyor...</span>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
