import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getCanonicalSiteSettings, saveCanonicalSiteSettings } from '@/lib/serverSettings';

export async function GET() {
  try {
    const settings = await getCanonicalSiteSettings();
    return NextResponse.json({ success: true, settings });
  } catch (err: any) {
    console.error('Failed to get settings:', err);
    return NextResponse.json({ error: 'Failed to retrieve site settings' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { settings } = body;

    const payload = settings || body;
    if (!payload || typeof payload !== 'object') {
      return NextResponse.json({ error: 'Invalid settings payload' }, { status: 400 });
    }

    const saved = await saveCanonicalSiteSettings(payload);

    try {
      revalidatePath('/');
      revalidatePath('/adminconsole1811/settings');
    } catch (revalErr) {
      console.warn('Revalidation notice:', revalErr);
    }

    return NextResponse.json({
      success: true,
      message: 'Settings saved successfully.',
      settings: saved,
    });
  } catch (err: any) {
    console.error('Failed to save settings:', err);
    return NextResponse.json({ error: 'Failed to persist site settings' }, { status: 500 });
  }
}
