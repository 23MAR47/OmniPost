import { NextRequest, NextResponse } from 'next/server';
import { omniPublisher } from '@/lib/adapters';
import { analyticsService } from '@/lib/analyticsService';
import { PostContent, SocialPlatformId } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, caption, media, platforms, destinationUrl, platformOverrides } = body;

    if (!platforms || !Array.isArray(platforms) || platforms.length === 0) {
      return NextResponse.json(
        { error: 'En az bir platform seçilmelidir.' },
        { status: 400 }
      );
    }

    const postContent: PostContent = {
      title: title || '',
      caption: caption || '',
      media: Array.isArray(media) ? media : [],
      destinationUrl: destinationUrl || '',
      platformOverrides: platformOverrides || {},
    };

    // Dispatch using the OmniPublisher concurrent engine
    const publishResponse = await omniPublisher.publishConcurrently(
      postContent,
      platforms as SocialPlatformId[]
    );

    // Save to Post History & Analytics
    try {
      analyticsService.recordPublishedPost(postContent, publishResponse.results);
    } catch (recordError) {
      console.warn('[Publish API] Analitik kaydı oluşturulamadı:', recordError);
    }

    return NextResponse.json(publishResponse);
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: 'Dağıtım motorunda beklenmedik bir hata oluştu: ' + error.message,
      },
      { status: 500 }
    );
  }
}

// GET: Seçilen bir platform için dönüştürülmüş payload önizlemesi al (Pre-flight inspection)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const platformId = searchParams.get('platformId') as SocialPlatformId;
    const title = searchParams.get('title') || '';
    const caption = searchParams.get('caption') || '';

    if (!platformId) {
      return NextResponse.json({ error: 'platformId parametresi zorunludur.' }, { status: 400 });
    }

    const postContent: PostContent = {
      title,
      caption,
      media: [],
      platformOverrides: {},
    };

    const preview = omniPublisher.getPayloadPreview(postContent, platformId);
    return NextResponse.json({ success: true, data: preview });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
