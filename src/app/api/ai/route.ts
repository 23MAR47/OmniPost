import { NextResponse } from 'next/server';
import { AiCopyService, AiGenerationOptions } from '@/lib/aiCopyService';

const NICHES: AiGenerationOptions['niche'][] = ['tech', 'ecommerce', 'marketing', 'lifestyle', 'fitness', 'finance'];
const TONES: AiGenerationOptions['tone'][] = ['professional', 'hype', 'educational', 'storytelling', 'humorous'];
const HOOK_TYPES: AiGenerationOptions['hookType'][] = ['question', 'bold_claim', 'mistake', 'statistic', 'curiosity'];

/**
 * İstek gövdesini güvenli biçimde doğrular ve eksik/geçersiz alanları
 * varsayılanlara indirger. Aksi halde şablonlara "undefined" basılırdı.
 */
function normalizeOptions(body: any): { options: AiGenerationOptions } | { error: string } {
  if (!body || typeof body !== 'object') {
    return { error: 'Geçerli bir istek gövdesi gönderilmelidir.' };
  }

  const topic = typeof body.topic === 'string' ? body.topic.trim() : '';
  if (!topic) {
    return { error: 'İçerik konusu (topic) zorunludur.' };
  }
  if (topic.length > 200) {
    return { error: 'İçerik konusu en fazla 200 karakter olabilir.' };
  }

  const options: AiGenerationOptions = {
    topic,
    niche: NICHES.includes(body.niche) ? body.niche : 'tech',
    tone: TONES.includes(body.tone) ? body.tone : 'professional',
    hookType: HOOK_TYPES.includes(body.hookType) ? body.hookType : 'curiosity',
  };

  if (typeof body.platform === 'string' && body.platform.trim()) {
    options.platform = body.platform.trim();
  }

  return { options };
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const normalized = normalizeOptions(body);

    if ('error' in normalized) {
      return NextResponse.json({ success: false, error: normalized.error }, { status: 400 });
    }

    const result = AiCopyService.generateContent(normalized.options);
    return NextResponse.json({ success: true, data: result });
  } catch (error: any) {
    const isSyntaxError = error?.name === 'SyntaxError';
    return NextResponse.json(
      {
        success: false,
        error: isSyntaxError ? 'Geçersiz JSON gövdesi gönderildi.' : 'İçerik üretilemedi: ' + error.message,
      },
      { status: isSyntaxError ? 400 : 500 }
    );
  }
}
