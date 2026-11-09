'use client';

import React, { useState } from 'react';
import {
  MessageSquare,
  Send,
  CheckCircle2,
  AlertCircle,
  X,
  Loader2,
  Sparkles,
  Phone,
  ExternalLink,
  MessageCircle,
} from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// WhatsApp icon SVG for authentic branding
const WhatsAppIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.507 14.307l-.009.075c-.301-.15-1.782-.879-2.057-.98-.276-.1-.476-.15-.676.15s-.776.98-.952 1.18c-.175.201-.351.226-.652.075-.3-.15-1.27-.468-2.42-1.493-.894-.798-1.498-1.784-1.674-2.085-.175-.301-.019-.464.132-.614.135-.135.3-.351.451-.526.15-.175.2-.301.3-.501.1-.2.05-.376-.025-.526-.075-.15-.676-1.629-.927-2.23-.244-.587-.493-.507-.677-.517-.175-.008-.376-.01-.576-.01s-.526.075-.802.376c-.276.301-1.053 1.028-1.053 2.507s1.078 2.908 1.229 3.109c.15.201 2.12 3.238 5.137 4.542.718.31 1.278.496 1.716.635.72.229 1.376.196 1.894.119.579-.087 1.782-.728 2.033-1.431.25-.702.25-1.304.175-1.431-.075-.125-.276-.201-.577-.351z" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.477 2 12c0 1.892.525 3.662 1.438 5.176L2.05 21.95l4.908-1.353A9.956 9.956 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.2a8.163 8.163 0 01-4.333-1.237l-.311-.192-2.91.802.801-2.836-.207-.333A8.164 8.164 0 1112 20.2z"
    />
  </svg>
);

const SUPPORT_WHATSAPP_NUMBER = '05539771647';
const SUPPORT_WHATSAPP_INT = '905539771647';

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState<'support' | 'feedback' | 'api_issue' | 'enterprise'>('support');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successTicket, setSuccessTicket] = useState<string | null>(null);
  const [whatsappUrl, setWhatsappUrl] = useState<string>('');

  if (!isOpen) return null;

  const categoryLabels: Record<string, string> = {
    support: 'Teknik Destek & Yardım',
    feedback: 'Geri Bildirim & Öneri',
    api_issue: 'API & Hesap Bağlantı Sorunu',
    enterprise: 'Kurumsal & Ajans Çözümleri',
  };

  const buildWhatsAppMessage = (ticketId: string) => {
    return (
      `*OmniPost Destek Talebi* 🚀\n\n` +
      `📋 *Talep No:* ${ticketId}\n` +
      `👤 *Ad Soyad:* ${name.trim()}\n` +
      `📧 *E-Posta:* ${email.trim()}\n` +
      (phone.trim() ? `📱 *Telefon:* ${phone.trim()}\n` : '') +
      `🏷️ *Kategori:* ${categoryLabels[category] || category}\n` +
      `📅 *Tarih:* ${new Date().toLocaleString('tr-TR')}\n\n` +
      `💬 *Mesaj:* \n` +
      `${message.trim()}\n\n` +
      `----------------------------\n` +
      `_OmniPost Sosyal Medya Otomasyon Stüdyosu_`
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      // 1. Sunucuya da kaydet (Audit & DB log)
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          category,
          message: message.trim(),
          targetWhatsApp: SUPPORT_WHATSAPP_NUMBER,
        }),
      });

      const data = await res.json();
      const ticketId = data.ticketId || 'TK-' + Date.now().toString().slice(-6);

      // 2. WhatsApp URL oluştur
      const wpMsg = buildWhatsAppMessage(ticketId);
      const targetUrl = `https://wa.me/${SUPPORT_WHATSAPP_INT}?text=${encodeURIComponent(wpMsg)}`;
      setWhatsappUrl(targetUrl);
      setSuccessTicket(ticketId);

      // 3. Kullanıcıyı doğrudan WhatsApp'a yönlendir
      if (typeof window !== 'undefined') {
        const opened = window.open(targetUrl, '_blank');
        if (!opened) {
          // Popup engellendiyse bile modal içerisinde link sunulacak
          console.warn('Popup blocker prevented direct redirect');
        }
      }
    } catch (err: any) {
      setError(err.message || 'Bağlantı hatası oluştu.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDirectWhatsAppClick = () => {
    const quickMsg = `Merhaba, OmniPost platformu ile ilgili destek almak istiyorum.`;
    const targetUrl = `https://wa.me/${SUPPORT_WHATSAPP_INT}?text=${encodeURIComponent(quickMsg)}`;
    window.open(targetUrl, '_blank');
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
    setError(null);
    setSuccessTicket(null);
    setWhatsappUrl('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-slate-100 bg-gradient-to-r from-slate-50 via-emerald-50/30 to-blue-50/30">
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-md shadow-emerald-500/25">
              <WhatsAppIcon className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-base font-extrabold text-slate-900">Destek & İletişim Hattı</h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-200">
                  WhatsApp Canlı
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Talepleriniz doğrudan <strong className="text-emerald-700 font-bold">{SUPPORT_WHATSAPP_NUMBER}</strong> numarasına iletilir.
              </p>
            </div>
          </div>
          <button
            onClick={handleReset}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6">
          {successTicket ? (
            <div className="py-6 text-center space-y-4">
              <div className="w-16 h-16 rounded-3xl bg-emerald-50 text-emerald-600 border border-emerald-200 mx-auto flex items-center justify-center shadow-inner">
                <WhatsAppIcon className="w-9 h-9" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-slate-900">Talebiniz WhatsApp&apos;a Yönlendirildi!</h4>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  Mesajınız hazırlandı ve <strong className="text-emerald-700 font-semibold">{SUPPORT_WHATSAPP_NUMBER}</strong> WhatsApp destek hattımıza aktarılıyor.
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-mono text-slate-600 max-w-xs mx-auto flex items-center justify-between">
                <span className="text-slate-400">Takip Kodu:</span>
                <span className="font-bold text-slate-900">{successTicket}</span>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2.5">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-500/25 transition-all flex items-center justify-center space-x-2"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  <span>WhatsApp&apos;ta Görüşmeyi Aç</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                </a>

                <button
                  onClick={handleReset}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs transition-all"
                >
                  Kapat
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {/* WhatsApp Live Banner */}
              <div className="p-3 rounded-2xl bg-emerald-50/80 border border-emerald-200 text-emerald-900 flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <div className="text-[11px] leading-tight">
                    <span className="font-bold block">Hızlı WhatsApp Destek Hattı:</span>
                    <span className="font-mono text-emerald-700 font-bold">{SUPPORT_WHATSAPP_NUMBER}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleDirectWhatsAppClick}
                  className="px-2.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold flex items-center space-x-1 transition-colors shadow-xs"
                >
                  <WhatsAppIcon className="w-3 h-3" />
                  <span>Direkt Yaz</span>
                </button>
              </div>

              {error && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Adınız Soyadınız *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Örn: Ahmet Yılmaz"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-xs"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">E-Posta Adresiniz *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ornek@sirket.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Telefon Numaranız (İsteğe Bağlı)</label>
                <div className="relative">
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="05XX XXX XX XX"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-xs"
                  />
                  <Phone className="w-3.5 h-3.5 text-slate-400 absolute right-3.5 top-3" />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Konu Kategorisi</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'support', label: 'Teknik Destek' },
                    { id: 'api_issue', label: 'Hesap / API' },
                    { id: 'feedback', label: 'Öneri & İstek' },
                    { id: 'enterprise', label: 'Kurumsal' },
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setCategory(cat.id as any)}
                      className={`py-2 px-2 rounded-xl border text-center transition-all font-medium ${
                        category === cat.id
                          ? 'border-emerald-500 bg-emerald-50 text-emerald-800 font-bold'
                          : 'border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Talebiniz / Mesajınız *</label>
                <textarea
                  required
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Yaşadığınız sorunu, sorunun olduğu platformu veya talebinizi belirtin..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-xs resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end space-x-2">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-4 py-2.5 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold transition-colors"
                >
                  Vazgeç
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold flex items-center space-x-2 shadow-md shadow-emerald-500/20 transition-all disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>İletiliyor...</span>
                    </>
                  ) : (
                    <>
                      <WhatsAppIcon className="w-4 h-4" />
                      <span>WhatsApp İle Gönder</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactModal;
