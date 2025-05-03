import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const token = req.nextauth?.token;
    const isSupplierDomain = req.headers.get('host').startsWith('supplier.');
    
    // Only apply this middleware on supplier subdomain
    if (!isSupplierDomain) {
      return NextResponse.next();
    }

    // Allow access to auth pages without authentication
    if (req.nextUrl.pathname.startsWith('/auth')) {
      return NextResponse.next();
    }

    // For all other pages on supplier domain, require supplier role
    if (!token || token.role !== 'supplier') {
      return NextResponse.redirect(new URL('/auth/login', req.url));
    }

    // If accessing root, redirect to supplier dashboard
    if (req.nextUrl.pathname === '/') {
      return NextResponse.redirect(new URL('/supplier', req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const isSupplierDomain = req.headers.get('host').startsWith('supplier.');
        
        // Only apply auth checks on supplier domain
        if (!isSupplierDomain) {
          return true;
        }

        // Allow auth pages without authentication
        if (req.nextUrl.pathname.startsWith('/auth')) {
          return true;
        }

        // Require supplier role for all other pages
        return token?.role === 'supplier';
      },
    },
  }
);

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}; 