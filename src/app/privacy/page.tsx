import React from 'react';
import Link from 'next/link';
import { Shield, ArrowLeft, Lock, FileText, CheckCircle2, Mail, ExternalLink, Calendar } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gizlilik Politikası (Privacy Policy) | OmniPost',
  description: 'OmniPost platformunun KVKK ve GDPR uyumlu veri işleme, AES-256 token şifreleme ve kullanıcı gizliliği politikası.',
  alternates: {
    canonical: '/privacy',
  },
};

export default function PrivacyPolicyPage() {
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
            <span>Son Güncelleme: {lastUpdated}</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        {/* Header Hero */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm mb-8">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold mb-4">
            <Shield className="w-3.5 h-3.5" />
            <span>KVKK & GDPR Uyumluluğu</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
            Gizlilik Politikası ve Kişisel Verilerin Korunması
          </h1>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            OmniPost olarak gizliliğinize ve veri güvenliğinize en yüksek düzeyde önem veriyoruz. Bu politika; YouTube, X (Twitter), Instagram, Facebook, TikTok, Pinterest ve Threads hesaplarınızı platformumuza bağlarken hangi verilerin toplandığını, nasıl korunduğunu ve haklarınızı açıklamaktadır.
          </p>
        </div>

        {/* Policy Body */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-8 text-sm leading-relaxed text-slate-700">
          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
              <span className="w-6 h-6 rounded-lg bg-blue-100 text-blue-700 text-xs flex items-center justify-center font-bold">1</span>
              <span>Veri Sorumlusu ve Kapsam</span>
            </h2>
            <p>
              6698 sayılı Kişisel Verilerin Korunması Kanunu (&quot;KVKK&quot;) ve Avrupa Birliği Genel Veri Koruma Tüzüğü (&quot;GDPR&quot;) uyarınca, <strong>OmniPost Çoklu Sosyal Medya Yönetim Platformu</strong> (&quot;Platform&quot;), kullanıcılarının kimlik ve oturum verilerini işleyen veri sorumlusudur.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
              <span className="w-6 h-6 rounded-lg bg-blue-100 text-blue-700 text-xs flex items-center justify-center font-bold">2</span>
              <span>Toplanan Veriler ve Kullanım Amaçları</span>
            </h2>
            <ul className="space-y-2 list-disc list-inside text-slate-600 pl-2">
              <li><strong>OAuth 2.0 Kimlik Belirteçleri (Access & Refresh Token):</strong> Sosyal medya platformlarına adınıza içerik yayınlayabilmek için gereklidir.</li>
              <li><strong>İçerik ve Medya Dosyaları:</strong> Yüklediğiniz görseller, videolar ve metinler yalnızca dağıtım motoru tarafından hedeflenen platformlara iletilmek amacıyla işlenir.</li>
              <li><strong>Teknik Analitik Verileri:</strong> Başarılı/başarısız gönderi sayıları, hata logları ve sistem performans metrikleri.</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="space-y-3 p-5 rounded-2xl bg-slate-50 border border-slate-200">
            <h2 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
              <Lock className="w-4 h-4 text-emerald-600" />
              <span>AES-256 Şifreli Token Kasası (Token Vault)</span>
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm">
              Sosyal medya API belirteçleriniz (Client Secret & Refresh Token), sunucu ortamında <strong>AES-256-CBC</strong> endüstri standardı şifreleme algoritması ile saklanır. İstemci tarayıcısına asla açık token iletilmez; arayüzde yalnızca maskelenmiş belirteçler (örn: <code>ya29.••••••••Kz89</code>) görüntülenir.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
              <span className="w-6 h-6 rounded-lg bg-blue-100 text-blue-700 text-xs flex items-center justify-center font-bold">3</span>
              <span>Üçüncü Taraf API Hizmetleri</span>
            </h2>
            <p>
              OmniPost, içerik dağıtımını sağlamak adına aşağıdaki resmi sosyal medya API&apos;larını kullanır:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
              {[
                { name: 'Google & YouTube API Services', url: 'https://policies.google.com/privacy' },
                { name: 'Meta Graph API (Instagram & Facebook & Threads)', url: 'https://www.facebook.com/privacy/policy' },
                { name: 'X / Twitter API Developer Terms', url: 'https://twitter.com/privacy' },
                { name: 'TikTok Content Posting API', url: 'https://www.tiktok.com/legal/privacy-policy' },
                { name: 'Pinterest Developers API', url: 'https://policy.pinterest.com/privacy-policy' },
              ].map((item, idx) => (
                <a
                  key={idx}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50/30 flex items-center justify-between text-xs text-slate-700 transition-colors"
                >
                  <span className="font-medium">{item.name}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                </a>
              ))}
            </div>
          </section>

          {/* Section 5 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
              <span className="w-6 h-6 rounded-lg bg-blue-100 text-blue-700 text-xs flex items-center justify-center font-bold">4</span>
              <span>Kullanıcı Hakları (KVKK Madde 11 & GDPR)</span>
            </h2>
            <p>
              Kullanıcılarımız diledikleri an hesap bağlantılarını kesebilir, Token Kasası&apos;ndaki verilerinin silinmesini talep edebilir ve platformdaki geçmiş kayıtlarının temizlenmesini (&quot;Hesaplar &amp; Entegrasyonlar&quot; panelindeki &quot;Kasayı Sıfırla&quot; butonu ile) tek tıkla gerçekleştirebilirler.
            </p>
          </section>

          {/* Section 6: Contact */}
          <section className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="font-bold text-slate-900 block">Sorularınız veya Veri Talepleriniz İçin:</span>
              <span className="text-xs text-slate-500">Veri koruma görevlimize 7/24 e-posta ile ulaşabilirsiniz.</span>
            </div>
            <a
              href="mailto:privacy@omnipost.app"
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm transition-all"
            >
              <Mail className="w-4 h-4" />
              <span>privacy@omnipost.app</span>
            </a>
          </section>
        </div>
      </main>
    </div>
  );
}
