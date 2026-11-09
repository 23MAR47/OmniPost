'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShieldCheck, Cookie, Settings2, Check, X, ChevronDown, ChevronUp } from 'lucide-react';

interface CookiePreferences {
  necessary: boolean; // Always true
  analytics: boolean;
  preferences: boolean;
  timestamp: string;
}

const STORAGE_KEY = 'omnipost_cookie_consent_v1';

export const CookieConsent: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [analyticsAllowed, setAnalyticsAllowed] = useState(true);
  const [preferencesAllowed, setPreferencesAllowed] = useState(true);

  useEffect(() => {
    // Check if user has already made a choice
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) {
        // Show after a subtle 1-second delay
        const timer = setTimeout(() => setIsOpen(true), 1000);
        return () => clearTimeout(timer);
      } else {
        const parsed: CookiePreferences = JSON.parse(saved);
        setAnalyticsAllowed(parsed.analytics);
        setPreferencesAllowed(parsed.preferences);
        applyConsentToGtag(parsed.analytics);
      }
    } catch (e) {
      setIsOpen(true);
    }
  }, []);

  const applyConsentToGtag = (allowed: boolean) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('consent', 'update', {
        analytics_storage: allowed ? 'granted' : 'denied',
        ad_storage: 'denied',
      });
    }
  };

  const savePreferences = (analytics: boolean, prefs: boolean) => {
    const consent: CookiePreferences = {
      necessary: true,
      analytics,
      preferences: prefs,
      timestamp: new Date().toISOString(),
    };

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
    } catch (e) {
      console.warn('Cookie preferences could not be stored in localStorage', e);
    }

    applyConsentToGtag(analytics);
    setIsOpen(false);
  };

  const handleAcceptAll = () => {
    setAnalyticsAllowed(true);
    setPreferencesAllowed(true);
    savePreferences(true, true);
  };

  const handleRejectNonEssential = () => {
    setAnalyticsAllowed(false);
    setPreferencesAllowed(false);
    savePreferences(false, false);
  };

  const handleSaveCustom = () => {
    savePreferences(analyticsAllowed, preferencesAllowed);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 sm:bottom-6 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-2xl p-5 sm:p-6 text-slate-800 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 flex-shrink-0">
              <Cookie className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Çerez Tercihleriniz (KVKK / GDPR)</h3>
              <span className="text-[11px] text-slate-500">Daha güvenli ve kişiselleştirilmiş bir deneyim</span>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
            aria-label="Kapat"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Short Text */}
        <p className="text-xs text-slate-600 leading-relaxed">
          OmniPost olarak sitemizde temel işlevleri yürütmek, oturum güvenliğini sağlamak ve analiz gerçekleştirmek amacıyla çerezler kullanmaktayız. Detaylı bilgi için{' '}
          <Link href="/privacy" className="text-blue-600 underline font-medium hover:text-blue-700">
            Gizlilik Politikası
          </Link>
          &apos;mızı inceleyebilirsiniz.
        </p>

        {/* Detailed Options (Accordion) */}
        {showDetails && (
          <div className="space-y-2.5 pt-2 border-t border-slate-100 text-xs animate-in fade-in duration-200">
            {/* Essential Cookies */}
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200">
              <div>
                <span className="font-bold text-slate-800 block">Zorunlu Çerezler</span>
                <span className="text-[10px] text-slate-500">Sistemin çalışması, oturum ve CSRF koruması için zorunludur.</span>
              </div>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                Her Zaman Aktif
              </span>
            </div>

            {/* Analytics Cookies */}
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200">
              <div>
                <span className="font-bold text-slate-800 block">Analitik ve Performans</span>
                <span className="text-[10px] text-slate-500">Hata raporlaması ve kullanıcı deneyimi ölçümü (GA4).</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={analyticsAllowed}
                  onChange={(e) => setAnalyticsAllowed(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-8 h-4 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-3 after:width-3 after:transition-all peer-checked:bg-blue-600" />
              </label>
            </div>

            {/* Preference Cookies */}
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200">
              <div>
                <span className="font-bold text-slate-800 block">Tercih Çerezleri</span>
                <span className="text-[10px] text-slate-500">Seçili platformların ve arayüz temalarının hatırlanması.</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={preferencesAllowed}
                  onChange={(e) => setPreferencesAllowed(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-8 h-4 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-3 after:width-3 after:transition-all peer-checked:bg-blue-600" />
              </label>
            </div>
          </div>
        )}

        {/* Buttons */}
        <div className="space-y-2 pt-1">
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleAcceptAll}
              className="w-full py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition-all"
            >
              Tümünü Kabul Et
            </button>
            <button
              onClick={handleRejectNonEssential}
              className="w-full py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors"
            >
              Yalnızca Zorunlu
            </button>
          </div>

          <div className="flex items-center justify-between pt-1">
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="text-[11px] font-semibold text-slate-500 hover:text-slate-800 flex items-center space-x-1"
            >
              <Settings2 className="w-3.5 h-3.5" />
              <span>{showDetails ? 'Detayları Gizle' : 'Tercihleri Özelleştir'}</span>
              {showDetails ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>

            {showDetails && (
              <button
                onClick={handleSaveCustom}
                className="text-[11px] font-bold text-blue-600 hover:text-blue-800"
              >
                Seçimleri Kaydet
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
