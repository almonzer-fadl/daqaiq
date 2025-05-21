import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { MAINTENANCE_MODE } from './app/config/maintenance';

export async function middleware(request) {
  const token = await getToken({ req: request });
  const { pathname, host } = request.nextUrl;

  // Public paths that don't require authentication
  const publicPaths = [
    '/auth/signin',
    '/auth/register',
    '/auth/forgot-password',
    '/auth/reset-password',
    '/auth/verify-request',
    '/api/auth',
  ];

  // Handle supplier subdomain
  if (host === 'supplier.daqaiq.com') {
    // Check if the user is trying to access the login page
    if (pathname === '/supplier' || pathname === '/supplier/') {
      return NextResponse.redirect(new URL('/supplier/auth/login', request.url));
    }

    // Check if the user is trying to access auth pages
    if (pathname.startsWith('/supplier/auth/')) {
      return NextResponse.next();
    }

    // For all other supplier routes, check authentication
    if (!token) {
      return NextResponse.redirect(new URL('/supplier/auth/login', request.url));
    }

    return NextResponse.next();
  }

  // Handle admin subdomain
  if (host === 'admin.daqaiq.com') {
    // Similar logic for admin routes
    if (pathname === '/admin' || pathname === '/admin/') {
      return NextResponse.redirect(new URL('/admin/auth/login', request.url));
    }

    if (pathname.startsWith('/admin/auth/')) {
      return NextResponse.next();
    }

    const token = await getToken({ req: request });
    if (!token) {
      return NextResponse.redirect(new URL('/admin/auth/login', request.url));
    }

    return NextResponse.next();
  }

  // Handle login path redirections
  if (pathname === '/auth/login') {
    const url = request.nextUrl.clone();
    url.pathname = '/auth/signin';
    return NextResponse.redirect(url);
  }

  // Check if maintenance mode is enabled
  if (MAINTENANCE_MODE.enabled) {
    const path = request.nextUrl.pathname;

    // Always allow authentication paths
    if (publicPaths.some(publicPath => path.startsWith(publicPath))) {
      return NextResponse.next();
    }

    // Allow specific paths even in maintenance mode
    if (MAINTENANCE_MODE.allowedPaths.some(allowedPath => path.startsWith(allowedPath))) {
      return NextResponse.next();
    }

    // Check if user is authenticated as admin
    if (token && MAINTENANCE_MODE.isAdminUser(token)) {
      return NextResponse.next();
    }

    // Check IP allowlist as a fallback
    const ip = request.headers.get('x-forwarded-for') || request.ip;
    if (MAINTENANCE_MODE.allowedIPs.includes(ip)) {
      return NextResponse.next();
    }

    // Show maintenance page for all other requests
    const url = request.nextUrl.clone();
    url.pathname = '/maintenance';
    return NextResponse.rewrite(url);
  }

  // Handle main domain
  if (host === 'daqaiq.com') {
    // Protected customer routes
    if (pathname.startsWith('/customer') && (!token || token.role !== 'customer')) {
      return NextResponse.redirect(new URL('/auth/signin', request.url));
    }
    return NextResponse.next();
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