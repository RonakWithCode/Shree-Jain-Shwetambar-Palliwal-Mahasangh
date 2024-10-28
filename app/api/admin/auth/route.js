import { connectDB } from '@/lib/mongodb';
import Admin from '@/models/Admin';
import { signToken } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    await connectDB();
    const { email, password } = await req.json();

    const admin = await Admin.findOne({ 
      email,
      password // In production, use proper password hashing
    }).lean();

    if (!admin) {
      return NextResponse.json({ 
        success: false, 
        error: 'Invalid credentials' 
      }, { status: 401 });
    }

    const token = await signToken({ 
      id: admin._id.toString(), 
      email: admin.email 
    });

    const response = NextResponse.json({
      success: true,
      user: {
        email: admin.email,
        id: admin._id.toString()
      }
    });

    // Set HTTP-only cookie
    response.cookies.set('adminToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 24 * 60 * 60 // 24 hours
    });

    return response;
  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Authentication failed' 
    }, { status: 500 });
  }
}

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
      error: 'Invalid token' 
    }, { status: 401 });
  }
}
