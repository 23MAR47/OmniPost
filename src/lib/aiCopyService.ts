export interface AiGenerationOptions {
  topic: string;
  niche: 'tech' | 'ecommerce' | 'marketing' | 'lifestyle' | 'fitness' | 'finance';
  tone: 'professional' | 'hype' | 'educational' | 'storytelling' | 'humorous';
  hookType: 'question' | 'bold_claim' | 'mistake' | 'statistic' | 'curiosity';
  platform?: string;
}

export interface AiGenerationResult {
  hook: string;
  alternativeHooks: string[];
  body: string;
  cta: string;
  hashtags: string[];
  fullCaption: string;
}

export class AiCopyService {
  static generateContent(opts: AiGenerationOptions): AiGenerationResult {
    const { topic, niche, tone, hookType } = opts;

    // Smart Hook Templates
    let hook = '';
    let altHooks: string[] = [];

    switch (hookType) {
      case 'question':
        hook = `Sosyal medyada ${topic} konusunu denerken en çok nerede vakit kaybediyorsunuz? 🤔`;
        altHooks = [
          `Neden markaların %90'ı ${topic} konusunda başarısız oluyor?`,
          `${topic} ile etkileşiminizi 3 katına çıkarmanın en pratik yolu ne olabilir?`,
        ];
        break;
      case 'bold_claim':
        hook = `2026'da ${topic} stratejinizi güncellemediyseniz, rakiplerinizin çok gerisinde kaldınız! ⚡`;
        altHooks = [
          `${topic} artık bir lüks değil, büyümenin 1 numaralı motoru!`,
          `Sosyal medya yöneticilerinin %80'inin bilmediği ${topic} gerçeği.`,
        ];
        break;
      case 'mistake':
        hook = `${topic} yaparken herkesin düştüğü 3 kritik hata (ve bunlardan nasıl kaçınılır): 🛑`;
        altHooks = [
          `Bu 1 hatayı yapmayı bırakmadığınız sürece ${topic} sonuç vermeyecek!`,
          `${topic} sürecinde para ve zaman kaybettiren en yaygın tuzak.`,
        ];
        break;
      case 'statistic':
        hook = `Araştırmalara göre ${topic} uygulayan hesaplar organik erişimlerini tam %312 artırdı! 📊`;
        altHooks = [
          `Kullanıcıların %73'ü ${topic} içeren içeriklere 4 kat daha hızlı tepki veriyor.`,
          `Rakamlar yalan söylemez: ${topic} dönüşüm oranlarında %45 sıçrama yarattı.`,
        ];
        break;
      case 'curiosity':
      default:
        hook = `İçerik üreticilerinin kimseyle paylaşmadığı gizli ${topic} taktiği ortaya çıktı... 🤫`;
        altHooks = [
          `Sadece 5 dakikada ${topic} nasıl profesyonelce kurgulanır?`,
          `Bunu öğrendikten sonra ${topic} üretme şekliniz tamamen değişecek!`,
        ];
        break;
    }

    // Tone variations
    let body = '';
    let cta = '';

    if (tone === 'hype') {
      body = `Bugün harika bir haberimiz var! ${topic} konusunu basitleştiren ve 7 farklı ağa aynı anda dağıtım yapmanızı sağlayan OmniPost motoruyla sınırları zorluyoruz. Artık saatlerce manuel paylaşım yapmak yok, tek tıkla her yerde zirvedeyiz! 🚀🔥`;
      cta = `Hemen şimdi bio'daki linke tıklayın ve sınırlı sayıdaki beta erişimini kapın! 👇`;
    } else if (tone === 'educational') {
      body = `${topic} konusunda başarıya ulaşmanın temeli 3 adımdan geçer:\n1. Doğru kanca (Hook) ile ilk 3 saniyeyi yakalamak.\n2. Değer sunan, net ve akıcı bir gövde metni.\n3. Takipçiyi aksiyona davet eden güçlü bir kapanış. OmniPost bu adımların tümünü tek arayüzde otomatikleştirir. 💡`;
      cta = `Bu rehberi kaydetmeyi ve ekip arkadaşlarınızla paylaşmayı unutmayın! 📌`;
    } else if (tone === 'storytelling') {
      body = `Geçen ay bir ajans kurucusuyla konuşuyorduk. 12 müşterinin sosyal medyasını yönetmek için her gün 4 saatini platformlar arası kopyala-yapıştır yapmaya harcıyordu. ${topic} sistemini devreye aldığımızda bu süre haftalık 30 dakikaya indi. İşte teknolojinin gücü tam olarak burada saklı. ✨`;
      cta = `Siz de kendi başarı hikayenizi yazmak için yorumlarda bir '🚀' bırakın!`;
    } else if (tone === 'humorous') {
      body = `Pazartesi sabahı kahvenizi yudumlarken 7 farklı sosyal medya şifresini hatırlamaya çalışmak... Hepimiz yaşadık değil mi? 😅 ${topic} işini OmniPost kasasına emanet edin, siz kahvenizin tadını çıkarın.`;
      cta = `Şifrelerini unutup deliren arkadaşını yoruma etiketle! 😂👇`;
    } else {
      // Professional default
      body = `Dijital varlığınızı ölçeklendirirken ${topic} süreçlerini otomatize etmek, operasyonel verimliliği maksimize eder. OmniPost, tek merkezden çok kanallı dağıtım ve güvenli veri saklama mimarisiyle iş süreçlerinizi güvenceye alır. 📈`;
      cta = `Detaylı bilgi ve kurumsal demo talebi için profilimizdeki bağlantıyı ziyaret edin.`;
    }

    // Niche-specific 15 viral hashtags
    const hashtagsMap: Record<string, string[]> = {
      tech: [
        '#yazılım', '#teknoloji', '#yapayzeka', '#ai', '#developer', '#kodlama',
        '#frontend', '#saas', '#techtools', '#startup', '#b2b', '#innovation',
        '#cloud', '#nextjs', '#omnipost'
      ],
      ecommerce: [
        '#eticaret', '#pazaryeri', '#dijitalpazarlama', '#satis', '#growth',
        '#girisimcilik', '#ecom', '#trendyol', '#amazon', '#shopify',
        '#markayonetimi', '#reklam', '#kampanya', '#firsat', '#omnipost'
      ],
      marketing: [
        '#sosyalmedyayonetimi', '#dijitalpazarlama', '#icerikuretici', '#growthhacking',
        '#reklamajansi', '#pazarlama', '#seo', '#reels', '#shorts', '#viralcontent',
        '#markalama', '#agency', '#influencer', '#donusum', '#omnipost'
      ],
      lifestyle: [
        '#gununkaresi', '#lifestyle', '#motivasyon', '#uretkenlik', '#ilham',
        '#tasarim', '#kesfet', '#trend', '#blog', '#hayatinicinden',
        '#enerji', '#gundem', '#estetik', '#guncel', '#omnipost'
      ],
      fitness: [
        '#saglikliyasam', '#spor', '#fitness', '#beslenme', '#motivasyon',
        '#egzersiz', '#antrenman', '#fitkal', '#saglik', '#vucutgelistirme',
        '#diyet', '#hedef', '#wellness', '#guc', '#omnipost'
      ],
      finance: [
        '#finans', '#yatirim', '#ekonomi', '#girisimcilik', '#borsa',
        '#kripto', '#tasarruf', '#finansalozgurluk', '#para', '#butce',
        '#b2b', '#analiz', '#rapor', '#strateji', '#omnipost'
      ],
    };

    const hashtags = hashtagsMap[niche] || hashtagsMap.tech;
    const fullCaption = `${hook}\n\n${body}\n\n${cta}\n\n${hashtags.slice(0, 8).join(' ')}`;

    return {
      hook,
      alternativeHooks: altHooks,
      body,
      cta,
      hashtags,
      fullCaption,
    };
  }
}
