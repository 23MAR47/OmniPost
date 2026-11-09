import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { analyticsService } from '@/lib/analyticsService';
import { ExcelService } from '@/lib/excelService';

export async function GET(
  request: NextRequest,
  { params }: { params: { filename: string } }
) {
  try {
    const rawFilename = params.filename || 'OmniPost_Sosyal_Medya_Raporu.xlsx';
    const isCsv = rawFilename.toLowerCase().endsWith('.csv');

    const history = analyticsService.getAll();
    const summary = analyticsService.getSummary();

    if (isCsv) {
      const csvData = analyticsService.generateCSV(';');
      try {
        fs.writeFileSync(path.join(process.cwd(), rawFilename), csvData, 'utf8');
      } catch (e) {
        // ignore disk write error
      }

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

    try {
      fs.writeFileSync(path.join(process.cwd(), rawFilename), excelBuffer);
    } catch (e) {
      // ignore disk write error
    }

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
