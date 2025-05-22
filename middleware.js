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

  // Always allow access to auth-related paths and API routes
  if (
    pathname.includes('/auth/') ||
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') ||
    pathname.includes('/static/')
  ) {
    return NextResponse.next();
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

    // If not authenticated or not a supplier, redirect to supplier signin
    if (!token || token.role !== 'supplier') {
      const signinUrl = new URL('/supplier/auth/signin', request.url);
      // Preserve the original URL as the callback
      signinUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(signinUrl);
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

    // If not authenticated or not an admin, redirect to admin signin
    if (!token || token.role !== 'main-admin') {
      const signinUrl = new URL('/admin/auth/signin', request.url);
      signinUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(signinUrl);
    }

    return NextResponse.next();
  }

  // Handle customer-specific routes (not the main website)
  if (pathname.startsWith('/customer')) {
    // Skip auth check for customer auth routes
    if (pathname.startsWith('/customer/auth/')) {
      return NextResponse.next();
    }

    // If not authenticated or not a customer, redirect to customer signin
    if (!token || token.role !== 'customer') {
      const signinUrl = new URL('/auth/signin', request.url);
      signinUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(signinUrl);
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