import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  const token = await getToken({ req: request });

  // Allow all auth-related paths and static files
  if (
    pathname.includes('/auth/') ||
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') ||
    pathname.includes('/static/')
  ) {
    return NextResponse.next();
  }

  // Prevent authenticated users from accessing auth pages
  if (token && pathname.includes('/auth/')) {
    const role = token.role;
    if (role === 'supplier') {
      return NextResponse.redirect(new URL('/supplier/dashboard', request.url));
    }
    if (role === 'main-admin') {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    }
    if (role === 'customer') {
      return NextResponse.redirect(new URL('/customer/dashboard', request.url));
    }
  }

  // Handle supplier routes
  if (pathname.startsWith('/supplier')) {
    if (token?.role === 'supplier') {
      if (pathname === '/supplier') {
        return NextResponse.redirect(new URL('/supplier/dashboard', request.url));
      }
      return NextResponse.next();
    }
    const currentUrl = encodeURIComponent(pathname);
    return NextResponse.redirect(
      new URL(`/supplier/auth/signin?callbackUrl=${currentUrl}`, request.url)
    );
  }

  // Handle admin routes
  if (pathname.startsWith('/admin')) {
    if (token?.role === 'main-admin') {
      if (pathname === '/admin') {
        return NextResponse.redirect(new URL('/admin/dashboard', request.url));
      }
      return NextResponse.next();
    }
    const currentUrl = encodeURIComponent(pathname);
    return NextResponse.redirect(
      new URL(`/admin/auth/signin?callbackUrl=${currentUrl}`, request.url)
    );
  }

  // Handle customer routes
  if (pathname.startsWith('/customer')) {
    if (!token || token.role !== 'customer') {
      const currentUrl = encodeURIComponent(pathname);
      return NextResponse.redirect(
        new URL(`/auth/signin?callbackUrl=${currentUrl}`, request.url)
      );
    }
    return NextResponse.next();
  }

  // Allow access to all other routes (main website)
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/:path*',
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}; 