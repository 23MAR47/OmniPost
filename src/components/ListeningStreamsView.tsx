'use client';

import React, { useState, useEffect } from 'react';
import { StreamColumn, StreamItem, StreamColumnType } from '@/types/streams';
import { SocialPlatformId } from '@/types';
import { PLATFORMS_CONFIG } from '@/lib/constants';
import { PlatformIcon } from './PlatformIcon';
import {
  Radio,
  Plus,
  RefreshCw,
  Trash2,
  Heart,
  MessageCircle,
  Share2,
  TrendingUp,
  Eye,
  Smile,
  Meh,
  Frown,
  X,
  SlidersHorizontal,
} from 'lucide-react';

export const ListeningStreamsView: React.FC = () => {
  const [columns, setColumns] = useState<StreamColumn[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New Column Form
  const [newTitle, setNewTitle] = useState('');
  const [newPlatform, setNewPlatform] = useState<SocialPlatformId>('twitter');
  const [newType, setNewType] = useState<StreamColumnType>('keywords');
  const [newQuery, setNewQuery] = useState('');

  const fetchColumns = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/streams');
      const data = await res.json();
      if (data.success) {
        setColumns(data.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchColumns();
  }, []);

  const handleAddColumn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newQuery.trim()) return;

    try {
      const res = await fetch('/api/streams', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newTitle,
          platformId: newPlatform,
          type: newType,
          queryParam: newQuery,
          refreshIntervalSec: 60,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setColumns((prev) => [...prev, data.data]);
        setIsAddModalOpen(false);
        setNewTitle('');
        setNewQuery('');
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteColumn = async (colId: string) => {
    try {
      await fetch(`/api/streams?id=${colId}`, { method: 'DELETE' });
      setColumns((prev) => prev.filter((c) => c.id !== colId));
    } catch (e) {
      console.error(e);
    }
  };

  const handleToggleLike = async (columnId: string, itemId: string) => {
    try {
      const res = await fetch('/api/streams', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ columnId, itemId }),
      });
      const data = await res.json();
      if (data.success) {
        setColumns((prev) =>
          prev.map((col) => {
            if (col.id !== columnId) return col;
            return {
              ...col,
              items: col.items.map((it) => (it.id === itemId ? data.data : it)),
            };
          })
        );
      }
    } catch (e) {
      console.error(e);
    }
  };

  const renderSentiment = (sentiment: 'positive' | 'neutral' | 'negative') => {
    switch (sentiment) {
      case 'positive':
        return (
          <span className="inline-flex items-center space-x-1 px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <Smile className="w-3 h-3 text-emerald-600" />
            <span>Pozitif</span>
          </span>
        );
      case 'negative':
        return (
          <span className="inline-flex items-center space-x-1 px-1.5 py-0.5 rounded text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
            <Frown className="w-3 h-3 text-rose-600" />
            <span>Negatif</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center space-x-1 px-1.5 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-600 border border-slate-200">
            <Meh className="w-3 h-3 text-slate-500" />
            <span>Nötr</span>
          </span>
        );
    }
  };

  return (
    <div className="space-y-5">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-3.5">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-white flex items-center justify-center shadow-md">
            <Radio className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-lg font-bold text-slate-900">Sosyal Dinleme Akışları (Listening Streams)</h1>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-orange-100 text-orange-800 border border-orange-200">
                Hootsuite Enterprise
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Markanız, anahtar kelimeler ve rakipler hakkında paylaşılanları canlı sütunlarla izleyin, anında etkileşime geçin.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          <button
            onClick={fetchColumns}
            className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 transition-colors"
            title="Tüm Akışları Yenile"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center space-x-2 shadow-sm transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Yeni Akış Sütunu Ekle</span>
          </button>
        </div>
      </div>

      {/* Streams Multi-Column Horizontal Container */}
      <div className="overflow-x-auto pb-4">
        <div className="flex items-start space-x-5 min-w-full w-max">
          {isLoading ? (
            <div className="p-12 text-slate-400 text-xs text-center w-full">Akış sütunları yükleniyor...</div>
          ) : columns.length === 0 ? (
            <div className="p-12 text-slate-400 text-xs text-center w-full">Henüz bir akış sütunu eklenmemiş.</div>
          ) : (
            columns.map((column) => (
              <div
                key={column.id}
                className="w-88 sm:w-96 flex-shrink-0 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[700px]"
              >
                {/* Column Header */}
                <div className="p-3.5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
                  <div className="flex items-center space-x-2 min-w-0">
                    <div className="w-6 h-6 rounded-md bg-white border border-slate-200 flex items-center justify-center p-1 shadow-xs flex-shrink-0">
                      <PlatformIcon platform={column.platformId} className="w-3.5 h-3.5" />
                    </div>
                    <div className="truncate">
                      <h3 className="font-bold text-xs text-slate-900 truncate">{column.title}</h3>
                      <span className="text-[10px] text-slate-500 font-mono truncate block">
                        {column.queryParam}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => handleDeleteColumn(column.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                      title="Sütunu Kaldır"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Items Feed */}
                <div className="flex-1 overflow-y-auto p-3.5 space-y-3.5 divide-y divide-slate-100">
                  {column.items.map((item) => (
                    <div key={item.id} className="pt-3.5 first:pt-0 space-y-2.5">
                      {/* Author Bar */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <img
                            src={item.authorAvatar}
                            alt={item.authorName}
                            className="w-7 h-7 rounded-full object-cover border border-slate-200"
                          />
                          <div>
                            <span className="font-bold text-xs text-slate-900 block leading-tight">
                              {item.authorName}
                            </span>
                            <span className="text-[10px] text-slate-500 font-mono">
                              {item.authorHandle}
                            </span>
                          </div>
                        </div>
                        <span className="text-[10px] text-slate-400">{item.timestamp}</span>
                      </div>

                      {/* Content Body */}
                      <p className="text-xs text-slate-700 leading-relaxed font-normal">
                        {item.content}
                      </p>

                      {/* Sentiment & Reach Badges */}
                      <div className="flex items-center justify-between pt-1">
                        <div className="flex items-center space-x-2">
                          {renderSentiment(item.sentiment)}
                          {item.reachEstimate && (
                            <span className="inline-flex items-center space-x-1 text-[10px] text-slate-500">
                              <Eye className="w-3 h-3 text-slate-400" />
                              <span>{(item.reachEstimate / 1000).toFixed(1)}k erişim</span>
                            </span>
                          )}
                        </div>

                        {/* Interactive Engagement Bar */}
                        <div className="flex items-center space-x-3 text-xs text-slate-500">
                          <button
                            onClick={() => handleToggleLike(column.id, item.id)}
                            className={`flex items-center space-x-1 transition-colors ${item.isLikedByMe ? 'text-rose-600 font-bold' : 'hover:text-rose-600'
                              }`}
                          >
                            <Heart className={`w-3.5 h-3.5 ${item.isLikedByMe ? 'fill-rose-600' : ''}`} />
                            <span className="text-[11px]">{item.likes}</span>
                          </button>
                          <div className="flex items-center space-x-1">
                            <MessageCircle className="w-3.5 h-3.5 text-slate-400" />
                            <span className="text-[11px]">{item.comments}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Share2 className="w-3.5 h-3.5 text-slate-400" />
                            <span className="text-[11px]">{item.shares}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Add Column Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-sm text-slate-900 flex items-center space-x-2">
                <Radio className="w-4 h-4 text-orange-600" />
                <span>Yeni Canlı Dinleme Akışı Oluştur</span>
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddColumn} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Sütun Başlığı</label>
                <input
                  type="text"
                  placeholder="Örn: Rakip Analizi: Buffer"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  required
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Platform Seçimi</label>
                <select
                  value={newPlatform}
                  onChange={(e) => setNewPlatform(e.target.value as SocialPlatformId)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
                >
                  {Object.entries(PLATFORMS_CONFIG).map(([id, cfg]) => (
                    <option key={id} value={id}>
                      {cfg.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Akış Türü</label>
                <select
                  value={newType}
                  onChange={(e) => setNewType(e.target.value as StreamColumnType)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
                >
                  <option value="mentions">Marka Bahsetmeleri (@Mentions)</option>
                  <option value="keywords">Anahtar Kelimeler & Hashtag (#Keywords)</option>
                  <option value="competitor">Rakip Marka Radarı</option>
                  <option value="trend">Trend Konular & Sektör Sinyalleri</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Arama Sorgusu / Filtre</label>
                <input
                  type="text"
                  placeholder="Örn: #yapayzeka OR 'sosyal medya ajansı'"
                  value={newQuery}
                  onChange={(e) => setNewQuery(e.target.value)}
                  required
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500 font-mono"
                />
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-bold"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold shadow-sm"
                >
                  Sütunu Ekle
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
