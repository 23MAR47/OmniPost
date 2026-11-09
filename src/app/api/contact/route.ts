import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  category: 'support' | 'feedback' | 'api_issue' | 'enterprise';
  message: string;
  targetWhatsApp?: string;
  createdAt: string;
  ip?: string;
}

const MESSAGES_FILE = process.env.VERCEL
  ? path.join('/tmp', '.contact-messages.json')
  : path.join(process.cwd(), '.contact-messages.json');

// In-memory fallback store for serverless resilience
let inMemoryMessages: ContactMessage[] = [];

function saveMessage(msg: ContactMessage) {
  inMemoryMessages.unshift(msg);
  try {
    let existing: ContactMessage[] = [];
    if (fs.existsSync(MESSAGES_FILE)) {
      existing = JSON.parse(fs.readFileSync(MESSAGES_FILE, 'utf8'));
    }
    existing.unshift(msg);
    fs.writeFileSync(MESSAGES_FILE, JSON.stringify(existing, null, 2), 'utf8');
  } catch {
    // Silent fallback on serverless read-only environments
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, category = 'support', message, targetWhatsApp } = body;

    // Validation
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return NextResponse.json(
        { success: false, error: 'Lütfen geçerli bir isim giriniz (en az 2 karakter).' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email.trim())) {
      return NextResponse.json(
        { success: false, error: 'Lütfen geçerli bir e-posta adresi giriniz.' },
        { status: 400 }
      );
    }

    if (!message || typeof message !== 'string' || message.trim().length < 5) {
      return NextResponse.json(
        { success: false, error: 'Lütfen mesajınızı en az 5 karakter olarak yazınız.' },
        { status: 400 }
      );
    }

    const contactMsg: ContactMessage = {
      id: 'TK-' + Date.now().toString().slice(-6),
      name: name.trim(),
      email: email.trim(),
      phone: phone ? String(phone).trim() : undefined,
      category,
      message: message.trim(),
      targetWhatsApp: targetWhatsApp || '05539771647',
      createdAt: new Date().toISOString(),
      ip: request.headers.get('x-forwarded-for') || '127.0.0.1',
    };

    saveMessage(contactMsg);

    return NextResponse.json({
      success: true,
      message: 'Geri bildiriminiz ve destek talebiniz başarıyla alındı. Teşekkür ederiz!',
      ticketId: contactMsg.id,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: 'İletişim servisinde beklenmeyen bir hata oluştu: ' + err.message },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('x-admin-token') || request.headers.get('authorization');
    const isAdmin = authHeader && (authHeader === (process.env.ADMIN_TOKEN || 'omnipost-admin-2026') || authHeader.includes(process.env.ADMIN_TOKEN || 'omnipost-admin-2026'));

    let existing: ContactMessage[] = [...inMemoryMessages];
    if (fs.existsSync(MESSAGES_FILE)) {
      const diskData = JSON.parse(fs.readFileSync(MESSAGES_FILE, 'utf8'));
      if (Array.isArray(diskData)) {
        const ids = new Set(existing.map((m) => m.id));
        for (const item of diskData) {
          if (!ids.has(item.id)) {
            existing.push(item);
          }
        }
      }
    }

    // Mask sensitive fields for non-admin viewers
    const sanitized = existing.slice(0, 20).map((msg) => {
      if (isAdmin) return msg;
      return {
        id: msg.id,
        name: msg.name,
        category: msg.category,
        message: msg.message,
        createdAt: msg.createdAt,
        email: msg.email.replace(/(.{2})(.*)(@.*)/, '$1***$3'),
        phone: msg.phone ? msg.phone.replace(/(\d{3})\d+(\d{2})/, '$1***$2') : undefined,
      };
    });

    return NextResponse.json({
      count: existing.length,
      messages: sanitized,
    });
  } catch {
    return NextResponse.json({ count: 0, messages: [] });
  }
}
