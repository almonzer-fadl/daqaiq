import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

// Combine authentication and subdomain handling
function middleware(request) {
  const url = request.nextUrl;
  const hostname = request.headers.get('host');
  const token = request.nextauth?.token;

  // Check if it's the supplier or admin subdomain
  const isSupplierDomain = hostname.startsWith('supplier.');
  const isAdminDomain = hostname.startsWith('admin.');

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
    '/about',
    '/contact',
    '/faq',
    '/help',
    '/cart',
    '/wishlist',
  ];

  // Handle admin subdomain routing
  if (isAdminDomain) {
    // For admin auth pages, allow access
    if (url.pathname.startsWith('/auth')) {
      return NextResponse.next();
    }

    // For admin domain, check if user has admin role
    if (!token?.roles?.includes('main-admin')) {
      return NextResponse.redirect(new URL('/auth/signin', request.url));
    }

    // Handle admin routes
    if (url.pathname === '/') {
      return NextResponse.rewrite(new URL('/admin', request.url));
    }

    return NextResponse.next();
  }

  // Handle supplier subdomain routing
  if (isSupplierDomain) {
    // For supplier auth pages, allow access
    if (url.pathname.startsWith('/auth')) {
      return NextResponse.next();
    }

    // For supplier domain, check if user has supplier role
    if (!token?.roles?.includes('supplier')) {
      return NextResponse.redirect(new URL('/auth/signin', request.url));
    }

    // Handle supplier routes
    if (url.pathname === '/') {
      return NextResponse.rewrite(new URL('/supplier', request.url));
    }

    return NextResponse.next();
  }

  // For main domain
  // Allow all public routes without authentication
  if (publicRoutes.includes(url.pathname) || url.pathname.startsWith('/api/auth')) {
    return NextResponse.next();
  }

  // Protected customer routes that require authentication
  const protectedCustomerRoutes = [
    '/profile',
    '/orders',
    '/checkout',
  ];

  // Handle protected customer routes
  if (protectedCustomerRoutes.some(route => url.pathname.startsWith(route)) && !token) {
    return NextResponse.redirect(new URL('/auth/signin', request.url));
  }

  // Allow all other routes
  return NextResponse.next();
}

export default withAuth(middleware, {
  callbacks: {
    authorized: ({ token, req }) => {
      const hostname = req.headers.get('host');
      const isSupplierDomain = hostname.startsWith('supplier.');
      const isAdminDomain = hostname.startsWith('admin.');

      if (!token) {
        // Allow access to public routes without authentication
        return req.nextUrl.pathname.startsWith('/auth') || 
               req.nextUrl.pathname === '/' ||
               req.nextUrl.pathname.startsWith('/api/auth');
      }

      // Domain-specific role checks
      if (isAdminDomain) {
        return token.roles?.includes('main-admin');
      }
      
      if (isSupplierDomain) {
        return token.roles?.includes('supplier');
      }

      // For main domain, check protected routes
      const protectedCustomerRoutes = ['/profile', '/orders', '/checkout'];
      if (protectedCustomerRoutes.some(route => req.nextUrl.pathname.startsWith(route))) {
        return true; // Allow any authenticated user
      }
      
      return true; // Allow access to other main domain routes
    },
  },
});

// Combined matcher configuration
export const config = {
  matcher: [
    // Protected routes
    '/admin/:path*',
    '/supplier/:path*',
    '/profile/:path*',
    '/orders/:path*',
    '/checkout/:path*',
    // Auth routes
    '/auth/:path*',
    // Match all paths except static files and api
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};