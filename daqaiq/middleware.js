import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

// Combine authentication and subdomain handling
function middleware(request) {
  const url = request.nextUrl;
  const hostname = request.headers.get('host');
  const token = request.nextauth?.token;

  // Check if it's the supplier subdomain
  const isSupplierDomain = hostname.startsWith('supplier.');

  // Handle supplier subdomain routing
  if (isSupplierDomain) {
    // Always rewrite root to /supplier
    if (url.pathname === '/') {
      return NextResponse.rewrite(new URL('/supplier', request.url));
    }

    // For auth routes, allow access
    if (url.pathname.startsWith('/auth')) {
      return NextResponse.next();
    }

    // For non-auth routes, check if user has supplier role
    if (!token?.roles?.includes('supplier')) {
      return NextResponse.redirect(new URL('/auth/signin', request.url));
    }

    return NextResponse.next();
  }

  // For main domain, allow all routes
  return NextResponse.next();
}

export default withAuth(middleware, {
  callbacks: {
    authorized: ({ token, req }) => {
      const hostname = req.headers.get('host');
      const isSupplierDomain = hostname.startsWith('supplier.');

      if (!token) {
        // Allow access to auth routes without authentication
        return req.nextUrl.pathname.startsWith('/auth');
      }

      // For supplier domain, check supplier role
      if (isSupplierDomain) {
        return token.roles?.includes('supplier');
      }

      return true;
    },
  },
});

// Combined matcher configuration
export const config = {
  matcher: [
    '/supplier/:path*',
    '/auth/:path*',
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};