import { NextResponse } from 'next/server';
import { tokenVault } from '@/lib/tokenVault';

export async function POST() {
  try {
    const accounts = tokenVault.resetToDefaults();
    return NextResponse.json({
      success: true,
      message: 'Token kasası fabrika güvenli durumuna sıfırlandı.',
      data: accounts,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: 'Sıfırlama başarısız: ' + error.message },
      { status: 500 }
    );
  }
}
