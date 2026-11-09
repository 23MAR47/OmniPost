import type { Metadata, Viewport } from 'next';
import './globals.css';
import { CookieConsent } from '@/components/CookieConsent';
import { GoogleAnalytics } from '@/components/GoogleAnalytics';

export const viewport: Viewport = {
  themeColor: '#2563eb',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://omnipost.app';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'OmniPost - Çoklu Sosyal Medya Paylaşım & Yönetim Platformu',
    template: '%s | OmniPost',
  },
  description: 'YouTube, X (Twitter), Instagram, Facebook, TikTok, Pinterest ve Threads için tek tıkla eşzamanlı içerik yayınlama, akıllı zamanlama ve AES-256 güvenli token stüdyosu.',
  keywords: [
    'sosyal medya yönetimi',
    'çoklu paylaşım aracı',
    'social media automation',
    'omnipost',
    'instagram reels paylaşma',
    'youtube shorts zamanlama',
    'tiktok otomasyon',
    'twitter api entegrasyonu',
    'sosyal medya takvimi',
  ],
  authors: [{ name: 'OmniPost Stüdyo Ekibi', url: siteUrl }],
  creator: 'OmniPost',
  publisher: 'OmniPost Tech',
  manifest: '/manifest.json',
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/icons/icon-192x192.svg', sizes: '192x192', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/icons/icon-192x192.svg', sizes: '192x192', type: 'image/svg+xml' },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'OmniPost',
  },
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: siteUrl,
    siteName: 'OmniPost',
    title: 'OmniPost - Çoklu Sosyal Medya Paylaşım & Yönetim Platformu',
    description: 'Tek bir tıkla YouTube, X, Instagram, Facebook, TikTok, Pinterest ve Threads hesaplarınıza aynı anda içerik dağıtın.',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'OmniPost Çoklu Sosyal Medya Dağıtımı ve Yönetimi',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OmniPost - Çoklu Sosyal Medya Paylaşım & Yönetim Platformu',
    description: '7 sosyal medya platformuna aynı anda güvenli ve hatasız içerik dağıtın.',
    images: ['/og-image.svg'],
    creator: '@omnipost_app',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased selection:bg-blue-500 selection:text-white">
        {/* Accessible Skip to Main Content Link for Keyboard and Screen Readers */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2.5 focus:bg-blue-600 focus:text-white focus:rounded-xl focus:shadow-2xl focus:font-bold focus:text-xs focus:ring-2 focus:ring-white"
        >
          Ana İçeriğe Atla (Skip to Main Content)
        </a>

        {children}
        <CookieConsent />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
