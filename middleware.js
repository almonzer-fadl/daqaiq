import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { MAINTENANCE_MODE } from './app/config/maintenance';

export async function middleware(request) {
  const { pathname, host } = request.nextUrl;
  const token = await getToken({ req: request });
  const isLocalhost = host === 'localhost:3000';

  // Check for maintenance mode FIRST, before any other routing logic
  if (MAINTENANCE_MODE.enabled) {
    // Allow access to maintenance page
    if (pathname === '/maintenance') {
      return NextResponse.next();
    }

    // Allow access to allowed paths (API routes, assets, etc.)
    if (MAINTENANCE_MODE.allowedPaths.some(path => pathname.startsWith(path))) {
      return NextResponse.next();
    }

    // Allow access if user is admin
    if (token && MAINTENANCE_MODE.isAdminUser(token)) {
      return NextResponse.next();
    }

    // Redirect all other requests to maintenance page
    return NextResponse.redirect(new URL('/maintenance', request.url));
  }

  // Public paths that don't require authentication
  const publicPaths = [
    '/auth/signin',
    '/auth/register',
    '/auth/forgot-password',
    '/auth/reset-password',
    '/auth/verify-request',
    '/api/auth',
  ];

  // Handle supplier routes (both localhost and production)
  if (host === 'supplier.daqaiq.com' || (isLocalhost && pathname.startsWith('/supplier'))) {
    const supplierPath = isLocalhost ? pathname.replace('/supplier', '') : pathname;

    // If accessing root path and authenticated as supplier, allow access to dashboard
    if ((supplierPath === '/' || supplierPath === '') && token?.role === 'supplier') {
      return NextResponse.next();
    }

    // If accessing root path but not authenticated, redirect to signin
    if ((supplierPath === '/' || supplierPath === '') && !token) {
      return NextResponse.redirect(new URL('/auth/signin', request.url));
    }

    // Allow access to public paths without authentication
    if (publicPaths.some(path => supplierPath.startsWith(path))) {
      return NextResponse.next();
    }

    // For all other supplier routes, check authentication
    if (!token) {
      return NextResponse.redirect(new URL('/auth/signin', request.url));
    }

    // Verify supplier role
    if (token.role !== 'supplier') {
      return NextResponse.redirect(new URL(isLocalhost ? '/auth/signin' : 'https://daqaiq.com/auth/signin', request.url));
    }

    return NextResponse.next();
  }

  // Handle admin routes (both localhost and production)
  if (host === 'admin.daqaiq.com' || (isLocalhost && pathname.startsWith('/admin'))) {
    const adminPath = isLocalhost ? pathname.replace('/admin', '') : pathname;
    
    // If accessing root path and authenticated as admin, allow access to dashboard
    if ((adminPath === '/' || adminPath === '') && token?.role === 'main-admin') {
      return NextResponse.next();
    }

    // If accessing root path but not authenticated, redirect to signin
    if ((adminPath === '/' || adminPath === '') && !token) {
      return NextResponse.redirect(new URL('/auth/signin', request.url));
    }

    // Allow access to public paths without authentication
    if (publicPaths.some(path => adminPath.startsWith(path))) {
      return NextResponse.next();
    }

    // For all other admin routes, check authentication
    if (!token) {
      return NextResponse.redirect(new URL('/auth/signin', request.url));
    }

    // Verify admin role
    if (token.role !== 'main-admin') {
      return NextResponse.redirect(new URL(isLocalhost ? '/auth/signin' : 'https://daqaiq.com/auth/signin', request.url));
    }

    return NextResponse.next();
  }

  // Handle main domain and localhost root
  if (host === 'daqaiq.com' || isLocalhost) {
    // If someone tries to access supplier routes on main domain
    if (pathname.startsWith('/supplier/')) {
      return NextResponse.redirect(new URL(
        isLocalhost ? pathname : 'https://supplier.daqaiq.com' + pathname.replace('/supplier', ''),
        request.url
      ));
    }

    // If someone tries to access admin routes on main domain
    if (pathname.startsWith('/admin/')) {
      return NextResponse.redirect(new URL(
        isLocalhost ? pathname : 'https://admin.daqaiq.com' + pathname.replace('/admin', ''),
        request.url
      ));
    }

    // Protected customer routes
    if (pathname.startsWith('/customer') && (!token || token.role !== 'customer')) {
      return NextResponse.redirect(new URL('/auth/signin', request.url));
    }

    return NextResponse.next();
  }

  // For any other domain, redirect to main site
  if (!host.includes('daqaiq.com') && !isLocalhost) {
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