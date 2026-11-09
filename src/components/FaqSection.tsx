'use client';

import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Sparkles, ShieldCheck, Zap } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: 'OmniPost aynı anda kaç platforma içerik dağıtabilir?',
    answer:
      'OmniPost, tek bir gönderi içeriğini (başlık, açıklama ve medya) eşzamanlı olarak YouTube, X (Twitter), Instagram, Facebook, TikTok, Pinterest ve Threads olmak üzere 7 farklı platforma aynı anda dağıtabilir.',
  },
  {
    question: 'API anahtarlarım ve sosyal medya hesap şifrelerim güvende mi?',
    answer:
      'Evet. OmniPost Token Kasası (Token Vault), belirteçleri istemciye (tarayıcıya) asla açık göndermez. Sunucu tarafında AES-256-CBC standardında şifrelenir ve maskelenmiş olarak görüntülenir. Ayrıca dilediğiniz an tüm token kasasını tek tıkla silebilirsiniz.',
  },
  {
    question: 'Bir platformda hata oluşursa diğer platformlar etkilenir mi?',
    answer:
      'Hayır. OmniPost "İzole Hata Toleransı" mimarisine sahiptir (Promise.allSettled). Örneğin bir platformda kota dolsa veya hesap bağlı olmasa dahi diğer başarılı platformlar aksamadan yayınlanır. Hata alan platform için Gönderi Geçmişi panelinden tek tıkla "Tekrar Dene" yapabilirsiniz.',
  },
  {
    question: 'Zamanlanmış gönderiler bilgisayarım kapalıyken de paylaşılır mı?',
    answer:
      'Evet. Zamanlama servisi sunucu tarafında kalıcı JSON kuyruğunda tutulur ve arka plan worker servisi (/api/schedule/worker) sayesinde cihazınız kapalı olsa dahi planlanan saatte tetiklenerek içeriklerinizi yayınlar.',
  },
  {
    question: 'OmniPost mobil cihazlarda nasıl çalışır ve ana ekrana yüklenebilir mi?',
    answer:
      'OmniPost, PWA (Progressive Web App) standartlarına tam uyumludur. Akıllı telefon veya tabletinizin tarayıcısından "Ana Ekrana Ekle" diyerek yerel uygulama gibi tam ekran çalıştırabilir ve arka kamera ile anlık fotoğraf/video çekerek stüdyoya yükleyebilirsiniz.',
  },
];

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  // Generate Google JSON-LD FAQPage Schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
      {/* Schema Script for Google Search */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[11px] font-bold mb-1">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Bilgi Merkezi & SSS</span>
          </div>
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">Sıkça Sorulan Sorular</h2>
        </div>
        <span className="text-xs text-slate-500">Google FAQ Schema Uyumlu</span>
      </div>

      {/* Accordion List */}
      <div className="space-y-3">
        {FAQS.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className={`rounded-2xl border transition-all ${
                isOpen
                  ? 'border-blue-200 bg-blue-50/20 shadow-xs'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full py-3.5 px-4 sm:px-5 flex items-center justify-between text-left focus:outline-none"
              >
                <span className="text-xs sm:text-sm font-bold text-slate-800 pr-3">
                  {faq.question}
                </span>
                <span className={`w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
                  isOpen ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-500'
                }`}>
                  {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </span>
              </button>

              {isOpen && (
                <div className="px-4 sm:px-5 pb-4 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100/60 pt-3 animate-in fade-in duration-200">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
