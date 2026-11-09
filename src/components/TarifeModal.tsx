'use client';

import React, { useState } from 'react';
import { Sparkles, Check, Shield, X, CreditCard, Calendar, Zap } from 'lucide-react';

interface TarifeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRenewSuccess?: (newDate: string) => void;
}

export const TarifeModal: React.FC<TarifeModalProps> = ({
  isOpen,
  onClose,
  onRenewSuccess,
}) => {
  const [selectedPlan, setSelectedPlan] = useState<'1year' | '2years' | 'lifetime'>('2years');
  const [isProcessing, setIsProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleRenew = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setSuccess(true);
      const newExpiry = selectedPlan === '1year' ? '09-11-2027' : selectedPlan === '2years' ? '09-11-2028' : 'Süresiz (Ömür Boyu)';
      onRenewSuccess?.(newExpiry);
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 1500);
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-lg w-full p-6 sm:p-7 space-y-5 animate-scale-in relative overflow-hidden">
        {/* Ambient Top Glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Zap className="w-4 h-4 fill-blue-600" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-slate-900">Tarife & Abonelik Yönetimi</h3>
              <p className="text-[11px] text-slate-400">OmniPost Enterprise Lisansınızı Güncelleyin</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Current Active Plan Card */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-50/70 to-indigo-50/50 border border-blue-200/80 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-extrabold tracking-wider text-blue-600 uppercase block">
              Mevcut Aktif Tarifeniz
            </span>
            <span className="font-extrabold text-slate-900 text-sm">Enterprise VIP Paketi</span>
            <span className="text-xs text-slate-500 block mt-0.5">
              Geçerlilik: <strong className="text-slate-800">09-11-2026</strong>
            </span>
          </div>
          <span className="px-3 py-1 rounded-full bg-emerald-500 text-white font-extrabold text-[11px] shadow-xs">
            AKTİF
          </span>
        </div>

        {/* Plan Selection Options */}
        <div className="space-y-2.5">
          <span className="text-xs font-bold text-slate-700 block">Uzatma & Yenileme Seçenekleri</span>

          <div
            onClick={() => setSelectedPlan('1year')}
            className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
              selectedPlan === '1year'
                ? 'border-blue-600 bg-blue-50/40 ring-2 ring-blue-500/20'
                : 'border-slate-200 hover:border-slate-300 bg-white'
            }`}
          >
            <div>
              <div className="font-bold text-xs text-slate-900">+1 Yıl Uzatma (2027)</div>
              <div className="text-[11px] text-slate-500">Tüm 12 platform ve sınırsız gönderi dahil</div>
            </div>
            <div className="text-right">
              <span className="font-black text-slate-900 text-sm">₺499</span>
              <span className="text-[10px] text-slate-400 block">/ ay</span>
            </div>
          </div>

          <div
            onClick={() => setSelectedPlan('2years')}
            className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between relative overflow-hidden ${
              selectedPlan === '2years'
                ? 'border-blue-600 bg-blue-50/40 ring-2 ring-blue-500/20'
                : 'border-slate-200 hover:border-slate-300 bg-white'
            }`}
          >
            <div className="absolute top-0 right-0 bg-gradient-to-l from-amber-500 to-orange-500 text-white text-[9px] font-black uppercase px-2 py-0.5 rounded-bl-lg">
              %25 İndirimli
            </div>
            <div>
              <div className="font-bold text-xs text-slate-900 flex items-center space-x-1.5">
                <span>+2 Yıl VIP Uzatma (2028)</span>
                <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              </div>
              <div className="text-[11px] text-slate-500">Öncelikli API kotası + Özel Müşteri Temsilcisi</div>
            </div>
            <div className="text-right">
              <span className="font-black text-slate-900 text-sm">₺375</span>
              <span className="text-[10px] text-slate-400 block">/ ay</span>
            </div>
          </div>
        </div>

        {/* Benefits Checklist */}
        <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600 pt-1">
          <div className="flex items-center space-x-1.5">
            <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
            <span>12 Sosyal Ağ Desteği</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
            <span>GPT-4o & Claude 3.5 AI</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
            <span>Sınırsız Otomasyon & RSS</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
            <span>AES-256 Token Kasası</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-end space-x-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer"
          >
            Kapat
          </button>
          <button
            type="button"
            disabled={isProcessing || success}
            onClick={handleRenew}
            className="px-6 py-2.5 rounded-xl bg-[#0ea5e9] hover:bg-[#0284c7] text-white font-extrabold text-xs tracking-wider shadow-md shadow-sky-500/20 active:scale-[0.99] transition-all flex items-center space-x-2 cursor-pointer disabled:opacity-70"
          >
            {success ? (
              <>
                <Check className="w-4 h-4 text-white" />
                <span>Tarife Yenilendi!</span>
              </>
            ) : isProcessing ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>İşleniyor...</span>
              </>
            ) : (
              <>
                <CreditCard className="w-4 h-4" />
                <span>TARİFEYİ YENİLE</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
