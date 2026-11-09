import { NextResponse } from 'next/server';
import { analyticsService } from '@/lib/analyticsService';

export async function GET() {
  try {
    const history = analyticsService.getAll();
    const summary = analyticsService.getSummary();

    return NextResponse.json({
      success: true,
      data: {
        history,
        summary,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: 'Analitik verileri getirilemedi: ' + error.message },
      { status: 500 }
    );
  }
}
