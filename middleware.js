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
  const { pathname } = request.nextUrl;
  
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

  // Handle domain/subdomain routing
  const hostname = request.headers.get('host');
  const isSupplierDomain = hostname.startsWith('supplier.');

  if (isSupplierDomain) {
    // Supplier subdomain handling
    if (!pathname.startsWith('/supplier') && !pathname.startsWith('/_next') && !pathname.startsWith('/api')) {
      return NextResponse.redirect(new URL('/supplier', request.url));
    }
  } else {
    // Main domain handling
    if (pathname === '/supplier') {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * 1. _next/static (static files)
     * 2. _next/image (image optimization files)
     * 3. favicon.ico (favicon file)
     * 4. public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public/|assets/).*)',
  ],
}; 