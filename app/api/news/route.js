import { connectDB } from '@/lib/mongodb';
import News from '@/models/News';

export async function GET() {
  try {
    await connectDB();
    
    const news = await News.find({ active: true })
      .sort({ createdAt: -1 })
      .limit(10);
    
    return Response.json(news);
  } catch (error) {
    return Response.json(
      { error: 'Failed to fetch news' },
      { status: 500 }
    );
  }
}

