import { verifyToken } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function GET(req) {
  try {
    const token = req.cookies.get('adminToken')?.value;
    
    if (!token) {
      return NextResponse.json({ 
        success: false, 
        error: 'No token provided' 
      }, { status: 401 });
    }

    const decoded = await verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ 
        success: false, 
        error: 'Invalid token' 
      }, { status: 401 });
    }

    return NextResponse.json({ 
      success: true,
      user: decoded 
    });
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: 'Authentication failed' 
    }, { status: 401 });
  }
}

