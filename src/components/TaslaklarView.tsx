'use client';

import React from 'react';
import { FileText, Plus, Trash2, Edit3, ArrowRight, Calendar } from 'lucide-react';
import { EmptyBoxIllustration } from './EmptyBoxIllustration';
import { PlatformIcon } from './PlatformIcon';
import { SocialPlatformId } from '@/types';

export interface DraftItem {
  id: string;
  title: string;
  caption: string;
  media: Array<{ id: string; url: string; type: 'image' | 'video' }>;
  platforms: SocialPlatformId[];
  createdAt: string;
}

interface TaslaklarViewProps {
  onOpenComposer: () => void;
  drafts?: DraftItem[];
  onLoadDraft?: (draft: DraftItem) => void;
  onDeleteDraft?: (id: string) => void;
}

export const TaslaklarView: React.FC<TaslaklarViewProps> = ({
  onOpenComposer,
  drafts = [],
  onLoadDraft,
  onDeleteDraft,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-6 space-y-6 animate-fade-in text-slate-800 min-h-[550px] flex flex-col justify-between">
      {/* Top Header (Matches Screenshot 5) */}
      <div className="pb-4 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-900">Taslaklar</h1>
            <p className="text-xs text-slate-400">Gönderi taslakları oluşturun ve yönetin</p>
          </div>
        </div>

        {drafts.length > 0 && (
          <button
            onClick={onOpenComposer}
            className="py-2 px-4 rounded-xl bg-[#1864e4] hover:bg-[#1351be] text-white font-bold text-xs shadow-xs transition-all flex items-center space-x-1.5 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Yeni Taslak</span>
          </button>
        )}
      </div>

      {/* Main Content: Either Empty State or Draft Cards Grid */}
      {drafts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 my-auto space-y-3 text-center">
          <EmptyBoxIllustration size={220} />
          <span className="text-xs font-semibold text-slate-700 block pt-2">
            Henüz bir taslak bulunmuyor
          </span>
          <button
            onClick={onOpenComposer}
            className="py-2.5 px-6 rounded-full bg-[#1864e4] hover:bg-[#1351be] text-white font-bold text-xs tracking-wide shadow-md shadow-blue-500/20 active:scale-[0.99] transition-all flex items-center space-x-1.5 cursor-pointer mt-2"
          >
            <Plus className="w-4 h-4" />
            <span>Gönderi Oluştur</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-auto">
          {drafts.map((draft) => (
            <div
              key={draft.id}
              className="p-4 rounded-2xl border border-slate-200 bg-[#f8fafc] hover:bg-white hover:shadow-md transition-all flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span className="flex items-center space-x-1">
                    <Calendar className="w-3 h-3" />
                    <span>{draft.createdAt}</span>
                  </span>
                  <div className="flex items-center space-x-1">
                    {draft.platforms.slice(0, 4).map((p) => (
                      <PlatformIcon key={p} platform={p} size="sm" />
                    ))}
                    {draft.platforms.length > 4 && (
                      <span className="text-[10px] font-bold text-slate-500">
                        +{draft.platforms.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                {draft.title && (
                  <h3 className="font-bold text-xs text-slate-900 line-clamp-1">{draft.title}</h3>
                )}
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">{draft.caption}</p>

                {draft.media && draft.media.length > 0 && (
                  <div className="aspect-video w-full rounded-xl overflow-hidden bg-slate-200 mt-2">
                    <img
                      src={draft.media[0].url}
                      alt="Taslak Önizleme"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>

              <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between">
                <button
                  onClick={() => onDeleteDraft?.(draft.id)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                  title="Taslağı Sil"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => onLoadDraft?.(draft)}
                  className="py-1.5 px-3 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs flex items-center space-x-1 transition-colors"
                >
                  <span>Stüdyoya Aktar</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
