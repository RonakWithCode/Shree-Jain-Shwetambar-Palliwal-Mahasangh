import { getNews, getMagazines } from '@/lib/appwrite-service';

export default async function sitemap() {
  const baseUrl = 'https://shwetambarpalliwalmahasangh.in';
  
  // Get dynamic content
  const news = await getNews();
  const magazines = await getMagazines();

  // Base routes
  const routes = [
    '',
    '/about',
    '/contact',
    '/donation',
    '/gallery',
    '/magazines',
    '/news',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'daily',
    priority: 1,
  }));

  // News routes
  const newsRoutes = news.map((item) => ({
    url: `${baseUrl}/news/${item.$id}`,
    lastModified: new Date(item.$createdAt).toISOString(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // Magazine routes
  const magazineRoutes = magazines.map((item) => ({
    url: `${baseUrl}/magazines/${item.$id}`,
    lastModified: new Date(item.$createdAt).toISOString(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...routes, ...newsRoutes, ...magazineRoutes];
} 