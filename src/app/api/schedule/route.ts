import { NextRequest, NextResponse } from 'next/server';
import { scheduleManager } from '@/lib/scheduleService';
import { CreateScheduleRequest, UpdateScheduleRequest } from '@/types';

// GET: Tüm zamanlanmış içerikleri listele
export async function GET() {
  try {
    const posts = scheduleManager.getAll();
    return NextResponse.json({
      success: true,
      data: posts,
      totalCount: posts.length,
      pendingCount: posts.filter((p) => p.status === 'pending').length,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: 'Zamanlanmış içerikler getirilemedi: ' + error.message },
      { status: 500 }
    );
  }
}

// POST: Yeni bir zamanlanmış gönderi planla
export async function POST(request: NextRequest) {
  try {
    const body: CreateScheduleRequest = await request.json();
    const { title, caption, media, platforms, destinationUrl, platformOverrides, scheduledFor } = body;

    if (!caption || caption.trim() === '') {
      return NextResponse.json(
        { success: false, error: 'Gönderi metni zorunludur.' },
        { status: 400 }
      );
    }

    if (!platforms || platforms.length === 0) {
      return NextResponse.json(
        { success: false, error: 'En az bir platform seçilmelidir.' },
        { status: 400 }
      );
    }

    if (!scheduledFor) {
      return NextResponse.json(
        { success: false, error: 'Planlama tarihi ve saati seçilmelidir.' },
        { status: 400 }
      );
    }

    const created = scheduleManager.create({
      title: title || '',
      caption,
      media: media || [],
      platforms,
      destinationUrl,
      platformOverrides,
      scheduledFor,
    });

    return NextResponse.json({
      success: true,
      message: 'Gönderi başarıyla zamanlandı ve kuyruğa eklendi.',
      data: created,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: 'Zamanlama oluşturulamadı: ' + error.message },
      { status: 500 }
    );
  }
}

// PUT: Planlanan gönderiyi güncelle
export async function PUT(request: NextRequest) {
  try {
    const body: UpdateScheduleRequest = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Gönderi ID zorunludur.' },
        { status: 400 }
      );
    }

    const updated = scheduleManager.update(id, updates);
    if (!updated) {
      return NextResponse.json(
        { success: false, error: 'Planlanan gönderi bulunamadı.' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Planlanan gönderi güncellendi.',
      data: updated,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: 'Güncelleme başarısız: ' + error.message },
      { status: 500 }
    );
  }
}

// DELETE: Gönderiyi iptal et veya sil
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const action = searchParams.get('action'); // 'cancel' or 'delete'

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Gönderi ID zorunludur.' },
        { status: 400 }
      );
    }

    if (action === 'cancel') {
      const cancelled = scheduleManager.cancel(id);
      return NextResponse.json({
        success: !!cancelled,
        message: 'Zamanlanmış gönderi iptal edildi.',
        data: cancelled,
      });
    }

    const deleted = scheduleManager.delete(id);
    return NextResponse.json({
      success: deleted,
      message: 'Zamanlanmış gönderi kuyruktan silindi.',
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: 'İşlem başarısız: ' + error.message },
      { status: 500 }
    );
  }
}
