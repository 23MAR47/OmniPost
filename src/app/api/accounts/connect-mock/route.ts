import { NextRequest, NextResponse } from 'next/server';
import { mockOAuthService } from '@/lib/mockOAuthService';
import { SocialPlatformId } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { platformId, accountHandle } = body;

    if (!platformId) {
      return NextResponse.json(
        { success: false, error: 'Platform ID zorunludur.' },
        { status: 400 }
      );
    }

    const account = await mockOAuthService.simulateOAuthHandshake(
      platformId as SocialPlatformId,
      accountHandle
    );

    return NextResponse.json({
      success: true,
      message: `${account.platformName} hesabı OAuth 2.0 PKCE simülasyonu ile başarıyla bağlandı.`,
      data: account,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: 'OAuth simülasyonu başarısız: ' + error.message },
      { status: 500 }
    );
  }
}
