import { SocialPlatformId } from './index';

export type AuthMode = 'mock' | 'live';
export type ConnectionStatus = 'connected' | 'expired' | 'error' | 'disconnected';

export interface QuotaInfo {
  used: number;
  limit: number;
  unit: string;
  resetsAt: string;
}

export interface PlatformCredential {
  platformId: SocialPlatformId;
  platformName: string;
  status: ConnectionStatus;
  mode: AuthMode;
  accountHandle?: string;
  accountName?: string;
  accountAvatar?: string;
  accountFollowers?: string;
  
  // Kimlik Bilgileri (Hassas - Vault tarafından maskelenir)
  clientId?: string;
  clientSecretMasked?: string;
  apiKeyMasked?: string;
  accessTokenMasked?: string;
  refreshTokenMasked?: string;
  
  // Ham değerler (yalnızca kaydetme sırasında gönderilir)
  clientSecretRaw?: string;
  apiKeyRaw?: string;
  accessTokenRaw?: string;
  refreshTokenRaw?: string;

  // OAuth Meta
  scopes: string[];
  tokenExpiresAt?: string;
  connectedAt?: string;
  lastTestedAt?: string;
  lastPingMs?: number;
  lastError?: string;

  // Kota & Limit
  quota?: QuotaInfo;
}

export interface PingResult {
  platformId: SocialPlatformId;
  success: boolean;
  pingMs: number;
  status: ConnectionStatus;
  message: string;
  accountHandle?: string;
  timestamp: string;
  quota?: QuotaInfo;
}

export interface ConnectMockRequest {
  platformId: SocialPlatformId;
  accountHandle?: string;
  accountName?: string;
}

export interface SaveCredentialRequest {
  platformId: SocialPlatformId;
  mode: AuthMode;
  clientId?: string;
  clientSecret?: string;
  apiKey?: string;
  accessToken?: string;
  refreshToken?: string;
  accountHandle?: string;
}
