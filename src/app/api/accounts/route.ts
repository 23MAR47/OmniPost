import { NextRequest, NextResponse } from 'next/server';
import { tokenVault } from '@/lib/tokenVault';
import { SocialPlatformId, SaveCredentialRequest } from '@/types';

// GET: Tüm platform kimlik ve bağlantı durumlarını getir
export async function GET() {
  try {
    const accounts = tokenVault.getAllAccounts();
    return NextResponse.json({
      success: true,
      data: accounts,
      totalCount: accounts.length,
      connectedCount: accounts.filter((a) => a.status === 'connected').length,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: 'Hesaplar yüklenirken hata oluştu: ' + error.message },
      { status: 500 }
    );
  }
}

// POST: Kimlik bilgilerini kaydet/güncelle (AES-256 ile şifrelenir)
export async function POST(request: NextRequest) {
  try {
    const body: SaveCredentialRequest = await request.json();
    const { platformId, mode, clientId, clientSecret, apiKey, accessToken, refreshToken, accountHandle } = body;

    if (!platformId) {
      return NextResponse.json(
        { success: false, error: 'Platform ID zorunludur.' },
        { status: 400 }
      );
    }

    const updated = tokenVault.saveAccount(platformId as SocialPlatformId, {
      mode: mode || 'live',
      clientId: clientId || undefined,
      accountHandle: accountHandle || undefined,
      rawClientSecret: clientSecret || undefined,
      rawApiKey: apiKey || undefined,
      rawAccessToken: accessToken || undefined,
      rawRefreshToken: refreshToken || undefined,
      status: 'connected',
    });

    return NextResponse.json({
      success: true,
      message: `${platformId.toUpperCase()} kimlik bilgileri AES-256 ile şifrelenerek kasaya kaydedildi.`,
      data: updated,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: 'Kaydetme işlemi başarısız: ' + error.message },
      { status: 500 }
    );
  }
}

// DELETE: Hesabın bağlantısını kes
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const platformId = searchParams.get('platformId') as SocialPlatformId;

    if (!platformId) {
      return NextResponse.json(
        { success: false, error: 'Platform ID gereklidir.' },
        { status: 400 }
      );
    }

    const disconnected = tokenVault.disconnectAccount(platformId);
    return NextResponse.json({
      success: disconnected,
      message: `${platformId} bağlantısı kesildi.`,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: 'Bağlantı kesilemedi: ' + error.message },
      { status: 500 }
    );
  }
}
