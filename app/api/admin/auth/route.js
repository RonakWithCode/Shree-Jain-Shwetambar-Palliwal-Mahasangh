import { NextResponse } from 'next/server';
import { sign } from 'jsonwebtoken';

export async function POST(request) {
  console.log('Admin auth endpoint called');
  try {
    const { email } = await request.json();
    console.log('Email received:', email);

    // Create JWT token
    console.log('Creating JWT token...');
    const token = sign(
      { 
        email,
        role: 'admin',
        timestamp: Date.now()
      },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    const response = NextResponse.json({ 
      success: true,
      message: 'Authentication successful'
    });
    
    // Set cookie
    response.cookies.set('adminToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 86400 // 1 day
    });

    return response;
  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Authentication failed' 
    }, { status: 401 });
  }
}
