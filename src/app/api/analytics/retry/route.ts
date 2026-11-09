import { NextRequest, NextResponse } from 'next/server';
import { analyticsService } from '@/lib/analyticsService';
import { SocialPlatformId } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { historyId, platformId } = body;

    if (!historyId || !platformId) {
      return NextResponse.json(
        { success: false, error: 'historyId ve platformId zorunludur.' },
        { status: 400 }
      );
    }

    const updated = await analyticsService.retryPlatform(historyId, platformId as SocialPlatformId);
    if (!updated) {
      return NextResponse.json(
        { success: false, error: 'Tekrar deneme başarısız oldu.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `${platformId} için gönderi başarıyla tekrar yayınlandı.`,
      data: updated,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: 'İşlem hatası: ' + error.message },
      { status: 500 }
    );
  }
}
