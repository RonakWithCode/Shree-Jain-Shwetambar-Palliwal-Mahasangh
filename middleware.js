import { NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // Public routes
  if (pathname === '/admin/login' || pathname === '/api/admin/auth') {
    return NextResponse.next();
  }

  // Protected routes
  if (pathname.startsWith('/api/admin') || pathname.startsWith('/admin')) {
    const token = request.cookies.get('adminToken')?.value;

    if (!token) {
      return redirectToLogin(request);
    }

    try {
      const decoded = await verifyToken(token);
      if (!decoded) {
        return redirectToLogin(request);
      }
      return NextResponse.next();
    } catch {
      return redirectToLogin(request);
    }
  }

  return NextResponse.next();
}

function redirectToLogin(request) {
  const url = new URL('/admin/login', request.url);
  url.searchParams.set('from', request.nextUrl.pathname);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*']
};
