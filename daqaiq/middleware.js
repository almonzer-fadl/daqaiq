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