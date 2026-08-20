import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST(req: NextRequest) {
  try {
    const { path = '/' } = await req.json().catch(() => ({ path: '/' }));

    // Revalidate the public homepage on demand
    revalidatePath(path);

    return NextResponse.json({
      success: true,
      message: `Path "${path}" revalidated successfully.`,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Revalidation failed' },
      { status: 500 }
    );
  }
}
