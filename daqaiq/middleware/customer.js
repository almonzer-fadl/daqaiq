import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const token = req.nextauth?.token;
    const isMainDomain = !req.headers.get('host').startsWith('supplier.') && !req.headers.get('host').startsWith('admin.');
    
    // Only apply this middleware on main domain
    if (!isMainDomain) {
      return NextResponse.next();
    }

    // Public routes that don't require authentication
    const publicRoutes = [
      '/',
      '/about',
      '/contact',
      '/products',
      '/category',
      '/auth',
      '/services',
      '/location',
      '/faq'
    ];

    // Check if the current path starts with any public route
    const isPublicRoute = publicRoutes.some(route => 
      req.nextUrl.pathname === route || req.nextUrl.pathname.startsWith(`${route}/`)
    );

    if (isPublicRoute) {
      return NextResponse.next();
    }

    // For protected customer routes, require customer role
    if (!token || token.role !== 'customer') {
      return NextResponse.redirect(new URL('/auth/login', req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const isMainDomain = !req.headers.get('host').startsWith('supplier.') && !req.headers.get('host').startsWith('admin.');
        
        // Only apply auth checks on main domain
        if (!isMainDomain) {
          return true;
        }

        // Public routes that don't require authentication
        const publicRoutes = [
          '/',
          '/about',
          '/contact',
          '/products',
          '/category',
          '/auth',
          '/services',
          '/location',
          '/faq'
        ];

        // Check if the current path starts with any public route
        const isPublicRoute = publicRoutes.some(route => 
          req.nextUrl.pathname === route || req.nextUrl.pathname.startsWith(`${route}/`)
        );

        if (isPublicRoute) {
          return true;
        }

        // For protected customer routes, require customer role
        return token?.role === 'customer';
      },
    },
  }
);

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}; 