import { connectDB } from '@/lib/mongodb';
import News from '@/models/News';
import { verifyToken } from '@/lib/auth';
import { NextResponse } from 'next/server';

// Common auth check function
async function checkAuth(req) {
  const token = req.cookies.get('adminToken')?.value;
  
  if (!token) {
    return { error: 'Authentication required', status: 401 };
  }

  const decoded = await verifyToken(token);
  if (!decoded) {
    return { error: 'Invalid token', status: 401 };
  }

  return { decoded };
}

// Get single news
export async function GET(req, { params }) {
  try {
    const authCheck = await checkAuth(req);
    if (authCheck.error) {
      return NextResponse.json({ 
        success: false, 
        error: authCheck.error 
      }, { status: authCheck.status });
    }

    await connectDB();
    const { id } = params;
    const news = await News.findById(id).lean();
    
    if (!news) {
      return NextResponse.json({ 
        success: false, 
        error: 'News not found' 
      }, { status: 404 });
    }

    return NextResponse.json({ success: true, news });
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}

// Update news
export async function PUT(req, { params }) {
  try {
    const authCheck = await checkAuth(req);
    if (authCheck.error) {
      return NextResponse.json({ 
        success: false, 
        error: authCheck.error 
      }, { status: authCheck.status });
    }

    await connectDB();
    const { id } = params;
    const data = await req.json();

    // Validate required fields
    if (!data.type) {
      return NextResponse.json({ 
        success: false, 
        error: 'News type is required' 
      }, { status: 400 });
    }

    const news = await News.findByIdAndUpdate(
      id, 
      { ...data, updatedAt: new Date() }, 
      { new: true, runValidators: true }
    );

    if (!news) {
      return NextResponse.json({ 
        success: false, 
        error: 'News not found' 
      }, { status: 404 });
    }

    return NextResponse.json({ success: true, news });
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}

// Delete news
export async function DELETE(req, { params }) {
  try {
    const authCheck = await checkAuth(req);
    if (authCheck.error) {
      return NextResponse.json({ 
        success: false, 
        error: authCheck.error 
      }, { status: authCheck.status });
    }

    await connectDB();
    const { id } = params;
    const news = await News.findByIdAndDelete(id);

    if (!news) {
      return NextResponse.json({ 
        success: false, 
        error: 'News not found' 
      }, { status: 404 });
    }

    return NextResponse.json({ 
      success: true, 
      message: 'News deleted successfully' 
    });
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}
