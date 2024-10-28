import { connectDB } from '@/lib/mongodb';
import News from '@/models/News';
import { verifyToken } from '@/lib/auth';
import { NextResponse } from 'next/server';

// Get all news with pagination and filtering
export async function GET(req) {
  try {
    await connectDB();
    const token = req.cookies.get('adminToken')?.value;
    
    if (!token) {
      return NextResponse.json({ 
        success: false, 
        error: 'Authentication required' 
      }, { status: 401 });
    }

    const decoded = await verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ 
        success: false, 
        error: 'Invalid token' 
      }, { status: 401 });
    }

    const news = await News.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, news });
  } catch (error) {
    console.error('Error fetching news:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}

// Create news
export async function POST(req) {
  try {
    await connectDB();
    const token = req.cookies.get('adminToken')?.value;
    
    if (!token) {
      return NextResponse.json({ 
        success: false, 
        error: 'Authentication required' 
      }, { status: 401 });
    }

    const decoded = await verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ 
        success: false, 
        error: 'Invalid token' 
      }, { status: 401 });
    }

    const data = await req.json();
    const news = await News.create({
      ...data,
      createdBy: decoded.id
    });

    return NextResponse.json({ success: true, news });
  } catch (error) {
    console.error('Error creating news:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}
