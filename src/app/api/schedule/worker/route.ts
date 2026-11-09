import { NextResponse } from 'next/server';
import { scheduleManager } from '@/lib/scheduleService';

// POST: Arka plan kuyruk worker'ını çalıştır (Due olanları tetikle)
export async function POST() {
  try {
    const result = await scheduleManager.runWorkerCheck();
    return NextResponse.json({
      success: true,
      message: `${result.processedCount} adet süresi dolan gönderi işlendi.`,
      data: result,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: 'Worker çalıştırma hatası: ' + error.message },
      { status: 500 }
    );
  }
}
