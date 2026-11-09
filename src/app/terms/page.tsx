import React from 'react';
import Link from 'next/link';
import { FileCheck, ArrowLeft, AlertCircle, CheckCircle2, ShieldAlert, Mail, Calendar } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kullanım Şartları (Terms of Service) | OmniPost',
  description: 'OmniPost sosyal medya yönetim platformu kullanım koşulları, API entegrasyon kuralları ve hizmet sözleşmesi.',
  alternates: {
    canonical: '/terms',
  },
};

export default function TermsOfServicePage() {
  const lastUpdated = '5 Ekim 2026';

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 selection:bg-blue-500 selection:text-white">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 text-xs font-semibold text-slate-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>OmniPost Stüdyo&apos;ya Dön</span>
          </Link>

          <div className="flex items-center space-x-2 text-xs text-slate-500">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>Yürürlük Tarihi: {lastUpdated}</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        {/* Header Hero */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm mb-8">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold mb-4">
            <FileCheck className="w-3.5 h-3.5" />
            <span>Kullanıcı Hizmet Sözleşmesi</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
            Kullanım Şartları ve Hizmet Koşulları
          </h1>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Lütfen OmniPost platformunu kullanmadan önce bu kullanım şartlarını dikkatlice okuyunuz. Platformumuzu kullanarak veya hesaplarınızı entegre ederek bu koşulları kabul etmiş sayılırsınız.
          </p>
        </div>

        {/* Terms Body */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-8 text-sm leading-relaxed text-slate-700">
          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
              <span className="w-6 h-6 rounded-lg bg-indigo-100 text-indigo-700 text-xs flex items-center justify-center font-bold">1</span>
              <span>Hizmetin Tanımı ve Kapsamı</span>
            </h2>
            <p>
              OmniPost; kullanıcıların tek bir merkezden YouTube, X, Instagram, Facebook, TikTok, Pinterest ve Threads hesaplarına anlık veya zamanlanmış içerik göndermelerini sağlayan bir otomasyon stüdyosudur. Hizmet, sosyal medya sağlayıcılarının resmi API protokolleri çerçevesinde sunulmaktadır.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
              <span className="w-6 h-6 rounded-lg bg-indigo-100 text-indigo-700 text-xs flex items-center justify-center font-bold">2</span>
              <span>Kabul Edilebilir Kullanım ve İçerik Standartları</span>
            </h2>
            <p>Kullanıcılar aşağıdaki nitelikteki içerikleri yayınlamayacaklarını taahhüt ederler:</p>
            <ul className="space-y-2 list-disc list-inside text-slate-600 pl-2">
              <li>Spam, yanıltıcı veya otomatik zararlı yazılım içeren bağlantılar,</li>
              <li>Telif hakkı veya fikri mülkiyet ihlali teşkil eden lisanssız materyaller,</li>
              <li>İlgili sosyal medya platformlarının Topluluk Kuralları&apos;na (Community Guidelines) aykırı içerikler.</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="space-y-3 p-5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950">
            <h2 className="text-lg font-bold text-amber-900 flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-amber-600" />
              <span>API Limitleri, Kotalar ve Üçüncü Taraf Değişiklikleri</span>
            </h2>
            <p className="text-xs sm:text-sm leading-relaxed text-amber-900">
              Sosyal medya platformları (Meta, Google, X vb.) API erişim limitlerini veya politikalarını tek taraflı olarak değiştirebilir. Platformumuz, üçüncü taraf platformların sunucu kesintilerinden veya hesap kısıtlamalarından doğrudan sorumlu tutulamaz. OmniPost, izole hata motoru ile olası aksaklıkları diğer platformlara yansıtmadan yönetir.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
              <span className="w-6 h-6 rounded-lg bg-indigo-100 text-indigo-700 text-xs flex items-center justify-center font-bold">3</span>
              <span>Hesap Güvenliği ve Token Yönetimi</span>
            </h2>
            <p>
              Kullanıcılar, tanımladıkları API anahtarlarının ve OAuth izinlerinin yetkilendirmesinden sorumludur. OmniPost, Token Kasası (Token Vault) üzerinde AES-256 şifreleme sağlayarak azami güvenlik tedbirlerini almaktadır.
            </p>
          </section>

          {/* Section 5 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
              <span className="w-6 h-6 rounded-lg bg-indigo-100 text-indigo-700 text-xs flex items-center justify-center font-bold">4</span>
              <span>Fesih ve Hesap Kapatma</span>
            </h2>
            <p>
              Kullanıcı dilediği an hesap bağlantılarını keserek hizmet alımını sonlandırabilir. Kullanım şartlarını ihlal eden kullanıcıların API erişimleri askıya alınabilir.
            </p>
          </section>

          {/* Contact */}
          <section className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="font-bold text-slate-900 block">Hukuki Destek ve Sorular:</span>
              <span className="text-xs text-slate-500">Hizmet sözleşmesi detayları için bize yazabilirsiniz.</span>
            </div>
            <a
              href="mailto:legal@omnipost.app"
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-sm transition-all"
            >
              <Mail className="w-4 h-4" />
              <span>legal@omnipost.app</span>
            </a>
          </section>
        </div>
      </main>
    </div>
  );
}
