import { NextRequest, NextResponse } from 'next/server';
import { mockOAuthService } from '@/lib/mockOAuthService';
import { SocialPlatformId } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const { platformId } = body;

    // Tek bir platform pingi
    if (platformId) {
      const result = await mockOAuthService.pingPlatform(platformId as SocialPlatformId);
      return NextResponse.json({
        success: true,
        data: result,
      });
    }

    // platformId belirtilmediyse tüm platformları pingler
    const results = await mockOAuthService.pingAllPlatforms();
    return NextResponse.json({
      success: true,
      data: results,
      allHealthy: results.every((r) => r.success),
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: 'Ping testi başarısız oldu: ' + error.message },
      { status: 500 }
    );
  }
}
