import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(request) {
  const { pathname, host, protocol } = request.nextUrl;
  
  // Get the token with the correct domain configuration
  const token = await getToken({ 
    req: request,
    secret,
    secureCookie: process.env.NODE_ENV === 'production'
  });
  
  // Handle supplier subdomain logic
  const isSupplierDomain = host.startsWith('supplier.');
  const isSupplierPath = pathname.startsWith('/supplier');

  // If on main domain and trying to access supplier routes, redirect to supplier subdomain
  if (!isSupplierDomain && isSupplierPath) {
    const url = new URL(pathname, `${protocol}//supplier.${host}`);
    // Preserve query parameters and hash
    url.search = request.nextUrl.search;
    url.hash = request.nextUrl.hash;
    return NextResponse.redirect(url);
  }

  // If on supplier subdomain but not on a supplier path, add /supplier prefix
  if (isSupplierDomain && !isSupplierPath && !pathname.startsWith('/api/')) {
    const url = new URL(`/supplier${pathname}`, request.url);
    url.search = request.nextUrl.search;
    url.hash = request.nextUrl.hash;
    return NextResponse.redirect(url);
  }

  // Protected supplier routes
  if (isSupplierPath && !pathname.startsWith('/supplier/auth')) {
    if (!token) {
      // Not authenticated, redirect to login
      const url = new URL('/supplier/auth/signin', request.url);
      url.searchParams.set('callbackUrl', encodeURIComponent(request.url));
      return NextResponse.redirect(url);
    }

    if (token.role !== 'supplier') {
      // Not a supplier, redirect to home
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  // Allow all other requests to pass through
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)',
    '/supplier/:path*'
  ],
}; 