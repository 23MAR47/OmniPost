import zlib from 'zlib';
import { PostHistoryItem, AnalyticsSummary } from '@/types';

/**
 * Standard CRC32 implementation for ZIP headers
 */
function crc32(buf: Buffer): number {
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    const byte = buf[i];
    crc = (crc >>> 8) ^ CRC32_TABLE[(crc ^ byte) & 0xff];
  }
  return (crc ^ 0xffffffff) >>> 0;
}

const CRC32_TABLE = new Uint32Array(256);
for (let i = 0; i < 256; i++) {
  let c = i;
  for (let k = 0; k < 8; k++) {
    c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  }
  CRC32_TABLE[i] = c >>> 0;
}

interface ZipEntry {
  name: string;
  data: Buffer;
}

/**
 * Lightweight in-memory ZIP builder compliant with OpenXML / XLSX specification
 */
function createZip(entries: ZipEntry[]): Buffer {
  const localHeaders: Buffer[] = [];
  const centralHeaders: Buffer[] = [];
  let offset = 0;

  for (const entry of entries) {
    const nameBuffer = Buffer.from(entry.name, 'utf8');
    const uncompressedData = entry.data;
    const compressedData = zlib.deflateRawSync(uncompressedData);
    const checksum = crc32(uncompressedData);

    // Local file header (30 bytes + name)
    const localHeader = Buffer.alloc(30 + nameBuffer.length);
    localHeader.writeUInt32LE(0x04034b50, 0); // signature
    localHeader.writeUInt16LE(20, 4); // version needed (2.0)
    localHeader.writeUInt16LE(0, 6); // general purpose flags
    localHeader.writeUInt16LE(8, 8); // compression method (8 = Deflate)
    localHeader.writeUInt16LE(0, 10); // file mod time
    localHeader.writeUInt16LE(0, 12); // file mod date
    localHeader.writeUInt32LE(checksum, 14); // crc-32
    localHeader.writeUInt32LE(compressedData.length, 18); // compressed size
    localHeader.writeUInt32LE(uncompressedData.length, 22); // uncompressed size
    localHeader.writeUInt16LE(nameBuffer.length, 26); // file name length
    localHeader.writeUInt16LE(0, 28); // extra field length
    nameBuffer.copy(localHeader, 30);

    localHeaders.push(localHeader, compressedData);

    // Central directory header (46 bytes + name)
    const centralHeader = Buffer.alloc(46 + nameBuffer.length);
    centralHeader.writeUInt32LE(0x02014b50, 0); // signature
    centralHeader.writeUInt16LE(20, 4); // version made by
    centralHeader.writeUInt16LE(20, 6); // version needed
    centralHeader.writeUInt16LE(0, 8); // flags
    centralHeader.writeUInt16LE(8, 10); // compression method
    centralHeader.writeUInt16LE(0, 12); // time
    centralHeader.writeUInt16LE(0, 14); // date
    centralHeader.writeUInt32LE(checksum, 16); // crc-32
    centralHeader.writeUInt32LE(compressedData.length, 20); // compressed size
    centralHeader.writeUInt32LE(uncompressedData.length, 24); // uncompressed size
    centralHeader.writeUInt16LE(nameBuffer.length, 28); // name length
    centralHeader.writeUInt16LE(0, 30); // extra field length
    centralHeader.writeUInt16LE(0, 32); // comment length
    centralHeader.writeUInt16LE(0, 34); // disk start
    centralHeader.writeUInt16LE(0, 36); // internal file attributes
    centralHeader.writeUInt32LE(0, 38); // external file attributes
    centralHeader.writeUInt32LE(offset, 42); // relative offset of local header
    nameBuffer.copy(centralHeader, 46);

    centralHeaders.push(centralHeader);

    offset += localHeader.length + compressedData.length;
  }

  const centralDirBuffer = Buffer.concat(centralHeaders);
  const centralDirSize = centralDirBuffer.length;
  const centralDirOffset = offset;

  // End of central directory record (22 bytes)
  const eocd = Buffer.alloc(22);
  eocd.writeUInt32LE(0x06054b50, 0); // signature
  eocd.writeUInt16LE(0, 4); // disk number
  eocd.writeUInt16LE(0, 6); // start disk
  eocd.writeUInt16LE(entries.length, 8); // entries on this disk
  eocd.writeUInt16LE(entries.length, 10); // total entries
  eocd.writeUInt32LE(centralDirSize, 12); // central directory size
  eocd.writeUInt32LE(centralDirOffset, 16); // central directory offset
  eocd.writeUInt16LE(0, 20); // comment length

  return Buffer.concat([...localHeaders, centralDirBuffer, eocd]);
}

/**
 * Escapes special XML characters
 */
function escapeXml(text: string): string {
  if (!text) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * Generates an Excel column name (A, B, C ... Z, AA, AB ...)
 */
function getColumnName(colIndex: number): string {
  let temp = colIndex;
  let letter = '';
  while (temp >= 0) {
    letter = String.fromCharCode((temp % 26) + 65) + letter;
    temp = Math.floor(temp / 26) - 1;
  }
  return letter;
}

/**
 * OmniPost Native Excel (.xlsx) Report Generator
 */
export class ExcelService {
  public static generateXLSX(history: PostHistoryItem[], summary?: AnalyticsSummary | null): Buffer {
    const platformNames: Record<string, string> = {
      twitter: 'X (Twitter)',
      instagram: 'Instagram',
      youtube: 'YouTube',
      facebook: 'Facebook',
      tiktok: 'TikTok',
      pinterest: 'Pinterest',
      threads: 'Threads',
    };

    const statusLabels: Record<string, string> = {
      success: 'Başarılı',
      partial: 'Kısmi Başarılı',
      failed: 'Başarısız',
    };

    const headers = [
      'Gönderi ID',
      'Başlık',
      'İçerik Metni',
      'Yayın Tarihi',
      'Yayın Saati',
      'Genel Durum',
      'Hedef Ağlar',
      'Başarılı Ağlar',
      'Hatalı Ağlar',
      'Görüntülenme',
      'Beğeni',
      'Yorum',
      'Paylaşım',
      'Toplam Etkileşim',
      'Etkileşim Oranı (%)',
      'Detaylı Platform Durumları',
    ];

    let sheetRowsXml = '';
    let rowIndex = 1;

    // Header Row (Row 1) - style 1 (Blue background, bold white text)
    sheetRowsXml += `<row r="${rowIndex}" ht="28" customHeight="1">`;
    headers.forEach((h, colIdx) => {
      const cellRef = `${getColumnName(colIdx)}${rowIndex}`;
      sheetRowsXml += `<c r="${cellRef}" t="inlineStr" s="1"><is><t>${escapeXml(h)}</t></is></c>`;
    });
    sheetRowsXml += `</row>`;
    rowIndex++;

    let sumViews = 0;
    let sumLikes = 0;
    let sumComments = 0;
    let sumShares = 0;

    // Data Rows
    history.forEach((item) => {
      const pubDate = new Date(item.publishedAt);
      const datePart = isNaN(pubDate.getTime())
        ? '-'
        : pubDate.toLocaleDateString('tr-TR', { day: '2-digit', month: '2-digit', year: 'numeric' });
      const timePart = isNaN(pubDate.getTime())
        ? '-'
        : pubDate.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });

      const statusTr = statusLabels[item.status] || item.status;

      const successfulPlatforms = item.platforms
        .filter((p) => p.status === 'success')
        .map((p) => platformNames[p.platformId] || p.platformId);

      const failedPlatforms = item.platforms
        .filter((p) => p.status === 'failed')
        .map((p) => {
          const name = platformNames[p.platformId] || p.platformId;
          return p.errorMessage ? `${name} (${p.errorMessage})` : name;
        });

      const successfulStr = successfulPlatforms.length > 0 ? successfulPlatforms.join(', ') : 'Yok';
      const failedStr = failedPlatforms.length > 0 ? failedPlatforms.join(', ') : 'Yok (Tümü Başarılı)';

      const platformDetailsStr = item.platforms
        .map((p) => {
          const name = platformNames[p.platformId] || p.platformId;
          const st = statusLabels[p.status] || p.status;
          return `${name}: ${st}`;
        })
        .join(' | ');

      const totalEng = (item.totalLikes || 0) + (item.totalComments || 0) + (item.totalShares || 0);
      const engRate = (item.totalViews || 0) > 0 ? (((totalEng / item.totalViews) * 100).toFixed(2) + '%') : '0.00%';

      sumViews += item.totalViews || 0;
      sumLikes += item.totalLikes || 0;
      sumComments += item.totalComments || 0;
      sumShares += item.totalShares || 0;

      const rowData = [
        { val: item.id, type: 'string' },
        { val: item.title || '(Başlıksız)', type: 'string' },
        { val: item.caption || '', type: 'string' },
        { val: datePart, type: 'string' },
        { val: timePart, type: 'string' },
        { val: statusTr, type: 'string', style: item.status === 'success' ? '2' : item.status === 'partial' ? '3' : '4' },
        { val: item.platforms.length, type: 'number' },
        { val: successfulStr, type: 'string' },
        { val: failedStr, type: 'string' },
        { val: item.totalViews || 0, type: 'number' },
        { val: item.totalLikes || 0, type: 'number' },
        { val: item.totalComments || 0, type: 'number' },
        { val: item.totalShares || 0, type: 'number' },
        { val: totalEng, type: 'number' },
        { val: engRate, type: 'string' },
        { val: platformDetailsStr, type: 'string' },
      ];

      sheetRowsXml += `<row r="${rowIndex}" ht="22" customHeight="1">`;
      rowData.forEach((cell, colIdx) => {
        const cellRef = `${getColumnName(colIdx)}${rowIndex}`;
        const styleAttr = cell.style ? ` s="${cell.style}"` : '';

        if (cell.type === 'number') {
          sheetRowsXml += `<c r="${cellRef}" t="n"${styleAttr}><v>${cell.val}</v></c>`;
        } else {
          sheetRowsXml += `<c r="${cellRef}" t="inlineStr"${styleAttr}><is><t>${escapeXml(String(cell.val))}</t></is></c>`;
        }
      });
      sheetRowsXml += `</row>`;
      rowIndex++;
    });

    // Summary Section
    rowIndex++; // blank separator row
    const totalEngAll = sumLikes + sumComments + sumShares;
    const avgRateAll = sumViews > 0 ? (((totalEngAll / sumViews) * 100).toFixed(2) + '%') : '0.00%';

    const summaryItems = [
      ['--- GENEL DAĞITIM VE PERFORMANS ÖZETİ ---', ''],
      ['Toplam Paylaşılan Gönderi', String(history.length)],
      ['Toplam Görüntülenme', String(sumViews)],
      ['Toplam Beğeni', String(sumLikes)],
      ['Toplam Yorum', String(sumComments)],
      ['Toplam Paylaşım', String(sumShares)],
      ['Toplam Etkileşim (Reaksiyon)', String(totalEngAll)],
      ['Ortalama Etkileşim Oranı', avgRateAll],
      ['Rapor Alınma Zamanı', new Date().toLocaleString('tr-TR')],
    ];

    summaryItems.forEach((s) => {
      sheetRowsXml += `<row r="${rowIndex}" ht="20">`;
      sheetRowsXml += `<c r="A${rowIndex}" t="inlineStr" s="5"><is><t>${escapeXml(s[0])}</t></is></c>`;
      sheetRowsXml += `<c r="B${rowIndex}" t="inlineStr" s="5"><is><t>${escapeXml(s[1])}</t></is></c>`;
      sheetRowsXml += `</row>`;
      rowIndex++;
    });

    // Define column widths for Excel
    const colsXml = `
      <cols>
        <col min="1" max="1" width="16" customWidth="1"/>
        <col min="2" max="2" width="34" customWidth="1"/>
        <col min="3" max="3" width="46" customWidth="1"/>
        <col min="4" max="4" width="14" customWidth="1"/>
        <col min="5" max="5" width="12" customWidth="1"/>
        <col min="6" max="6" width="16" customWidth="1"/>
        <col min="7" max="7" width="14" customWidth="1"/>
        <col min="8" max="8" width="30" customWidth="1"/>
        <col min="9" max="9" width="26" customWidth="1"/>
        <col min="10" max="10" width="16" customWidth="1"/>
        <col min="11" max="11" width="14" customWidth="1"/>
        <col min="12" max="12" width="14" customWidth="1"/>
        <col min="13" max="13" width="14" customWidth="1"/>
        <col min="14" max="14" width="18" customWidth="1"/>
        <col min="15" max="15" width="18" customWidth="1"/>
        <col min="16" max="16" width="40" customWidth="1"/>
      </cols>
    `;

    // 1. [Content_Types].xml
    const contentTypesXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>
  <Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>
  <Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>
</Types>`;

    // 2. _rels/.rels
    const relsXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>
</Relationships>`;

    // 3. xl/_rels/workbook.xml.rels
    const workbookRelsXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/>
  <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>
</Relationships>`;

    // 4. xl/workbook.xml
    const workbookXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
  <sheets>
    <sheet name="OmniPost Raporu" sheetId="1" r:id="rId1"/>
  </sheets>
</workbook>`;

    // 5. xl/styles.xml - Stylesheet with OmniPost Blue Theme & Status Colors
    const stylesXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
  <fonts count="4">
    <font><name val="Segoe UI"/><sz val="10"/></font>
    <font><b/><color rgb="FFFFFFFF"/><name val="Segoe UI"/><sz val="11"/></font>
    <font><b/><color rgb="FF047857"/><name val="Segoe UI"/><sz val="10"/></font>
    <font><b/><color rgb="FFB45309"/><name val="Segoe UI"/><sz val="10"/></font>
  </fonts>
  <fills count="6">
    <fill><patternFill patternType="none"/></fill>
    <fill><patternFill patternType="gray125"/></fill>
    <fill><patternFill patternType="solid"><fgColor rgb="FF2563EB"/></patternFill></fill>
    <fill><patternFill patternType="solid"><fgColor rgb="FFD1FAE5"/></patternFill></fill>
    <fill><patternFill patternType="solid"><fgColor rgb="FFFEF3C7"/></patternFill></fill>
    <fill><patternFill patternType="solid"><fgColor rgb="FFF1F5F9"/></patternFill></fill>
  </fills>
  <borders count="2">
    <border><left/><right/><top/><bottom/></border>
    <border>
      <left style="thin"><color rgb="FFE2E8F0"/></left>
      <right style="thin"><color rgb="FFE2E8F0"/></right>
      <top style="thin"><color rgb="FFE2E8F0"/></top>
      <bottom style="thin"><color rgb="FFE2E8F0"/></bottom>
    </border>
  </borders>
  <cellStyleXfs count="1">
    <xf numFmtId="0" fontId="0" fillId="0" borderId="0"/>
  </cellStyleXfs>
  <cellXfs count="6">
    <!-- 0: Default Normal -->
    <xf numFmtId="0" fontId="0" fillId="0" borderId="1" xfId="0"/>
    <!-- 1: Header (Blue, Bold White) -->
    <xf numFmtId="0" fontId="1" fillId="2" borderId="1" xfId="0" applyFont="1" applyFill="1" applyAlignment="1">
      <alignment horizontal="center" vertical="center" wrapText="1"/>
    </xf>
    <!-- 2: Success Badge (Green) -->
    <xf numFmtId="0" fontId="2" fillId="3" borderId="1" xfId="0" applyFont="1" applyFill="1" applyAlignment="1">
      <alignment horizontal="center" vertical="center"/>
    </xf>
    <!-- 3: Partial Badge (Amber) -->
    <xf numFmtId="0" fontId="3" fillId="4" borderId="1" xfId="0" applyFont="1" applyFill="1" applyAlignment="1">
      <alignment horizontal="center" vertical="center"/>
    </xf>
    <!-- 4: Failed Badge -->
    <xf numFmtId="0" fontId="0" fillId="0" borderId="1" xfId="0" applyAlignment="1">
      <alignment horizontal="center" vertical="center"/>
    </xf>
    <!-- 5: Summary Label (Soft Slate) -->
    <xf numFmtId="0" fontId="0" fillId="5" borderId="1" xfId="0" applyFill="1" applyFont="1"/>
  </cellXfs>
</styleSheet>`;

    // 6. xl/worksheets/sheet1.xml
    const sheet1Xml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
  ${colsXml}
  <sheetData>
    ${sheetRowsXml}
  </sheetData>
</worksheet>`;

    // Assemble the complete XLSX ZIP archive
    return createZip([
      { name: '[Content_Types].xml', data: Buffer.from(contentTypesXml, 'utf8') },
      { name: '_rels/.rels', data: Buffer.from(relsXml, 'utf8') },
      { name: 'xl/_rels/workbook.xml.rels', data: Buffer.from(workbookRelsXml, 'utf8') },
      { name: 'xl/workbook.xml', data: Buffer.from(workbookXml, 'utf8') },
      { name: 'xl/styles.xml', data: Buffer.from(stylesXml, 'utf8') },
      { name: 'xl/worksheets/sheet1.xml', data: Buffer.from(sheet1Xml, 'utf8') },
    ]);
  }
}
