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
    // For admin auth pages and setup page, allow access
    if (url.pathname.startsWith('/auth') || url.pathname === '/admin/setup') {
      return NextResponse.next();
    }

    // For admin domain, redirect to admin signin if not authenticated
    if (!token || token.role !== 'admin') {
      return NextResponse.redirect(new URL('/auth/signin', request.url));
    }

    // Handle admin routes
    if (url.pathname === '/') {
      return NextResponse.rewrite(new URL('/admin', request.url));
    }

    // Remove /admin from the path if it exists
    if (url.pathname.startsWith('/admin')) {
      url.pathname = url.pathname.replace('/admin', '');
    }

    // Ensure all internal paths are prefixed with /admin
    if (!url.pathname.startsWith('/admin') && url.pathname !== '/') {
      url.pathname = `/admin${url.pathname}`;
    }

    return NextResponse.rewrite(url);
  }

  // Handle supplier subdomain routing
  if (isSupplierDomain) {
    // For supplier auth pages, allow access
    if (url.pathname.startsWith('/auth')) {
      return NextResponse.next();
    }

    // For supplier domain, redirect to supplier signin if not authenticated
    if (!token || token.role !== 'supplier') {
      return NextResponse.redirect(new URL('/auth/signin', request.url));
    }

    // Handle supplier routes
    if (url.pathname === '/') {
      return NextResponse.rewrite(new URL('/supplier', request.url));
    }

    // Remove /supplier from the path if it exists
    if (url.pathname.startsWith('/supplier')) {
      url.pathname = url.pathname.replace('/supplier', '');
    }

    // Ensure all internal paths are prefixed with /supplier
    if (!url.pathname.startsWith('/supplier') && url.pathname !== '/') {
      url.pathname = `/supplier${url.pathname}`;
    }

    return NextResponse.rewrite(url);
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

  // Handle main domain protected routes
  if (url.pathname.startsWith('/admin') && (!token || token.role !== 'admin')) {
    return NextResponse.redirect(new URL('/auth/signin', request.url));
  }

  // Redirect supplier routes on main domain to supplier subdomain
  if (url.pathname.startsWith('/supplier')) {
    return NextResponse.redirect(new URL(url.pathname.replace('/supplier', ''), `https://supplier.${hostname}`));
  }

  // Redirect admin routes on main domain to admin subdomain
  if (url.pathname.startsWith('/admin')) {
    return NextResponse.redirect(new URL(url.pathname.replace('/admin', ''), `https://admin.${hostname}`));
  }

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
      // For supplier routes, check if user is a supplier
      if (req.nextUrl.pathname.startsWith('/supplier') && token) {
        return token.role === 'supplier';
      }
      
      // For admin routes, check if user is an admin
      if (req.nextUrl.pathname.startsWith('/admin') && token) {
        return token.role === 'admin';
      }
      
      // For protected customer routes, just check if token exists
      const protectedCustomerRoutes = ['/profile', '/orders', '/checkout'];
      if (protectedCustomerRoutes.some(route => req.nextUrl.pathname.startsWith(route))) {
        return !!token;
      }
      
      // For all other routes, allow access regardless of auth state
      return true;
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
    // Match all paths except static files, api, and setup
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};