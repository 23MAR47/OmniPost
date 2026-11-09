import { NextResponse } from 'next/server';
import { EvergreenService } from '@/lib/evergreenService';

export async function GET() {
  try {
    const data = EvergreenService.getData();
    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { action, postId } = await req.json();
    if (action === 'recycleNow' && postId) {
      const updated = EvergreenService.recycleNow(postId);
      return NextResponse.json({ success: true, data: updated });
    }
    return NextResponse.json({ success: false, error: 'Geçersiz işlem' }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const { type, id } = await req.json();
    if (type === 'post') {
      const updated = EvergreenService.togglePostPause(id);
      return NextResponse.json({ success: true, data: updated });
    } else if (type === 'bucket') {
      const updated = EvergreenService.toggleBucketActive(id);
      return NextResponse.json({ success: true, data: updated });
    }
    return NextResponse.json({ success: false, error: 'Geçersiz tür' }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
