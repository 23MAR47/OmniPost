import { NextRequest, NextResponse } from 'next/server';
import { analyticsService } from '@/lib/analyticsService';
import { ExcelService } from '@/lib/excelService';

export async function GET(
  request: NextRequest,
  { params }: { params: { filename: string } }
) {
  try {
    const rawFilename = (params.filename || 'OmniPost_Sosyal_Medya_Raporu.xlsx')
      .replace(/[^a-zA-Z0-9._-]/g, '');
    const isCsv = rawFilename.toLowerCase().endsWith('.csv');

    const history = analyticsService.getAll();
    const summary = analyticsService.getSummary();

    if (isCsv) {
      const csvData = analyticsService.generateCSV(';');

      return new NextResponse(csvData, {
        headers: {
          'Content-Type': 'text/csv; charset=utf-8',
          'Content-Disposition': `attachment; filename="${rawFilename}"`,
          'Cache-Control': 'no-store, no-cache, must-revalidate',
        },
      });
    }

    // Default: Microsoft Excel OpenXML (.xlsx)
    const excelBuffer = ExcelService.generateXLSX(history, summary);

    return new NextResponse(new Uint8Array(excelBuffer), {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename="${rawFilename}"`,
        'Content-Length': excelBuffer.length.toString(),
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: 'Excel dışa aktarım hatası: ' + error.message },
      { status: 500 }
    );
  }
}
