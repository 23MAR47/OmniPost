'use client';

import React, { useState, useRef } from 'react';
import {
  Folder,
  Search,
  Plus,
  Trash2,
  Check,
  UploadCloud,
  Palette,
  Filter,
  Info,
  ExternalLink,
  Eye,
  Send,
  X,
  FileImage,
  Link as LinkIcon
} from 'lucide-react';

export interface MediaFileItem {
  id: string;
  name: string;
  size: string;
  type: 'image' | 'video';
  url: string;
}

const INITIAL_MEDIA_FILES: MediaFileItem[] = [
  {
    id: 'f-1',
    name: 'yemek-masa (5).jpg',
    size: '55.27KB',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'f-2',
    name: 'yemek-masa (3).jpg',
    size: '54.73KB',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'f-3',
    name: 'yemek-masa (2).jpg',
    size: '79.36KB',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'f-4',
    name: 'pencere-kapi (1).jpg',
    size: '65.15KB',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'f-5',
    name: 'pencere-kapi (8).jpg',
    size: '41.13KB',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'f-6',
    name: 'pencere-kapi (7).jpg',
    size: '18.90KB',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'f-7',
    name: 'pencere-kapi (6).jpg',
    size: '53.85KB',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'f-8',
    name: 'pencere-kapi (5).jpg',
    size: '98.13KB',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'f-9',
    name: 'pencere-kapi (4).jpg',
    size: '66.02KB',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'f-10',
    name: 'pencere-kapi (3).jpg',
    size: '44.52KB',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'f-11',
    name: 'pencere-kapi (2).jpg',
    size: '38.90KB',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'f-12',
    name: 'luks-villa (12).jpg',
    size: '49.68KB',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'f-13',
    name: 'luks-villa (1).jpg',
    size: '37.27KB',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'f-14',
    name: 'luks-villa (10).jpg',
    size: '141.81KB',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'f-15',
    name: 'luks-villa (8).jpg',
    size: '93.10KB',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'f-16',
    name: 'luks-villa (7).jpg',
    size: '44.57KB',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'f-17',
    name: 'luks-villa (6).jpg',
    size: '23.34KB',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'f-18',
    name: 'luks-villa (4).jpg',
    size: '42.56KB',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'f-19',
    name: 'luks-villa (3).jpg',
    size: '65.54KB',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'f-20',
    name: 'egitim (10).jpg',
    size: '98.03KB',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'f-21',
    name: 'egitim (9).jpg',
    size: '84.37KB',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'f-22',
    name: 'egitim (8).jpg',
    size: '101.14KB',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'f-23',
    name: 'egitim (7).jpg',
    size: '52.57KB',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'f-24',
    name: 'egitim (6).jpg',
    size: '94.99KB',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&auto=format&fit=crop&q=80',
  },
];

interface DosyalarViewProps {
  onInsertToPost?: (mediaItem: { id: string; name: string; type: 'image' | 'video'; url: string }) => void;
}

export const DosyalarView: React.FC<DosyalarViewProps> = ({ onInsertToPost }) => {
  const [files, setFiles] = useState<MediaFileItem[]>(INITIAL_MEDIA_FILES);
  const [selectedFileIds, setSelectedFileIds] = useState<string[]>([]);
  const [searchWord, setSearchWord] = useState('');
  const [fileTypeFilter, setFileTypeFilter] = useState('Hepsi');
  const [previewItem, setPreviewItem] = useState<MediaFileItem | null>(null);
  const [isUrlModalOpen, setIsUrlModalOpen] = useState(false);
  const [inputUrl, setInputUrl] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const filteredFiles = files.filter((f) => {
    const matchName = f.name.toLowerCase().includes(searchWord.toLowerCase());
    if (fileTypeFilter === 'Resimler') return matchName && f.type === 'image';
    if (fileTypeFilter === 'Videolar') return matchName && f.type === 'video';
    return matchName;
  });

  const handleToggleSelect = (id: string) => {
    setSelectedFileIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedFileIds.length === filteredFiles.length) {
      setSelectedFileIds([]);
    } else {
      setSelectedFileIds(filteredFiles.map((f) => f.id));
    }
  };

  const handleDeleteSelected = () => {
    if (selectedFileIds.length === 0) {
      showToast('Lütfen silmek için dosya seçin.');
      return;
    }
    setFiles((prev) => prev.filter((f) => !selectedFileIds.includes(f.id)));
    showToast(`${selectedFileIds.length} dosya silindi.`);
    setSelectedFileIds([]);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploaded = e.target.files;
    if (!uploaded || uploaded.length === 0) return;

    const newItems: MediaFileItem[] = Array.from(uploaded).map((file, idx) => {
      const isVid = file.type.startsWith('video');
      const sizeStr = (file.size / 1024).toFixed(2) + 'KB';
      return {
        id: `upload-${Date.now()}-${idx}`,
        name: file.name,
        size: sizeStr,
        type: isVid ? 'video' : 'image',
        url: URL.createObjectURL(file),
      };
    });

    setFiles((prev) => [...newItems, ...prev]);
    showToast(`${newItems.length} yeni dosya yüklendi!`);
  };

  const handleAddFromUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputUrl) return;

    const newItem: MediaFileItem = {
      id: `url-${Date.now()}`,
      name: `web-gorsel-${Date.now().toString().slice(-4)}.jpg`,
      size: '62.40KB',
      type: 'image',
      url: inputUrl,
    };

    setFiles((prev) => [newItem, ...prev]);
    setInputUrl('');
    setIsUrlModalOpen(false);
    showToast('Görsel URL başarıyla kütüphaneye eklendi.');
  };

  const handleInsertToStudio = (item: MediaFileItem) => {
    if (onInsertToPost) {
      onInsertToPost({
        id: `lib-${Date.now()}`,
        name: item.name,
        type: item.type,
        url: item.url,
      });
      showToast(`"${item.name}" Gönderi Stüdyosuna aktarıldı!`);
    }
  };

  return (
    <div className="flex flex-col xl:flex-row gap-6 animate-fade-in text-slate-800 relative">
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        multiple
        accept="image/*,video/*"
        className="hidden"
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-xl shadow-xl text-xs font-semibold flex items-center space-x-2 animate-slide-up">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ─── CENTER/LEFT: 6-Column Media Grid (Exact Match to Screenshot 2) ─── */}
      <div className="flex-1 bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs space-y-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5">
          {filteredFiles.map((file) => {
            const isSelected = selectedFileIds.includes(file.id);

            return (
              <div
                key={file.id}
                className={`group relative bg-white rounded-xl border transition-all duration-200 overflow-hidden flex flex-col ${
                  isSelected
                    ? 'border-blue-500 ring-2 ring-blue-500/30 shadow-xs'
                    : 'border-slate-200/90 hover:border-blue-300 hover:shadow-xs'
                }`}
              >
                {/* Checkbox (Matches Top-Left Position in Screenshot 2) */}
                <div className="absolute top-2 left-2 z-10">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => handleToggleSelect(file.id)}
                    className="w-4 h-4 rounded text-blue-600 bg-white/90 border-slate-300 focus:ring-blue-500 cursor-pointer shadow-xs"
                  />
                </div>

                {/* Media Thumbnail */}
                <div className="relative aspect-4/3 w-full bg-slate-100 overflow-hidden cursor-pointer">
                  <img
                    src={file.url}
                    alt={file.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />

                  {/* Hover Overlay with Action Buttons */}
                  <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2 p-2">
                    <button
                      onClick={() => setPreviewItem(file)}
                      title="Önizle"
                      className="p-1.5 rounded-lg bg-white/90 hover:bg-white text-slate-800 transition-colors shadow-xs"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleInsertToStudio(file)}
                      title="Stüdyoya Ekle"
                      className="p-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors shadow-xs"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* File Details (Matches Screenshot 2: Filename & Filesize below) */}
                <div className="p-2 bg-white space-y-0.5">
                  <span
                    className="text-[11px] font-bold text-slate-800 block truncate group-hover:text-blue-600 transition-colors"
                    title={file.name}
                  >
                    {file.name}
                  </span>
                  <span className="text-[10px] text-slate-400 block font-mono">
                    {file.size}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {filteredFiles.length === 0 && (
          <div className="text-center py-16 space-y-2 text-slate-400 text-xs">
            <p>Aradığınız kriterlere uygun medya dosyası bulunamadı.</p>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="text-blue-600 font-bold hover:underline"
            >
              Yeni Medya Yükleyin
            </button>
          </div>
        )}
      </div>

      {/* ─── RIGHT PANEL: Actions & Upload Controls (Exact Match to Screenshot 2) ─── */}
      <div className="w-full xl:w-64 space-y-4 flex-shrink-0">
        {/* Top Actions: Hepsini Seç + Delete + Yeni Klasör */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-3.5 shadow-2xs space-y-3">
          <div className="flex items-center justify-between space-x-2">
            <button
              onClick={handleSelectAll}
              className="flex-1 py-1.5 px-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center justify-center space-x-1.5 transition-colors cursor-pointer"
            >
              <Check className="w-3.5 h-3.5 text-slate-500" />
              <span>Hepsini Seç</span>
            </button>
            <button
              onClick={handleDeleteSelected}
              title="Seçilenleri Sil"
              className="p-2 rounded-xl bg-rose-500 hover:bg-rose-600 text-white transition-colors shadow-xs cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={() => showToast('Yeni klasör oluşturuldu: "Kampanya Görselleri"')}
            className="w-full py-1.5 px-3 rounded-xl border border-sky-300 text-sky-600 hover:bg-sky-50 font-bold text-xs flex items-center justify-center space-x-1 transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Yeni Klasör</span>
          </button>
        </div>

        {/* Section: Yükle (Dashed Dropzone matching Screenshot 2) */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-2xs space-y-3">
          <div className="flex items-center space-x-1.5 text-xs font-bold text-slate-800">
            <span>↑</span>
            <span>Yükle</span>
          </div>

          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-slate-200 hover:border-blue-400 rounded-2xl p-5 text-center space-y-2 cursor-pointer transition-colors bg-[#f8fafc]/50 hover:bg-blue-50/30"
          >
            <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-500 mx-auto flex items-center justify-center">
              <UploadCloud className="w-5 h-5" />
            </div>
            <div className="text-[11px] text-slate-500">
              Sürükle & Bırak Veya
            </div>
            <button
              type="button"
              className="py-1.5 px-4 rounded-xl bg-[#0ea5e9] hover:bg-[#0284c7] text-white text-xs font-bold shadow-xs transition-colors"
            >
              Dosya Yükle
            </button>
          </div>

          {/* Cloud Storage & URL Upload Shortcuts */}
          <div className="flex items-center justify-between pt-1">
            <button
              onClick={() => showToast('Dropbox bağlantısı açıldı.')}
              title="Dropbox'tan Aktar"
              className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors"
            >
              <Folder className="w-4 h-4 text-blue-500" />
            </button>
            <button
              onClick={() => showToast('Google Drive bağlantısı açıldı.')}
              title="Google Drive'dan Aktar"
              className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors"
            >
              <UploadCloud className="w-4 h-4 text-emerald-500" />
            </button>
            <button
              onClick={() => setIsUrlModalOpen(true)}
              className="flex items-center space-x-1 px-2.5 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-[11px] font-bold text-slate-600 transition-colors cursor-pointer"
            >
              <LinkIcon className="w-3 h-3 text-slate-400" />
              <span>URL İle Yükle</span>
            </button>
          </div>
        </div>

        {/* Section: Tasarla (Adobe & Canva Şablonları) */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-2xs space-y-2.5">
          <div className="flex items-center space-x-1.5 text-xs font-bold text-slate-800">
            <Palette className="w-3.5 h-3.5 text-indigo-500" />
            <span>Tasarla</span>
          </div>

          <div className="space-y-1.5">
            <button
              onClick={() => showToast('Adobe Express şablon entegrasyonu hazır.')}
              className="w-full py-2 px-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 text-center transition-colors cursor-pointer"
            >
              Adobe Şablonları
            </button>
            <button
              onClick={() => showToast('Canva şablon entegrasyonu hazır.')}
              className="w-full py-2 px-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 text-center transition-colors cursor-pointer"
            >
              Canva Şablonları
            </button>
          </div>
        </div>

        {/* Section: Filtrele (Aranacak kelime & Dosya Türü) */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-2xs space-y-3">
          <div className="flex items-center space-x-1.5 text-xs font-bold text-slate-800">
            <Filter className="w-3.5 h-3.5 text-slate-500" />
            <span>Filtrele</span>
          </div>

          {/* Search by word */}
          <div className="relative">
            <input
              type="text"
              value={searchWord}
              onChange={(e) => setSearchWord(e.target.value)}
              placeholder="Aranacak kelime"
              className="w-full bg-[#f8fafc] border border-slate-200/90 pl-3 pr-7 py-2 rounded-xl text-xs text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* File Type Dropdown */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Dosya Türü
            </label>
            <select
              value={fileTypeFilter}
              onChange={(e) => setFileTypeFilter(e.target.value)}
              className="w-full bg-[#f8fafc] border border-slate-200 px-3 py-2 rounded-xl text-xs font-medium text-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
            >
              <option value="Hepsi">Hepsi</option>
              <option value="Resimler">Resimler</option>
              <option value="Videolar">Videolar</option>
            </select>
          </div>
        </div>

        {/* Section: Dosya Bilgisi (77.66MB / 10000MB) */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-2xs space-y-2">
          <div className="flex items-center space-x-1.5 text-xs font-bold text-slate-800">
            <Info className="w-3.5 h-3.5 text-amber-500" />
            <span>Dosya Bilgisi</span>
          </div>

          <div className="flex items-baseline justify-between text-xs">
            <span className="font-extrabold text-blue-600 text-sm">77.66MB</span>
            <span className="font-bold text-slate-400 text-xs">10000MB</span>
          </div>

          <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500 rounded-full w-[0.8%]" />
          </div>
        </div>
      </div>

      {/* ─── PREVIEW MODAL ─── */}
      {previewItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs modal-backdrop">
          <div className="bg-white rounded-3xl border border-slate-200 max-w-lg w-full p-5 space-y-4 animate-scale-in relative">
            <button
              onClick={() => setPreviewItem(null)}
              className="absolute right-4 top-4 p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="font-bold text-sm text-slate-900 truncate pr-8">
              {previewItem.name}
            </div>

            <div className="rounded-2xl overflow-hidden bg-slate-900 aspect-16/10 flex items-center justify-center">
              <img
                src={previewItem.url}
                alt={previewItem.name}
                className="max-h-full max-w-full object-contain"
              />
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>Boyut: <strong>{previewItem.size}</strong></span>
              <button
                onClick={() => {
                  handleInsertToStudio(previewItem);
                  setPreviewItem(null);
                }}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition-colors cursor-pointer"
              >
                Gönderi Stüdyosuna Ekle
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── URL UPLOAD MODAL ─── */}
      {isUrlModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs modal-backdrop">
          <div className="bg-white rounded-3xl border border-slate-200 max-w-md w-full p-6 space-y-4 animate-scale-in relative">
            <button
              onClick={() => setIsUrlModalOpen(false)}
              className="absolute right-4 top-4 p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-base font-bold text-slate-900">URL İle Görsel Ekle</h3>

            <form onSubmit={handleAddFromUrl} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Resim Doğrudan Bağlantısı
                </label>
                <input
                  type="url"
                  required
                  value={inputUrl}
                  onChange={(e) => setInputUrl(e.target.value)}
                  placeholder="https://example.com/banner.jpg"
                  className="w-full bg-[#f8fafc] border border-slate-200 px-3.5 py-2.5 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-center justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsUrlModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-xs"
                >
                  Kütüphaneye Ekle
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
