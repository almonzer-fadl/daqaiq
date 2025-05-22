import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { MAINTENANCE_MODE } from './app/config/maintenance';

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  const token = await getToken({ req: request });

  // Debug logging
  console.log('Middleware executing:', {
    pathname,
    maintenance: MAINTENANCE_MODE.enabled,
    env: process.env.MAINTENANCE_MODE
  });

  // Check for maintenance mode FIRST, before any other routing logic
  if (MAINTENANCE_MODE.enabled) {
    console.log('Maintenance mode is enabled');
    
    // Allow access to maintenance page
    if (pathname === '/maintenance') {
      console.log('Allowing access to maintenance page');
      return NextResponse.next();
    }

    // Allow access to allowed paths (API routes, assets, etc.)
    if (MAINTENANCE_MODE.allowedPaths.some(path => pathname.startsWith(path))) {
      console.log('Allowing access to allowed path:', pathname);
      return NextResponse.next();
    }

    // Allow access if user is admin
    if (token && MAINTENANCE_MODE.isAdminUser(token)) {
      console.log('Allowing access to admin user');
      return NextResponse.next();
    }

    // Redirect all other requests to maintenance page
    const maintenanceUrl = new URL('/maintenance', request.url);
    console.log('Redirecting to maintenance page:', maintenanceUrl.toString());
    return NextResponse.redirect(maintenanceUrl);
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

  // Handle supplier routes
  if (pathname.startsWith('/supplier')) {
    // If accessing supplier root and authenticated as supplier, allow access
    if (pathname === '/supplier' && token?.role === 'supplier') {
      return NextResponse.redirect(new URL('/supplier/dashboard', request.url));
    }

    // If accessing supplier root but not authenticated, redirect to signin
    if (pathname === '/supplier' && !token) {
      return NextResponse.redirect(new URL('/supplier/auth/signin', request.url));
    }

    // Allow access to supplier public paths without authentication
    if (publicPaths.some(path => pathname.startsWith(`/supplier${path}`))) {
      return NextResponse.next();
    }

    // For all other supplier routes, check authentication
    if (!token && !pathname.startsWith('/supplier/auth/')) {
      return NextResponse.redirect(new URL('/supplier/auth/signin', request.url));
    }

    // Verify supplier role for protected routes
    if (token?.role !== 'supplier' && !pathname.startsWith('/supplier/auth/')) {
      return NextResponse.redirect(new URL('/supplier/auth/signin', request.url));
    }

    return NextResponse.next();
  }

  // Handle admin routes
  if (pathname.startsWith('/admin')) {
    // If accessing admin root and authenticated as admin, allow access
    if (pathname === '/admin' && token?.role === 'main-admin') {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    }

    // If accessing admin root but not authenticated, redirect to signin
    if (pathname === '/admin' && !token) {
      return NextResponse.redirect(new URL('/admin/auth/signin', request.url));
    }

    // Allow access to admin public paths without authentication
    if (publicPaths.some(path => pathname.startsWith(`/admin${path}`))) {
      return NextResponse.next();
    }

    // For all other admin routes, check authentication
    if (!token && !pathname.startsWith('/admin/auth/')) {
      return NextResponse.redirect(new URL('/admin/auth/signin', request.url));
    }

    // Verify admin role for protected routes
    if (token?.role !== 'main-admin' && !pathname.startsWith('/admin/auth/')) {
      return NextResponse.redirect(new URL('/admin/auth/signin', request.url));
    }

    return NextResponse.next();
  }

  // Protected customer routes
  if (pathname.startsWith('/customer') && (!token || token.role !== 'customer')) {
    return NextResponse.redirect(new URL('/auth/signin', request.url));
  }

  // If accessing the root URL
  if (pathname === '/') {
    // Redirect to the supplier signin page
    return NextResponse.redirect(new URL('/supplier/auth/signin', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all paths
    '/:path*',
    // But still exclude Next.js internal routes and static files
    '/((?!_next/static|_next/image|api|favicon.ico).*)',
  ],
}; 