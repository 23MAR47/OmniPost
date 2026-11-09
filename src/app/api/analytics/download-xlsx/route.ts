import { NextRequest, NextResponse } from 'next/server';
import { analyticsService } from '@/lib/analyticsService';
import { ExcelService } from '@/lib/excelService';

/**
 * GET /api/analytics/download-xlsx
 * Direct Excel (.xlsx) file download endpoint.
 * Returns a proper binary XLSX response with correct headers for reliable browser download.
 */
export async function GET(request: NextRequest) {
  try {
    const history = analyticsService.getAll();
    const summary = analyticsService.getSummary();

    const excelBuffer = ExcelService.generateXLSX(history, summary);
    const dateSlug = new Date().toISOString().slice(0, 10);
    const filename = `OmniPost_Raporu_${dateSlug}.xlsx`;

    return new NextResponse(new Uint8Array(excelBuffer), {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Length': String(excelBuffer.length),
        'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
        'Pragma': 'no-cache',
        'X-Content-Type-Options': 'nosniff',
      },
    });
  } catch (error: any) {
    console.error('[Excel Export Error]', error);
    return NextResponse.json(
      { success: false, error: 'Excel raporu oluşturulamadı: ' + error.message },
      { status: 500 }
    );
  }
}
