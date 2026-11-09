# 🚀 OmniPost Pro — Çok Kanallı Sosyal Medya & Dağıtım Stüdyosu

[![Vercel Deployment](https://img.shields.io/badge/Vercel-Live%20Demo-0070F3?style=for-the-badge&logo=vercel&logoColor=white)](https://omnipost.vercel.app/)
[![GitHub Repo](https://img.shields.io/badge/GitHub-23MAR47%2FOmniPost-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/23MAR47/OmniPost)
[![Next.js 14](https://img.shields.io/badge/Next.js-14.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)

OmniPost Pro, modern içerik üreticileri, pazarlamacılar ve yazılım ekipleri için geliştirilmiş açık kaynaklı ve yüksek performanslı bir çok kanallı sosyal medya yönetim platformudur.

🌐 **Canlı Uygulama:** [https://omnipost.vercel.app/](https://omnipost.vercel.app/)

![OmniPost Banner](public/og-image.svg)

---

## 🔄 Arayüz Evrimi: Eski Arayüz vs. Yeni Nesil OmniPost (Before & After)

Uygulamanın tasarım, performans ve kullanıcı deneyimi yolculuğundaki evrimi:

| Modül / Panel | 🕰️ Eski Arayüz (Before / Legacy) | 🚀 Yeni Nesil OmniPost Pro (After / Modern) |
| :--- | :---: | :---: |
| **1. İçerik Stüdyosu & Editör** | ![Eski Editör](public/screenshots/legacy/legacy-01-editor-v1.jpg) | ![Yeni Editör](public/screenshots/01-studio-editor.png) |
| **2. Çoklu Platform Dağıtımı** | ![Eski Kanallar](public/screenshots/legacy/legacy-02-channels-v1.jpg) | ![Yeni Dağıtım](public/screenshots/02-multi-platform-dispatch.png) |
| **3. Takvim, Zamanlama & Analitik** | ![Eski Takvim](public/screenshots/legacy/legacy-03-schedule-v1.jpg) | ![Yeni Analitik](public/screenshots/03-analytics-history.png) |
| **4. Güvenlik & Token Kasası** | ![Eski Kasa](public/screenshots/legacy/legacy-04-analytics-v1.jpg) | ![Yeni Token Kasası](public/screenshots/04-brand-accounts-vault.png) |
| **5. Kontrol Paneli & Dağıtım Onayı** | ![Eski Panel](public/screenshots/legacy/legacy-05-dashboard-v1.jpg) | ![Yeni Onay Ekranı](public/screenshots/06-dispatch-success.png) |

---

## 📸 Yeni Nesil Arayüz & Ekran Görüntüleri Galerisi

### 1. 🎨 İçerik Editörü ve Çok Kanallı Canlı Önizleme (Studio Editor)
> Tek bir merkezden tüm sosyal ağlar için özel metin, görsel ve video uyarlaması.
![Studio Editor](public/screenshots/01-studio-editor.png)

---

### 2. ⚡ Çoklu Platform Eşzamanlı Dağıtım Motoru (Concurrent Dispatcher)
> YouTube, X, Instagram, Facebook, TikTok, Pinterest ve Threads hesaplarına anlık paralel yayın.
![Multi Platform Dispatch](public/screenshots/02-multi-platform-dispatch.png)

---

### 3. 📊 Gerçek Zamanlı Analitik ve Etkileşim Raporları
> Gönderi performansı, erişim grafikleri ve tek tıkla Excel (.xlsx) ihracı.
![Analytics History](public/screenshots/03-analytics-history.png)

---

### 4. 🔐 AES-256 Şifreli Token Kasası (Zero-Leak Token Vault)
> OAuth 2.0 PKCE oturumları, API anahtarı maskelemesi ve bağlantı sağlık monitörü.
![Brand Accounts Vault](public/screenshots/04-brand-accounts-vault.png)

---

### 5. 👥 Destek, Geri Bildirim ve Onay Motoru
> Takım içi onay akışları ve kullanıcı destek biletleri.
![Support and Approvals](public/screenshots/05-support-approvals.png)

---

### 6. ✅ Başarılı Dağıtım ve Yayın Onay Ekranı
> HTTP 201 Created durum kodları ve platform bazlı canlı gönderi linkleri.
![Dispatch Success](public/screenshots/06-dispatch-success.png)

---

## ✨ Temel Özellikler

* **Çoklu Platform Dağıtımı (Omni Dispatcher):** YouTube, X (Twitter), Instagram, Facebook, TikTok, Pinterest ve Threads hesaplarına tek tıkla eşzamanlı içerik yayını.
* **Akıllı Karakter & Format Validasyonu:** Her platformun karakter sınırları (ör. X için 280), medya kuralları ve en boy oranları için anlık pre-flight denetimi.
* **AES-256 Şifreli Token Vault:** API anahtarlarınızı ve OAuth token'larınızı güvenli şifreleme ve maskeleme katmanıyla saklar.
* **Gelişmiş AI Copywriting Motoru:** Viral kancalar (hooks), niş odaklı içerik üretimi ve akıllı hashtag önerileri.
* **Zamanlanmış Gönderi & Kuyruk Yönetimi:** İleri tarihli paylaşımlar, otomatik worker denetimi ve takvim görünümü.
* **Analitik & Excel Raporlama:** Gerçek zamanlı etkileşim metrikleri ve tek tıkla OpenXML `.xlsx` rapor çıktısı.
* **PWA & Mobil Uyum:** Çevrimdışı destek, mobil alt gezinme menüsü ve duyarlı modern tasarım.

---

## 🛠️ Teknoloji Yığını

* **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
* **Arayüz:** [React 18](https://react.dev/), [Tailwind CSS](https://tailwindcss.com/)
* **İkonlar:** [Lucide React](https://lucide.dev/)
* **Tip Güvenliği:** TypeScript 5.6
* **Kriptografi:** Node.js Crypto (AES-256)

---

## 🚀 Başlangıç

### 1. Bağımlılıkları Yükleyin
```bash
npm install
```

### 2. Geliştirici Sunucusunu Başlatın
```bash
npm run dev
```
Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresini açın.

### 3. Üretim Derlemesi (Build)
```bash
npm run build
npm run start
```

---

## 📄 Lisans
MIT License © 2026 OmniPost Team
