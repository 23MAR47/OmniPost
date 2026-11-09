import { NextResponse } from 'next/server';
import { InboxService } from '@/lib/inboxService';

export async function GET() {
  try {
    const data = InboxService.getConversations();
    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { conversationId, replyText } = await req.json();
    if (!conversationId || !replyText) {
      return NextResponse.json({ success: false, error: 'Eksik parametre' }, { status: 400 });
    }
    const updated = InboxService.sendReply(conversationId, replyText);
    return NextResponse.json({ success: true, data: updated });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const { conversationId, status } = await req.json();
    if (!conversationId || !status) {
      return NextResponse.json({ success: false, error: 'Eksik parametre' }, { status: 400 });
    }
    const updated = InboxService.updateStatus(conversationId, status);
    return NextResponse.json({ success: true, data: updated });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
