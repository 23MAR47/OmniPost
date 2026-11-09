import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { PlatformCredential, SocialPlatformId, ConnectionStatus, AuthMode } from '@/types';
import { PLATFORMS_CONFIG } from './constants';

const ALGORITHM = 'aes-256-cbc';
const SECRET_KEY = crypto
  .createHash('sha256')
  .update(process.env.TOKEN_VAULT_SECRET || 'omnipost-internship-secure-vault-key-2026')
  .digest(); // 32 bytes for AES-256

interface EncryptedPayload {
  iv: string;
  data: string;
}

interface StoredVaultFile {
  version: number;
  lastUpdated: string;
  accounts: Record<string, any>;
}

// Güvenli şifreleme fonksiyonu
export function encryptSecret(plainText: string): string {
  if (!plainText) return '';
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(ALGORITHM, SECRET_KEY, iv);
  let encrypted = cipher.update(plainText, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  const payload: EncryptedPayload = {
    iv: iv.toString('hex'),
    data: encrypted,
  };
  return Buffer.from(JSON.stringify(payload)).toString('base64');
}

// Güvenli çözme fonksiyonu
export function decryptSecret(encryptedBase64: string): string {
  if (!encryptedBase64) return '';
  try {
    const raw = Buffer.from(encryptedBase64, 'base64').toString('utf8');
    const payload: EncryptedPayload = JSON.parse(raw);
    const iv = Buffer.from(payload.iv, 'hex');
    const decipher = crypto.createDecipheriv(ALGORITHM, SECRET_KEY, iv);
    let decrypted = decipher.update(payload.data, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  } catch (err) {
    return '';
  }
}

// Arayüz için hassas değerleri maskeleme (örn: sk_live_...93af)
export function maskToken(token?: string): string {
  if (!token) return '';
  if (token.length <= 8) return '••••••••';
  const prefix = token.slice(0, 4);
  const suffix = token.slice(-4);
  return `${prefix}••••••••${suffix}`;
}

// Varsayılan ilk veriler (12 platform için güvenli varsayılan bağlantı durumları)
function generateDefaultAccounts(): Record<SocialPlatformId, PlatformCredential> {
  const now = new Date();
  const expires = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString();

  return {
    youtube: {
      platformId: 'youtube',
      platformName: 'YouTube',
      status: 'connected',
      mode: 'mock',
      accountHandle: '@OmniPostStudio',
      accountName: 'OmniPost Stüdyo & Dev',
      accountAvatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&h=100&fit=crop&crop=face',
      accountFollowers: '14.2K Abone',
      clientId: 'yt-client-882190-omni.apps.googleusercontent.com',
      clientSecretMasked: 'GOCSPX-••••••••3m9L',
      accessTokenMasked: 'ya29.a0AfH6SM••••••••Kz89',
      refreshTokenMasked: '1//0g••••••••XyZ',
      scopes: ['https://www.googleapis.com/auth/youtube.upload', 'https://www.googleapis.com/auth/youtube.readonly'],
      tokenExpiresAt: expires,
      connectedAt: '2026-09-15T10:00:00.000Z',
      lastTestedAt: new Date().toISOString(),
      lastPingMs: 78,
      quota: {
        used: 1600,
        limit: 10000,
        unit: 'Kota Birimi / Gün',
        resetsAt: 'Her gün 00:00 UTC',
      },
    },
    twitter: {
      platformId: 'twitter',
      platformName: 'X (Twitter)',
      status: 'connected',
      mode: 'mock',
      accountHandle: '@omnipost_app',
      accountName: 'OmniPost Official',
      accountAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face',
      accountFollowers: '4.8K Takipçi',
      clientId: 'VThPQU9NTkktWVoyNkFR',
      clientSecretMasked: 'sec-••••••••98aX',
      apiKeyMasked: 'tw_api_••••••••81fa',
      accessTokenMasked: '18491••••••••K91L',
      refreshTokenMasked: 'rt_••••••••42Q',
      scopes: ['tweet.read', 'tweet.write', 'users.read', 'offline.access'],
      tokenExpiresAt: expires,
      connectedAt: '2026-09-18T14:30:00.000Z',
      lastTestedAt: new Date().toISOString(),
      lastPingMs: 42,
      quota: {
        used: 32,
        limit: 100,
        unit: 'Tweet / Ay (Free Tier)',
        resetsAt: '1 Kasım 2026',
      },
    },
    instagram: {
      platformId: 'instagram',
      platformName: 'Instagram',
      status: 'connected',
      mode: 'mock',
      accountHandle: '@omnipost.creator',
      accountName: 'OmniPost Creative Lab',
      accountAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=face',
      accountFollowers: '9.6K Takipçi',
      clientId: 'meta-app-10928374',
      clientSecretMasked: 'ea7b••••••••01cf',
      accessTokenMasked: 'EAAG••••••••8kL',
      scopes: ['instagram_basic', 'instagram_content_publish', 'pages_show_list'],
      tokenExpiresAt: expires,
      connectedAt: '2026-09-20T09:15:00.000Z',
      lastTestedAt: new Date().toISOString(),
      lastPingMs: 95,
      quota: {
        used: 18,
        limit: 50,
        unit: 'Reels/Post / Gün',
        resetsAt: 'Her 24 saatte bir',
      },
    },
    facebook: {
      platformId: 'facebook',
      platformName: 'Facebook',
      status: 'connected',
      mode: 'mock',
      accountHandle: 'OmniPost Topluluk Sayfası',
      accountName: 'OmniPost Official Page',
      accountAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      accountFollowers: '2.1K Beğeni',
      clientId: 'meta-app-10928374',
      clientSecretMasked: 'ea7b••••••••01cf',
      accessTokenMasked: 'EAAH••••••••79P',
      scopes: ['pages_manage_posts', 'pages_read_engagement', 'public_profile'],
      tokenExpiresAt: expires,
      connectedAt: '2026-09-21T11:45:00.000Z',
      lastTestedAt: new Date().toISOString(),
      lastPingMs: 64,
      quota: {
        used: 12,
        limit: 200,
        unit: 'Gönderi / Gün',
        resetsAt: 'Her 24 saatte bir',
      },
    },
    tiktok: {
      platformId: 'tiktok',
      platformName: 'TikTok',
      status: 'connected',
      mode: 'mock',
      accountHandle: '@omnipost_tok',
      accountName: 'OmniPost Short Clips',
      accountAvatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100&h=100&fit=crop&crop=face',
      accountFollowers: '28.5K Takipçi',
      clientId: 'tt-client-v2-9901',
      clientSecretMasked: 'tt_sec_••••••••419a',
      accessTokenMasked: 'act.••••••••8f01',
      scopes: ['user.info.basic', 'video.upload', 'video.publish'],
      tokenExpiresAt: expires,
      connectedAt: '2026-09-22T16:20:00.000Z',
      lastTestedAt: new Date().toISOString(),
      lastPingMs: 110,
      quota: {
        used: 5,
        limit: 20,
        unit: 'Video Yükleme / Gün',
        resetsAt: 'Her gece 00:00',
      },
    },
    pinterest: {
      platformId: 'pinterest',
      platformName: 'Pinterest',
      status: 'disconnected',
      mode: 'mock',
      accountHandle: '@omnipost_pins',
      accountName: 'OmniPost Board',
      scopes: ['boards:read', 'pins:read', 'pins:write'],
      lastError: 'Hesap henüz bağlanmadı. API anahtarı veya OAuth yetkisi bekleniyor.',
    },
    threads: {
      platformId: 'threads',
      platformName: 'Threads',
      status: 'connected',
      mode: 'mock',
      accountHandle: '@omnipost.threads',
      accountName: 'OmniPost Daily',
      accountAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&h=100&fit=crop&crop=face',
      accountFollowers: '3.4K Takipçi',
      clientId: 'threads-app-5544',
      clientSecretMasked: 'th_sec_••••••••900b',
      accessTokenMasked: 'TH_TOKEN_••••••••331A',
      scopes: ['threads_basic', 'threads_content_publish'],
      tokenExpiresAt: expires,
      connectedAt: '2026-09-23T12:00:00.000Z',
      lastTestedAt: new Date().toISOString(),
      lastPingMs: 52,
      quota: {
        used: 7,
        limit: 100,
        unit: 'Thread / 24 Saat',
        resetsAt: 'Her 24 saatte bir',
      },
    },
    linkedin: {
      platformId: 'linkedin',
      platformName: 'LinkedIn',
      status: 'connected',
      mode: 'mock',
      accountHandle: '@omnipost-enterprise',
      accountName: 'OmniPost B2B Enterprise',
      accountAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face',
      accountFollowers: '18.4K Bağlantı',
      clientId: 'linkedin-oauth2-app-8842',
      clientSecretMasked: 'li_sec_••••••••412k',
      accessTokenMasked: 'AQV••••••••Z91m',
      scopes: ['r_liteprofile', 'w_member_social'],
      tokenExpiresAt: expires,
      connectedAt: '2026-09-24T11:00:00.000Z',
      lastTestedAt: new Date().toISOString(),
      lastPingMs: 64,
      quota: {
        used: 12,
        limit: 100,
        unit: 'Gönderi / Gün',
        resetsAt: 'Her gün 00:00',
      },
    },
    googlebusiness: {
      platformId: 'googlebusiness',
      platformName: 'Google Business Profile',
      status: 'connected',
      mode: 'mock',
      accountHandle: 'OmniPost HQ',
      accountName: 'OmniPost Yazılım A.Ş.',
      accountAvatar: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=100&h=100&fit=crop&crop=face',
      accountFollowers: '4.9 ⭐ (420 Yorum)',
      clientId: 'gmb-oauth-google-9921',
      clientSecretMasked: 'gmb_••••••••811x',
      accessTokenMasked: 'ya29.gmb••••••••22Q',
      scopes: ['https://www.googleapis.com/auth/business.manage'],
      tokenExpiresAt: expires,
      connectedAt: '2026-09-25T14:10:00.000Z',
      lastTestedAt: new Date().toISOString(),
      lastPingMs: 58,
      quota: {
        used: 4,
        limit: 30,
        unit: 'İşletme Güncellemesi / Hafta',
        resetsAt: 'Haftalık',
      },
    },
    telegram: {
      platformId: 'telegram',
      platformName: 'Telegram Kanal & Grup',
      status: 'connected',
      mode: 'mock',
      accountHandle: '@OmniPostAnnouncements',
      accountName: 'OmniPost Global Duyuru',
      accountAvatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&h=100&fit=crop&crop=face',
      accountFollowers: '28.1K Üye',
      clientId: 'tg-bot-father-token-77',
      clientSecretMasked: 'bot_••••••••1199',
      accessTokenMasked: '7192841:AA••••••••99Z',
      scopes: ['send_message', 'post_media'],
      tokenExpiresAt: expires,
      connectedAt: '2026-09-25T16:00:00.000Z',
      lastTestedAt: new Date().toISOString(),
      lastPingMs: 38,
      quota: {
        used: 45,
        limit: 1000,
        unit: 'Mesaj / Gün',
        resetsAt: 'Her gün 00:00',
      },
    },
    bluesky: {
      platformId: 'bluesky',
      platformName: 'Bluesky (AT Protocol)',
      status: 'connected',
      mode: 'mock',
      accountHandle: '@omnipost.bsky.social',
      accountName: 'OmniPost Sky',
      accountAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=face',
      accountFollowers: '6.2K Takipçi',
      clientId: 'atproto-client-331',
      clientSecretMasked: 'app_pwd_••••••••900k',
      accessTokenMasked: 'atp_••••••••4481',
      scopes: ['atproto_create_session', 'atproto_repo_write'],
      tokenExpiresAt: expires,
      connectedAt: '2026-09-26T10:00:00.000Z',
      lastTestedAt: new Date().toISOString(),
      lastPingMs: 44,
      quota: {
        used: 19,
        limit: 300,
        unit: 'Skeet / Gün',
        resetsAt: 'Her gün 00:00',
      },
    },
    discord: {
      platformId: 'discord',
      platformName: 'Discord Webhook & Sunucu',
      status: 'connected',
      mode: 'mock',
      accountHandle: '#topluluk-duyurulari',
      accountName: 'OmniPost Discord HQ',
      accountAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&h=100&fit=crop&crop=face',
      accountFollowers: '12.5K Çevrimiçi',
      clientId: 'discord-webhook-url-1092',
      clientSecretMasked: 'wh_sec_••••••••550x',
      accessTokenMasked: 'https://discord.com/api/webhooks/••••••••',
      scopes: ['webhook_incoming'],
      tokenExpiresAt: expires,
      connectedAt: '2026-09-27T08:00:00.000Z',
      lastTestedAt: new Date().toISOString(),
      lastPingMs: 31,
      quota: {
        used: 28,
        limit: 500,
        unit: 'Webhook Çağrısı / Gün',
        resetsAt: 'Her gün 00:00',
      },
    },
    tumblr: {
      platformId: 'tumblr',
      platformName: 'Tumblr',
      status: 'disconnected',
      mode: 'mock',
      accountHandle: '@omnipost-tech',
      accountName: 'OmniPost Tech Blog',
      accountAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face',
      accountFollowers: '1.1K Okur',
      scopes: ['write', 'read'],
      connectedAt: '2026-09-28T12:00:00.000Z',
      lastError: 'OAuth yetkilendirmesi bekleniyor.',
    },
  };
}

class TokenVaultManager {
  private filePath: string;
  private memoryStore: Record<string, PlatformCredential>;

  constructor() {
    this.filePath = process.env.VERCEL
      ? path.join('/tmp', '.token-vault.json')
      : path.join(process.cwd(), '.token-vault.json');
    this.memoryStore = generateDefaultAccounts();
    this.loadFromDisk();
  }

  private loadFromDisk() {
    try {
      if (fs.existsSync(this.filePath)) {
        const fileContent = fs.readFileSync(this.filePath, 'utf8');
        const parsed: StoredVaultFile = JSON.parse(fileContent);
        if (parsed && parsed.accounts) {
          this.memoryStore = { ...this.memoryStore, ...parsed.accounts };
        }
      } else {
        this.saveToDisk();
      }
    } catch {
      // Vercel / serverless silent fallback
    }
  }

  private saveToDisk() {
    try {
      const data: StoredVaultFile = {
        version: 1,
        lastUpdated: new Date().toISOString(),
        accounts: this.memoryStore,
      };
      fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2), 'utf8');
    } catch {
      // Vercel / serverless silent fallback - data remains in memory
    }
  }

  public getAllAccounts(): PlatformCredential[] {
    return Object.values(this.memoryStore);
  }

  public getAccount(platformId: SocialPlatformId): PlatformCredential | null {
    return this.memoryStore[platformId] || null;
  }

  public saveAccount(
    platformId: SocialPlatformId,
    updates: Partial<PlatformCredential> & {
      rawClientSecret?: string;
      rawApiKey?: string;
      rawAccessToken?: string;
      rawRefreshToken?: string;
    }
  ): PlatformCredential {
    const existing = this.memoryStore[platformId] || {
      platformId,
      platformName: PLATFORMS_CONFIG[platformId]?.name || platformId,
      status: 'connected',
      mode: 'live',
      scopes: [],
    };

    // Şifreleme ve maskeleme işlemleri
    const clientSecretMasked = updates.rawClientSecret
      ? maskToken(updates.rawClientSecret)
      : updates.clientSecretMasked || existing.clientSecretMasked;

    const apiKeyMasked = updates.rawApiKey
      ? maskToken(updates.rawApiKey)
      : updates.apiKeyMasked || existing.apiKeyMasked;

    const accessTokenMasked = updates.rawAccessToken
      ? maskToken(updates.rawAccessToken)
      : updates.accessTokenMasked || existing.accessTokenMasked;

    const refreshTokenMasked = updates.rawRefreshToken
      ? maskToken(updates.rawRefreshToken)
      : updates.refreshTokenMasked || existing.refreshTokenMasked;

    const updatedAccount: PlatformCredential = {
      ...existing,
      ...updates,
      platformId,
      status: updates.status || 'connected',
      clientSecretMasked,
      apiKeyMasked,
      accessTokenMasked,
      refreshTokenMasked,
      connectedAt: existing.connectedAt || new Date().toISOString(),
      lastTestedAt: new Date().toISOString(),
      lastError: undefined,
    };

    this.memoryStore[platformId] = updatedAccount;
    this.saveToDisk();
    return updatedAccount;
  }

  public connectMock(platformId: SocialPlatformId): PlatformCredential {
    const defaults = generateDefaultAccounts()[platformId];
    if (defaults) {
      this.memoryStore[platformId] = {
        ...defaults,
        status: 'connected',
        mode: 'mock',
        connectedAt: new Date().toISOString(),
        lastTestedAt: new Date().toISOString(),
        lastPingMs: Math.floor(Math.random() * 60) + 30,
        lastError: undefined,
      };
    } else {
      this.memoryStore[platformId] = {
        platformId,
        platformName: PLATFORMS_CONFIG[platformId]?.name || platformId,
        status: 'connected',
        mode: 'mock',
        accountHandle: `@omnipost_${platformId}`,
        accountName: `OmniPost ${PLATFORMS_CONFIG[platformId]?.name}`,
        scopes: ['publish', 'read'],
        connectedAt: new Date().toISOString(),
        lastTestedAt: new Date().toISOString(),
        lastPingMs: 45,
      };
    }
    this.saveToDisk();
    return this.memoryStore[platformId];
  }

  public disconnectAccount(platformId: SocialPlatformId): boolean {
    if (this.memoryStore[platformId]) {
      this.memoryStore[platformId] = {
        platformId,
        platformName: PLATFORMS_CONFIG[platformId]?.name || platformId,
        status: 'disconnected',
        mode: 'mock',
        accountHandle: this.memoryStore[platformId].accountHandle,
        scopes: this.memoryStore[platformId].scopes || [],
        clientSecretMasked: undefined,
        apiKeyMasked: undefined,
        accessTokenMasked: undefined,
        refreshTokenMasked: undefined,
        lastError: 'Kullanıcı tarafından bağlantı kesildi.',
      };
      this.saveToDisk();
      return true;
    }
    return false;
  }

  public updatePing(
    platformId: SocialPlatformId,
    pingMs: number,
    success: boolean,
    message: string
  ): PlatformCredential | null {
    const account = this.memoryStore[platformId];
    if (!account) return null;

    account.lastTestedAt = new Date().toISOString();
    account.lastPingMs = pingMs;
    account.status = success ? 'connected' : 'error';
    if (!success) {
      account.lastError = message;
    } else {
      account.lastError = undefined;
    }

    this.saveToDisk();
    return account;
  }

  public resetToDefaults() {
    this.memoryStore = generateDefaultAccounts();
    this.saveToDisk();
    return this.getAllAccounts();
  }
}

// Singleton Vault Instance
export const tokenVault = new TokenVaultManager();
