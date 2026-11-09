import { NextRequest, NextResponse } from 'next/server';
import { scheduleManager } from '@/lib/scheduleService';

// POST: Belirli bir planlı gönderiyi hemen yayınla (Trigger Now)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: 'Gönderi ID gereklidir.' }, { status: 400 });
    }

    const executed = await scheduleManager.triggerNow(id);
    if (!executed) {
      return NextResponse.json({ success: false, error: 'Gönderi bulunamadı.' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: `"${executed.title || 'Gönderi'}" başarıyla yayınlandı.`,
      data: executed,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: 'Tetikleme başarısız: ' + error.message },
      { status: 500 }
    );
  }
}
