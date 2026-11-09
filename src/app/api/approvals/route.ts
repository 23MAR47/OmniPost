import { NextResponse } from 'next/server';
import { ApprovalsService } from '@/lib/approvalsService';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const workspaceId = searchParams.get('workspaceId') || undefined;
    const data = ApprovalsService.getPosts(workspaceId);
    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const { postId, newStatus, actorName, actorRole, note } = await req.json();
    if (!postId || !newStatus || !actorName || !actorRole) {
      return NextResponse.json({ success: false, error: 'Eksik parametre' }, { status: 400 });
    }
    const updated = ApprovalsService.updateStatus(postId, newStatus, actorName, actorRole, note);
    return NextResponse.json({ success: true, data: updated });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
