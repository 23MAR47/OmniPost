'use client';

import React, { useState, useEffect } from 'react';
import { EvergreenBucket, EvergreenPost } from '@/types/evergreen';
import { PlatformIcon } from './PlatformIcon';
import {
  Repeat,
  ShieldCheck,
  Play,
  Pause,
  Zap,
  FolderKanban,
  Calendar,
  Sparkles,
  BarChart3,
  Clock,
  Plus,
} from 'lucide-react';

export const EvergreenQueueView: React.FC = () => {
  const [buckets, setBuckets] = useState<EvergreenBucket[]>([]);
  const [posts, setPosts] = useState<EvergreenPost[]>([]);
  const [selectedBucketId, setSelectedBucketId] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/evergreen');
      const data = await res.json();
      if (data.success) {
        setBuckets(data.data.buckets);
        setPosts(data.data.posts);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleTogglePostPause = async (postId: string) => {
    try {
      const res = await fetch('/api/evergreen', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'post', id: postId }),
      });
      const data = await res.json();
      if (data.success) {
        setPosts((prev) => prev.map((p) => (p.id === postId ? data.data : p)));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleRecycleNow = async (postId: string) => {
    try {
      const res = await fetch('/api/evergreen', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'recycleNow', postId }),
      });
      const data = await res.json();
      if (data.success) {
        setPosts((prev) => prev.map((p) => (p.id === postId ? data.data : p)));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const filteredPosts =
    selectedBucketId === 'all'
      ? posts
      : posts.filter((p) => p.bucketId === selectedBucketId);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-3.5">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center shadow-md">
            <Repeat className="w-5 h-5 animate-spin-slow" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-lg font-bold text-slate-900">
                Evergreen İçerik Geri Dönüşüm Havuzu (Recycling Queue)
              </h1>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                Plexorin Engine
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Eskimeyen en kaliteli içeriklerinizi havuzlara ayırın; tükenme koruması ile otomatik aralıklarla yeniden paylaşın.
            </p>
          </div>
        </div>

        {/* Shield Stat Banner */}
        <div className="flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Tükenme Koruması (Cooldown Shield) Devrede</span>
        </div>
      </div>

      {/* Buckets Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {buckets.map((b) => {
          const isSelected = selectedBucketId === b.id;
          return (
            <button
              key={b.id}
              onClick={() => setSelectedBucketId(isSelected ? 'all' : b.id)}
              className={`text-left p-4 rounded-2xl border transition-all relative overflow-hidden ${isSelected
                  ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-emerald-500'
                  : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200 shadow-xs'
                }`}
            >
              <div
                className="w-2.5 h-2.5 rounded-full mb-3"
                style={{ backgroundColor: b.color }}
              />
              <h3 className="font-bold text-sm mb-1">{b.name}</h3>
              <p
                className={`text-xs mb-3 line-clamp-2 ${isSelected ? 'text-slate-300' : 'text-slate-500'
                  }`}
              >
                {b.description}
              </p>

              <div
                className={`pt-2 border-t flex items-center justify-between text-[11px] ${isSelected ? 'border-slate-800 text-slate-300' : 'border-slate-100 text-slate-500'
                  }`}
              >
                <span>Döngü: {b.recycleIntervalDays} günde bir</span>
                <span className="font-bold font-mono">
                  {posts.filter((p) => p.bucketId === b.id).length} Gönderi
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Filter Tabs & Content Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 bg-slate-50/70 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold text-slate-700">Filtre:</span>
            <button
              onClick={() => setSelectedBucketId('all')}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${selectedBucketId === 'all'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
            >
              Tüm Havuzlar ({posts.length})
            </button>
          </div>

          <div className="text-[11px] text-slate-500">
            Algoritma spam cezalarından kaçınmak için gönderiler arası minimum 72 saat bekletilir.
          </div>
        </div>

        {/* Posts List */}
        <div className="divide-y divide-slate-100">
          {isLoading ? (
            <div className="p-8 text-center text-xs text-slate-400">Yükleniyor...</div>
          ) : filteredPosts.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-400">Bu havuzda henüz gönderi yok.</div>
          ) : (
            filteredPosts.map((post) => {
              const bucket = buckets.find((b) => b.id === post.bucketId);
              return (
                <div
                  key={post.id}
                  className={`p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-colors ${post.isPaused ? 'bg-slate-50/70 opacity-75' : 'hover:bg-slate-50/40'
                    }`}
                >
                  {/* Left: Media & Caption */}
                  <div className="flex items-start space-x-3.5 flex-1 min-w-0">
                    {post.mediaUrl && (
                      <img
                        src={post.mediaUrl}
                        alt="Thumbnail"
                        className="w-14 h-14 rounded-xl object-cover border border-slate-200 flex-shrink-0"
                      />
                    )}
                    <div className="space-y-1.5 flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        {bucket && (
                          <span
                            className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white"
                            style={{ backgroundColor: bucket.color }}
                          >
                            {bucket.name.split(' ')[1] || bucket.name}
                          </span>
                        )}
                        <span className="text-[11px] text-slate-400 flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>
                            Sıradaki: {new Date(post.nextScheduledAt).toLocaleDateString('tr-TR')}
                          </span>
                        </span>
                        {post.isPaused && (
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-800">
                            DURAKLATILDI
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-slate-800 line-clamp-2 leading-relaxed font-normal">
                        {post.caption}
                      </p>

                      {/* Platforms row */}
                      <div className="flex items-center space-x-1.5 pt-0.5">
                        {post.platforms.map((p) => (
                          <div
                            key={p}
                            className="w-5 h-5 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center p-1"
                            title={p}
                          >
                            <PlatformIcon platform={p} className="w-3 h-3" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Middle: Recycle Stats */}
                  <div className="flex items-center space-x-6 text-xs text-slate-600 flex-shrink-0">
                    <div className="text-center">
                      <span className="text-[10px] text-slate-400 block">Döngü Sayısı</span>
                      <span className="font-bold text-slate-900 font-mono text-sm">
                        {post.timesRecycled} {post.maxRecycles > 0 ? `/ ${post.maxRecycles}` : 'defa'}
                      </span>
                    </div>

                    <div className="text-center">
                      <span className="text-[10px] text-slate-400 block">Etkileşim Skoru</span>
                      <span className="font-bold text-emerald-600 font-mono text-sm">
                        %{post.engagementScore}
                      </span>
                    </div>
                  </div>

                  {/* Right: Actions */}
                  <div className="flex items-center space-x-2 flex-shrink-0">
                    <button
                      onClick={() => handleTogglePostPause(post.id)}
                      className={`p-2 rounded-xl border text-xs font-bold transition-colors flex items-center space-x-1.5 ${post.isPaused
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                          : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                        }`}
                      title={post.isPaused ? 'Döngüyü Başlat' : 'Döngüyü Duraklat'}
                    >
                      {post.isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
                    </button>

                    <button
                      onClick={() => handleRecycleNow(post.id)}
                      className="px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition-all flex items-center space-x-1.5"
                    >
                      <Zap className="w-3.5 h-3.5" />
                      <span>Hemen Tekrar Paylaş</span>
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
