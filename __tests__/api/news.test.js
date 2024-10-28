import { describe, it, expect, beforeAll, afterAll } from 'jest';
import { connectDB } from '../../lib/mongodb';
import News from '../../models/News';

describe('News API', () => {
  beforeAll(async () => {
    await connectDB();
  });

  afterAll(async () => {
    // Cleanup after tests
    await News.deleteMany({});
  });

  it('should fetch news items', async () => {
    const response = await fetch('/api/news');
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBeGreaterThan(0);
  });
});

