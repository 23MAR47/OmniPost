import { NextRequest, NextResponse } from 'next/server';
import { analyticsService } from '@/lib/analyticsService';
import { ExcelService } from '@/lib/excelService';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const format = searchParams.get('format') || 'xlsx'; // Default to native Excel .xlsx
    const dateSlug = new Date().toISOString().slice(0, 10);

    const history = analyticsService.getAll();
    const summary = analyticsService.getSummary();

    if (format === 'csv') {
      const csvData = analyticsService.generateCSV(';');
      const filename = `OmniPost_Sosyal_Medya_Raporu_${dateSlug}.csv`;

      return new NextResponse(csvData, {
        headers: {
          'Content-Type': 'text/csv; charset=utf-8',
          'Content-Disposition': `attachment; filename="${filename}"; filename*=UTF-8''${encodeURIComponent(filename)}`,
          'Cache-Control': 'no-store, max-age=0',
        },
      });
    }

    // Default: Native Microsoft Excel (.xlsx) file
    const excelBuffer = ExcelService.generateXLSX(history, summary);
    const filename = `OmniPost_Sosyal_Medya_Raporu_${dateSlug}.xlsx`;

    return new NextResponse(new Uint8Array(excelBuffer), {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename="${filename}"; filename*=UTF-8''${encodeURIComponent(filename)}`,
        'Content-Length': excelBuffer.length.toString(),
        'Cache-Control': 'no-store, max-age=0',
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: 'Excel dışa aktarım hatası: ' + error.message },
      { status: 500 }
    );
  }
}
