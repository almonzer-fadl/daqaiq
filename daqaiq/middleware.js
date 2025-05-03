import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request) {
  const token = await getToken({ req: request });
  const { pathname } = request.nextUrl;

  // Public paths that don't require authentication
  const publicPaths = [
    '/auth/signin',
    '/auth/register',
    '/auth/forgot-password',
    '/auth/reset-password',
    '/auth/verify-request',
  ];

  // Check if the path is public
  if (publicPaths.some(path => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // Protected routes logic
  if (pathname.startsWith('/supplier')) {
    if (!token || token.role !== 'supplier') {
      return NextResponse.redirect(new URL('/auth/signin', request.url));
    }
  }

  if (pathname.startsWith('/admin')) {
    if (!token || token.role !== 'admin') {
      return NextResponse.redirect(new URL('/auth/signin', request.url));
    }
  }

  if (!token) {
    return NextResponse.redirect(new URL('/auth/signin', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/supplier/:path*',
    '/admin/:path*',
    '/auth/:path*',
  ],
}; 