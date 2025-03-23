import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    // Public routes - accessible to everyone
    const publicRoutes = [
      '/',
      '/auth/signin',
      '/auth/register',
      '/auth/verify',
      '/auth/forgot-password',
      '/products',
      '/categories',
      '/search',
    ];

    if (publicRoutes.includes(path)) {
      return NextResponse.next();
    }

    // Protected routes based on user role
    if (path.startsWith('/admin') && token?.role !== 'admin') {
      return NextResponse.redirect(new URL('/auth/signin', req.url));
    }

    if (path.startsWith('/supplier') && token?.role !== 'supplier') {
      return NextResponse.redirect(new URL('/auth/signin', req.url));
    }

    if (path.startsWith('/customer') && !token) {
      return NextResponse.redirect(new URL('/auth/signin', req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

// Specify which routes should be protected
export const config = {
  matcher: [
    '/admin/:path*',
    '/supplier/:path*',
    '/customer/:path*',
    '/profile/:path*',
    '/orders/:path*',
    '/cart/:path*',
  ],
};

// Matcher configuration
export const config = {
  matcher: [
    // Match all paths except static files and api
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};

export function middleware(request) {
  const url = request.nextUrl;
  const hostname = request.headers.get('host');

  // Check if it's the supplier subdomain
  const isSupplierDomain = hostname.startsWith('supplier.');

  // Handle supplier subdomain
  if (isSupplierDomain) {
    // Remove /supplier from the path if it exists
    if (url.pathname.startsWith('/supplier')) {
      url.pathname = url.pathname.replace('/supplier', '');
    }

    // Ensure all paths are prefixed with /supplier internally
    if (!url.pathname.startsWith('/supplier') && url.pathname !== '/') {
      url.pathname = `/supplier${url.pathname}`;
    }

    return NextResponse.rewrite(url);
  }

  // Handle main domain
  if (url.pathname.startsWith('/supplier')) {
    // Redirect to supplier subdomain
    return NextResponse.redirect(
      `https://supplier.${hostname}${url.pathname.replace('/supplier', '')}`
    );
  }

  return NextResponse.next();
}