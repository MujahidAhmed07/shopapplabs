import { NextResponse } from 'next/server';
import { checkPlatform } from '@/lib/services/checkerService';

export async function GET(request, { params }) {
  const { platform } = await params;
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username') || '';

  const { data, error, statusCode } = await checkPlatform(platform, username);

  if (error) {
    return NextResponse.json({ error }, { status: statusCode || 400 });
  }

  return NextResponse.json(data, { status: 200 });
}
