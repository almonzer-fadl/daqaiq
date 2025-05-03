import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const token = req.nextauth?.token;
    const isAdminDomain = req.headers.get('host').startsWith('admin.');
    
    // Only apply this middleware on admin subdomain
    if (!isAdminDomain) {
      return NextResponse.next();
    }

    // Allow access to auth pages without authentication
    if (req.nextUrl.pathname.startsWith('/auth')) {
      return NextResponse.next();
    }

    // For all other pages on admin domain, require admin role
    if (!token || token.role !== 'main-admin') {
      return NextResponse.redirect(new URL('/auth/login', req.url));
    }

    // If accessing root, redirect to admin dashboard
    if (req.nextUrl.pathname === '/') {
      return NextResponse.redirect(new URL('/admin', req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const isAdminDomain = req.headers.get('host').startsWith('admin.');
        
        // Only apply auth checks on admin domain
        if (!isAdminDomain) {
          return true;
        }

        // Allow auth pages without authentication
        if (req.nextUrl.pathname.startsWith('/auth')) {
          return true;
        }

        // Require admin role for all other pages
        return token?.role === 'main-admin';
      },
    },
  }
);

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}; 