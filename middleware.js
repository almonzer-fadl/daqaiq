import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { MAINTENANCE_MODE } from './app/config/maintenance';

// Helper to get subdomain
function getSubdomain(host) {
  // Handle localhost or IP
  if (host.includes('localhost') || /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/.test(host)) {
    return null;
  }
  const hostParts = host.split('.');
  if (hostParts.length > 2) {
    return hostParts[0];
  }
  return null;
}

export async function middleware(request) {
  const { pathname, host } = request.nextUrl;
  
  // Check if in maintenance mode
  if (MAINTENANCE_MODE.enabled) {
    // Allow access to maintenance page and static assets
    const isAllowedPath = MAINTENANCE_MODE.allowedPaths.some(path => 
      pathname.startsWith(path) || pathname.endsWith(path)
    );

    // Get auth token from session
    const token = request.cookies.get('next-auth.session-token')?.value;
    let isAdmin = false;

    if (token) {
      try {
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        isAdmin = MAINTENANCE_MODE.isAdminUser(decodedToken);
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }

    // Check client IP
    const clientIP = request.headers.get('x-forwarded-for') || request.ip;
    const isAllowedIP = MAINTENANCE_MODE.allowedIPs.includes(clientIP);

    // If not allowed path and not admin/allowed IP, redirect to maintenance page
    if (!isAllowedPath && !isAdmin && !isAllowedIP && pathname !== '/maintenance') {
      return NextResponse.redirect(new URL('/maintenance', request.url));
    }
  }

  // Check if it's a supplier subdomain
  const isSupplierSubdomain = host.startsWith('supplier.');
  
  if (isSupplierSubdomain) {
    // Define protected routes that require authentication
    const isProtectedRoute = 
      pathname.startsWith('/supplier/dashboard') ||
      pathname.startsWith('/supplier/products') ||
      pathname.startsWith('/supplier/orders') ||
      pathname.startsWith('/supplier/analytics') ||
      pathname.startsWith('/supplier/inventory') ||
      pathname.startsWith('/supplier/profile');

    // If it's a protected route, check authentication
    if (isProtectedRoute) {
      const token = await getToken({ req: request });
      if (!token) {
        return NextResponse.redirect(new URL('/supplier/auth/signin', request.url));
      }
      if (token.role !== 'supplier') {
        return NextResponse.redirect(new URL('/', request.url));
      }
    }

    // Handle root path for supplier subdomain
    if (pathname === '/') {
      return NextResponse.rewrite(new URL('/supplier', request.url));
    }

    // Allow all other routes to pass through
    return NextResponse.next();
  } else {
    // If accessing supplier routes on main domain, redirect to supplier subdomain
    if (pathname.startsWith('/supplier')) {
      return NextResponse.redirect(new URL(pathname, `https://supplier.${host}`));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)',
    '/supplier/:path*'
  ],
}; 