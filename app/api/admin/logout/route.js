import { NextResponse } from 'next/server';
import { account } from '@/lib/appwrite';

export async function POST(request) {
  try {
    // Delete all sessions
    await account.deleteSessions();
    
    const response = NextResponse.json({ success: true });
    
    // Clear the admin token cookie
    response.cookies.set('adminToken', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 0
    });

    return response;
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json({ success: false, error: 'Logout failed' }, { status: 500 });
  }
}

