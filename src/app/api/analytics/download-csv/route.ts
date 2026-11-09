import { NextRequest, NextResponse } from 'next/server';
import { analyticsService } from '@/lib/analyticsService';

/**
 * GET /api/analytics/download-csv
 * Direct CSV file download endpoint with proper Content-Disposition headers.
 */
export async function GET(request: NextRequest) {
  try {
    const csvData = analyticsService.generateCSV(';');
    const dateSlug = new Date().toISOString().slice(0, 10);
    const filename = `OmniPost_Raporu_${dateSlug}.csv`;

    // Add BOM for Excel UTF-8 compatibility
    const bom = '\uFEFF';
    const csvWithBom = bom + csvData;

    return new NextResponse(csvWithBom, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
        'Pragma': 'no-cache',
      },
    });
  } catch (error: any) {
    console.error('[CSV Export Error]', error);
    return NextResponse.json(
      { success: false, error: 'CSV raporu oluşturulamadı: ' + error.message },
      { status: 500 }
    );
  }
}
