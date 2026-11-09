'use client';

import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Layers,
  Rss,
  FileSpreadsheet,
  Stamp,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Zap,
  Check,
  Sliders,
  DollarSign,
  TrendingUp,
  Clock,
  Download,
  Upload,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  Play,
  Heart,
  ChevronLeft,
  ChevronRight,
  Brain,
  FolderOpen,
  Image as ImageIcon,
  PenTool,
  Lock,
  BarChart3,
  Users,
  Compass,
  Radio,
  Share2,
  Star,
  ExternalLink,
  Laptop,
  Smartphone,
  Eye,
  CheckSquare,
  Plus,
  MessageSquare,
  Smile,
  Hash,
  MapPin,
  AtSign,
  Monitor,
  CheckCheck
} from 'lucide-react';
import { SocialPlatformId } from '@/types';
import { PlatformIcon } from './PlatformIcon';

interface DijitalPanelimViewProps {
  children?: React.ReactNode;
}

export const DijitalPanelimView: React.FC<DijitalPanelimViewProps> = ({ children }) => {
  // ─── PRICING TOGGLE ───
  const [isAnnually, setIsAnnually] = useState(false);

  // ─── 3D FEATURE CAROUSEL STATE ───
  const [activeSlide, setActiveSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // ─── TESTIMONIALS SLIDER STATE ───
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // ─── ACCOUNT GROUPS SIMULATOR STATE ───
  const [selectedGroup, setSelectedGroup] = useState<'ecommerce' | 'b2b' | 'trends' | 'all'>('ecommerce');
  const [groupSuccessToast, setGroupSuccessToast] = useState(false);

  // ─── ROI CALCULATOR STATE ───
  const [accountCount, setAccountCount] = useState<number>(12);
  const [hoursPerWeek, setHoursPerWeek] = useState<number>(18);

  // ─── FAQ ACCORDION STATE ───
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Dynamic ROI Calculations
  const calculatedHoursSaved = Math.round(hoursPerWeek * 0.75);
  const calculatedMonthlyMoneySaved = Math.round(calculatedHoursSaved * 4.2 * 450); // 450 TL/saat iş gücü
  const calculatedAnnualMoneySaved = calculatedMonthlyMoneySaved * 12;

  // ─── 12 SUPPORTED SOCIAL PLATFORMS LIST (Identical match to dijitalpanelim.com) ───
  const allPlatforms = [
    { id: 'facebook', name: 'Facebook', color: '#1877F2', avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80' },
    { id: 'instagram', name: 'Instagram', color: '#E1306C', avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80' },
    { id: 'linkedin', name: 'LinkedIn', color: '#0A66C2', avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80' },
    { id: 'twitter', name: 'X (Twitter)', color: '#000000', avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80' },
    { id: 'tiktok', name: 'TikTok', color: '#000000', avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80' },
    { id: 'googlebusiness', name: 'Google Business', color: '#4285F4', avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&auto=format&fit=crop&q=80' },
    { id: 'youtube', name: 'YouTube', color: '#FF0000', avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80' },
    { id: 'telegram', name: 'Telegram', color: '#26A5E4', avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80' },
    { id: 'bluesky', name: 'Bluesky', color: '#1185FE', avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&auto=format&fit=crop&q=80' },
    { id: 'tumblr', name: 'Tumblr', color: '#001935', avatarUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=120&auto=format&fit=crop&q=80' },
    { id: 'discord', name: 'Discord', color: '#5865F2', avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=120&auto=format&fit=crop&q=80' },
    { id: 'pinterest', name: 'Pinterest', color: '#BD081C', avatarUrl: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?w=120&auto=format&fit=crop&q=80' },
  ];

  // ─── 3D CAROUSEL SLIDES (Exact match to the live site) ───
  const carouselSlides = [
    {
      id: 'management',
      title: 'Hesap Yönetimi',
      desc: 'Farklı sosyal ağlardaki bütün hesaplarınızı tek bir noktadan yönetebilirsiniz.',
      iconBg: 'from-blue-500 via-indigo-600 to-violet-700',
      badge: '📱 12 Ağ Merkezi',
      visualType: 'phone',
    },
    {
      id: 'group',
      title: 'Grup Özelliği',
      desc: 'Hesap grupları oluşturup farklı ağlar üzerinden tek seferde paylaşım yapabilirsiniz.',
      iconBg: 'from-rose-500 via-red-500 to-amber-500',
      badge: '🎯 Çoklu Kümeleme',
      visualType: 'magnet',
    },
    {
      id: 'calendar',
      title: 'Takvim Görünümü & Akıllı Zamanlama',
      desc: 'Tüm gönderilerinizi görsel takvim üzerinde planlayın, en yoğun saatlerde otomatik yayınlayın.',
      iconBg: 'from-purple-500 via-indigo-500 to-blue-500',
      badge: '⏰ En Yüksek Etkileşim',
      visualType: 'calendar',
    },
    {
      id: 'analytics',
      title: 'Derinlemesine Raporlama & Analitik',
      desc: 'Tüm ağların takipçi artışını, etkileşimlerini ve en popüler içeriklerini tek ekranda görün.',
      iconBg: 'from-blue-600 via-indigo-700 to-purple-800',
      badge: '📊 Tam Şeffaflık',
      visualType: 'chart',
    },
    {
      id: 'automation',
      title: 'Otomasyon & Zaman Tasarrufu',
      desc: 'Saniyeler içinde yüzlerce içeriği planlayarak haftalık 18+ saatlik manuel iş gücünü geri kazanın.',
      iconBg: 'from-amber-400 via-orange-500 to-rose-500',
      badge: '⚡ Süper Hız',
      visualType: 'stopwatch',
    },
    {
      id: 'ai',
      title: 'Yapay Zekâ (AI) İçerik & Hashtag Stüdyosu',
      desc: 'Viral kancalar, sektöre özel hashtag önerileri ve ilgi çekici açıklamalar OpenAI destekli motorla anında hazır.',
      iconBg: 'from-cyan-400 via-blue-500 to-indigo-600',
      badge: '🧠 Akıllı AI',
      visualType: 'brain',
    },
    {
      id: 'bulk',
      title: 'Toplu Gönderi (CSV / Excel) Yükleme',
      desc: 'Excel şablonunu doldurup yükleyin; tüm ayın sosyal medya planlaması saniyeler içinde takvime otursun.',
      iconBg: 'from-emerald-400 via-teal-500 to-cyan-600',
      badge: '📑 Toplu Dağıtım',
      visualType: 'folder',
    },
    {
      id: 'watermark',
      title: 'Logo & Filigran Koruması',
      desc: 'Görsellerinize ve videolarınıza tek tıkla logonuzu veya özel filigranınızı ekleyerek marka haklarınızı koruyun.',
      iconBg: 'from-pink-500 via-rose-500 to-purple-600',
      badge: '🛡️ Marka İmzası',
      visualType: 'stamp',
    },
    {
      id: 'rss',
      title: 'RSS ile Otomatik İçerik Paylaşımı',
      desc: 'Web sitenizin veya blogunuzun RSS bağlantısını ekleyin; yeni yazılar anında sosyal ağlarınıza otomatik düşsün.',
      iconBg: 'from-orange-500 via-amber-500 to-yellow-500',
      badge: '📡 Canlı Akış',
      visualType: 'rss',
    },
    {
      id: 'editor',
      title: 'Gelişmiş Görsel & Medya Düzenleyici',
      desc: 'Canva, Toast UI ve Adobe Express entegrasyonu ile fotoğrafları platform ölçülerine göre kesin ve tasarlayın.',
      iconBg: 'from-teal-400 via-emerald-500 to-blue-500',
      badge: '🎨 Stüdyo Kalitesi',
      visualType: 'palette',
    },
  ];

  // Auto-play for carousel
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % carouselSlides.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isAutoPlaying, carouselSlides.length]);

  const handleNextSlide = () => {
    setIsAutoPlaying(false);
    setActiveSlide((prev) => (prev + 1) % carouselSlides.length);
  };

  const handlePrevSlide = () => {
    setIsAutoPlaying(false);
    setActiveSlide((prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length);
  };

  // ─── USER TESTIMONIALS (Exact replication from live site) ───
  const testimonials = [
    {
      id: 't1',
      name: 'RANA ÜNER',
      role: 'Sosyal Medya Direktörü',
      company: 'Dijital İletişim Ajansı',
      verified: true,
      stars: 5,
      comment: 'Yağ gibi paylaşım yapıyor ve hiç kasmıyor, çok iyi. 12 ağa aynı anda dağıtım yapmak hayatımızı kurtardı.',
    },
    {
      id: 't2',
      name: 'İLYAS KAYAN',
      role: 'E-Ticaret Yöneticisi',
      company: 'Trend Giyim A.Ş.',
      verified: true,
      stars: 5,
      comment: 'Arkadaş önerisi ile geldim ve uzundur kullanıyorum. Fiyatı diğer küresel panellerden çok daha avantajlı ve arayüzü son derece akıcı.',
    },
    {
      id: 't3',
      name: 'SELİN AKSOY',
      role: 'Marka & İletişim Uzmanı',
      company: 'Nova Medya',
      verified: true,
      stars: 5,
      comment: 'Grup özelliği sayesinde müşterilerimizin sektörlerine göre tek tıkla doğru hesap kümesine içerik gönderebiliyoruz. Haftada en az 20 saat tasarruf sağladık.',
    },
    {
      id: 't4',
      name: 'MERT KAHRAMAN',
      role: 'Kurucu Ortak',
      company: 'Growth Hub',
      verified: true,
      stars: 5,
      comment: 'Canva ve OpenAI entegrasyonu muazzam. Tasarımı yapıp metni yapay zekâya yazdırıp tek ekrandan onaylayıp planlıyoruz.',
    },
  ];

  // Group selector presets
  const groupPresets = {
    ecommerce: {
      name: '🛒 E-Ticaret & Satış Grubu',
      desc: 'Görsel ve ürün odaklı sosyal platformlar',
      platforms: ['instagram', 'facebook', 'pinterest', 'tiktok'] as SocialPlatformId[],
    },
    b2b: {
      name: '💼 B2B & Kurumsal Marka',
      desc: 'Profesyonel ağlar, duyuru kanalları ve video',
      platforms: ['linkedin', 'twitter', 'googlebusiness', 'youtube', 'telegram'] as SocialPlatformId[],
    },
    trends: {
      name: '⚡ Genç Kitle & Trend Akışı',
      desc: 'Kısa video, anlık mesajlaşma ve topluluklar',
      platforms: ['tiktok', 'instagram', 'discord', 'bluesky'] as SocialPlatformId[],
    },
    all: {
      name: '🌐 12 Platformun Tümü (Global)',
      desc: 'Maksimum erişim için tüm bağlı sosyal ağlar',
      platforms: [
        'facebook',
        'instagram',
        'linkedin',
        'twitter',
        'tiktok',
        'googlebusiness',
        'youtube',
        'telegram',
        'bluesky',
        'tumblr',
        'discord',
        'pinterest',
      ] as SocialPlatformId[],
    },
  };

  const handleApplyGroup = () => {
    setGroupSuccessToast(true);
    setTimeout(() => setGroupSuccessToast(false), 3000);
  };

  // Plans data
  const plans = [
    {
      id: 'eko',
      name: 'EKO TARİFE',
      subtitle: "KOBİ'lerin En Sevdiği",
      monthlyPrice: 1500,
      annualPrice: 1000,
      accountsCount: 5,
      popular: false,
      badgeColor: 'bg-slate-100 text-slate-800',
      features: [
        'Toplam 5 Sosyal Hesap Bağlantısı',
        '12 Desteklenen Ağ Arasından Seçim',
        'Limitsiz Gönderi Planlama & Paylaşım',
        'Görsel Aylık & Haftalık Takvim',
        'Grup Özelliği (3 Özel Hesap Grubu)',
        'Taslak Yönetimi & Otomatik Kayıt',
        'Görsel Boyutlandırma & Kırpma',
        'Logo & Filigran Desteği',
        '1 GB Bulut Medya Depolama',
      ],
      missingFeatures: [
        'RSS ile Otomatik Paylaşım',
        'Toplu CSV İçe Aktarma',
        'Müşteri & Ekip Onay Masası',
      ],
    },
    {
      id: 'trio',
      name: 'TRİO TARİFE',
      subtitle: 'En Popüler Tercih (Ajans & Büyüyen Markalar)',
      monthlyPrice: 3000,
      annualPrice: 2000,
      accountsCount: 15,
      popular: true,
      badgeColor: 'bg-amber-400 text-slate-950 font-black',
      features: [
        'Toplam 15 Sosyal Hesap Bağlantısı',
        '12 Desteklenen Ağın Tamamı',
        'Limitsiz Planlama & Eşzamanlı Dağıtım',
        'Görsel Takvim & En Yoğun Saat Radarı',
        '🎯 Sınırsız Hesap Grubu Kümeleme',
        '📡 RSS Beslemesinden Otomatik Paylaşım',
        '📑 Toplu CSV Gönderi Yükleme Motoru',
        '🛡️ Otomatik Logo & Filigran Ekleme',
        'Canva & Adobe Express Entegrasyonu',
        'Google Drive, Dropbox, OneDrive Bağlantısı',
        '5 GB Güvenli Bulut Medya Deposu',
      ],
      missingFeatures: [],
    },
    {
      id: 'ajans',
      name: 'AJANS / PRO TARİFE',
      subtitle: 'Büyük Ekipler, Medya Ajansları & Holdingler',
      monthlyPrice: 5500,
      annualPrice: 3800,
      accountsCount: 40,
      popular: false,
      badgeColor: 'bg-indigo-100 text-indigo-900',
      features: [
        'Toplam 40+ Sosyal Hesap & Marka',
        'Sınırsız Çalışma Alanı (Workspaces)',
        'Ekip Rolleri, Müşteri Onay Portalı',
        'Öncelikli 7/24 WhatsApp & Telefon Desteği',
        'Sınırsız RSS Beslemesi & CSV Yükleme',
        'Gelişmiş Raporlama & Saf Excel (.xlsx)',
        '25 GB Yüksek Hızlı Bulut Alanı',
      ],
      missingFeatures: [],
    },
  ];

  const faqs = [
    {
      q: 'Hangi sosyal medya platformlarını bağlayabilirim?',
      a: 'Facebook, Instagram, LinkedIn, X (Twitter), TikTok, Google Business Profile, YouTube, Telegram, Bluesky, Tumblr, Discord ve Pinterest olmak üzere 12 ana platformun tamamını tek bir panelden yönetebilirsiniz.',
    },
    {
      q: 'Grup Özelliği nasıl çalışır?',
      a: 'Farklı markalarınız veya hedef kitleleriniz için hesap grupları (örneğin "E-Ticaret Grubu", "B2B Ağlar", "Genç Kitle") oluşturursunuz. İçerik paylaşırken tek tıkla o grubun tüm hesaplarını seçebilir, aynı anda toplu yayınlayabilirsiniz.',
    },
    {
      q: '10 Günlük Deneme Sürümünde Kredi Kartı Gerekir mi?',
      a: 'Hayır! Kredi kartı bilgisi girmeden tüm özellikleri hemen test edebilirsiniz. Memnun kalırsanız size en uygun paketi seçebilirsiniz.',
    },
    {
      q: 'RSS akışından otomatik sosyal medya paylaşımı nasıl çalışır?',
      a: 'Web sitenizin, e-ticaret mağazanızın veya blogunuzun RSS bağlantısını eklersiniz. Sitede her yeni içerik yayınlandığında yapay zekâ başlığı ve linki alarak belirlediğiniz sosyal ağlarda saniyeler içinde otomatik olarak paylaşır.',
    },
    {
      q: 'Toplu gönderi (Bulk CSV) yükleme özelliği nasıl kullanılır?',
      a: 'Örnek Excel/CSV şablonumuzu indirip paylaşılacak tarihleri, açıklamaları ve görselleri doldurursunuz. Tek tıkla yüklediğinizde tüm ayın gönderileri ilgili gün ve saatlere otomatik olarak takvime yerleşir.',
    },
  ];

  return (
    <div className="space-y-20 pb-28 relative">
      {/* ─── 1. HERO SECTION (DARK SLATE, WATERMARK ICONS, CANDY BORDER BUTTON & 3D PANEL PREVIEW) ─── */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-white shadow-2xl border border-slate-800">
        {/* Subtle Watermark Geometric Background Vectors */}
        <div className="absolute inset-0 pointer-events-none opacity-5">
          <div className="absolute top-10 left-10 w-64 h-64 border-4 border-dashed rounded-full" />
          <div className="absolute top-40 right-20 w-80 h-80 border-4 rounded-3xl rotate-12" />
          <div className="absolute -bottom-20 left-1/3 w-96 h-96 border-4 rounded-full" />
        </div>

        {/* Top Glow Highlights */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-r from-blue-600/20 via-indigo-500/20 to-purple-600/20 blur-[130px] pointer-events-none" />

        <div className="relative z-10 pt-12 sm:pt-16 pb-8 px-4 sm:px-8 max-w-6xl mx-auto text-center space-y-6">
          {/* Subtitle Tag */}
          <div className="inline-block">
            <span className="text-pink-500 dark:text-pink-400 font-extrabold text-xs tracking-widest uppercase py-1 px-3 rounded-full bg-pink-500/10 border border-pink-500/20">
              YAPAY ZEKA DESTEKLİ
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight">
            Sosyal Medya Planlama
          </h1>

          {/* Amber Subtitle (Identical to live site) */}
          <p className="text-sm sm:text-lg text-amber-400 font-medium max-w-2xl mx-auto leading-relaxed">
            Gönderi planlama, hesap yönetimi ve otomatik içerik oluşturma özelliklerinden faydalanabilirsiniz.
          </p>

          {/* CTA: Rainbow / Candy Border Button */}
          <div className="pt-4 flex justify-center">
            <div className="p-1 rounded-full bg-gradient-to-r from-emerald-400 via-yellow-400 via-rose-500 via-blue-500 to-indigo-500 shadow-xl shadow-indigo-500/20 hover:scale-105 transition-transform duration-200 cursor-pointer">
              <a
                href="#tarifeler"
                className="px-8 py-3.5 rounded-full bg-white text-slate-900 font-extrabold text-sm sm:text-base flex items-center gap-2 hover:bg-slate-50 transition-colors shadow-inner"
              >
                <span>Ücretsiz Deneyin !</span>
              </a>
            </div>
          </div>

          {/* ─── LIVE 3D PERSPECTIVE DASHBOARD MOCKUP (Replicating live screenshot) ─── */}
          <div className="pt-8 max-w-5xl mx-auto">
            <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-4 sm:p-6 text-left text-slate-900 dark:text-white transition-all transform hover:-translate-y-1">
              {/* Mockup Header Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-black text-sm">
                    OP
                  </div>
                  <div>
                    <span className="font-extrabold text-sm block">OmniPost Pro Studio</span>
                    <span className="text-[10px] text-slate-400 font-mono">Panel v4.2 • Çoklu Dağıtım</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-xl bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 font-bold text-xs">
                    TARİFE YENİLE
                  </span>
                  <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center border border-slate-200 dark:border-slate-700">
                    <PlatformIcon platform="instagram" size="sm" />
                  </div>
                </div>
              </div>

              {/* Mockup Content Grid */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 pt-4">
                {/* Left Mini Nav */}
                <div className="md:col-span-3 space-y-1.5 border-r border-slate-100 dark:border-slate-800 pr-2 hidden md:block text-xs font-semibold text-slate-600 dark:text-slate-400">
                  <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center gap-2">
                    <Laptop className="w-4 h-4" /> Kontrol Paneli
                  </div>
                  <div className="p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 flex items-center gap-2">
                    <SendIcon className="w-4 h-4 text-slate-400" /> Gönderi Paneli
                  </div>
                  <div className="p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-slate-400" /> Otomasyonlar
                  </div>
                  <div className="p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 flex items-center gap-2">
                    <FolderOpen className="w-4 h-4 text-slate-400" /> Toplu Gönderi
                  </div>
                  <div className="p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 flex items-center gap-2">
                    <Rss className="w-4 h-4 text-slate-400" /> RSS Paylaşımı
                  </div>
                </div>

                {/* Center Calendar Preview */}
                <div className="md:col-span-5 space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                    <span className="font-mono">AĞUSTOS 2026</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 font-mono">14 GÖNDERİ PLANLI</span>
                  </div>

                  {/* Calendar Grid Representation */}
                  <div className="grid grid-cols-7 gap-1 text-[10px] font-mono text-center text-slate-400">
                    <div>PZT</div><div>SAL</div><div>ÇAR</div><div>PER</div><div>CUM</div><div>CTS</div><div>PAZ</div>
                    {[...Array(21)].map((_, i) => (
                      <div key={i} className={`p-1 rounded border min-h-[34px] flex flex-col justify-between ${
                        i === 3 || i === 8 || i === 12
                          ? 'bg-blue-50/80 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800'
                          : 'bg-slate-50/50 dark:bg-slate-800/20 border-slate-100 dark:border-slate-800/60'
                      }`}>
                        <span className="text-[9px] text-slate-400">{i + 1}</span>
                        {i === 3 && <span className="bg-blue-600 text-[8px] text-white rounded px-0.5 font-bold">FB</span>}
                        {i === 8 && <span className="bg-red-500 text-[8px] text-white rounded px-0.5 font-bold">YT</span>}
                        {i === 12 && <span className="bg-pink-600 text-[8px] text-white rounded px-0.5 font-bold">IG</span>}
                      </div>
                    ))}
                  </div>

                  {/* Status trend line chart (Gönderi Durumu) */}
                  <div className="pt-2">
                    <div className="flex items-center justify-between text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                      <span>Gönderi Durumu Trendi</span>
                      <div className="flex items-center gap-2 text-[10px]">
                        <span className="flex items-center gap-1 text-emerald-500"><span className="w-2 h-2 rounded-full bg-emerald-500" /> Başarılı</span>
                        <span className="flex items-center gap-1 text-rose-500"><span className="w-2 h-2 rounded-full bg-rose-500" /> Hata</span>
                      </div>
                    </div>
                    {/* SVG Sparkline */}
                    <div className="h-14 w-full bg-slate-50 dark:bg-slate-800/50 rounded-xl p-2 flex items-end">
                      <svg viewBox="0 0 300 40" className="w-full h-full overflow-visible">
                        <path d="M0,35 Q30,10 60,25 T120,5 T180,20 T240,8 T300,15" fill="none" stroke="#10b981" strokeWidth="2.5" />
                        <path d="M0,38 Q50,38 100,37 T200,35 T300,38" fill="none" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="3 3" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Right Post Detail Preview */}
                <div className="md:col-span-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-3.5 border border-slate-100 dark:border-slate-800 flex flex-col justify-between text-xs space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-amber-500 to-rose-500 text-white font-bold text-[10px] flex items-center justify-center">
                      M
                    </div>
                    <div>
                      <span className="font-bold text-slate-800 dark:text-slate-200 block text-xs">Mimarobot Mimarlık</span>
                      <span className="text-[10px] text-slate-400">Yarın, 14:30 • 12 Ağa Dağıtım</span>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed italic bg-white dark:bg-slate-900 p-2 rounded-xl border border-slate-100 dark:border-slate-800">
                    &quot;Birden fazla işlevi içerisinde barındıran mimari projeler tasarım severlerin oldukça ilgisini çekmektedir. Yeni koleksiyonumuz şimdi yayında! ✨ #mimari #tasarim&quot;
                  </p>

                  <div className="relative h-24 rounded-xl overflow-hidden bg-slate-200">
                    <img
                      src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500&auto=format&fit=crop&q=80"
                      alt="Mimari Tasarım Önizleme"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2 flex items-center gap-1">
                      <PlatformIcon platform="instagram" size="sm" />
                      <PlatformIcon platform="pinterest" size="sm" />
                      <PlatformIcon platform="linkedin" size="sm" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ─── 12 PLATFORMS CIRCULAR LOGOS STRIP ─── */}
        <div className="relative z-10 pb-12 pt-6 border-t border-slate-800/80 bg-slate-950/60">
          <div className="max-w-5xl mx-auto px-4 text-center space-y-6">
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              {allPlatforms.map((p) => (
                <div
                  key={p.id}
                  title={p.name}
                  className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center shadow-md hover:scale-115 transition-transform duration-200 cursor-pointer group"
                >
                  <PlatformIcon platform={p.id as SocialPlatformId} size="md" />
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <h2 className="text-xl sm:text-3xl font-extrabold text-white">
                Tek Panel Üzerinden Çoklu Hesap Yönetimi
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto leading-relaxed">
                Bütün Facebook, Instagram, LinkedIn, X, TikTok, Google Business, YouTube, Telegram, Bluesky, Tumblr, Discord ve Pinterest hesaplarınızı tek bir noktadan zahmetsizce yönetebilirsiniz.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ─── INJECTED STUDIO COMPONENT (SPREAD ACROSS THE ENTIRE SITE) ─── */}
      {children && (
        <div id="gonderi-studyosu" className="space-y-6 pt-2 pb-4">
          {children}
        </div>
      )}

      {/* ─── 2. 3D FEATURE CAROUSEL & SHOWCASE SLIDER (Exact match to screenshot) ─── */}
      <div className="bg-slate-50/80 dark:bg-slate-900/40 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-12 shadow-sm space-y-8 relative overflow-hidden">
        {/* Header of Carousel */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Öne Çıkan Özellikler & 3D Vitrin
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white">
            Sadece Üç Adımda Gönderi Planlama
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Sosyal medya hesaplarınızı panele ekledikten sonra, gönderilerinizi düzenleyin ve paylaşım zamanını seçin. Önceden planladığınız bütün gönderiler otomatik olarak paylaşılırken, siz sadece alınan verime odaklanın.
          </p>
        </div>

        {/* Carousel Visual Stage */}
        <div className="relative max-w-4xl mx-auto">
          {/* Main Slide Card */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl p-8 sm:p-12 text-center space-y-6 transition-all min-h-[380px] flex flex-col justify-center items-center relative overflow-hidden">
            {/* Top Badge */}
            <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-200/80 dark:border-blue-700/50 shadow-2xs">
              {carouselSlides[activeSlide].badge}
            </span>

            {/* 3D Visual Mockup Area */}
            <div className="relative my-2">
              <div
                className={`w-28 h-28 sm:w-32 sm:h-32 rounded-3xl bg-gradient-to-tr ${carouselSlides[activeSlide].iconBg} flex items-center justify-center text-white shadow-2xl shadow-indigo-500/25 transform hover:scale-105 transition-transform duration-300 relative group`}
              >
                {carouselSlides[activeSlide].visualType === 'phone' && (
                  <div className="relative flex items-center justify-center">
                    <Smartphone className="w-14 h-14" />
                    <span className="absolute -top-2 -right-2 px-1.5 py-0.5 rounded-full bg-white text-slate-900 text-[10px] font-black shadow-md">
                      12 Ağ
                    </span>
                  </div>
                )}
                {carouselSlides[activeSlide].visualType === 'magnet' && (
                  <div className="relative">
                    <Layers className="w-14 h-14 animate-pulse" />
                    <div className="absolute -top-3 -right-3 w-7 h-7 rounded-full bg-white text-slate-900 flex items-center justify-center font-black text-xs shadow-md">
                      Grup
                    </div>
                  </div>
                )}
                {carouselSlides[activeSlide].visualType === 'calendar' && (
                  <Calendar className="w-14 h-14" />
                )}
                {carouselSlides[activeSlide].visualType === 'stopwatch' && (
                  <Zap className="w-14 h-14 animate-bounce" />
                )}
                {carouselSlides[activeSlide].visualType === 'brain' && (
                  <Brain className="w-14 h-14" />
                )}
                {carouselSlides[activeSlide].visualType === 'folder' && (
                  <FolderOpen className="w-14 h-14" />
                )}
                {carouselSlides[activeSlide].visualType === 'stamp' && (
                  <Stamp className="w-14 h-14" />
                )}
                {carouselSlides[activeSlide].visualType === 'rss' && (
                  <Rss className="w-14 h-14" />
                )}
                {carouselSlides[activeSlide].visualType === 'chart' && (
                  <BarChart3 className="w-14 h-14" />
                )}
                {carouselSlides[activeSlide].visualType === 'palette' && (
                  <ImageIcon className="w-14 h-14" />
                )}
              </div>
            </div>

            {/* Text Content */}
            <div className="space-y-2 max-w-xl mx-auto">
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                {carouselSlides[activeSlide].title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                {carouselSlides[activeSlide].desc}
              </p>
            </div>
          </div>

          {/* Left / Right Nav Arrows */}
          <button
            onClick={handlePrevSlide}
            aria-label="Önceki Slayt"
            className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 dark:bg-slate-800 hover:bg-white border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 shadow-md flex items-center justify-center transition-all hover:scale-110"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNextSlide}
            aria-label="Sonraki Slayt"
            className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 dark:bg-slate-800 hover:bg-white border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 shadow-md flex items-center justify-center transition-all hover:scale-110"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Dot Pagination (Identical to live site) */}
        <div className="flex items-center justify-center space-x-2 pt-2">
          {carouselSlides.map((slide, idx) => (
            <button
              key={slide.id}
              onClick={() => {
                setIsAutoPlaying(false);
                setActiveSlide(idx);
              }}
              aria-label={`Slayt ${idx + 1}`}
              className={`transition-all ${
                activeSlide === idx
                  ? 'w-7 h-2.5 rounded-full bg-rose-500 shadow-xs'
                  : 'w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-700 hover:bg-slate-400'
              }`}
            />
          ))}
        </div>
      </div>

      {/* ─── 3. 3-STEP DETAILED SECTION WITH REAL VISUAL MOCKUPS (Matches dijitalpanelim.com) ─── */}
      <div className="space-y-16">
        {/* STEP 1: Tek Tıkla Hesap Ekleyin (Avatar grid with connecting plus icons) */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-lg space-y-8">
          <div className="max-w-4xl mx-auto rounded-3xl bg-amber-50/50 dark:bg-slate-800/40 border border-amber-200/60 dark:border-slate-700/60 p-6 sm:p-8">
            {/* Avatars matrix with interconnecting colorful + signs */}
            <div className="grid grid-cols-4 gap-4 sm:gap-6 max-w-2xl mx-auto">
              {allPlatforms.map((p, idx) => (
                <div key={p.id} className="relative flex flex-col items-center">
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full p-1 border-2 border-dashed border-rose-400/80 shadow-md">
                    <img
                      src={p.avatarUrl}
                      alt={p.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-center shadow-sm">
                      <PlatformIcon platform={p.id as SocialPlatformId} size="sm" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              1. Tek Tıkla Hesap Ekleyin
            </h3>
            <h4 className="text-base font-bold text-slate-700 dark:text-slate-300">
              Tüm hesaplarınızı tek bir panel üzerinden yönetebilirsiniz.
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              OmniPost Pro; Facebook, Instagram, LinkedIn, X, TikTok, Google Business, YouTube, Telegram, Bluesky, Tumblr, Discord ve Pinterest hesapları ile tam uyum içinde çalışır. Panelinize dilediğiniz kadar sosyal medya hesabı ekleyip yönetebilirsiniz. Her gönderi paylaşımı için farklı platformlardaki hesaplarınıza tek tek üye girişi yapmaktansa, bütün gönderilerinizi tek bir noktadan kolayca planlayın.
            </p>
          </div>
        </div>

        {/* STEP 2: İçerikler Üretip Planlayın (Studio editor mockup with Canva, OpenAI, Drive & calendar chips) */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-lg space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              2. İçerikler Üretip Planlayın
            </h3>
            <h4 className="text-base font-bold text-slate-700 dark:text-slate-300">
              Artık kolayca çok daha kaliteli içerikler üretebilirsiniz.
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              İçerik oluşturma süreçlerini kolaylaştıran pek çok farklı özellik sunar: Görsel düzenleme, hazır tasarım şablonları, örnek içerikler ve yapay zeka desteğinden siz de faydalanabilirsiniz. Sosyal medya gönderilerinizi planlarken Adobe Express, Canva, Dropbox, OneDrive, Toast Editor, RSS ve OpenAI entegrasyonlarını kullanarak son derece profesyonel içerikler oluşturabilir ve alınan verimi artırabilirsiniz.
            </p>
          </div>

          {/* Graphic Studio Mockup (Matches Screenshot) */}
          <div className="max-w-4xl mx-auto rounded-3xl bg-amber-50/50 dark:bg-slate-800/40 border border-amber-200/60 dark:border-slate-700/60 p-6 sm:p-8 space-y-6">
            {/* Top row: 12 social channel circular icons */}
            <div className="flex flex-wrap items-center justify-center gap-2 pb-2">
              {allPlatforms.map((p) => (
                <div key={p.id} className="w-8 h-8 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center shadow-2xs">
                  <PlatformIcon platform={p.id as SocialPlatformId} size="sm" />
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              {/* Text editor mockup */}
              <div className="md:col-span-8 bg-blue-50/70 dark:bg-slate-900 p-6 rounded-2xl border border-blue-200/60 dark:border-slate-800 space-y-3">
                <div className="h-3 w-3/4 bg-blue-200/80 dark:bg-slate-800 rounded-full" />
                <div className="h-3 w-full bg-blue-200/80 dark:bg-slate-800 rounded-full" />
                <div className="h-3 w-5/6 bg-blue-200/80 dark:bg-slate-800 rounded-full" />
                <div className="h-3 w-1/2 bg-blue-200/80 dark:bg-slate-800 rounded-full" />

                {/* Toolbar */}
                <div className="pt-4 border-t border-blue-200/60 dark:border-slate-800 flex items-center justify-between text-slate-500">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs">A</span>
                    <PenTool className="w-3.5 h-3.5" />
                    <MapPin className="w-3.5 h-3.5" />
                    <Hash className="w-3.5 h-3.5" />
                    <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                  </div>
                  <div className="flex items-center gap-2">
                    <FolderOpen className="w-3.5 h-3.5" />
                    <ImageIcon className="w-3.5 h-3.5" />
                    <Upload className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* 3 media image previews */}
                <div className="grid grid-cols-4 gap-2 pt-2">
                  <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=200&auto=format&fit=crop&q=80" className="h-16 rounded-xl object-cover w-full" alt="Örnek 1" />
                  <img src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=200&auto=format&fit=crop&q=80" className="h-16 rounded-xl object-cover w-full" alt="Örnek 2" />
                  <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=200&auto=format&fit=crop&q=80" className="h-16 rounded-xl object-cover w-full" alt="Örnek 3" />
                  <div className="h-16 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700 flex items-center justify-center text-slate-400">
                    <Plus className="w-5 h-5" />
                  </div>
                </div>
              </div>

              {/* 6 Integrations icons grid */}
              <div className="md:col-span-4 grid grid-cols-3 gap-3">
                {[
                  { name: 'Dropbox', color: 'text-blue-600' },
                  { name: 'Adobe', color: 'text-rose-600' },
                  { name: 'OneDrive', color: 'text-sky-600' },
                  { name: 'Canva', color: 'text-cyan-600' },
                  { name: 'OpenAI', color: 'text-emerald-600' },
                  { name: 'Toast UI', color: 'text-indigo-600' },
                ].map((item) => (
                  <div key={item.name} className="p-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 text-center shadow-xs">
                    <div className={`font-black text-xs ${item.color}`}>{item.name}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* STEP 3: Keyfinize Bakın (Relaxed office illustration scene & automated publishing queue) */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-lg space-y-8">
          {/* Relaxed Illustration Scene Container */}
          <div className="max-w-2xl mx-auto rounded-3xl bg-slate-50 dark:bg-slate-800/40 p-8 text-center flex flex-col items-center justify-center">
            <div className="w-24 h-24 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center mb-4 shadow-md">
              <Smile className="w-12 h-12 animate-pulse" />
            </div>
            <div className="text-sm font-extrabold text-slate-900 dark:text-white">
              Siz Çayınızı Yudumlarken İçerikleriniz Saatinde Yayında
            </div>
            <p className="text-xs text-slate-500 mt-1 max-w-sm">
              Gelişmiş arka plan kuyruk motoru saniyede binlerce gönderiyi API kısıtlamalarına takılmadan eşzamanlı yayınlar.
            </p>
          </div>

          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              3. Keyfinize Bakın
            </h3>
            <h4 className="text-base font-bold text-slate-700 dark:text-slate-300">
              Paylaşımlarınız yayınlanırken siz diğer işlerinizle ilgilenebilirsiniz.
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Sosyal medya gönderilerinizi düzenli bir şekilde paylaşabilmek adına, gerektiğinden fazla zaman harcamayın. Otomasyon altyapımızı kullanarak tek seferlik gönderiler planlayabileceğiniz gibi, tekrarlı paylaşımlar oluşturmak da mümkündür. Planladığınız bütün gönderiler, seçtiğiniz sosyal medya kanalları üzerinden otomatik olarak paylaşılırken siz tatile çıkabilir veya daha önemli diğer işlerinize zaman ayırabilirsiniz.
            </p>
          </div>
        </div>
      </div>

      {/* ─── 5. CTA CARD (Ücretsiz denemek ister misiniz ? Kredi kartı gerekmiyor !) ─── */}
      <div className="rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 sm:p-12 text-center max-w-4xl mx-auto space-y-5 shadow-sm">
        <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
          Ücretsiz denemek ister misiniz ? Kredi kartı bilgisi gerekmiyor !
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          Ayrıca sunduğumuz tarifelerin <strong>özellik ve fiyat bilgilerine</strong> kolayca erişebilirsiniz.
        </p>
        <div className="pt-2">
          <a
            href="#tarifeler"
            className="inline-block px-8 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs tracking-wider shadow-md transition-all"
          >
            10 GÜN ÜCRETSİZ DENEYİN
          </a>
        </div>
      </div>

      {/* ─── 7. GRUP ÖZELLİĞİ (ACCOUNT CLUSTERS & WORKSPACE SIMULATOR) ─── */}
      <div id="grup-simulasyon" className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-400 font-bold text-xs border border-rose-200 dark:border-rose-800 mb-1.5">
              <Layers className="w-3.5 h-3.5" />
              <span>Canlı Grup Özelliği Simülasyonu</span>
            </div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">
              Hesap Grupları ile Tek Tıkla Toplu Paylaşım
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Farklı sektörlerdeki veya markalardaki hesaplarınızı kümelere ayırın, her seferinde tek tek hesap seçme zahmetinden kurtulun.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleApplyGroup}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white font-bold text-xs shadow-md shadow-rose-500/20 flex items-center space-x-1.5 transition-all"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Grubu Yayın Kuyruğuna Al</span>
            </button>
          </div>
        </div>

        {/* Group Selector Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {(Object.keys(groupPresets) as Array<keyof typeof groupPresets>).map((key) => {
            const group = groupPresets[key];
            const isSelected = selectedGroup === key;
            return (
              <div
                key={key}
                onClick={() => setSelectedGroup(key)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer space-y-3 ${
                  isSelected
                    ? 'bg-rose-50/70 dark:bg-rose-950/30 border-rose-400 ring-2 ring-rose-500/20 shadow-md'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50/70'
                }`}
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">{group.name}</h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold">
                    {group.platforms.length} Ağ
                  </span>
                </div>
                <p className="text-xs text-slate-500">{group.desc}</p>

                {/* Platforms Icons in this group */}
                <div className="flex items-center space-x-1.5 pt-1">
                  {group.platforms.map((pId) => (
                    <PlatformIcon key={pId} platform={pId} className="w-5 h-5" />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Toast alert */}
        {groupSuccessToast && (
          <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-bold flex items-center space-x-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>
              &quot;{groupPresets[selectedGroup].name}&quot; başarıyla seçildi! {groupPresets[selectedGroup].platforms.length} sosyal ağ için eşzamanlı gönderi hazırlandı.
            </span>
          </div>
        )}
      </div>

      {/* ─── 8. INTERACTIVE ROI CALCULATOR (Tasarruf Hesaplayıcı) ─── */}
      <div id="hesaplayici" className="bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 font-bold text-xs border border-cyan-500/30 mb-2">
              <DollarSign className="w-3.5 h-3.5" />
              <span>İnteraktif Tasarruf & Zaman Hesaplayıcı</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              OmniPost Büyüme Masası ile Ne Kadar Tasarruf Edersiniz?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Sosyal medya hesap sayınızı ve manuel harcadığınız süreyi kaydırın, kazancınızı anlık hesaplayalım.
            </p>
          </div>

          <div className="text-right">
            <span className="text-[11px] text-slate-400 block">Tahmini Yıllık Tasarruf</span>
            <span className="text-3xl sm:text-4xl font-black text-amber-400 font-mono">
              ₺{calculatedAnnualMoneySaved.toLocaleString('tr-TR')}
            </span>
          </div>
        </div>

        {/* Sliders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            {/* Slider 1: Account count */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-slate-300">Yönettiğiniz Sosyal Medya Hesap Sayısı:</span>
                <span className="text-amber-400 font-mono text-base font-extrabold">{accountCount} Hesap</span>
              </div>
              <input
                type="range"
                min="1"
                max="50"
                value={accountCount}
                onChange={(e) => setAccountCount(Number(e.target.value))}
                className="w-full accent-amber-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>1 Hesap</span>
                <span>25 Hesap</span>
                <span>50+ Hesap (Ajans)</span>
              </div>
            </div>

            {/* Slider 2: Weekly hours spent */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-slate-300">Haftalık Manuel Paylaşım Süresi:</span>
                <span className="text-cyan-400 font-mono text-base font-extrabold">{hoursPerWeek} Saat / Hafta</span>
              </div>
              <input
                type="range"
                min="2"
                max="40"
                value={hoursPerWeek}
                onChange={(e) => setHoursPerWeek(Number(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>2 Saat</span>
                <span>20 Saat</span>
                <span>40 Saat (Tam Zamanlı)</span>
              </div>
            </div>
          </div>

          {/* Results Badge Cards */}
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="p-4 rounded-2xl bg-white/10 border border-white/15 space-y-1">
              <Clock className="w-5 h-5 text-cyan-300 mx-auto mb-1" />
              <div className="text-2xl font-black text-white font-mono">{calculatedHoursSaved} Saat</div>
              <span className="text-[11px] text-slate-300">Haftalık Geri Kazanılan Süre</span>
            </div>

            <div className="p-4 rounded-2xl bg-white/10 border border-white/15 space-y-1">
              <TrendingUp className="w-5 h-5 text-emerald-400 mx-auto mb-1" />
              <div className="text-2xl font-black text-emerald-300 font-mono">+%350</div>
              <span className="text-[11px] text-slate-300">Ortalama Erişim Artışı</span>
            </div>

            <div className="p-4 rounded-2xl bg-white/10 border border-white/15 space-y-1 col-span-2">
              <span className="text-[11px] text-slate-300 block">Aylık Net İş Gücü Tasarrufu</span>
              <div className="text-3xl font-black text-amber-300 font-mono">
                ₺{calculatedMonthlyMoneySaved.toLocaleString('tr-TR')} / Ay
              </div>
              <span className="text-[10px] text-slate-400">
                (Trio veya Ajans tarife ücretini ilk 2 günde amorti eder)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ─── 9. PRICING SECTION (Eko, Trio, Ajans ile %33 İndirim Seçici) ─── */}
      <div id="tarifeler" className="space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Kurumsal Lisans & Paketler
          </span>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white">
            OmniPost Büyüme & Tarife Seçenekleri
          </h2>
          <p className="text-xs text-slate-500">
            10 Gün Ücretsiz Deneyin. Kredi kartı gerekmez.
          </p>

          {/* Monthly / Annually Switcher */}
          <div className="inline-flex items-center space-x-3 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold">
            <button
              onClick={() => setIsAnnually(false)}
              className={`px-4 py-2 rounded-xl transition-all ${
                !isAnnually
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Aylık Ödeme
            </button>
            <button
              onClick={() => setIsAnnually(true)}
              className={`px-4 py-2 rounded-xl transition-all flex items-center space-x-1.5 ${
                isAnnually
                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <span>Yıllık Ödeme</span>
              <span className="px-1.5 py-0.5 rounded text-[9px] bg-red-100 text-red-700 font-extrabold uppercase">
                %33 İndirim
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {plans.map((plan) => {
            const price = isAnnually ? plan.annualPrice : plan.monthlyPrice;
            return (
              <div
                key={plan.id}
                className={`rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all relative ${
                  plan.popular
                    ? 'bg-white dark:bg-slate-900 border-2 border-blue-600 shadow-xl ring-4 ring-blue-500/10'
                    : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-blue-600 text-white font-extrabold text-[10px] tracking-wider uppercase shadow-sm">
                    En Çok Tercih Edilen
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <h3 className="font-extrabold text-base text-slate-900 dark:text-white">{plan.name}</h3>
                    <p className="text-xs text-slate-500">{plan.subtitle}</p>
                  </div>

                  {/* Price Block */}
                  <div className="pt-2 pb-3 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-baseline space-x-1">
                      <span className="text-xl font-bold text-slate-700 dark:text-slate-300">₺</span>
                      <span className="text-4xl font-black text-slate-950 dark:text-white font-mono tracking-tight">
                        {price.toLocaleString('tr-TR')}
                      </span>
                      <span className="text-xs text-slate-400">/ Ay</span>
                    </div>
                    {isAnnually && (
                      <span className="text-[11px] text-emerald-600 font-bold block mt-1">
                        Yıllık peşin ödemede ayda {(plan.monthlyPrice - plan.annualPrice).toLocaleString('tr-TR')} ₺ tasarruf
                      </span>
                    )}
                  </div>

                  {/* Features List */}
                  <ul className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300">
                    {plan.features.map((feat) => (
                      <li key={feat} className="flex items-start space-x-2">
                        <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                    {plan.missingFeatures.map((mFeat) => (
                      <li key={mFeat} className="flex items-start space-x-2 text-slate-400 line-through">
                        <span className="w-4 h-4 text-slate-300 flex-shrink-0 text-center font-bold">✕</span>
                        <span>{mFeat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6">
                  <button
                    className={`w-full py-3.5 rounded-2xl font-bold text-xs transition-all shadow-sm ${
                      plan.popular
                        ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/25'
                        : 'bg-slate-900 hover:bg-slate-800 text-white'
                    }`}
                  >
                    10 GÜN ÜCRETSİZ DENE
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ─── 10. KULLANICI GÖRÜŞLERİ (GOOGLE REVIEWS SLIDER) ─── */}
      <div className="bg-slate-50/70 dark:bg-slate-900/40 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-sm space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            Kullanıcı Görüşleri
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Değerli kullanıcılarımızın geri bildirimleri bizim için çok kıymetli.
          </p>
        </div>

        {/* Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {testimonials.map((t, idx) => (
            <div
              key={t.id}
              className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all space-y-3 relative"
            >
              {/* Google icon in corner */}
              <div className="flex items-center justify-between">
                <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-xs text-blue-500">
                  G
                </div>
                <div className="flex items-center space-x-1">
                  {[...Array(t.stars)].map((_, s) => (
                    <Star key={s} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
              </div>

              <div className="text-center pt-2">
                <div className="flex items-center justify-center gap-1.5">
                  <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">{t.name}</h4>
                  <CheckCheck className="w-4 h-4 text-blue-500" />
                </div>
                <span className="text-[11px] text-slate-400 block">{t.role} • {t.company}</span>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 text-center leading-relaxed italic pt-1">
                &quot;{t.comment}&quot;
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ─── 11. SIKÇA SORULAN SORULAR (FAQ ACCORDION) ─── */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-5">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Aklınıza takılan bazı soruların cevaplarına erişebilirsiniz
          </span>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">
            Sıkça Sorulan Sorular
          </h2>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800 max-w-3xl mx-auto">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div key={idx} className="py-4">
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full text-left flex items-center justify-between text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <span>{faq.q}</span>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-slate-400 flex-shrink-0 ml-2" /> : <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0 ml-2" />}
                </button>
                {isOpen && (
                  <p className="pt-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {faq.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ─── 12. FLOATING ACTION BUTTON (+) (Identical to live site bottom right) ─── */}
      <div className="fixed bottom-6 right-6 z-50">
        <a
          href="#tarifeler"
          title="Hızlı Başla & Destek"
          className="w-13 h-13 rounded-full bg-blue-500 hover:bg-blue-600 text-white shadow-xl flex items-center justify-center transform hover:scale-110 active:scale-95 transition-all"
        >
          <Plus className="w-7 h-7" />
        </a>
      </div>
    </div>
  );
};

// Helper internal icons
function SendIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
    </svg>
  );
}
