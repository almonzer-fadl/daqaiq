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

  // Handle supplier routes
  if (pathname.startsWith('/supplier')) {
    // Skip auth check for supplier auth routes
    if (pathname.startsWith('/supplier/auth/')) {
      return NextResponse.next();
    }

    // If accessing supplier root and authenticated as supplier, redirect to dashboard
    if (pathname === '/supplier' && token?.role === 'supplier') {
      return NextResponse.redirect(new URL('/supplier/dashboard', request.url));
    }

    // If not authenticated, redirect to supplier signin
    if (!token) {
      return NextResponse.redirect(new URL('/supplier/auth/signin', request.url));
    }

    // If authenticated but not a supplier, redirect to supplier signin
    if (token.role !== 'supplier') {
      return NextResponse.redirect(new URL('/supplier/auth/signin', request.url));
    }

    return NextResponse.next();
  }

  // Handle admin routes
  if (pathname.startsWith('/admin')) {
    // Skip auth check for admin auth routes
    if (pathname.startsWith('/admin/auth/')) {
      return NextResponse.next();
    }

    // If accessing admin root and authenticated as admin, redirect to dashboard
    if (pathname === '/admin' && token?.role === 'main-admin') {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    }

    // If not authenticated, redirect to admin signin
    if (!token) {
      return NextResponse.redirect(new URL('/admin/auth/signin', request.url));
    }

    // If authenticated but not an admin, redirect to admin signin
    if (token.role !== 'main-admin') {
      return NextResponse.redirect(new URL('/admin/auth/signin', request.url));
    }

    return NextResponse.next();
  }

  // Handle customer-specific routes (not the main website)
  if (pathname.startsWith('/customer')) {
    // Skip auth check for customer auth routes
    if (pathname.startsWith('/customer/auth/')) {
      return NextResponse.next();
    }

    // If not authenticated, redirect to customer signin
    if (!token) {
      return NextResponse.redirect(new URL('/auth/signin', request.url));
    }

    // If authenticated but not a customer, redirect to customer signin
    if (token.role !== 'customer') {
      return NextResponse.redirect(new URL('/auth/signin', request.url));
    }

    return NextResponse.next();
  }

  // Allow access to all other routes (main website)
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