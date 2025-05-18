import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { MAINTENANCE_MODE } from './app/config/maintenance';

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
    '/auth/signin',
    '/auth/register',
    '/auth/forgot-password',
    '/auth/reset-password',
    '/auth/verify-request',
    '/api/auth',
  ];

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

  // Handle supplier subdomain
  if (isSupplierDomain) {
    // Allow public paths without authentication
    if (publicPaths.some(path => pathname.startsWith(path))) {
      return NextResponse.next();
    }

    // Check authentication
    if (!token) {
      return NextResponse.redirect(new URL('/auth/signin', request.url));
    }

    // Verify supplier role
    if (token.role !== 'supplier') {
      return NextResponse.redirect(new URL('https://daqaiq.com/auth/signin', request.url));
    }

    return NextResponse.next();
  }

  // Handle admin subdomain
  if (isAdminDomain) {
    // Allow public paths without authentication
    if (publicPaths.some(path => pathname.startsWith(path))) {
      return NextResponse.next();
    }

    // Check authentication
    if (!token) {
      return NextResponse.redirect(new URL('/auth/signin', request.url));
    }

    // Verify admin role
    if (token.role !== 'main-admin') {
      return NextResponse.redirect(new URL('https://daqaiq.com/auth/signin', request.url));
    }

    return NextResponse.next();
  }

  // Handle main domain
  if (isMainDomain) {
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
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}; 