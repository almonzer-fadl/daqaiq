import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { MAINTENANCE_MODE } from './app/config/maintenance';

export async function middleware(request) {
  const { pathname, host } = request.nextUrl;
  const token = await getToken({ req: request });

  // Public paths that don't require authentication
  const publicPaths = [
    '/supplier/auth/login',
    '/supplier/auth/register',
    '/supplier/auth/forgot-password',
    '/supplier/auth/reset-password',
    '/supplier/auth/verify-request',
    '/api/auth',
  ];

  // Handle supplier subdomain
  if (host === 'supplier.daqaiq.com') {
    // If accessing the root of supplier subdomain
    if (pathname === '/' || pathname === '') {
      return NextResponse.redirect(new URL('/supplier/auth/login', request.url));
    }

    // Allow access to public paths without authentication
    if (publicPaths.some(path => pathname.startsWith(path))) {
      return NextResponse.next();
    }

    // For all other supplier routes, check authentication
    if (!token) {
      const loginUrl = new URL('/supplier/auth/login', request.url);
      loginUrl.searchParams.set('callbackUrl', request.url);
      return NextResponse.redirect(loginUrl);
    }

    // Verify supplier role
    if (token.role !== 'supplier') {
      return NextResponse.redirect(new URL('/supplier/auth/login', request.url));
    }

    return NextResponse.next();
  }

  // Handle admin subdomain
  if (host === 'admin.daqaiq.com') {
    if (pathname === '/' || pathname === '') {
      return NextResponse.redirect(new URL('/admin/auth/login', request.url));
    }

    if (pathname.startsWith('/admin/auth/')) {
      return NextResponse.next();
    }

    if (!token) {
      const loginUrl = new URL('/admin/auth/login', request.url);
      loginUrl.searchParams.set('callbackUrl', request.url);
      return NextResponse.redirect(loginUrl);
    }

    if (token.role !== 'main-admin') {
      return NextResponse.redirect(new URL('/admin/auth/login', request.url));
    }

    return NextResponse.next();
  }

  // Handle main domain
  if (host === 'daqaiq.com') {
    // If someone tries to access supplier routes on main domain
    if (pathname.startsWith('/supplier/')) {
      return NextResponse.redirect(new URL('https://supplier.daqaiq.com' + pathname, request.url));
    }

    // If someone tries to access admin routes on main domain
    if (pathname.startsWith('/admin/')) {
      return NextResponse.redirect(new URL('https://admin.daqaiq.com' + pathname, request.url));
    }

    // Protected customer routes
    if (pathname.startsWith('/customer') && (!token || token.role !== 'customer')) {
      return NextResponse.redirect(new URL('/auth/signin', request.url));
    }

    return NextResponse.next();
  }

  // For any other domain, redirect to main site
  if (!host.includes('daqaiq.com')) {
    return NextResponse.redirect(new URL('https://daqaiq.com', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
}; 