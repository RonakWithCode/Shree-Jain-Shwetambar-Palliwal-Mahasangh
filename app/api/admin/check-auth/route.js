import { NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';

export async function GET(request) {
  try {
    const token = request.cookies.get('adminToken')?.value;
    
    if (!token) {
      return NextResponse.json({ success: false, error: 'No token found' }, { status: 401 });
    }

    const decoded = await verifyToken(token);
    
    if (!decoded) {
      return NextResponse.json({ success: false, error: 'Invalid token' }, { status: 401 });
    }

    return NextResponse.json({ success: true, user: decoded });
  } catch (error) {
    console.error('Check auth error:', error);
    return NextResponse.json({ success: false, error: 'Authentication failed' }, { status: 401 });
  }
}

