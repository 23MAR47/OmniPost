'use client';

import React, { useEffect, useState } from 'react';
import { Download, Bell, Wifi, WifiOff, X, Sparkles, Smartphone, Check } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

export const PwaRegister: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission>('default');
  const [showBanner, setShowBanner] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    // 1. Service Worker Registration
    if ('serviceWorker' in navigator && process.env.NODE_ENV !== 'development') {
      navigator.serviceWorker
        .register('/sw.js')
        .then((reg) => {
          console.log('[PWA] Service Worker kayıt başarılı, scope:', reg.scope);
        })
        .catch((err) => {
          console.warn('[PWA] Service Worker kayıt hatası:', err);
        });
    }

    // 2. Online / Offline Listener
    const handleOnline = () => {
      setIsOnline(true);
      showToast('Bağlantı sağlandı. Çevrimiçi moddasınız.');
    };
    const handleOffline = () => {
      setIsOnline(false);
      showToast('İnternet bağlantısı kesildi. Çevrimdışı önbellek modu devrede.');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    setIsOnline(navigator.onLine);

    // 3. Before Install Prompt Listener
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsInstallable(true);
      setShowBanner(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);

    // 4. App Installed Listener
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setIsInstallable(false);
      setShowBanner(false);
      showToast('OmniPost cihazınıza başarıyla yüklendi!');
    };

    window.addEventListener('appinstalled', handleAppInstalled);

    // Check standalone mode (already installed)
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    // Check notification permission
    if ('Notification' in window) {
      setNotificationPermission(Notification.permission);
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      // Manual instructions for iOS/Chrome
      alert('OmniPost uygulamasını ana ekranınıza eklemek için tarayıcınızın Paylaş/Menü (⋮ veya ⎋) ikonundan "Ana Ekrana Ekle"yi seçebilirsiniz.');
      return;
    }

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setIsInstalled(true);
      setIsInstallable(false);
      setShowBanner(false);
      showToast('OmniPost ana ekrana eklendi! 🎉');
    }
    setDeferredPrompt(null);
  };

  const requestNotificationPermission = async () => {
    if (!('Notification' in window)) {
      alert('Tarayıcınız Web Push bildirimlerini desteklemiyor.');
      return;
    }

    try {
      const permission = await Notification.requestPermission();
      setNotificationPermission(permission);
      if (permission === 'granted') {
        new Notification('OmniPost Bildirimleri Aktif! 🚀', {
          body: 'Zamanlanmış içerikler ve çoklu dağıtım raporları artık anlık iletilecektir.',
          icon: '/icons/icon-192x192.svg',
        });
        showToast('Web bildirimleri başarıyla açıldı.');
      } else {
        showToast('Bildirim izni verilmedi.');
      }
    } catch (e) {
      console.error('Notification error:', e);
    }
  };

  return (
    <>
      {/* Offline Status Badge (Sticky Top) */}
      {!isOnline && (
        <div className="bg-amber-600 text-white text-xs font-semibold px-4 py-2 flex items-center justify-center space-x-2 sticky top-0 z-50 shadow-md animate-in slide-in-from-top">
          <WifiOff className="w-4 h-4 animate-pulse" />
          <span>Çevrimdışısınız — İçerik taslaklarınız yerel bellekte güvende tutuluyor.</span>
        </div>
      )}

      {/* Global Toast Message */}
      {toastMessage && (
        <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl border border-slate-700 text-xs flex items-center space-x-2.5 animate-in fade-in slide-in-from-bottom-2">
          <Sparkles className="w-4 h-4 text-blue-400" />
          <span>{toastMessage}</span>
        </div>
      )}

    </>
  );
};
