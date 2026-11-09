'use client';

import React, { useState, useEffect } from 'react';
import {
  Menu,
  X,
  ChevronDown,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Check,
  ShieldCheck,
  Zap,
  Share2,
  Calendar,
  Layers,
  Image as ImageIcon,
  Send,
  HelpCircle,
  Phone,
  Mail,
  ExternalLink,
  Lock,
  UserCheck,
  Sliders,
  DollarSign,
  ChevronLeft,
  ChevronRight,
  Info,
  Shield,
  Star,
  Clock,
  TrendingUp,
  Smartphone,
  BookOpen,
  Headphones,
  Plus,
  Flame,
  FileSpreadsheet,
  Rss,
  Stamp,
  MessageSquare,
  ThumbsUp,
  Heart
} from 'lucide-react';
import { PlatformIcon } from './PlatformIcon';
import { OmniPostLogo } from './OmniPostLogo';
import { Reveal } from './AnimatedUI';
import { SocialPlatformId } from '@/types';

interface GirisSayfasiViewProps {
  onEnterPanel: () => void;
  onOpenContact?: () => void;
}

export const GirisSayfasiView: React.FC<GirisSayfasiViewProps> = ({
  onEnterPanel,
  onOpenContact,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [kurumsalDropdownOpen, setKurumsalDropdownOpen] = useState(false);
  const [corporateModal, setCorporateModal] = useState<{ title: string; content: string } | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [isAnnually, setIsAnnually] = useState(false);

  // ─── INTERACTIVE HERO MOCKUP STATE ───
  const [mockupTab, setMockupTab] = useState<'media' | 'link' | 'text'>('media');
  const [mockupPlatform, setMockupPlatform] = useState<SocialPlatformId>('instagram');
  const [mockupText, setMockupText] = useState('OmniPost Pro ile 12 sosyal medya kanalına tek tıkla eşzamanlı dağıtım yapıyoruz! 🚀 #omnipost #sosyalmedya');

  // ─── 3D ISOMETRIC CAROUSEL STATE ───
  const [activeSlide, setActiveSlide] = useState(0);

  // ─── ACCOUNT GROUPS SIMULATOR STATE ───
  const [selectedGroup, setSelectedGroup] = useState<'ecommerce' | 'b2b' | 'trends' | 'all'>('ecommerce');
  const [groupToast, setGroupToast] = useState<string | null>(null);

  // ─── ROI CALCULATOR STATE ───
  const [accountCount, setAccountCount] = useState<number>(12);
  const [hoursPerWeek, setHoursPerWeek] = useState<number>(16);

  // Dynamic ROI Calculations (450 TL/saat iş gücü)
  const calculatedHoursSaved = Math.round(hoursPerWeek * 0.75);
  const calculatedMonthlyMoneySaved = Math.round(calculatedHoursSaved * 4.2 * 450);
  const calculatedAnnualMoneySaved = calculatedMonthlyMoneySaved * 12;

  // ─── TESTIMONIALS SLIDER STATE ───
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Smooth scroll
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // 12 Supported Social Platforms (matching dijitalpanelim.com)
  const socialIcons: { id: SocialPlatformId | 'behance'; name: string; color: string }[] = [
    { id: 'facebook', name: 'Facebook', color: '#1877F2' },
    { id: 'instagram', name: 'Instagram', color: '#E1306C' },
    { id: 'twitter', name: 'X (Twitter)', color: '#000000' },
    { id: 'linkedin', name: 'LinkedIn', color: '#0A66C2' },
    { id: 'googlebusiness', name: 'Google Business', color: '#4285F4' },
    { id: 'youtube', name: 'YouTube', color: '#FF0000' },
    { id: 'tumblr', name: 'Tumblr', color: '#001935' },
    { id: 'telegram', name: 'Telegram', color: '#26A5E4' },
    { id: 'discord', name: 'Discord', color: '#5865F2' },
    { id: 'pinterest', name: 'Pinterest', color: '#E60023' },
    { id: 'bluesky', name: 'Bluesky', color: '#1185FE' },
    { id: 'tiktok', name: 'TikTok', color: '#000000' },
  ];

  // Group definitions for interactive simulator
  const groupPlatforms: Record<string, SocialPlatformId[]> = {
    ecommerce: ['instagram', 'facebook', 'tiktok', 'pinterest'],
    b2b: ['linkedin', 'twitter', 'googlebusiness', 'telegram'],
    trends: ['tiktok', 'youtube', 'discord', 'bluesky'],
    all: ['instagram', 'facebook', 'twitter', 'linkedin', 'googlebusiness', 'youtube', 'tiktok', 'telegram', 'pinterest', 'discord', 'bluesky', 'tumblr'],
  };

  // Isometric Tools for the Carousel
  const carouselTools = [
    {
      title: 'Görsel Düzenleme',
      desc: 'Paylaşılacak görsellerinizi kolayca düzenleyip, filtre ve efektler ile uzman etkileyici artırabilirsiniz.',
      icon: '🎨',
      badge: 'Filtre & Boyutlandırma',
      bg: 'from-amber-400 to-orange-500',
    },
    {
      title: 'Örnek İçerikler & Trendler',
      desc: 'Sektörünüze özel hazır şablon, viral kanca cümleleri ve trend metin önerileri ile ilham alın.',
      icon: '💡',
      badge: 'Sektörel Şablonlar',
      bg: 'from-blue-400 to-indigo-500',
    },
    {
      title: 'Yapay Zeka Destekli Stüdyo',
      desc: 'Plexorin AI ile saniyeler içinde kanca cümleleri, viral hashtagler ve çok dilli kopyalar üretin.',
      icon: '🤖',
      badge: 'OpenAI Destekli',
      bg: 'from-violet-500 to-purple-600',
    },
    {
      title: 'Görsel Takvim & Planlama',
      desc: 'Aylık ve haftalık takvim üzerinde sürükle-bırak ile en yoğun saatlerde otomatik dağıtım yapın.',
      icon: '📅',
      badge: 'Akıllı Saat Radarı',
      bg: 'from-emerald-400 to-teal-500',
    },
    {
      title: 'Hesap Grubu Özelliği',
      desc: 'Hesaplarınızı E-Ticaret, B2B ve Genç Kitle gibi sektör kümelerine ayırıp tek tıkla paylaşın.',
      icon: '👥',
      badge: 'Akıllı Kümeler',
      bg: 'from-rose-400 to-pink-500',
    },
    {
      title: 'RSS ile Otomatik Dağıtım',
      desc: 'Web sitenizdeki blog veya haber yayınlandığı an tüm sosyal ağlarınıza eş zamanlı iletilir.',
      icon: '📡',
      badge: 'Anlık Canlı Akış',
      bg: 'from-orange-400 to-red-500',
    },
    {
      title: 'Toplu Gönderi (CSV / Excel)',
      desc: 'Tüm ayın sosyal medya planlamasını Excel şablonuyla yükleyin, saniyeler içinde takvime yerleşsin.',
      icon: '📑',
      badge: 'Toplu Yükleme',
      bg: 'from-cyan-400 to-blue-600',
    },
    {
      title: 'Logo & Filigran Koruması',
      desc: 'Görsel ve videolarınıza otomatik olarak şirket logonuzu veya filigranınızı ekleyerek telifinizi koruyun.',
      icon: '🛡️',
      badge: 'Marka Güvencesi',
      bg: 'from-purple-400 to-pink-600',
    },
  ];

  // Auto-cycle carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % carouselTools.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [carouselTools.length]);

  // Verified Customer Testimonials
  const testimonials = [
    {
      name: 'Rana Üner',
      role: 'Dijital Medya Direktörü',
      company: 'Nova İletişim & Pazarlama',
      comment: 'OmniPost Pro’ya geçtikten sonra 24 farklı müşterimizin sosyal medya yönetimini tek bir ekrandan sıfır gecikmeyle yürütmeye başladık. Haftada en az 20 saatlik operasyonel iş yükünden kurtulduk.',
      rating: 5,
    },
    {
      name: 'İlyas Kayan',
      role: 'E-Ticaret & Pazarlama Yöneticisi',
      company: 'Modakent Global',
      comment: 'Kampanyalarımızı aynı anda Instagram, TikTok, Pinterest ve Facebook’a tek tuşla yayınlamak ciro dönüşümlerimizi %38 artırdı. Takvim görünümü ve en yoğun saat önerileri tam bir devrim.',
      rating: 5,
    },
    {
      name: 'Selin Aksoy',
      role: 'Sosyal Medya Uzmanı & İçerik Üretici',
      company: 'Büyüme Hub',
      comment: 'Yapay zeka asistanı ve hazır şablonlar sayesinde post metinlerini dakikalar içinde hazırlıyorum. Güvenlik tarafında şifre vermeden OAuth ile bağlanmak markalarımızın içini çok rahatlattı.',
      rating: 5,
    },
    {
      name: 'Mert Kahraman',
      role: 'Kurucu Ortak',
      company: 'Nexus Kreatif Ajans',
      comment: 'Ajanslar için hazırlanan Pro paketindeki müşteri onay linki özelliği iş akışımızı baştan yarattı. Müşteriler takvimdeki gönderileri panele girmeden tek tıkla onaylayabiliyor.',
      rating: 5,
    },
  ];

  // Frequently Asked Questions
  const faqs = [
    {
      q: 'OmniPost Pro nedir ve ne işe yarar?',
      a: 'OmniPost Pro, 12 farklı sosyal medya platformundaki (Facebook, Instagram, X, LinkedIn, TikTok, YouTube, Telegram vb.) hesaplarınızı tek bir merkezden yönetmenizi, tek tıkla eşzamanlı paylaşım yapmanızı ve ileri tarihli gönderi planlamanızı sağlayan bulut tabanlı bir sosyal medya otomasyon yazılımıdır.',
    },
    {
      q: 'Sosyal medya hesap şifrelerimi paylaşmam gerekiyor mu?',
      a: 'Kesinlikle hayır. Tüm hesap bağlantıları resmi sosyal ağ OAuth 2.0 API protokolleri üzerinden token bazlı gerçekleştirilir. Şifreleriniz asla sistemimizde tutulmaz, verileriniz AES-256 donanım anahtarı ile şifrelenir.',
    },
    {
      q: 'Ücretsiz deneme süresi var mı?',
      a: 'Evet, panele giriş yaparak kredi kartı bilgisi vermeden anında test hesabı oluşturabilir, tüm özellikleri 14 gün boyunca ücretsiz deneyimleyebilirsiniz.',
    },
    {
      q: 'Planladığım gönderiler bilgisayarım kapalıyken de paylaşılır mı?',
      a: 'Evet. OmniPost Pro %99.98 uptime garantili yüksek hızlı bulut sunucularda çalışır. Bilgisayarınız veya telefonunuz kapalı olsa bile planlanan saniyede içerikleriniz ilgili ağlarda canlıya alınır.',
    },
    {
      q: 'Toplu gönderi (Bulk CSV) yükleme desteği var mı?',
      a: 'Evet, Excel veya CSV şablonunuzu yükleyerek tüm ayın gönderilerini saniyeler içinde otomatik olarak takviminize yerleştirebilirsiniz.',
    },
    {
      q: 'Hesap grupları oluşturup sektörel bazda paylaşım yapabilir miyim?',
      a: 'Evet. E-Ticaret, B2B, Genç Kitle veya dilediğiniz özel etiketlerle hesap grupları oluşturabilir, tek tıkla yalnızca ilgili gruba özel içerik gönderebilirsiniz.',
    },
  ];

  // Pricing Plans
  const plans = [
    {
      id: 'eko',
      name: 'EKO TARİFE',
      sub: "KOBİ'lerin En Sevdiği",
      price: isAnnually ? 1000 : 1500,
      accounts: 5,
      popular: false,
      features: [
        'Toplam 5 Sosyal Hesap Bağlantısı',
        '12 Desteklenen Ağ Arasından Seçim',
        'Limitsiz Gönderi Planlama & Dağıtım',
        'Görsel Aylık & Haftalık Takvim',
        'Grup Özelliği (3 Özel Küme)',
        'Taslak Yönetimi & Otomatik Kayıt',
        'Görsel Boyutlandırma & Kırpma',
        '1 GB Bulut Medya Deposu',
      ],
    },
    {
      id: 'trio',
      name: 'TRİO TARİFE',
      sub: 'En Popüler Tercih (Ajans & Markalar)',
      price: isAnnually ? 2000 : 3000,
      accounts: 15,
      popular: true,
      features: [
        'Toplam 15 Sosyal Hesap Bağlantısı',
        '12 Desteklenen Ağın Tamamı',
        'Limitsiz Planlama & Eşzamanlı Dağıtım',
        'Görsel Takvim & En Yoğun Saat Radarı',
        '🎯 Sınırsız Hesap Grubu Kümeleme',
        '📡 RSS ile Otomatik Paylaşım',
        '📑 Toplu CSV Gönderi Yükleme Motoru',
        '🛡️ Otomatik Logo & Filigran Ekleme',
        '5 GB Güvenli Bulut Medya Deposu',
      ],
    },
    {
      id: 'pro',
      name: 'PRO AJANS',
      sub: 'Büyük Ekipler & Çoklu Müşteri',
      price: isAnnually ? 3600 : 5500,
      accounts: 40,
      popular: false,
      features: [
        'Toplam 40 Sosyal Hesap Bağlantısı',
        '12 Ağın Tamamı + Çoklu Profil Desteği',
        'Limitsiz Gönderi ve Çok Kanallı Dağıtım',
        '👥 Ekip İçi Onay Masası (Approval Flow)',
        'Müşteriye Özel Onay Linki Paylaşımı',
        '📡 Çoklu RSS Akış Otomasyonu',
        'Gelişmiş Etkileşim & Erişim Raporları',
        '25 GB Güvenli Bulut Medya Deposu',
      ],
    },
  ];

  // Feature Comparison Matrix rows
  const comparisonMatrix = [
    { feature: 'Desteklenen Sosyal Ağ Sayısı', eko: '12 Ağdan 5 Seçim', trio: '12 Ağın Tamamı', pro: '12 Ağ + Çoklu Profil' },
    { feature: 'Toplam Sosyal Hesap Limiti', eko: '5 Hesap', trio: '15 Hesap', pro: '40 Hesap (Genişletilebilir)' },
    { feature: 'Aylık Paylaşım Limiti', eko: 'Limitsiz', trio: 'Limitsiz', pro: 'Limitsiz' },
    { feature: 'Görsel Aylık & Haftalık Takvim', eko: true, trio: true, pro: true },
    { feature: 'En Yoğun Saat Algoritması', eko: false, trio: true, pro: true },
    { feature: 'Hesap Grubu Kümeleme', eko: '3 Grup', trio: 'Sınırsız', pro: 'Sınırsız' },
    { feature: 'Yapay Zekâ (AI) İçerik & Hashtag', eko: 'Temel (50/ay)', trio: 'Gelişmiş (300/ay)', pro: 'Sınırsız VIP' },
    { feature: 'RSS ile Otomatik İçerik Paylaşımı', eko: false, trio: true, pro: true },
    { feature: 'Toplu CSV / Excel Gönderi Yükleme', eko: false, trio: true, pro: true },
    { feature: 'Otomatik Logo & Filigran Damgalama', eko: false, trio: true, pro: true },
    { feature: 'Ekip İçi Onay Masası (Approval Engine)', eko: false, trio: false, pro: true },
    { feature: 'Müşteriye Özel Canlı Onay Linki', eko: false, trio: false, pro: true },
    { feature: 'Bulut Medya Depolama Alanı', eko: '1 GB', trio: '5 GB', pro: '25 GB' },
    { feature: 'Müşteri Desteği Seviyesi', eko: 'E-Posta Desteği', trio: 'Öncelikli E-Posta & Bilet', pro: '7/24 Özel Temsilci & WhatsApp' },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans selection:bg-blue-600 selection:text-white">
      {/* ════════════════════════════════════════════════════════════════════
          1. EXACT TOP HEADER (MATCHING USER SCREENSHOT 3 & DIJITALPANELIM)
          Navy Dark Slate (#1c2838), AÇIKLAMA, KULLANIM, S.S.S, VİDEOLAR, 
          TARİFELER, KURUMSAL ⌵, [ PANELE GİRİŞ ] (White Pill Button)
      ════════════════════════════════════════════════════════════════════ */}
      <header className="sticky top-0 z-50 bg-[#1c2838] text-white shadow-lg border-b border-slate-700/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Left: Brand Logo & Title */}
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <OmniPostLogo size={38} animated />
              <div className="flex items-center space-x-1.5">
                <span className="font-black text-xl tracking-tight text-white">
                  Omni<span className="text-blue-400">Post</span>
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-500 font-extrabold text-white uppercase tracking-wider">
                  PRO
                </span>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center space-x-7 text-xs font-bold uppercase tracking-wider text-slate-200">
              <a
                href="#aciklama"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('aciklama');
                }}
                className="hover:text-white transition-colors cursor-pointer"
              >
                AÇIKLAMA
              </a>
              <a
                href="#kullanim"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('kullanim');
                }}
                className="hover:text-white transition-colors cursor-pointer"
              >
                KULLANIM
              </a>
              <a
                href="#gruplar"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('gruplar');
                }}
                className="hover:text-white transition-colors cursor-pointer text-blue-300"
              >
                HESAP GRUPLARI
              </a>
              <a
                href="#hesaplayici"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('hesaplayici');
                }}
                className="hover:text-white transition-colors cursor-pointer text-emerald-300"
              >
                HESAPLAYICI
              </a>
              <a
                href="#tarifeler"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('tarifeler');
                }}
                className="hover:text-white transition-colors cursor-pointer"
              >
                TARİFELER
              </a>
              <a
                href="#sss"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('sss');
                }}
                className="hover:text-white transition-colors cursor-pointer"
              >
                S.S.S
              </a>

              {/* Kurumsal Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setKurumsalDropdownOpen(true)}
                onMouseLeave={() => setKurumsalDropdownOpen(false)}
              >
                <button
                  type="button"
                  onClick={() => setKurumsalDropdownOpen(!kurumsalDropdownOpen)}
                  className="flex items-center space-x-1 hover:text-white transition-colors cursor-pointer py-2"
                >
                  <span>KURUMSAL</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>

                {kurumsalDropdownOpen && (
                  <div className="absolute top-full right-0 w-56 bg-[#1e293b] border border-slate-700 rounded-2xl shadow-2xl py-2 text-xs normal-case font-medium text-slate-200 animate-fade-in z-50">
                    <button
                      type="button"
                      onClick={() => {
                        setKurumsalDropdownOpen(false);
                        setCorporateModal({
                          title: 'Hakkımızda & Şirket Vizyonu',
                          content: 'OmniPost Pro, ajanslar, KOBİ\'ler ve kurumsal markalar için 12 sosyal medya ağını tek noktada birleştiren, yüksek performanslı ve güvenli bir SaaS dağıtım motorudur. 2026 yılı itibarıyla Türkiye ve küresel pazarda binlerce markanın sosyal medya süreçlerini sıfır hata ile otomatize etmektedir.',
                        });
                      }}
                      className="w-full text-left px-4 py-2.5 hover:bg-slate-700/60 hover:text-white transition-colors cursor-pointer flex items-center space-x-2"
                    >
                      <span>🏢</span>
                      <span>Hakkımızda</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setKurumsalDropdownOpen(false);
                        onOpenContact?.();
                      }}
                      className="w-full text-left px-4 py-2.5 hover:bg-slate-700/60 hover:text-white transition-colors cursor-pointer flex items-center space-x-2"
                    >
                      <span>📞</span>
                      <span>İletişim & Destek (7/24)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setKurumsalDropdownOpen(false);
                        setCorporateModal({
                          title: 'Güvenlik, Gizlilik & Donanım Anahtarlı AES-256',
                          content: 'OmniPost Pro, sıfır sızıntı güvenlik mimarisiyle tasarlanmıştır. Sosyal hesap token ve API anahtarlarınız AES-256 donanım anahtarı ile şifrelenir. Resmi OAuth 2.0 API protokolleri kullanılır; hesap şifreleriniz asla sunucularımızda saklanmaz.',
                        });
                      }}
                      className="w-full text-left px-4 py-2.5 hover:bg-slate-700/60 hover:text-white transition-colors cursor-pointer flex items-center space-x-2"
                    >
                      <span>🛡️</span>
                      <span>Güvenlik & Gizlilik</span>
                    </button>
                  </div>
                )}
              </div>

              {/* [ PANELE GİRİŞ ] (Exact Pill Outline Button from Screenshot 3) */}
              <button
                type="button"
                onClick={() => setIsLoginModalOpen(true)}
                className="px-6 py-2 rounded-full border-2 border-white/90 text-white hover:bg-white hover:text-[#1c2838] font-black text-xs uppercase tracking-wider transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer active:scale-95"
              >
                PANELE GİRİŞ
              </button>
            </nav>

            {/* Mobile Hamburger Button */}
            <div className="md:hidden flex items-center space-x-2">
              <button
                type="button"
                onClick={() => setIsLoginModalOpen(true)}
                className="px-3.5 py-1.5 rounded-full border border-white text-white font-bold text-[11px] uppercase"
              >
                GİRİŞ
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 cursor-pointer"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#16202c] border-b border-slate-700 px-4 pt-3 pb-6 space-y-3 text-sm font-bold uppercase tracking-wider animate-fade-in">
            <a
              href="#aciklama"
              onClick={() => {
                setMobileMenuOpen(false);
                scrollToSection('aciklama');
              }}
              className="block py-2 text-slate-200 hover:text-white"
            >
              AÇIKLAMA
            </a>
            <a
              href="#kullanim"
              onClick={() => {
                setMobileMenuOpen(false);
                scrollToSection('kullanim');
              }}
              className="block py-2 text-slate-200 hover:text-white"
            >
              KULLANIM
            </a>
            <a
              href="#gruplar"
              onClick={() => {
                setMobileMenuOpen(false);
                scrollToSection('gruplar');
              }}
              className="block py-2 text-blue-400 hover:text-white"
            >
              HESAP GRUPLARI
            </a>
            <a
              href="#hesaplayici"
              onClick={() => {
                setMobileMenuOpen(false);
                scrollToSection('hesaplayici');
              }}
              className="block py-2 text-emerald-400 hover:text-white"
            >
              HESAPLAYICI
            </a>
            <a
              href="#tarifeler"
              onClick={() => {
                setMobileMenuOpen(false);
                scrollToSection('tarifeler');
              }}
              className="block py-2 text-slate-200 hover:text-white"
            >
              TARİFELER
            </a>
            <a
              href="#sss"
              onClick={() => {
                setMobileMenuOpen(false);
                scrollToSection('sss');
              }}
              className="block py-2 text-slate-200 hover:text-white"
            >
              S.S.S
            </a>
            <div className="pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsLoginModalOpen(true);
                }}
                className="w-full py-3 rounded-full bg-white text-[#1c2838] font-black text-center text-xs uppercase cursor-pointer shadow-md"
              >
                PANELE GİRİŞ
              </button>
            </div>
          </div>
        )}
      </header>

      {/* ════════════════════════════════════════════════════════════════════
          2. HERO — Buffer/Publer REA pattern: workspace headline, short support,
          email+CTA, platform strip, "no credit card" reassurance + live mockup
      ════════════════════════════════════════════════════════════════════ */}
      <section className="bg-gradient-to-b from-[#1c2838] via-[#243342] to-[#1c2838] text-white pt-12 pb-24 relative overflow-hidden">
        {/* ─── SAKİN ARKA PLAN IŞIMALARI (görsel/video yok, saf gradyan) ─── */}
        <div className="absolute -top-20 left-[14%] w-72 h-72 rounded-full bg-sky-500/12 blur-3xl animate-aurora pointer-events-none" />
        <div className="absolute top-44 right-[10%] w-80 h-80 rounded-full bg-indigo-500/10 blur-3xl animate-aurora pointer-events-none" style={{ animationDelay: '5s' }} />
        <div className="absolute bottom-0 left-[42%] w-64 h-64 rounded-full bg-violet-500/8 blur-3xl animate-aurora pointer-events-none" style={{ animationDelay: '9s' }} />

        <div
          className="absolute inset-0 pointer-events-none opacity-[0.07]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        <div className="absolute inset-0 pointer-events-none opacity-5 flex items-center justify-between px-12">
          <Sparkles className="w-64 h-64 text-white -rotate-12" />
          <Layers className="w-72 h-72 text-white rotate-12" />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
          <Reveal>
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-sky-500/15 border border-sky-400/35 text-sky-300 text-xs font-black tracking-widest uppercase animate-pulse-glow">
              <Sparkles className="w-3.5 h-3.5" />
              <span>YAPAY ZEKA · MCP · 12 PLATFORM</span>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
              Sosyal medya çalışma alanınız
            </h1>
          </Reveal>

          <Reveal delay={220}>
            <p className="max-w-2xl mx-auto text-base sm:text-xl text-slate-300 font-medium leading-relaxed">
              Paylaştığınız her platformla çalışır; planlama, yayın, gelen kutusu ve analitiği tek panelde birleştirir.
            </p>
          </Reveal>

          {/* Buffer-style email + CTA row */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-xl mx-auto">
            <label className="sr-only" htmlFor="hero-email">
              E-posta adresiniz
            </label>
            <input
              id="hero-email"
              type="email"
              placeholder="E-posta adresiniz..."
              className="w-full sm:flex-1 px-5 py-3.5 rounded-full bg-white/95 text-slate-900 text-sm font-medium placeholder:text-slate-400 border border-white/20 focus:outline-none focus:ring-2 focus:ring-sky-400/60"
            />
            <button
              onClick={() => setIsLoginModalOpen(true)}
              className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-sky-400 hover:bg-sky-300 text-slate-900 font-black text-sm tracking-wide transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-lg shadow-sky-900/30 shine-hover hover:scale-105 active:scale-95"
            >
              <span>Ücretsiz başlayın</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
          <p className="text-xs text-slate-400">
            Kart gerekmez · Ücretsiz deneyin · Panele anında giriş
          </p>

          {/* Platform strip (Publer/Buffer connect row) */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2">
            {socialIcons.map((soc) => (
              <div
                key={soc.id}
                title={soc.name}
                className="w-10 h-10 rounded-full flex items-center justify-center border border-white/15 bg-white/10 backdrop-blur-sm hover:scale-110 transition-transform"
                style={{ boxShadow: `0 0 0 1px ${soc.color}33` }}
              >
                <PlatformIcon
                  platform={soc.id === 'behance' ? 'bluesky' : soc.id}
                  size="sm"
                  className="text-white"
                />
              </div>
            ))}
          </div>

          {/* Publer-style outcome metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl mx-auto pt-4">
            {[
              { value: '+300%', label: 'çok kanallı etkileşim artışı potansiyeli' },
              { value: '2x', label: 'daha hızlı içerik hazırlama ve planlama' },
              { value: '5+ saat', label: 'haftalık sosyal medya iş yükü tasarrufu' },
            ].map((m) => (
              <div
                key={m.value}
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-sm"
              >
                <div className="text-2xl font-black text-sky-300">{m.value}</div>
                <div className="text-[11px] text-slate-400 leading-snug mt-1">{m.label}</div>
              </div>
            ))}
          </div>

          {/* ─── 3D RISING DASHBOARD MOCKUP WITH INTERACTIVE LIVE PREVIEW ─── */}
          <div className="mt-12 max-w-5xl mx-auto rounded-3xl p-2.5 sm:p-4 bg-gradient-to-b from-slate-600/40 to-slate-800/80 shadow-2xl border border-slate-600/60 backdrop-blur-md">
            <div className="bg-white rounded-2xl overflow-hidden shadow-2xl text-slate-800 border border-slate-200">
              {/* Browser bar */}
              <div className="bg-slate-100 px-4 py-3 border-b border-slate-200 flex items-center justify-between">
                <div className="flex items-center space-x-1.5">
                  <span className="w-3 h-3 rounded-full bg-rose-400" />
                  <span className="w-3 h-3 rounded-full bg-amber-400" />
                  <span className="w-3 h-3 rounded-full bg-emerald-400" />
                </div>
                <div className="px-6 py-1 rounded-full bg-white border border-slate-200 text-[11px] font-mono text-slate-600 shadow-2xs flex items-center space-x-1.5">
                  <Lock className="w-3 h-3 text-emerald-600" />
                  <span>https://app.omnipost.pro/dashboard</span>
                </div>
                <button
                  onClick={onEnterPanel}
                  className="px-3.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center space-x-1 transition-all cursor-pointer shadow-xs active:scale-95"
                >
                  <span>Canlı Paneli Aç</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              {/* Inside Interactive Mockup */}
              <div className="p-4 sm:p-6 bg-slate-50/70 space-y-5 text-left">
                {/* 3 Metric Pills */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                      12
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Aktif Kanallar</span>
                      <div className="text-base font-black text-slate-900">12 Platform</div>
                    </div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                      %
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-emerald-600 uppercase">Başarılı Dağıtım</span>
                      <div className="text-base font-black text-emerald-700">%99.98 Uptime</div>
                    </div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
                      ⏱️
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-purple-600 uppercase">Haftalık Tasarruf</span>
                      <div className="text-base font-black text-purple-700">18.5 Saat</div>
                    </div>
                  </div>
                </div>

                {/* Interactive Mini Composer Bar inside mockup */}
                <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm space-y-3">
                  {/* Tabs: Görsel/Video, Bağlantı, Metin (Exact match to DijitalPanelim screenshot) */}
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setMockupTab('media')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer ${mockupTab === 'media' ? 'bg-blue-600 text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                      >
                        <ImageIcon className="w-3.5 h-3.5" />
                        <span>Görsel / Video</span>
                      </button>
                      <button
                        onClick={() => setMockupTab('link')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer ${mockupTab === 'link' ? 'bg-blue-600 text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                      >
                        <Share2 className="w-3.5 h-3.5" />
                        <span>Bağlantı</span>
                      </button>
                      <button
                        onClick={() => setMockupTab('text')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer ${mockupTab === 'text' ? 'bg-blue-600 text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Metin</span>
                      </button>
                    </div>

                    {/* Preview Platform Switcher */}
                    <div className="flex items-center space-x-1 text-xs">
                      <span className="text-slate-400 text-[11px] font-semibold mr-1">Önizleme:</span>
                      {(['instagram', 'twitter', 'linkedin', 'facebook', 'tiktok'] as SocialPlatformId[]).map((p) => (
                        <button
                          key={p}
                          onClick={() => setMockupPlatform(p)}
                          className={`p-1.5 rounded-lg transition-all cursor-pointer ${mockupPlatform === p ? 'bg-slate-900 text-white scale-110 shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                          title={p}
                        >
                          <PlatformIcon platform={p} size="xs" />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Two column interactive editor preview */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                    {/* Left: Input Text */}
                    <div className="md:col-span-7 space-y-2">
                      <textarea
                        value={mockupText}
                        onChange={(e) => setMockupText(e.target.value)}
                        rows={3}
                        className="w-full p-3 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none bg-slate-50/50"
                        placeholder="Paylaşım metninizi buraya yazın..."
                      />
                      <div className="flex items-center justify-between text-[11px] text-slate-500">
                        <span>{mockupText.length} / 2200 karakter</span>
                        <div className="flex items-center space-x-1 text-emerald-600 font-bold">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>12 Platforma Uygun</span>
                        </div>
                      </div>
                    </div>

                    {/* Right: Simulated Social Post Card */}
                    <div className="md:col-span-5 p-3 rounded-xl bg-slate-100 border border-slate-200/80 text-xs space-y-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center p-0.5">
                          <PlatformIcon platform={mockupPlatform} size="xs" />
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 text-[11px]">OmniPost Medya</div>
                          <div className="text-[10px] text-slate-400 capitalize">{mockupPlatform} Gönderisi</div>
                        </div>
                      </div>
                      <p className="text-[11px] text-slate-700 line-clamp-3 leading-relaxed">
                        {mockupText}
                      </p>
                      <div className="flex items-center justify-between pt-1 border-t border-slate-200/60 text-[10px] text-slate-500 font-medium">
                        <span className="flex items-center space-x-1">
                          <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
                          <span>248 beğeni</span>
                        </span>
                        <span className="text-blue-600 font-bold">Zamanlandı (12:00)</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 12 Platform Circular Icons Bar (Exact match to DijitalPanelim bottom of tablet) */}
                <div className="pt-3 border-t border-slate-200 flex flex-wrap items-center justify-center gap-2.5 sm:gap-4">
                  {socialIcons.map((soc) => (
                    <div
                      key={soc.id}
                      onClick={() => {
                        if (soc.id !== 'behance') setMockupPlatform(soc.id);
                      }}
                      className="w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center shadow-sm hover:scale-115 hover:shadow-md transition-all duration-200 cursor-pointer group relative"
                      style={{ backgroundColor: soc.color }}
                      title={`${soc.name} (Tıkla ve Canlı Önizle)`}
                    >
                      <PlatformIcon
                        platform={soc.id === 'behance' ? 'bluesky' : soc.id}
                        size="md"
                        className="text-white fill-white"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          2b. CORE FEATURES — Buffer REA: Publish / Create / Community / Insights
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-16 bg-white border-b border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <Reveal className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Temel özellikler
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Yayınlayın, oluşturun, etkileşime geçin ve ölçün — hepsi aynı çalışma alanında.
            </p>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                title: 'Yayınla',
                desc: 'Facebook, Instagram, TikTok, LinkedIn, Threads, Bluesky, YouTube, Pinterest ve daha fazlasına tek kuyruktan zamanlayın.',
                icon: Send,
                tone: 'bg-sky-50 text-sky-700 border-sky-100',
              },
              {
                title: 'Oluştur',
                desc: 'Fikirleri platforma özel metne dönüştürün; AI asistan ile yeniden yazın ve yeniden kullanın.',
                icon: Sparkles,
                tone: 'bg-violet-50 text-violet-700 border-violet-100',
              },
              {
                title: 'Topluluk',
                desc: 'Yorumları ve gelen kutusu mesajlarını tek panelden önceliklendirip hızlı yanıtlayın.',
                icon: MessageSquare,
                tone: 'bg-emerald-50 text-emerald-700 border-emerald-100',
              },
              {
                title: 'İçgörü',
                desc: 'Ham metrik yerine aksiyon: ne işe yarıyor görün, Excel/CSV ile raporlayın.',
                icon: TrendingUp,
                tone: 'bg-amber-50 text-amber-700 border-amber-100',
              },
            ].map((f, i) => (
              <Reveal key={f.title} delay={i * 110}>
                <div
                  className={`group h-full rounded-2xl border p-5 space-y-3 ${f.tone} bg-opacity-80 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-slate-300/60 cursor-default`}
                >
                  <div className="w-10 h-10 rounded-xl bg-white/80 flex items-center justify-center shadow-sm transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110">
                    <f.icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-black text-slate-900">{f.title}</h3>
                  <p className="text-xs leading-relaxed text-slate-600">{f.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          3. "TEK PANEL ÜZERİNDEN ÇOKLU HESAP YÖNETİMİ" & ISOMETRIC CAROUSEL
      ════════════════════════════════════════════════════════════════════ */}
      <section id="aciklama" className="py-20 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Headline & Description */}
          <Reveal className="text-center max-w-3xl mx-auto space-y-3">
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
              Favori hesaplarınızı bağlayın
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              Facebook, Instagram, LinkedIn, X, TikTok, Google Business, YouTube, Telegram, Bluesky, Tumblr, Discord ve Pinterest hesaplarınızı tek çalışma alanından yönetin.
            </p>
          </Reveal>

          {/* 3D Isometric Tools Carousel with Prev / Next */}
          <div className="max-w-2xl mx-auto text-center space-y-4">
            <div className="flex items-center justify-center space-x-3 sm:space-x-5">
              <button
                type="button"
                onClick={() => setActiveSlide((prev) => (prev - 1 + carouselTools.length) % carouselTools.length)}
                className="p-2.5 sm:p-3 rounded-full bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 shadow-md transition-all cursor-pointer active:scale-95 flex-shrink-0"
                aria-label="Önceki Araç"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Active Tool Card */}
              <div
                key={activeSlide}
                className="flex-1 p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-xl space-y-3 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 animate-fade-in-up"
              >
                <div className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-tr ${carouselTools[activeSlide].bg} text-white flex items-center justify-center text-3xl shadow-lg shadow-blue-500/10`}>
                  {carouselTools[activeSlide].icon}
                </div>
                <div className="inline-block px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-[11px] font-extrabold uppercase">
                  {carouselTools[activeSlide].badge}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900">{carouselTools[activeSlide].title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                  {carouselTools[activeSlide].desc}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setActiveSlide((prev) => (prev + 1) % carouselTools.length)}
                className="p-2.5 sm:p-3 rounded-full bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 shadow-md transition-all cursor-pointer active:scale-95 flex-shrink-0"
                aria-label="Sonraki Araç"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Pagination Dots */}
            <div className="flex items-center justify-center space-x-2 pt-2">
              {carouselTools.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveSlide(idx)}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${activeSlide === idx ? 'w-8 bg-blue-600' : 'w-2 bg-slate-300 hover:bg-slate-400'
                    }`}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          4. "SADECE ÜÇ ADIMDA GÖNDERİ PLANLAMA" (MATCHING USER SCREENSHOT 2)
          Step 1: Tek Tıkla Hesap Ekleyin (Circle avatars image)
          Step 2: İçerikler Üretip Planlayın (Composer mockup image)
          Step 3: Keyfinize Bakın (Relaxing person at desk image)
      ════════════════════════════════════════════════════════════════════ */}
      <section id="kullanim" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          {/* Main Title & Subtitle */}
          <Reveal className="text-center max-w-3xl mx-auto space-y-3">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Sadece Üç Adımda Gönderi Planlama
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              Sosyal medya hesaplarınızı panele ekledikten sonra, gönderilerinizi düzenleyin ve paylaşım zamanını seçin. Önceden planladığınız bütün gönderiler otomatik olarak paylaşılırken, siz sadece alınan verime odaklanın.
            </p>
          </Reveal>

          {/* ─── ADIM 1: Tek Tıkla Hesap Ekleyin ─── */}
          <Reveal className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center" delay={60}>
            {/* Visual: Hesap Monogramları (görsel yerine kurumsal baş harf kartları) */}
            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/90 shadow-xl relative overflow-hidden group hover:shadow-2xl transition-all duration-300">
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-3 sm:gap-4 p-2 justify-items-center">
                {[
                  { initials: 'EY', plat: 'tiktok', tint: 'bg-rose-50 text-rose-600 border-rose-100' },
                  { initials: 'MA', plat: 'pinterest', tint: 'bg-red-50 text-red-600 border-red-100' },
                  { initials: 'CK', plat: 'twitter', tint: 'bg-slate-100 text-slate-700 border-slate-200' },
                  { initials: 'SÖ', plat: 'instagram', tint: 'bg-fuchsia-50 text-fuchsia-600 border-fuchsia-100' },
                  { initials: 'BD', plat: 'linkedin', tint: 'bg-blue-50 text-blue-700 border-blue-100' },
                  { initials: 'KT', plat: 'facebook', tint: 'bg-indigo-50 text-indigo-600 border-indigo-100' },
                  { initials: 'HG', plat: 'youtube', tint: 'bg-orange-50 text-orange-600 border-orange-100' },
                  { initials: 'TA', plat: 'telegram', tint: 'bg-sky-50 text-sky-600 border-sky-100' },
                  { initials: 'NŞ', plat: 'bluesky', tint: 'bg-cyan-50 text-cyan-600 border-cyan-100' },
                  { initials: 'OZ', plat: 'discord', tint: 'bg-violet-50 text-violet-600 border-violet-100' },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    title={`${item.initials} bağlı hesabı`}
                    className="relative group/avatar cursor-pointer hover:scale-110 transition-transform"
                  >
                    <div
                      className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center border-2 border-white shadow-md font-black text-xs sm:text-sm tracking-tight ${item.tint}`}
                    >
                      {item.initials}
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-slate-900 border border-white flex items-center justify-center p-0.5 shadow-sm">
                      <PlatformIcon platform={item.plat as SocialPlatformId} size="xs" />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
                <span className="font-semibold">OAuth 2.0 Güvenli API Bağlantısı</span>
                <span className="font-mono text-emerald-600 font-bold">12 / 12 Hazır</span>
              </div>
            </div>

            {/* Text description */}
            <div className="space-y-4">
              <h3 className="text-2xl font-black text-slate-900">
                1. Tek Tıkla Hesap Ekleyin
              </h3>
              <p className="text-sm font-semibold text-slate-700">
                Tüm hesaplarınızı tek bir panel üzerinden yönetebilirsiniz.
              </p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                OmniPost Pro Facebook, Instagram, LinkedIn, X, Tiktok, Google Business, Youtube, Telegram, Bluesky, Tumblr, Discord ve Pinterest hesapları ile uyum içinde çalışır. Panelimize eklediğiniz her sosyal medya hesabıyla rahatça yönetebilirsiniz. Her gün paylaşım için farklı platformlardaki hesaplarınıza tek tek üye girişi yapmaktansa, bütün gönderilerinizi tek bir noktadan kolayca planlayın.
              </p>
              <div className="pt-2">
                <button
                  onClick={onEnterPanel}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-all shadow-md shadow-blue-500/20 cursor-pointer flex items-center space-x-1.5"
                >
                  <span>Hesapları Panele Bağla</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </Reveal>

          {/* ─── ADIM 2: İçerikler Üretip Planlayın ─── */}
          <Reveal className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center" delay={60}>
            {/* Text description */}
            <div className="space-y-4 order-2 lg:order-1">
              <h3 className="text-2xl font-black text-slate-900">
                2. İçerikler Üretip Planlayın
              </h3>
              <p className="text-sm font-semibold text-slate-700">
                Artık kolayca çok daha kaliteli içerikler üretebilirsiniz.
              </p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                OmniPost Pro içerik oluşturma süreçlerini kolaylaştıran pek çok farklı özellik sunar: Görsel düzenleme, hazır tasarım şablonları, örnek içerikler ve yapay zeka desteğinden siz de faydalanabilirsiniz. Sosyal medya gönderilerinizi planlarken Adobe Express, Canva, Dropbox, OneDrive, Toast Editor, RSS ve OpenAI entegrasyonlarını kullanarak son derece profesyonel içerikler oluşturabilir ve verimi artırabilirsiniz.
              </p>
              <div className="pt-2">
                <button
                  onClick={onEnterPanel}
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition-all shadow-md shadow-indigo-500/20 cursor-pointer flex items-center space-x-1.5"
                >
                  <span>Gönderi Stüdyosunu Dene</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Visual: Post Editor Mockup */}
            <div className="order-1 lg:order-2 p-6 rounded-3xl bg-slate-50 border border-slate-200/90 shadow-xl relative overflow-hidden group hover:shadow-2xl transition-all duration-300">
              <div className="space-y-3">
                <div className="flex flex-wrap gap-1.5 pb-2 border-b border-slate-200">
                  {['instagram', 'twitter', 'linkedin', 'tiktok', 'facebook'].map((plat) => (
                    <span
                      key={plat}
                      className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-white text-slate-700 border border-slate-200 flex items-center space-x-1 shadow-2xs"
                    >
                      <PlatformIcon platform={plat as SocialPlatformId} size="xs" />
                      <span className="capitalize">{plat}</span>
                    </span>
                  ))}
                </div>

                <div className="p-3 rounded-xl bg-white border border-slate-200/80 text-xs text-slate-700 font-medium min-h-[90px] shadow-inner">
                  Yeni sezon lansmanımız başladı! Tüm kanallarda eş zamanlı duyurumuz hazır. 🔥 #kampanya #omnipost
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div className="h-16 rounded-lg bg-blue-100/70 border border-blue-200 flex items-center justify-center text-blue-600 font-bold text-[10px]">
                    Banner.png
                  </div>
                  <div className="h-16 rounded-lg bg-indigo-100/70 border border-indigo-200 flex items-center justify-center text-indigo-600 font-bold text-[10px]">
                    Reels.mp4
                  </div>
                  <div className="h-16 rounded-lg bg-white border border-dashed border-slate-300 flex items-center justify-center text-slate-400 font-bold text-[10px]">
                    + Medya Ekle
                  </div>
                </div>

                <div className="pt-2 flex justify-between items-center text-xs">
                  <span className="text-slate-400 font-mono">148 / 2200 kr</span>
                  <span className="px-4 py-1.5 rounded-full bg-blue-600 text-white font-bold text-xs shadow-xs">
                    Tümünde Zamanla (12 Kanal)
                  </span>
                </div>
              </div>
            </div>
          </Reveal>

          {/* ─── ADIM 3: Keyfinize Bakın ─── */}
          <Reveal className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center" delay={60}>
            {/* Visual: Relaxing person illustration */}
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200/90 shadow-xl relative overflow-hidden group hover:shadow-2xl transition-all duration-300 flex items-center justify-center">
              <div className="w-full max-w-sm text-center space-y-4">
                <div className="relative mx-auto w-48 h-44 flex items-center justify-center">
                  <svg viewBox="0 0 240 200" className="w-full h-full">
                    <circle cx="40" cy="150" r="15" fill="#10b981" />
                    <path d="M 30,150 Q 25,110 40,90 Q 55,110 50,150 Z" fill="#34d399" />
                    <path d="M 40,150 Q 15,130 10,110 Q 30,120 40,150 Z" fill="#059669" />
                    <rect x="30" y="150" width="20" height="25" rx="3" fill="#f59e0b" />

                    <rect x="70" y="140" width="150" height="8" rx="2" fill="#64748b" />
                    <rect x="85" y="148" width="6" height="40" fill="#94a3b8" />
                    <rect x="200" y="148" width="6" height="40" fill="#94a3b8" />

                    <rect x="80" y="100" width="45" height="35" rx="3" fill="#1e293b" />
                    <rect x="83" y="103" width="39" height="29" rx="1" fill="#38bdf8" />
                    <rect x="99" y="135" width="7" height="6" fill="#64748b" />

                    <rect x="135" y="130" width="10" height="11" rx="2" fill="#ef4444" />
                    <path d="M 145,133 Q 150,135 145,138" stroke="#ef4444" strokeWidth="2" fill="none" />

                    <rect x="155" y="90" width="30" height="50" rx="6" fill="#334155" />
                    <path d="M 170,140 L 170,180" stroke="#475569" strokeWidth="6" />
                    <path d="M 155,120 Q 165,100 175,130" stroke="#f43f5e" strokeWidth="14" strokeLinecap="round" />
                    <circle cx="165" cy="85" r="14" fill="#fed7aa" />
                    <path d="M 155,80 Q 165,70 178,78" stroke="#1e293b" strokeWidth="8" strokeLinecap="round" />
                    <path d="M 160,95 Q 150,75 165,75" stroke="#f43f5e" strokeWidth="5" fill="none" strokeLinecap="round" />
                    <path d="M 170,95 Q 180,75 165,75" stroke="#f43f5e" strokeWidth="5" fill="none" strokeLinecap="round" />
                    <path d="M 165,140 L 130,138" stroke="#1e293b" strokeWidth="8" strokeLinecap="round" />
                  </svg>
                </div>
                <div className="text-xs font-bold text-emerald-700 bg-emerald-100 py-1.5 px-3 rounded-full inline-block border border-emerald-300">
                  ✨ Gönderileriniz Arka Planda Paylaşılırken Siz Rahatınıza Bakın!
                </div>
              </div>
            </div>

            {/* Text description */}
            <div className="space-y-4">
              <h3 className="text-2xl font-black text-slate-900">
                3. Keyfinize Bakın
              </h3>
              <p className="text-sm font-semibold text-slate-700">
                Paylaşımlarınız yayınlanırken siz diğer işlerinizle ilgilenebilirsiniz.
              </p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Sosyal medya gönderilerinizi düzenli bir şekilde paylaşabilmek adına, gerektiğinden fazla zaman harcamayın. Otomasyon altyapımızı kullanarak tek seferlik gönderiler planlayabileceğiniz gibi, tekrarlı paylaşımlar oluşturmak da mümkündür. Planladığınız bütün gönderiler, seçtiğiniz sosyal medya kanalları üzerinden otomatik olarak paylaşılırken siz kaliteli çekirdek veya daha önemli diğer işlerinizle zaman ayırabilirsiniz.
              </p>
              <div className="pt-2">
                <button
                  onClick={onEnterPanel}
                  className="px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs transition-all shadow-md shadow-emerald-500/20 cursor-pointer flex items-center space-x-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Şimdi Ücretsiz Başlayın</span>
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          5. INTERACTIVE ACCOUNT GROUPS SIMULATOR (HESAP GRUBU KÜMELEME)
      ════════════════════════════════════════════════════════════════════ */}
      <section id="gruplar" className="py-20 bg-slate-900 text-white border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-black uppercase tracking-widest text-blue-400 bg-blue-950 px-3 py-1 rounded-full border border-blue-800">
              AKILLI HEDEFLEME & KÜMELEME
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Hesap Grubu Özelliği ile Tek Tıkla Sektörel Dağıtım
            </h2>
            <p className="text-sm text-slate-400">
              Hesaplarınızı sektörlerine ve hedef kitlelerine göre kümelere ayırın. Her gönderide onlarca hesabı tek tek seçmek yerine, sadece ilgili grubu işaretleyip saniyeler içinde yayınlayın.
            </p>

            {/* 4 Group Selector Tabs */}
            <div className="pt-4 flex flex-wrap justify-center gap-2 sm:gap-3">
              {[
                { id: 'ecommerce', label: '🛍️ E-Ticaret & Perakende', count: '4 Ağ' },
                { id: 'b2b', label: '💼 B2B & Kurumsal', count: '4 Ağ' },
                { id: 'trends', label: '⚡ Genç & Viral Kitle', count: '4 Ağ' },
                { id: 'all', label: '🌐 Tüm 12 Ağ Merkezi', count: '12 Ağ' },
              ].map((grp) => (
                <button
                  key={grp.id}
                  onClick={() => {
                    setSelectedGroup(grp.id as any);
                    setGroupToast(`${grp.label} kümesi aktif edildi!`);
                    setTimeout(() => setGroupToast(null), 3000);
                  }}
                  className={`px-4 sm:px-5 py-2.5 rounded-full text-xs font-bold transition-all flex items-center space-x-2 cursor-pointer ${selectedGroup === grp.id
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 scale-105'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                >
                  <span>{grp.label}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/20 font-mono">
                    {grp.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Visual Platform Grid for Active Group */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-800/80 border border-slate-700/80 shadow-2xl backdrop-blur-sm space-y-6">
            <div className="flex items-center justify-between text-xs pb-3 border-b border-slate-700">
              <span className="text-slate-400 font-semibold">
                Seçili Kümedeki Aktif Platformlar:
              </span>
              <span className="font-mono text-emerald-400 font-bold">
                {groupPlatforms[selectedGroup].length} Platform Eşleşti
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3 sm:gap-4">
              {socialIcons.map((soc) => {
                const isSelected = soc.id !== 'behance' && groupPlatforms[selectedGroup].includes(soc.id);
                return (
                  <div
                    key={soc.id}
                    className={`p-4 rounded-2xl border transition-all duration-300 flex flex-col items-center justify-center space-y-2 text-center ${isSelected
                      ? 'bg-slate-700 border-blue-500 shadow-lg shadow-blue-500/20 scale-105'
                      : 'bg-slate-900/60 border-slate-800 opacity-40'
                      }`}
                  >
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center shadow-md"
                      style={{ backgroundColor: soc.color }}
                    >
                      <PlatformIcon platform={soc.id === 'behance' ? 'bluesky' : soc.id} size="md" className="text-white" />
                    </div>
                    <span className="font-bold text-xs text-white">{soc.name}</span>
                    <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${isSelected ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-500'}`}>
                      {isSelected ? 'Kümeye Dahil' : 'Pasif'}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-400 flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Bu grup ile gönderileriniz tek seferde hedef kitleye özel formatta dağıtılır.</span>
              </div>
              <button
                onClick={onEnterPanel}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>Bu Grupla Gönderi Planla</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          6. INTERACTIVE ROI & TIME SAVINGS CALCULATOR (HESAPLAYICI)
      ════════════════════════════════════════════════════════════════════ */}
      <section id="hesaplayici" className="py-20 bg-gradient-to-b from-slate-50 via-white to-slate-50 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-black uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              ROI & VERİMLİLİK ANALİZİ
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              OmniPost Pro ile Ne Kadar Tasarruf Edeceksiniz?
            </h2>
            <p className="text-sm text-slate-600">
              Sosyal medya hesap sayınızı ve haftalık manuel yönetim sürenizi seçin; otomasyon ile geri kazanacağınız zamanı ve nakit iş gücü tasarrufunu anında görün.
            </p>
          </div>

          <div className="max-w-4xl mx-auto p-6 sm:p-10 rounded-3xl bg-white border border-slate-200/90 shadow-2xl space-y-8">
            {/* Sliders Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Slider 1: Account Count */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm font-bold text-slate-800">
                  <span>Yönetilen Sosyal Hesap Sayısı</span>
                  <span className="px-3 py-1 rounded-xl bg-blue-50 text-blue-700 font-mono text-base font-black">
                    {accountCount} Hesap
                  </span>
                </div>
                <input
                  type="range"
                  min={3}
                  max={50}
                  step={1}
                  value={accountCount}
                  onChange={(e) => setAccountCount(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-[11px] text-slate-400 font-semibold">
                  <span>3 Hesap (Küçük İşletme)</span>
                  <span>50+ Hesap (Büyük Ajans)</span>
                </div>
              </div>

              {/* Slider 2: Weekly Hours Spent */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm font-bold text-slate-800">
                  <span>Haftalık Manuel Harcanan Süre</span>
                  <span className="px-3 py-1 rounded-xl bg-purple-50 text-purple-700 font-mono text-base font-black">
                    {hoursPerWeek} Saat / Hafta
                  </span>
                </div>
                <input
                  type="range"
                  min={4}
                  max={40}
                  step={1}
                  value={hoursPerWeek}
                  onChange={(e) => setHoursPerWeek(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                />
                <div className="flex justify-between text-[11px] text-slate-400 font-semibold">
                  <span>4 Saat (Hafif)</span>
                  <span>40 Saat (Tam Zamanlı)</span>
                </div>
              </div>
            </div>

            {/* Live Calculation Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-center space-y-1">
                <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block">
                  Haftalık Geri Kazanılan Zaman
                </span>
                <div className="text-3xl font-black text-emerald-700 font-mono">
                  {calculatedHoursSaved} Saat
                </div>
                <span className="text-[11px] text-emerald-600 font-semibold block">
                  %75 Zaman Tasarrufu
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 text-center space-y-1">
                <span className="text-[11px] font-bold text-blue-800 uppercase tracking-wider block">
                  Aylık İş Gücü Tasarrufu
                </span>
                <div className="text-3xl font-black text-blue-700 font-mono">
                  {calculatedMonthlyMoneySaved.toLocaleString('tr-TR')} ₺
                </div>
                <span className="text-[11px] text-blue-600 font-semibold block">
                  Doğrudan Maliyet İndirimi
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200 text-center space-y-1">
                <span className="text-[11px] font-bold text-indigo-800 uppercase tracking-wider block">
                  Yıllık Verim Artışı
                </span>
                <div className="text-3xl font-black text-indigo-700 font-mono">
                  {calculatedAnnualMoneySaved.toLocaleString('tr-TR')} ₺
                </div>
                <span className="text-[11px] text-indigo-600 font-semibold block">
                  Net Finansal Katkı
                </span>
              </div>
            </div>

            {/* Summary Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-slate-700">
                <span>Operasyonel Verimlilik Artış Oranı</span>
                <span className="text-emerald-600 font-mono font-black">%75 Maksimum Verim</span>
              </div>
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
                <div className="h-full bg-gradient-to-r from-emerald-500 via-blue-500 to-indigo-600 rounded-full w-3/4 transition-all duration-500" />
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════════════════════════════════
          9. TARİFELER SECTION (PRICING PLANS & FEATURE COMPARISON MATRIX)
      ════════════════════════════════════════════════════════════════════ */}
      <section id="tarifeler" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-black uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              ŞEFFAF FİYATLANDIRMA
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
              Bütçenize ve İşinize Uygun Tarifeler
            </h2>
            <p className="text-sm text-slate-600">
              Kredi kartı gerekmez. İstediğiniz zaman paketinizi yükseltebilir veya iptal edebilirsiniz.
            </p>

            {/* Monthly / Annual Toggle */}
            <div className="pt-4 flex items-center justify-center space-x-3 text-xs font-bold">
              <span className={!isAnnually ? 'text-slate-900 font-black' : 'text-slate-400'}>Aylık Ödeme</span>
              <button
                type="button"
                onClick={() => setIsAnnually(!isAnnually)}
                className={`w-14 h-7 flex items-center rounded-full p-1 transition-colors cursor-pointer ${isAnnually ? 'bg-blue-600 justify-end' : 'bg-slate-300 justify-start'
                  }`}
              >
                <div className="w-5 h-5 rounded-full bg-white shadow-md" />
              </button>
              <span className={isAnnually ? 'text-slate-900 font-black' : 'text-slate-400'}>
                Yıllık Ödeme <strong className="text-emerald-600 font-extrabold">(%35 İndirimli)</strong>
              </span>
            </div>
          </div>

          {/* Pricing Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 relative ${plan.popular
                  ? 'border-2 border-blue-600 shadow-2xl bg-white scale-105 z-10'
                  : 'border border-slate-200 bg-slate-50/60 shadow-lg hover:shadow-xl'
                  }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-blue-600 text-white font-extrabold text-[11px] uppercase tracking-wider shadow-md">
                    EN ÇOK TERCİH EDİLEN
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-black text-slate-900">{plan.name}</h3>
                    <p className="text-xs text-slate-500 font-medium mt-1">{plan.sub}</p>
                  </div>

                  <div className="flex items-baseline space-x-1 border-b border-slate-100 pb-4">
                    <span className="text-4xl font-black text-slate-900 font-mono">
                      {plan.price.toLocaleString('tr-TR')} ₺
                    </span>
                    <span className="text-xs text-slate-500">/ ay</span>
                  </div>

                  {/* Features list */}
                  <div className="space-y-2.5 pt-2 text-xs">
                    {plan.features.map((feat, fidx) => (
                      <div key={fidx} className="flex items-start space-x-2 text-slate-700">
                        <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-8">
                  <button
                    onClick={onEnterPanel}
                    className={`w-full py-3.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md active:scale-95 ${plan.popular
                      ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/25'
                      : 'bg-slate-900 hover:bg-slate-800 text-white'
                      }`}
                  >
                    Hemen Başla (Panele Giriş)
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* ─── DETAILED FEATURE COMPARISON MATRIX TABLE ─── */}
          <div className="pt-10 space-y-6">
            <div className="text-center space-y-1">
              <h3 className="text-2xl font-black text-slate-900">Tarife Özelliklerini Karşılaştırın</h3>
              <p className="text-xs text-slate-500">Tüm paketlerimizde 14 gün ücretsiz deneme hakkı mevcuttur.</p>
            </div>

            <div className="overflow-x-auto rounded-3xl border border-slate-200 shadow-xl bg-white">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-900 text-white border-b border-slate-800">
                    <th className="p-4 sm:p-5 font-bold uppercase tracking-wider">Özellik & Kapasite</th>
                    <th className="p-4 sm:p-5 font-bold uppercase tracking-wider text-center">EKO TARİFE</th>
                    <th className="p-4 sm:p-5 font-bold uppercase tracking-wider text-center bg-blue-600 text-white">TRİO TARİFE (Popüler)</th>
                    <th className="p-4 sm:p-5 font-bold uppercase tracking-wider text-center">PRO AJANS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {comparisonMatrix.map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/60'}>
                      <td className="p-4 sm:p-5 font-bold text-slate-800">{row.feature}</td>
                      <td className="p-4 sm:p-5 text-center font-medium text-slate-600">
                        {typeof row.eko === 'boolean' ? (
                          row.eko ? <Check className="w-4 h-4 text-emerald-500 mx-auto" /> : <span className="text-slate-300">—</span>
                        ) : (
                          row.eko
                        )}
                      </td>
                      <td className="p-4 sm:p-5 text-center font-bold text-blue-700 bg-blue-50/40">
                        {typeof row.trio === 'boolean' ? (
                          row.trio ? <Check className="w-4 h-4 text-blue-600 mx-auto" /> : <span className="text-slate-300">—</span>
                        ) : (
                          row.trio
                        )}
                      </td>
                      <td className="p-4 sm:p-5 text-center font-bold text-slate-900">
                        {typeof row.pro === 'boolean' ? (
                          row.pro ? <Check className="w-4 h-4 text-emerald-500 mx-auto" /> : <span className="text-slate-300">—</span>
                        ) : (
                          row.pro
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          10. CUSTOMER TESTIMONIALS & AGENCY REVIEWS SLIDER
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-slate-50 border-t border-b border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
              MÜŞTERİ DENEYİMLERİ
            </span>
            <h2 className="text-3xl font-black text-slate-900">
              Yüzlerce Ajans ve Marka Neden Bizi Tercih Ediyor?
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Türkiye’nin önde gelen sosyal medya ekipleri OmniPost Pro ile büyüyor.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200/90 shadow-xl space-y-6 relative">
              {/* Stars */}
              <div className="flex items-center space-x-1 text-amber-400">
                {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400" />
                ))}
              </div>

              {/* Quote */}
              <p
                key={`quote-${activeTestimonial}`}
                className="text-sm sm:text-base text-slate-700 leading-relaxed italic animate-fade-in"
              >
                “{testimonials[activeTestimonial].comment}”
              </p>

              {/* Author */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <div className="flex items-center space-x-3.5">
                  <div
                    key={`author-${activeTestimonial}`}
                    aria-hidden="true"
                    className="w-12 h-12 rounded-full bg-slate-900 text-white border-2 border-white shadow-md flex items-center justify-center font-black text-sm tracking-tight animate-scale-in"
                  >
                    {testimonials[activeTestimonial].name
                      .split(' ')
                      .map((part) => part[0])
                      .join('')
                      .slice(0, 2)
                      .toLocaleUpperCase('tr-TR')}
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 text-sm">{testimonials[activeTestimonial].name}</h4>
                    <p className="text-xs text-slate-500 font-medium">{testimonials[activeTestimonial].role} • {testimonials[activeTestimonial].company}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                    className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all cursor-pointer"
                    aria-label="Önceki Yorum"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTestimonial((prev) => (prev + 1) % testimonials.length)}
                    className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all cursor-pointer"
                    aria-label="Sonraki Yorum"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          11. "SİZİ DESTEKLİYORUZ !" VALUE PILLARS & TRUST BADGES
          (MATCHING DIJITALPANELIM SCREENSHOT 4)
      ════════════════════════════════════════════════════════════════════ */}
      <section className="bg-[#1c2838] text-white pt-16 pb-20 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 text-center">
          <div className="space-y-2 max-w-2xl mx-auto">
            <h2 className="text-3xl font-black text-white">Sizi Destekliyoruz !</h2>
            <p className="text-xs sm:text-sm text-slate-300">
              İhtiyaç duyduğunuz anda deneyimli ekibimizden yardım alabilirsiniz.
            </p>
          </div>

          {/* 3 White Floating Value Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-slate-800">
            {/* Card 1: MOBİL UYGULAMA */}
            <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-4 text-center hover:-translate-y-1 transition-transform">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Smartphone className="w-7 h-7" />
              </div>
              <h3 className="text-base font-black text-slate-900 uppercase tracking-wider">MOBİL UYGULAMA</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                OmniPost Panelinize mobil cihazınızdan da kesintisiz erişebilirsiniz. PWA uygulamamız tamamen ücretsizdir ve cihazınıza anında kurulur.
              </p>
            </div>

            {/* Card 2: BİLGİ BANKASI */}
            <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-4 text-center hover:-translate-y-1 transition-transform">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <BookOpen className="w-7 h-7" />
              </div>
              <h3 className="text-base font-black text-slate-900 uppercase tracking-wider">BİLGİ BANKASI</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Sosyal medya paylaşımları, API bağlantıları ve otomasyon algoritmaları ile ilgili aklınıza takılan bütün soruların cevaplarına bu alandan erişebilirsiniz.
              </p>
            </div>

            {/* Card 3: DESTEK MERKEZİ */}
            <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-4 text-center hover:-translate-y-1 transition-transform">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <Headphones className="w-7 h-7" />
              </div>
              <h3 className="text-base font-black text-slate-900 uppercase tracking-wider">DESTEK MERKEZİ</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                OmniPost Panelinizi kullanırken profesyonel destek ekibimizden anında yardım alabilirsiniz. Destek merkezimiz 7/24 kesintisiz hizmet vermektedir.
              </p>
            </div>
          </div>

          {/* Payment Trust Badges & Callout */}
          <div className="pt-6 border-t border-slate-700/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
            <div className="flex items-center space-x-3">
              <span className="font-bold text-slate-300">Güvenli Ödeme Altyapısı:</span>
              <span className="px-3 py-1 rounded-lg bg-white/10 text-white font-mono font-bold">iyzico ile Öde</span>
              <span className="px-3 py-1 rounded-lg bg-white/10 text-white font-mono font-bold">Mastercard</span>
              <span className="px-3 py-1 rounded-lg bg-white/10 text-white font-mono font-bold">VISA</span>
              <span className="px-3 py-1 rounded-lg bg-white/10 text-white font-mono font-bold">Troy</span>
            </div>
            <button
              onClick={onOpenContact}
              className="text-blue-400 hover:text-white underline font-bold cursor-pointer"
            >
              Destek Ekibine Mesaj Gönder →
            </button>
          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════════════════════════════════
          13. S.S.S SECTION (FREQUENTLY ASKED QUESTIONS)
      ════════════════════════════════════════════════════════════════════ */}
      <section id="sss" className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-black text-slate-900">Sıkça Sorulan Sorular</h2>
            <p className="text-xs sm:text-sm text-slate-500">
              OmniPost Pro hakkında aklınıza takılan sorular ve detaylı yanıtları
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-2xs transition-all"
              >
                <button
                  type="button"
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full px-6 py-4 text-left font-bold text-sm text-slate-800 flex items-center justify-between hover:text-blue-600 cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${activeFaq === idx ? 'rotate-180 text-blue-600' : ''
                      }`}
                  />
                </button>
                {activeFaq === idx && (
                  <div className="px-6 pb-4 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          14. FOOTER (EXACT MATCHING DIJITALPANELIM.COM)
      ════════════════════════════════════════════════════════════════════ */}
      <footer className="bg-[#1c2838] text-slate-300 py-12 border-t border-slate-800 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-slate-700/80">
            {/* Col 1 */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-white font-black text-base">
                <OmniPostLogo size={28} />
                <span>OmniPost PRO</span>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed">
                12 sosyal medya kanalına tek tıkla eşzamanlı dağıtım, görsel takvim ve yapay zeka destekli içerik planlama motoru.
              </p>
            </div>

            {/* Col 2 */}
            <div className="space-y-2">
              <h4 className="font-bold text-white text-xs uppercase tracking-wider">Hızlı Erişim</h4>
              <ul className="space-y-1.5 text-slate-400">
                <li><a href="#aciklama" className="hover:text-white transition-colors">Açıklama</a></li>
                <li><a href="#kullanim" className="hover:text-white transition-colors">Kullanım</a></li>
                <li><a href="#gruplar" className="hover:text-white transition-colors">Hesap Grupları</a></li>
                <li><a href="#hesaplayici" className="hover:text-white transition-colors">ROI Hesaplayıcı</a></li>
                <li><a href="#tarifeler" className="hover:text-white transition-colors">Tarifeler</a></li>
                <li><a href="#sss" className="hover:text-white transition-colors">S.S.S</a></li>
              </ul>
            </div>

            {/* Col 3 */}
            <div className="space-y-2">
              <h4 className="font-bold text-white text-xs uppercase tracking-wider">Destek & Kurumsal</h4>
              <ul className="space-y-1.5 text-slate-400">
                <li><button onClick={onOpenContact} className="hover:text-white transition-colors cursor-pointer">Bize Ulaşın</button></li>
                <li><a href="#sss" className="hover:text-white transition-colors">Gizlilik Politikası</a></li>
                <li><a href="#sss" className="hover:text-white transition-colors">Kullanım Şartları</a></li>
                <li><a href="#sss" className="hover:text-white transition-colors">KVKK Aydınlatma Metni</a></li>
              </ul>
            </div>

            {/* Col 4 */}
            <div className="space-y-3">
              <h4 className="font-bold text-white text-xs uppercase tracking-wider">Panele Giriş</h4>
              <p className="text-slate-400 text-xs">
                Mevcut OmniPost Pro hesabınızla yönetim paneline hemen bağlanın.
              </p>
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="w-full py-2.5 rounded-full border border-white text-white hover:bg-white hover:text-[#1c2838] font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
              >
                PANELE GİRİŞ
              </button>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-slate-500 text-[11px] gap-2">
            <span>© 2026 OmniPost Pro. Tüm hakları saklıdır.</span>
            <span>Türkiye’nin Öncü Çoklu Sosyal Medya Otomasyon Altyapısı</span>
          </div>
        </div>
      </footer>

      {/* ════════════════════════════════════════════════════════════════════
          15. FLOATING BLUE '+' BUTTON (EXACT TO DIJITALPANELIM.COM BOTTOM RIGHT)
      ════════════════════════════════════════════════════════════════════ */}
      <button
        onClick={onOpenContact}
        className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-blue-500 hover:bg-blue-600 text-white shadow-2xl flex items-center justify-center transition-transform hover:scale-110 active:scale-95 cursor-pointer"
        title="Canlı Destek & İletişim"
      >
        <Plus className="w-7 h-7" />
      </button>

      {/* ─── MOBILE STICKY BOTTOM BAR (Visible on screens < 768px) ─── */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-[#1c2838]/95 backdrop-blur-md border-t border-slate-700 p-2.5 flex items-center justify-between gap-2 shadow-2xl">
        <a
          href="#tarifeler"
          className="flex-1 py-2 rounded-xl bg-slate-800 text-slate-200 text-center font-bold text-xs border border-slate-700"
        >
          Tarifeler
        </a>
        <button
          onClick={() => setIsLoginModalOpen(true)}
          className="flex-1 py-2 rounded-xl bg-blue-600 text-white font-black text-xs uppercase tracking-wider shadow-md text-center"
        >
          🚀 Panele Giriş
        </button>
      </div>

      {/* ════════════════════════════════════════════════════════════════════
          16. LOGIN MODAL (SMOOTH TRANSITION TO SAAS PANEL)
      ════════════════════════════════════════════════════════════════════ */}
      {isLoginModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md rounded-3xl bg-white border border-slate-200 shadow-2xl p-6 sm:p-8 space-y-6 relative animate-scale-in">
            {/* Close Button */}
            <button
              onClick={() => setIsLoginModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="text-center space-y-1.5">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md mb-2">
                <OmniPostLogo size={28} />
              </div>
              <h3 className="text-xl font-black text-slate-900">OmniPost Panele Giriş</h3>
              <p className="text-xs text-slate-500">
                Çoklu sosyal medya yönetim stüdyonuza hoş geldiniz
              </p>
            </div>

            {/* 1-Click Fast Demo Login CTA (Recommended) */}
            <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200/80 space-y-3">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <span className="font-extrabold text-xs text-blue-900">Hızlı Geliştirici & Demo Girişi</span>
              </div>
              <p className="text-[11px] text-blue-700 leading-relaxed">
                Şifresiz, tek tıkla doğrudan aktif SaaS kontrol paneline ve tüm araçlara geçiş yapın.
              </p>
              <button
                type="button"
                onClick={() => {
                  setIsLoginModalOpen(false);
                  onEnterPanel();
                }}
                className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs tracking-wide shadow-md shadow-blue-500/20 active:scale-98 transition-all flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>Tek Tıkla Panele Geç</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Standard Credentials form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setIsLoginModalOpen(false);
                onEnterPanel();
              }}
              className="space-y-4 text-xs"
            >
              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  E-Posta Adresi
                </label>
                <input
                  type="email"
                  defaultValue="demo@omnipost.pro"
                  required
                  placeholder="ornek@sirketiniz.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-slate-50/50"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="font-bold text-slate-700 uppercase tracking-wider">
                    Şifre
                  </label>
                  <a href="#sss" className="text-blue-600 hover:underline text-[11px]">
                    Şifremi Unuttum
                  </a>
                </div>
                <input
                  type="password"
                  defaultValue="OmniPost2026!"
                  required
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-slate-50/50"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs uppercase tracking-wider shadow-md transition-all active:scale-98 cursor-pointer"
              >
                Giriş Yap & Panele İlerle
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Corporate Info Modal */}
      {corporateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-lg rounded-3xl bg-white border border-slate-200 shadow-2xl p-6 sm:p-8 space-y-4 relative animate-scale-in">
            <button
              onClick={() => setCorporateModal(null)}
              className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black text-slate-900">{corporateModal.title}</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{corporateModal.content}</p>
            <div className="pt-3">
              <button
                onClick={() => setCorporateModal(null)}
                className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-all cursor-pointer"
              >
                Kapat
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Toast Notification */}
      {groupToast && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-full bg-slate-900 text-white text-xs font-bold shadow-2xl border border-slate-700 flex items-center space-x-2 animate-fade-in-up">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{groupToast}</span>
        </div>
      )}
    </div>
  );
};
