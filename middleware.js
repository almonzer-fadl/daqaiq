import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

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
  const subdomain = getSubdomain(host);
  const token = await getToken({ req: request });

  // Handle supplier subdomain
  if (subdomain === 'supplier') {
    // If trying to access main store routes from supplier subdomain, redirect to main domain
    if (pathname.startsWith('/store') || pathname.startsWith('/products') || pathname.startsWith('/cart')) {
      const mainDomain = host.replace('supplier.', '');
      return NextResponse.redirect(new URL(pathname, `https://${mainDomain}`));
    }

    // Allow access to auth pages and static files
    if (
      pathname.startsWith('/auth/') ||
      pathname.startsWith('/api/auth/') ||
      pathname.startsWith('/_next/') ||
      pathname === '/' ||  // Allow landing page
      pathname.includes('/static/')
    ) {
      return NextResponse.next();
    }

    // For dashboard and other protected routes
    if (pathname.startsWith('/dashboard')) {
      if (!token || token.role !== 'supplier') {
        // Store the intended URL and redirect to signin
        const signinUrl = new URL('/auth/signin', request.url);
        signinUrl.searchParams.set('callbackUrl', pathname);
        return NextResponse.redirect(signinUrl);
      }
      return NextResponse.next();
    }

    // Allow access to public pages in supplier subdomain
    return NextResponse.next();
  }

  // Handle main domain (no subdomain)
  if (!subdomain) {
    // If trying to access supplier routes from main domain, redirect to supplier subdomain
    if (pathname.startsWith('/dashboard') || pathname.startsWith('/auth/supplier')) {
      return NextResponse.redirect(new URL(pathname, `https://supplier.${host}`));
    }

    // If accessing root path on main domain, show the store home page
    if (pathname === '/') {
      return NextResponse.rewrite(new URL('/store', request.url));
    }

    return NextResponse.next();
  }

  // Handle admin subdomain (similar logic as supplier)
  if (subdomain === 'admin') {
    // Similar logic as supplier, implement when needed
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}; 