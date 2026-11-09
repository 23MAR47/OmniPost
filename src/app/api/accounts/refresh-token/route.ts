import { NextRequest, NextResponse } from 'next/server';
import { mockOAuthService } from '@/lib/mockOAuthService';
import { SocialPlatformId } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { platformId } = body;

    if (!platformId) {
      return NextResponse.json(
        { success: false, error: 'Platform ID zorunludur.' },
        { status: 400 }
      );
    }

    const updated = await mockOAuthService.refreshToken(platformId as SocialPlatformId);

    return NextResponse.json({
      success: true,
      message: `${updated.platformName} OAuth erişim token'ı başarıyla yenilendi (30 gün uzatıldı).`,
      data: updated,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: 'Token yenileme başarısız: ' + error.message },
      { status: 500 }
    );
  }
}
