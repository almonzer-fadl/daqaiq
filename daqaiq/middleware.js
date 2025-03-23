import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

// Combine authentication and subdomain handling
function middleware(request) {
  const url = request.nextUrl;
  const hostname = request.headers.get('host');
  const token = request.nextauth?.token;

  // Check if it's the supplier subdomain
  const isSupplierDomain = hostname.startsWith('supplier.');

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

  if (publicRoutes.includes(url.pathname)) {
    return NextResponse.next();
  }

  // Handle supplier subdomain routing
  if (isSupplierDomain) {
    // Check if user is authenticated and is a supplier
    if (!token || token.role !== 'supplier') {
      return NextResponse.redirect(new URL('/auth/signin/supplier', url));
    }

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

  // Handle main domain protected routes
  if (url.pathname.startsWith('/admin') && token?.role !== 'admin') {
    return NextResponse.redirect(new URL('/auth/signin', url));
  }

  if (url.pathname.startsWith('/supplier')) {
    // Redirect supplier routes to subdomain
    return NextResponse.redirect(
      `https://supplier.${hostname}${url.pathname.replace('/supplier', '')}`
    );
  }

  if (url.pathname.startsWith('/customer') && !token) {
    return NextResponse.redirect(new URL('/auth/signin', url));
  }

  return NextResponse.next();
}

export default withAuth(middleware, {
  callbacks: {
    authorized: ({ token }) => !!token,
  },
});

// Combined matcher configuration
export const config = {
  matcher: [
    // Protected routes
    '/admin/:path*',
    '/supplier/:path*',
    '/customer/:path*',
    '/profile/:path*',
    '/orders/:path*',
    '/cart/:path*',
    // Match all paths except static files and api
    '/((?!api|_next/static|_next/image|favicon.ico|auth).*)',
  ],
};