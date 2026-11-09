'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Sparkles,
  Copy,
  Check,
  Volume2,
  VolumeX,
  CheckCircle2,
  Mic,
  Film,
  ArrowRight,
  ShieldCheck,
  Smartphone,
  Flame,
} from 'lucide-react';

interface SceneItem {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  category: string;
  durationSeconds: number;
  videoPath: string;
  voiceoverText: string;
  prompterScript: string;
  stepGuide: { step: string; action: string; note: string }[];
  techHighlight: string;
  keyPoints: string[];
}

const SCENES: SceneItem[] = [
  {
    id: 'intro',
    title: 'OmniPost Pro — Geleceğin Sosyal Medya Merkezi',
    subtitle: 'Yeni Nesil Çoklu Sosyal Medya Yönetim, Dağıtım & Analitik Ekosistemi',
    badge: 'B2B SAAS PLATFORMU',
    category: 'Giriş & Vizyon',
    durationSeconds: 6,
    videoPath: '/showcase/videos/scene1_intro.mp4',
    voiceoverText:
      'Sosyal medyanızı yönetirken kaybolmayın. Karşınızda OmniPost Pro: Tüm sosyal ağlarınızı tek bir akıllı merkezden yöneten yeni nesil otomasyon stüdyosu.',
    prompterScript:
      'Sayın jüri üyeleri ve değerli katılımcılar, merhaba. Bugün sizlere geliştirdiğimiz yeni nesil sosyal medya yönetim ve otomasyon platformu OmniPost Pro’yu sunmaktan gurur duyuyorum. Günümüzde markalar ve dijital ajanslar 7 farklı sosyal platformda varlık göstermek zorunda; ancak her platformun ayrı karakter limitleri, farklı medya standartları ve izole panelleri operasyonu kaosa dönüştürüyor. OmniPost Pro, tam olarak bu problemi kökten çözmek için tasarlandı: Tek bir akıllı merkezden 7 büyük sosyal ağa aynı anda, hatasız ve kurumsal düzeyde içerik dağıtımı sağlıyoruz.',
    stepGuide: [
      {
        step: '1. Giriş ve Karşılama',
        action: 'Dikey videoda OmniPost Pro logosunu ve genel vizyon akışını gösterin.',
        note: 'Projenin çıkış amacını, tek merkezden yönetim ihtiyacını ve B2B SaaS vizyonunu 15 saniyede özetleyin.',
      },
      {
        step: '2. Problem Tanımı',
        action: 'Sosyal medya yönetiminde yaşanan zaman kaybını ve platform uyumsuzluklarını vurgulayın.',
        note: 'YouTube, Instagram, X, TikTok, Facebook, Pinterest ve Threads için ayrı ayrı paylaşım yapmanın getirdiği yükü aktarın.',
      },
      {
        step: '3. Çözüm Önerisi',
        action: 'OmniPost Pro’nun "Omni-Engine" motoruyla tüm bu süreçleri nasıl otomatize ettiğini belirtin.',
        note: 'Projenin modern Next.js 14 mimarisi ve sıfır veri sızıntılı API kasasıyla çalıştığını duyurun.',
      },
    ],
    techHighlight: 'Next.js 14 App Router, TypeScript ve Tailwind CSS ile endüstri standardı modern mimari.',
    keyPoints: [
      '7 Ana Sosyal Ağ Desteği (YouTube, Instagram, X, Facebook, TikTok, Pinterest, Threads)',
      'Sıfır Veri Sızıntılı Yerel Token Kasası (Zero-Leak Security)',
      'Gerçek Microsoft Excel (.xlsx) Kurumsal Raporlama Motoru',
    ],
  },
  {
    id: 'brand',
    title: 'Telegram Esintili Marka Kimliği & Akıcı Arayüz',
    subtitle: 'Hızlı, minimalist ve 21st.dev cam efektli tasarım dili',
    badge: 'TASARIM SİSTEMİ',
    category: 'Marka & UI',
    durationSeconds: 7,
    videoPath: '/showcase/videos/scene2_brand.mp4',
    voiceoverText:
      "Telegram'ın hızından ve 21st.dev estetiğinden ilham aldık. Göz yormayan modern cam efektleri, yaylanan mikro etkileşimler ve tamamen responsive bir kullanıcı deneyimi.",
    prompterScript:
      'Arayüz tasarımımızda rastgele şablonlar kullanmadık. Telegram’ın minimalist hız kültüründen ve 21st.dev’in modern cam morfolojisi estetiğinden ilham aldık. Göz yormayan kurumsal kobalt mavisi ve zümrüt yeşili paletimiz, yaylanan mikro etkileşimler ve duyarlı kart tasarımları sayesinde kullanıcı hem masaüstünde hem de mobil cihazında akıcı bir deneyim yaşıyor. Ayrıca sistem PWA desteklidir; çevrimdışı taslak koruması ve akıllı telefon kamerasından anlık çekim desteği mevcuttur.',
    stepGuide: [
      {
        step: '1. Tasarım Felsefesini Açıklayın',
        action: 'Dinamik SVG logoyu ve cam kart (glassmorphism) arka planlarını gösterin.',
        note: 'Aydınlık/karanlık dengesini ve 21st.dev tasarım tokenlarını jüriye gösterin.',
      },
      {
        step: '2. Mobil Uyumluluk & PWA Vurgusu',
        action: 'Arayüzün responsive yapısına ve PWA yeteneklerine dikkat çekin.',
        note: 'Kullanıcının cep telefonundan kamera ile doğrudan fotoğraf çekip paylaşabildiğini belirtin.',
      },
      {
        step: '3. Mikro Etkileşimleri Gösterin',
        action: 'Hover animasyonları, yaylanma efektleri ve glowing border detaylarını vurgulayın.',
        note: 'Ticari satışa hazır, yüksek performanslı bir kurumsal SaaS deneyimi olduğunu hissettirin.',
      },
    ],
    techHighlight: 'PWA Service Worker desteği, IndexedDB yerel taslak saklama ve Tailwind Glassmorphism.',
    keyPoints: [
      'Harmonik Kobalt Mavi ve Zümrüt Yeşili Palet',
      'Spring Fizikli Mikro-Etkileşimler & Glow Borderlar',
      'PWA Desteği ile Masaüstü ve Mobil Tam Uyum',
    ],
  },
  {
    id: 'studio',
    title: 'Omni-Engine Çoklu Gönderi Stüdyosu',
    subtitle: 'Tek bir editörden 7 farklı ağın kurallarına göre optimize yayınlama',
    badge: 'ÇOKLU DAĞITIM',
    category: 'Gönderi Stüdyosu',
    durationSeconds: 8,
    videoPath: '/showcase/videos/scene3_dispatch.mp4',
    voiceoverText:
      'Tek bir tıklama, yedi farklı platform. Karakter limitleri, video formatları ve özel açıklamalar her ağ için otomatik olarak optimize edilir. Saatlerce süren manuel işler artık saniyeler içinde tamam.',
    prompterScript:
      'Şimdi projemizin kalbi olan Gönderi Stüdyosu’ndayız. Burada kullanıcı tek bir metin kutusuna başlık, açıklama ve medya ekliyor. Ancak perde arkasında çalışan Omni-Engine motoru, her sosyal ağın kurallarını anlık olarak denetliyor. Örneğin X için 280 karakter sınırı varken Threads için 500, Instagram için 2200 karakter sınırı var. Canlı Mobil Önizleme panelinde her ağın mobil cihazda tam olarak nasıl görüneceğini görebiliyorsunuz. İstenirse ağa özel açıklama ve etiketler tek tıkla özelleştirilebiliyor.',
    stepGuide: [
      {
        step: '1. Platform Seçiciyi Tanıtın',
        action: '7 sosyal ağ ikonunun (X, Instagram, YouTube, TikTok vb.) seçili olduğunu gösterin.',
        note: 'Tümünü Seç / Temizle butonları ve anlık aktif ağ sayacı ile kontrolün kolaylığını anlatın.',
      },
      {
        step: '2. İçerik Editörü & Karakter Sayacı',
        action: 'Metin alanına ve altındaki dinamik renkli karakter sınır çubuklarına odaklanın.',
        note: 'Her ağ için limit aşıldığında sistemin kırmızı uyarı verdiğini ve gönderimi engellediğini gösterin.',
      },
      {
        step: '3. Canlı Önizleme Yeteneği',
        action: 'Mobil telefon çerçevesinde Instagram ve X sekmeleri arasındaki geçişi aktarın.',
        note: 'Kullanıcının gönderiyi yayınlamadan önce her platformda birebir önizleyebildiğini kanıtlayın.',
      },
    ],
    techHighlight: 'Ağ bazlı dinamik regex limit doğrulama, medya format kontrolü ve Override State motoru.',
    keyPoints: [
      'X için 280, Threads için 500 karakter canlı limit denetimi',
      'Platforma özel başlık ve etiket ayrıştırma (Overrides)',
      'Görsel ve video için entegre medya yükleme desteği',
    ],
  },
  {
    id: 'dispatch',
    title: 'Güvenli Dağıtım & Sıfır Sızıntı API Kasası',
    subtitle: 'Her platforma gönderilecek API veri paketlerini anlık inceleme',
    badge: 'GÜVENLİK & KONTROL',
    category: 'API Doğrulama',
    durationSeconds: 7,
    videoPath: '/showcase/videos/scene4_vault.mp4',
    voiceoverText:
      'API anahtarlarınız ve sosyal medya hesaplarınız güvende. Sıfır sızıntı prensibiyle çalışan yerel şifreleme kasamız sayesinde şifreleriniz asla üçüncü taraf sunucularda saklanmaz.',
    prompterScript:
      'Sosyal medya araçlarında en büyük risk müşteri hesaplarının çalınması veya token sızıntılarıdır. OmniPost Pro, sektörde öncü olan "Sıfır Sızıntı" (Zero-Leak) prensibiyle inşa edilmiştir. Kullanıcının OAuth 2.0 erişim jetonları ve API anahtarları asla üçüncü parti uzak sunuculara gönderilmez; yerel istemci kasasında şifrelenir. Dağıtım ekranında yayınlama butonuna basıldığında her ağa gidecek JSON veri paketi ve yetki durumu satır satır denetlenir, böylece kota aşımları ve API hataları önceden engellenir.',
    stepGuide: [
      {
        step: '1. API Kasasını ve Güvenlik Mimarisini Açıklayın',
        action: 'Ekranda API dağıtım kontrol listesini ve OAuth durum rozetlerini gösterin.',
        note: 'Bankacılık düzeyinde yerel şifreleme ve sıfır sızıntı politikasını aktarın.',
      },
      {
        step: '2. JSON Payload Denetimi',
        action: 'Platformlara gönderilecek JSON paketlerinin doğrulanma aşamasına dikkat çekin.',
        note: 'Meta Graph API, X API v2 ve YouTube Data API v3 parametrelerinin hazır olduğunu belirtin.',
      },
      {
        step: '3. Hata Yönetimi & Yeniden Deneme',
        action: 'Kısmi ağ hatalarında sadece başarısız olan ağın yeniden denendiğini vurgulayın.',
        note: 'Bu mimarinin kullanıcıyı gereksiz kota harcamaktan koruduğunu anlatın.',
      },
    ],
    techHighlight: 'OAuth 2.0 PKCE akışı, AES yerel şifreleme ve Next.js izole Route Handler API mimarisi.',
    keyPoints: [
      'Yayınlama öncesi ağ bazlı hata önleme sistemi',
      'OAuth token kontrolü ve otomatik yenileme çağrısı',
      'Kısmi hata durumlarında ağ bazlı tekrar deneme',
    ],
  },
  {
    id: 'analytics',
    title: 'Çoklu Kanal Analitiği & Native Excel (.xlsx) Motoru',
    subtitle: 'Bozuk CSV formatlarına son: Renkli, formüllü, gerçek Microsoft Excel çıktısı',
    badge: 'İŞ & RAPORLAMA',
    category: 'Excel Analitiği',
    durationSeconds: 8,
    videoPath: '/showcase/videos/scene5_analytics.mp4',
    voiceoverText:
      'Bozuk ve Türkçe karakterleri yok eden CSV dosyalarına veda edin. OmniPost, tek tıkla kurumsal Microsoft Excel tabloları üretir. Formülleri hazır, renk kodlu ve müşterilerinize sunuma anında hazır.',
    prompterScript:
      'B2B ajansların en çok vakit kaybettiği konu müşterilere haftalık veya aylık rapor hazırlamaktır. Piyasada çoğu araç Türkçe karakterleri bozan ve biçimlendirmesi olmayan basit CSV çıktıları verir. Biz OmniPost Pro’da tamamen saf Node.js zlib altyapısıyla çalışan yerel bir OpenXML ZIP derleyicisi geliştirdik. Dışarıdan ağır bir kütüphane yüklemeden, tek bir tıkla kurumsal Microsoft Excel (.xlsx) dosyası üretiyoruz. Tabloda mavi kurumsal başlıklar, formüllü toplamlar ve zümrüt yeşili durum rozetleri doğrudan hazır geliyor.',
    stepGuide: [
      {
        step: '1. Raporlama Tablosunu ve KPI Kartlarını Gösterin',
        action: 'Ekranda toplam erişim, beğeni, yorum ve platform bazlı istatistik kartlarını gösterin.',
        note: 'Konsolide metriklerin ajans yöneticisine tek bakışta kontrol sağladığını aktarın.',
      },
      {
        step: '2. "Excel (.xlsx) İndir" Butonunu Vurgulayın',
        action: 'Mavi renkli Excel indirme butonunu işaret edin.',
        note: 'İndirilen dosyanın sahte CSV değil, çift tıklandığında Excel’de açılan gerçek OpenXML tablosu olduğunu söyleyin.',
      },
      {
        step: '3. Sıfır Bağımlılık Teknik Başarısı',
        action: 'Jüriye bu motorun saf Node.js zlib ile sıfır harici paketle yazıldığını açıklayın.',
        note: 'Hafif, güvenli ve sunucu kaynaklarını tüketmeyen mühendislik başarısını vurgulayın.',
      },
    ],
    techHighlight: 'Saf OpenXML standardında zlib DEFLATE ZIP arşivi, XML şablonlama ve Blob indirme motoru.',
    keyPoints: [
      'OpenXML Standartlarında Saf Node.js Zlib ZIP Derleyicisi',
      'Mavi kurumsal başlıklar, zümrüt yeşili durum rozetleri',
      'Tarayıcıda dosya uzantısını kaybetmeyen JavaScript Blob indirme',
    ],
  },
  {
    id: 'support',
    title: '7/24 WhatsApp Concierge Canlı Destek',
    subtitle: 'Müşteri memnuniyetini maksimize eden doğrudan WhatsApp bilet entegrasyonu',
    badge: 'CANLI MÜŞTERİ DESTEĞİ',
    category: 'WhatsApp Hattı',
    durationSeconds: 7,
    videoPath: '/showcase/videos/scene6_support.mp4',
    voiceoverText:
      'Bir sorunla karşılaştığınızda günlerce e-posta yanıtı beklemezsiniz. Tek tıkla doğrudan WhatsApp destek hattımıza bağlanın; 15 dakika içinde uzman çözümü cebinizde olsun.',
    prompterScript:
      'Geleneksel SaaS araçlarında bir API hatası aldığınızda açtığınız destek talebine 3-4 gün sonra otomatik bir bot yanıt verir. OmniPost Pro’da ise müşteri deneyimini önceliklendirdik. Arayüzün her noktasından tek tıkla doğrudan WhatsApp destek hattımıza (0553 977 16 47) ulaşılabiliyor. Tıklandığında kullanıcının mevcut hata kodu ve sistem bilgisi hazır bir mesaj şablonu olarak WhatsApp’a aktarılıyor. B2B müşterilerimize 15 dakikada insan destek garantisi veriyoruz.',
    stepGuide: [
      {
        step: '1. Destek Modalını ve Butonunu Gösterin',
        action: 'Ekranda WhatsApp canlı destek kartını ve doğrudan yönlendirme bağlantısını gösterin.',
        note: 'Kullanıcının vakit kaybetmeden sorununu iletebildiği modern iletişim kanalını açıklayın.',
      },
      {
        step: '2. Otomatik Şablon Formatı',
        action: 'Kullanıcının yazdığı sorunun ve tarayıcı bilgisinin otomatik formata dönüştüğünü belirtin.',
        note: 'Böylece teknik ekibin sorunu anında anlayıp dakikalar içinde çözebildiğini vurgulayın.',
      },
      {
        step: '3. Müşteri Tutundurma (Retention) Katkısı',
        action: 'Bu özelliğin SaaS churn (müşteri kaybı) oranını nasıl sıfıra yaklaştırdığını ifade edin.',
        note: 'Yatırımcıların ve müşterilerin en çok önem verdiği güven unsurunu öne çıkarın.',
      },
    ],
    techHighlight: 'WhatsApp Click-to-Chat derin bağlantı protokolü ve hata telemetrisi şablonlayıcı.',
    keyPoints: [
      'Tek tıkla otomatik şablon mesaj oluşturma',
      'Müşteri taleplerini 15 dakikada yanıtlama standardı',
      'B2B ajanslar için öncelikli teknik yardım hattı',
    ],
  },
  {
    id: 'pricing',
    title: 'Yatırımcı Vitrini & Katmanlı SaaS Modeli',
    subtitle: '32 Milyar dolarlık küresel pazar, %88.4 brüt kâr marjı ve $19-$499 arası esnek fiyatlandırma',
    badge: 'İŞ MODELİ',
    category: 'Fiyatlandırma',
    durationSeconds: 7,
    videoPath: '/showcase/videos/scene7_pricing.mp4',
    voiceoverText:
      'Yıllık 32 Milyar dolarlık dev bir pazarda, yüzde 88 brüt kâr marjıyla ölçeklenen güçlü bir B2B SaaS modeli. İster kendi ajansınızda kullanın, ister müşterilerinize sunun.',
    prompterScript:
      'İş modelimiz yatırımcılar açısından son derece cazip bir finansal yapıya sahiptir. Sosyal medya yönetim yazılımlarının küresel pazar büyüklüğü 2026 itibarıyla 32 Milyar dolara ulaşmaktadır. Sıfır üçüncü parti API maliyeti ve sunucusuz bulut mimarimiz sayesinde yüzde 88.4 brüt kâr marjına ulaşıyoruz. Bireysel kullanıcılar için 19 dolar, KOBİ’ler için 49 dolarlık Pro, ve ajanslar için 149 dolarlık paketlerimizle ilk 12 ayda 277 bin dolar yıllık yinelenen gelir (ARR) hedefliyoruz.',
    stepGuide: [
      {
        step: '1. Pazar Büyüklüğü (TAM) ve Kârlılık',
        action: '32 Milyar dolarlık küresel pazarı ve %88.4 brüt kâr marjını belirtin.',
        note: 'Düşük sunucu gideri ve yüksek katma değerli B2B SaaS yapısını vurgulayın.',
      },
      {
        step: '2. 4 Katmanlı Fiyatlandırma Stratejisi',
        action: 'Starter ($19), Pro ($49), Agency ($149) ve Enterprise ($499) katmanlarını özetleyin.',
        note: 'En popüler paket olan Pro’nun Excel ihracı ve 10 hesap desteğiyle yüksek dönüşüm sağladığını söyleyin.',
      },
      {
        step: '3. Ölçeklenebilirlik ve Gelecek',
        action: 'Yeni özelliklerin (otomatik AI video üretimi, analiz botları) hızla eklenebileceğini aktarın.',
        note: 'Projenin ticari olarak ayakları yere basan bir startup projesi olduğunu kanıtlayın.',
      },
    ],
    techHighlight: 'Stripe entegrasyonuna hazır webhook altyapısı ve çok kiracılı (multi-tenant) veri modeli.',
    keyPoints: [
      'Başlangıç Paketi: $19/ay | Pro Paketi: $49/ay | Ajans Paketi: $149/ay',
      '%88.4 Brüt Kâr Marjı ile Yatırımcılar İçin Cazip B2B SaaS',
      'Remotion Programatik Video Tanıtım Altyapısı Dahil',
    ],
  },
  {
    id: 'outro',
    title: 'Sosyal Medyanızı OmniPost ile Güçlendirin',
    subtitle: 'Hemen Başlayın — Satışa ve B2B Sunumlara Hazır SaaS Altyapısı',
    badge: 'HEMEN KEŞFEDİN',
    category: 'Kapanış & CTA',
    durationSeconds: 7,
    videoPath: '/showcase/videos/scene8_outro.mp4',
    voiceoverText:
      'Sosyal medyanızı geleceğe taşıyın. OmniPost Pro ile hemen bugün tanışın ve operasyonlarınızı tek merkezden yönetmenin gücünü keşfedin.',
    prompterScript:
      'Özetle OmniPost Pro; 12 sosyal ağı tek potada eriten Omni-Engine stüdyosu, sıfır veri sızıntılı API kasası, saf Node.js ile üretilen gerçek Microsoft Excel raporları ve 7/24 WhatsApp canlı destek hattıyla kurumsal düzeyde eksiksiz olarak hayata geçirilmiştir. Uygulamamız şu anda canlıda test edilebilir durumdadır ve tüm bileşenleri kusursuz çalışmaktadır. Dinlediğiniz için teşekkür ederim, şimdi sorularınızı yanıtlamaktan memnuniyet duyarım.',
    stepGuide: [
      {
        step: '1. Başarılı Gönderim Durumunu Gösterin',
        action: '7 platformun tamamına iletildiğini belirten kapanış sahnesine dikkat çekin.',
        note: 'Projenin çalıştığını ve canlı testlerden tam not aldığını görsel olarak kanıtlayın.',
      },
      {
        step: '2. Proje Çıktılarını Özetleyin',
        action: 'Teknoloji yığını, kod kalitesi ve müşteri odaklı tasarımı 2 cümlede toparlayın.',
        note: 'Tüm kurumsal SaaS hedeflerinin %100 karşılandığını net bir dille belirtin.',
      },
      {
        step: '3. Teşekkür ve Soru-Cevap Daveti',
        action: 'Jüriye teşekkür edin ve canlı demo veya kod incelemesi için hazır olduğunuzu belirtin.',
        note: 'Kendinizden emin, nazik ve profesyonel bir kapanış yapın.',
      },
    ],
    techHighlight: 'Sıfır hata ile 7 ağa eşzamanlı dağıtım, görsel geri bildirim ve kalıcı loglama.',
    keyPoints: [
      'B2B Ajanslar ve Kurumsal Markalar İçin Hazır',
      'Yatırımcı ve Müşteri Sunumlarına Eksiksiz Dokümantasyon',
      '7/24 WhatsApp Concierge Canlı Destek Hattı',
    ],
  },
];

export const ShowcaseVideoView: React.FC = () => {
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [voiceActive, setVoiceActive] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Güvenli sahne indeksi ve nesne erişimi (Crash önleyici)
  const safeIndex = Math.max(0, Math.min(currentSceneIndex, SCENES.length - 1));
  const scene: SceneItem = SCENES[safeIndex] || SCENES[0];
  const sceneDuration = scene?.durationSeconds ?? 6;

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Initialize Speech Synthesis
  useEffect(() => {
    if (typeof window !== 'undefined') {
      synthRef.current = window.speechSynthesis;
    }
  }, []);

  // Web Audio API: Play subtle sci-fi transition swoosh
  const playSwooshSound = () => {
    if (!soundEnabled || typeof window === 'undefined') return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      if (!audioCtxRef.current) audioCtxRef.current = new AudioCtx();
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') ctx.resume();

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(180, ctx.currentTime + 0.25);

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.25);
    } catch (e) {
      // AudioContext gestures
    }
  };

  // Male Turkish Voice Speech Synthesis
  const speakScene = (text: string) => {
    if (!soundEnabled || !synthRef.current || !text) return;
    try {
      synthRef.current.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'tr-TR';
      utterance.rate = 0.95;
      utterance.pitch = 0.82;

      const voices = synthRef.current.getVoices();
      const turkishVoices = voices.filter((v) => v.lang.startsWith('tr'));
      const maleVoice = turkishVoices.find(
        (v) =>
          v.name.toLowerCase().includes('male') ||
          v.name.toLowerCase().includes('erkek') ||
          v.name.toLowerCase().includes('tolga') ||
          v.name.toLowerCase().includes('ahmet')
      );
      if (maleVoice) {
        utterance.voice = maleVoice;
      } else if (turkishVoices.length > 0) {
        utterance.voice = turkishVoices[0];
      }

      utterance.onstart = () => setVoiceActive(true);
      utterance.onend = () => setVoiceActive(false);
      utterance.onerror = () => setVoiceActive(false);

      synthRef.current.speak(utterance);
    } catch (e) {
      console.warn('Speech synthesis error:', e);
    }
  };

  // Synchronize HTML5 Video and Audio with scene changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      if (isPlaying) {
        videoRef.current.play().catch(() => { });
      } else {
        videoRef.current.pause();
      }
    }

    if (isPlaying && soundEnabled && scene?.voiceoverText) {
      playSwooshSound();
      speakScene(scene.voiceoverText);
    } else {
      if (synthRef.current) synthRef.current.cancel();
      setVoiceActive(false);
    }
  }, [safeIndex, isPlaying, soundEnabled]);

  // Main playback timer loop with bulletproof bounds safety
  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) clearInterval(timerRef.current);
      if (synthRef.current) synthRef.current.cancel();
      setVoiceActive(false);
      return;
    }

    const duration = sceneDuration;
    const intervalMs = 100;
    const totalSceneMs = duration * 1000;
    const stepIncrement = (intervalMs / totalSceneMs) * 100;

    timerRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev + stepIncrement >= 100) {
          setCurrentSceneIndex((idx) => (idx + 1) % SCENES.length);
          return 0;
        }
        return prev + stepIncrement;
      });
    }, intervalMs);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, safeIndex, sceneDuration]);

  const handleNext = () => {
    setProgress(0);
    setCurrentSceneIndex((prev) => (prev + 1) % SCENES.length);
  };

  const handlePrev = () => {
    setProgress(0);
    setCurrentSceneIndex((prev) => (prev - 1 + SCENES.length) % SCENES.length);
  };

  const handleSceneSelect = (index: number) => {
    if (index >= 0 && index < SCENES.length) {
      setProgress(0);
      setCurrentSceneIndex(index);
    }
  };

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* ─── TOP HERO BAR ─── */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-950 border border-slate-800 p-6 md:p-8 text-white shadow-2xl">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-blue-600/30 blur-3xl pointer-events-none animate-pulse-glow" />
        <div className="absolute bottom-0 left-1/4 -mb-24 w-80 h-80 rounded-full bg-cyan-500/20 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-400 text-xs font-bold tracking-wider">
              <Film className="w-3.5 h-3.5 text-cyan-300" />
              <span>DİKEY VİDEO & SUNUM MODU (9:16)</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white flex items-center gap-3">
              <span>OmniPost Pro</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 font-black text-white shadow-md shadow-blue-500/30">
                VİDEO STÜDYOSU
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Instagram Reels, TikTok ve YouTube Shorts uyumlu dikey formda 8 sinematik video akışı ve senkronize konuşmacı prompteri.
            </p>
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            <div className="px-3.5 py-2 rounded-2xl bg-slate-900 border border-slate-800 text-cyan-300 text-xs font-bold flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>Sahne {safeIndex + 1} / {SCENES.length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ─── 8 SAHNELİK OYNATMA LİSTESİ ŞERİDİ ─── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
        {SCENES.map((s, idx) => (
          <button
            key={s.id}
            onClick={() => handleSceneSelect(idx)}
            className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${idx === safeIndex
              ? 'bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-600/30 ring-2 ring-blue-400/40 scale-[1.02]'
              : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
              }`}
          >
            <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider mb-2">
              <span className={idx === safeIndex ? 'text-blue-200' : 'text-slate-400'}>
                0{idx + 1}
              </span>
              <span className={idx === safeIndex ? 'text-white' : 'text-slate-500'}>
                {s.durationSeconds}s
              </span>
            </div>
            <div className="text-xs font-bold line-clamp-2 leading-tight">
              {s.title}
            </div>
          </button>
        ))}
      </div>

      {/* ─── ANA ALAN: SOLDA DİKEY VİDEO (9:16), SAĞDA PROMPTER & REHBER ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* SOL: DİKEY FORMDA VİDEO OYNATICI (9:16 AKILLI TELEFON ŞASİSİ) (5 KOLON) */}
        <div className="lg:col-span-5 flex flex-col items-center">
          {/* Telefon Çerçevesi */}
          <div className="relative w-full max-w-[340px] sm:max-w-[360px] aspect-[9/16] rounded-[44px] p-3 bg-slate-950 border-4 border-slate-800 shadow-2xl shadow-blue-900/20 overflow-hidden group">
            {/* Dinamik Ada / Hoparlör Çentiği */}
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-24 h-4 bg-slate-900 rounded-full z-40 border border-slate-800 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-slate-950 mr-2" />
              <div className="w-1.5 h-1.5 rounded-full bg-blue-900/80" />
            </div>

            {/* İç Ekran */}
            <div className="relative w-full h-full rounded-[34px] overflow-hidden bg-black select-none">
              {/* İlerleme Çubuğu */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-slate-900/80 z-40">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400 transition-all duration-100 ease-linear shadow-sm shadow-cyan-400/50"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* DİKEY MP4 VİDEO */}
              <video
                ref={videoRef}
                key={scene.videoPath}
                src={scene.videoPath}
                autoPlay={isPlaying}
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />

              {/* Üst Bilgi Rozeti */}
              <div className="absolute top-8 left-4 right-4 z-30 flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/20 text-[10px] font-extrabold text-white flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                  <span>{scene.badge}</span>
                </span>
                <span className="px-2 py-0.5 rounded-full bg-blue-600/80 text-[10px] font-black text-white">
                  0{safeIndex + 1}/0{SCENES.length}
                </span>
              </div>

              {/* Alt Gölgelendirme */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/30 pointer-events-none" />

              {/* Alt Bilgi & Mikro Prompter */}
              <div className="absolute bottom-4 left-4 right-4 z-30 space-y-2 pointer-events-none">
                <div>
                  <h3 className="text-sm font-extrabold text-white drop-shadow-md leading-tight">
                    {scene.title}
                  </h3>
                  <p className="text-[11px] text-slate-300 drop-shadow line-clamp-1 mt-0.5">
                    {scene.subtitle}
                  </p>
                </div>

                {/* Ses Dalgası & Mikro Altyazı */}
                <div className="p-2 rounded-xl bg-slate-950/80 backdrop-blur-md border border-white/10 flex items-center space-x-2">
                  <div className="flex items-end space-x-0.5 h-3.5 w-7 shrink-0">
                    {[1, 2, 3, 4].map((bar) => (
                      <span
                        key={bar}
                        className={`w-1 rounded-full transition-all duration-150 ${voiceActive ? 'bg-cyan-400 animate-pulse' : 'bg-slate-600'
                          }`}
                        style={{
                          height: voiceActive ? `${Math.max(30, (bar * 25) % 100)}%` : '35%',
                        }}
                      />
                    ))}
                  </div>
                  <p className="text-[10px] text-slate-200 truncate italic">
                    &quot;{scene.voiceoverText}&quot;
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Dikey Video Altı Kontrol Çubuğu */}
          <div className="w-full max-w-[340px] sm:max-w-[360px] mt-4 p-3 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between shadow-lg">
            <div className="flex items-center space-x-2">
              <button
                onClick={handlePrev}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all cursor-pointer"
                title="Önceki Sahne"
              >
                <SkipBack className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 active:scale-95 text-white transition-all shadow-md shadow-blue-600/40 cursor-pointer"
                title={isPlaying ? 'Durdur' : 'Oynat'}
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4 fill-current" />
                ) : (
                  <Play className="w-4 h-4 fill-current ml-0.5" />
                )}
              </button>

              <button
                onClick={handleNext}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all cursor-pointer"
                title="Sonraki Sahne"
              >
                <SkipForward className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => {
                  setSoundEnabled(!soundEnabled);
                  if (soundEnabled && synthRef.current) synthRef.current.cancel();
                }}
                className={`p-2 rounded-xl transition-all cursor-pointer ${soundEnabled
                  ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                title={soundEnabled ? 'Sesi Kapat' : 'Sesi Aç'}
              >
                {soundEnabled ? (
                  <Volume2 className="w-4 h-4" />
                ) : (
                  <VolumeX className="w-4 h-4" />
                )}
              </button>

              <button
                onClick={() => speakScene(scene.voiceoverText)}
                className="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 text-[11px] font-bold border border-slate-700 flex items-center space-x-1 transition-all cursor-pointer"
                title="Seslendir"
              >
                <Mic className="w-3.5 h-3.5 text-cyan-400" />
                <span>Seslendir</span>
              </button>
            </div>
          </div>
        </div>

        {/* SAĞ: CANLI PROMPTER & DETAYLI EKRAN ANLATIM REHBERİ (7 KOLON) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Prompter Kartı */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-7 shadow-sm space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
              <div className="flex items-center space-x-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                  <Mic className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-extrabold text-slate-900">
                    Sahne {safeIndex + 1} Prompter Metni (Konuşmacı Notu)
                  </h2>
                  <p className="text-xs text-slate-500">
                    Dikey video oynarken sunum esnasında birebir okuyabileceğiniz konuşma metni.
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => copyToClipboard(scene.prompterScript, `prompter-${scene.id}`)}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center space-x-1.5 transition-all cursor-pointer"
                >
                  {copiedKey === `prompter-${scene.id}` ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-600">Kopyalandı!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-500" />
                      <span>Metni Kopyala</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => speakScene(scene.prompterScript)}
                  className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center space-x-1.5 transition-all shadow-sm shadow-blue-600/30 cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Seslendir</span>
                </button>
              </div>
            </div>

            {/* Büyük Okunaklı Prompter Kutusu */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 font-medium text-sm md:text-base leading-relaxed tracking-normal">
              <p className="whitespace-pre-line">{scene.prompterScript}</p>
            </div>

            {/* Vurgulanacak Temel Değerler */}
            <div className="space-y-2.5 pt-1">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center space-x-1.5">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <span>Bu Sahnede Vurgulanacak Temel Noktalar:</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {scene.keyPoints.map((pt, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl bg-slate-50/80 border border-slate-200 text-xs font-semibold text-slate-700 flex items-start space-x-2"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Ekranı Adım Adım İşleme ve Anlatma Rehberi */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-7 shadow-sm space-y-5">
            <div className="flex items-center space-x-2.5 pb-4 border-b border-slate-100">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-extrabold text-slate-900">
                  Ekranı Adım Adım İşleme & Sunum Rehberi
                </h2>
                <p className="text-xs text-slate-500">
                  Sunum esnasında videoda nereye odaklanacağınızın yol haritası.
                </p>
              </div>
            </div>

            {/* 3 Adımlı Aksiyon Listesi */}
            <div className="space-y-3">
              {scene.stepGuide.map((guide, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1 transition-all hover:border-emerald-300"
                >
                  <div className="text-xs font-extrabold text-emerald-800 flex items-center justify-between">
                    <span>{guide.step}</span>
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] flex items-center justify-center font-black">
                      {idx + 1}
                    </span>
                  </div>
                  <div className="text-xs font-bold text-slate-900">
                    🎯 {guide.action}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    💡 <em>{guide.note}</em>
                  </p>
                </div>
              ))}
            </div>

            {/* Teknik Jüri Vurgusu */}
            <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 space-y-1">
              <div className="text-xs font-bold text-blue-900 flex items-center space-x-1.5">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                <span>Teknik / Mimari Vurgu (Jüri Notu):</span>
              </div>
              <p className="text-xs text-blue-800 leading-relaxed">
                {scene.techHighlight}
              </p>
            </div>

            {/* Sonraki Sahneye Geç Butonu */}
            <button
              onClick={handleNext}
              className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 hover:from-slate-800 hover:to-slate-700 text-white font-bold text-xs flex items-center justify-center space-x-2 shadow-md transition-all cursor-pointer"
            >
              <span>Sonraki Sahneye Geç ({safeIndex + 1 < SCENES.length ? `Sahne ${safeIndex + 2}` : 'Başa Dön'})</span>
              <ArrowRight className="w-4 h-4 text-cyan-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
