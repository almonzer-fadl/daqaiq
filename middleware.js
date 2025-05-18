import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request) {
  const token = await getToken({ req: request });
  const { pathname } = request.nextUrl;
  const host = request.headers.get('host');

  // Determine the domain type
  const isSupplierDomain = host.startsWith('supplier.');
  const isAdminDomain = host.startsWith('admin.');
  const isMainDomain = !isSupplierDomain && !isAdminDomain;

  // Public paths that don't require authentication
  const publicPaths = [
    '/auth/login',
    '/auth/signin',
    '/auth/register',
    '/auth/forgot-password',
    '/auth/reset-password',
    '/auth/verify-request',
    '/api/auth',
  ];

  // Check if the path is public
  if (publicPaths.some(path => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // Handle supplier subdomain
  if (isSupplierDomain) {
    if (!token) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
    if (token.role !== 'supplier') {
      return NextResponse.redirect(new URL('https://daqaiq.com/auth/login', request.url));
    }
    if (pathname === '/') {
      return NextResponse.redirect(new URL('/supplier', request.url));
    }
  }

  // Handle admin subdomain
  if (isAdminDomain) {
    if (!token) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
    if (token.role !== 'main-admin') {
      return NextResponse.redirect(new URL('https://daqaiq.com/auth/login', request.url));
    }
    if (pathname === '/') {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }

  // Handle main domain
  if (isMainDomain) {
    // Protected customer routes
    if (pathname.startsWith('/customer') && (!token || token.role !== 'customer')) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}; 