'use client';

import React, { useState } from 'react';
import {
  RotateCcw,
  Search,
  Plus,
  Rss,
  Repeat,
  CheckCircle2,
  Sparkles,
  Webhook,
  Play,
  Check,
  X,
  Trash2,
  Power
} from 'lucide-react';
import { EmptyBoxIllustration } from './EmptyBoxIllustration';

interface AutomationItem {
  id: string;
  name: string;
  type: 'rss' | 'ai' | 'webhook';
  source: string;
  status: 'active' | 'paused';
  lastRun: string;
  targetCount: number;
}

const INITIAL_AUTOMATIONS: AutomationItem[] = [
  {
    id: 'auto-1',
    name: 'Şirket Blogu RSS Otomasyonu',
    type: 'rss',
    source: 'https://omnipost.pro/blog/feed.xml',
    status: 'active',
    lastRun: 'Bugün 14:15',
    targetCount: 7,
  },
  {
    id: 'auto-2',
    name: 'AI Sabah Trend Gönderisi',
    type: 'ai',
    source: 'Konu: 2026 Dijital Pazarlama İpuçları (Saat 10:00)',
    status: 'active',
    lastRun: 'Bugün 10:00',
    targetCount: 5,
  },
];

export const OtomasyonlarView: React.FC = () => {
  const [automations, setAutomations] = useState<AutomationItem[]>(INITIAL_AUTOMATIONS);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [modalType, setModalType] = useState<'rss' | 'ai' | 'webhook'>('rss');
  const [formName, setFormName] = useState('');
  const [formSource, setFormSource] = useState('');
  const [runningId, setRunningId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleCreateAutomation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formSource) return;

    const newItem: AutomationItem = {
      id: `auto-${Date.now()}`,
      name: formName,
      type: modalType,
      source: formSource,
      status: 'active',
      lastRun: 'Yeni kuruldu',
      targetCount: 7,
    };

    setAutomations((prev) => [newItem, ...prev]);
    setFormName('');
    setFormSource('');
    setShowAddModal(false);
    showToast(`"${newItem.name}" otomasyonu başarıyla devreye alındı!`);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleToggleStatus = (id: string) => {
    setAutomations((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, status: a.status === 'active' ? 'paused' : 'active' } : a
      )
    );
  };

  const handleRunNow = (id: string, name: string) => {
    setRunningId(id);
    setTimeout(() => {
      setRunningId(null);
      setAutomations((prev) =>
        prev.map((a) => (a.id === id ? { ...a, lastRun: 'Az önce çalıştırıldı' } : a))
      );
      showToast(`"${name}" başarıyla tetiklendi ve yeni içerik paylaşıldı!`);
    }, 800);
  };

  const handleDelete = (id: string) => {
    setAutomations((prev) => prev.filter((a) => a.id !== id));
  };

  const filtered = automations.filter(
    (a) =>
      a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.source.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-6 space-y-6 animate-fade-in text-slate-800 min-h-[550px] flex flex-col justify-between relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-8 right-8 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-xl shadow-xl text-xs font-bold flex items-center space-x-2 animate-bounce">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header & Search Bar (Matches Screenshot 1) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-purple-50 text-[#8b5cf6] flex items-center justify-center">
            <RotateCcw className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-900">Otomasyonlar</h1>
            <p className="text-xs text-slate-400">Seri gönderiler ve akıllı tetikleyiciler oluşturun</p>
          </div>
        </div>

        {/* Right Search & + Ekleyin Button */}
        <div className="flex items-center space-x-3">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Arama"
              className="w-48 sm:w-64 bg-[#f8fafc] border border-slate-200/90 pl-8 pr-3 py-2 rounded-xl text-xs text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          <button
            onClick={() => {
              setModalType('rss');
              setShowAddModal(true);
            }}
            className="py-2 px-5 rounded-xl bg-[#1864e4] hover:bg-[#1351be] text-white font-bold text-xs tracking-wide shadow-xs transition-all flex items-center space-x-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Ekleyin</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 my-auto space-y-4">
          <EmptyBoxIllustration size={220} />
          <span className="text-xs text-slate-500 font-medium">Henüz bir otomasyon kuralı bulunmuyor</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-auto">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-2xl border border-slate-200 bg-[#f8fafc] hover:bg-white hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2.5">
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                        item.type === 'rss'
                          ? 'bg-orange-50 text-orange-600'
                          : item.type === 'ai'
                          ? 'bg-amber-50 text-amber-600'
                          : 'bg-indigo-50 text-indigo-600'
                      }`}
                    >
                      {item.type === 'rss' ? (
                        <Rss className="w-4 h-4" />
                      ) : item.type === 'ai' ? (
                        <Sparkles className="w-4 h-4" />
                      ) : (
                        <Webhook className="w-4 h-4" />
                      )}
                    </div>
                    <div>
                      <span className="font-bold text-xs text-slate-900 block truncate max-w-[200px] sm:max-w-xs">
                        {item.name}
                      </span>
                      <span className="text-[10px] text-slate-400 capitalize">
                        {item.type === 'rss'
                          ? 'RSS Beslemesi'
                          : item.type === 'ai'
                          ? 'Yapay Zeka İçerik Robotu'
                          : 'Webhook & n8n Entegrasyonu'}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleToggleStatus(item.id)}
                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold transition-colors flex items-center space-x-1 cursor-pointer ${
                      item.status === 'active'
                        ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                        : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                    }`}
                  >
                    <Power className="w-3 h-3" />
                    <span>{item.status === 'active' ? 'Aktif' : 'Duraklatıldı'}</span>
                  </button>
                </div>

                <div className="p-3 rounded-xl bg-white border border-slate-200/80 text-xs text-slate-600 font-mono truncate">
                  {item.source}
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span>Hedef: {item.targetCount} Sosyal Ağ</span>
                  <span>Son tetikleme: {item.lastRun}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200/70 flex items-center justify-between">
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                  title="Otomasyonu Sil"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                <button
                  onClick={() => handleRunNow(item.id, item.name)}
                  disabled={runningId === item.id || item.status !== 'active'}
                  className="py-1.5 px-4 rounded-xl bg-blue-50 hover:bg-blue-100 text-[#1864e4] font-bold text-xs transition-colors flex items-center space-x-1.5 cursor-pointer disabled:opacity-50"
                >
                  {runningId === item.id ? (
                    <>
                      <RotateCcw className="w-3 h-3 animate-spin" />
                      <span>Çalıştırılıyor...</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3 h-3" />
                      <span>Şimdi Test Et</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Automation Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-md w-full p-6 space-y-4 animate-scale-in">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-sm text-slate-900">Yeni Otomasyon Ekle</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-400"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Automation Type Tabs */}
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => {
                  setModalType('rss');
                  setFormName('Blog RSS Akışı');
                  setFormSource('https://siteniz.com/feed.xml');
                }}
                className={`p-2 rounded-xl text-xs font-bold transition-all ${
                  modalType === 'rss'
                    ? 'bg-orange-50 text-orange-700 border border-orange-200'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                }`}
              >
                RSS Beslemesi
              </button>
              <button
                type="button"
                onClick={() => {
                  setModalType('ai');
                  setFormName('Sabah AI Postu');
                  setFormSource('Her sabah 09:30 - Trend teknoloji ve pazarlama içerikleri');
                }}
                className={`p-2 rounded-xl text-xs font-bold transition-all ${
                  modalType === 'ai'
                    ? 'bg-amber-50 text-amber-700 border border-amber-200'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                }`}
              >
                Yapay Zeka
              </button>
              <button
                type="button"
                onClick={() => {
                  setModalType('webhook');
                  setFormName('n8n Webhook Tetikleyici');
                  setFormSource('https://api.omnipost.pro/v1/webhook/incoming-secret-key');
                }}
                className={`p-2 rounded-xl text-xs font-bold transition-all ${
                  modalType === 'webhook'
                    ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                }`}
              >
                Webhook & n8n
              </button>
            </div>

            <form onSubmit={handleCreateAutomation} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Otomasyon Başlığı</label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="Örn: Blog Otomasyonu"
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">
                  {modalType === 'rss'
                    ? 'RSS / Atom XML Bağlantısı'
                    : modalType === 'ai'
                    ? 'Yapay Zeka Konu & Zaman Planı'
                    : 'Webhook URL / API Anahtarı'}
                </label>
                <input
                  type="text"
                  required
                  value={formSource}
                  onChange={(e) => setFormSource(e.target.value)}
                  placeholder={
                    modalType === 'rss'
                      ? 'https://siteniz.com/feed.xml'
                      : modalType === 'ai'
                      ? 'Konu ve yayın saati...'
                      : 'https://webhook-url.com'
                  }
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#1864e4] hover:bg-[#1351be] text-white text-xs font-bold cursor-pointer"
                >
                  Otomasyonu Başlat
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
