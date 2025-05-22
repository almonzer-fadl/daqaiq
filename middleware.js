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

  // Handle supplier routes
  if (pathname.startsWith('/supplier')) {
    // If user is already logged in as supplier, allow access
    if (token?.role === 'supplier') {
      // If at root supplier path, redirect to dashboard
      if (pathname === '/supplier') {
        return NextResponse.redirect(new URL('/supplier/dashboard', request.url));
      }
      return NextResponse.next();
    }
    // Not logged in or not a supplier, redirect to supplier signin
    const redirectUrl = new URL('/supplier/auth/signin', request.url);
    redirectUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // Handle admin routes
  if (pathname.startsWith('/admin')) {
    // If user is already logged in as admin, allow access
    if (token?.role === 'main-admin') {
      // If at root admin path, redirect to dashboard
      if (pathname === '/admin') {
        return NextResponse.redirect(new URL('/admin/dashboard', request.url));
      }
      return NextResponse.next();
    }
    // Not logged in or not an admin, redirect to admin signin
    const redirectUrl = new URL('/admin/auth/signin', request.url);
    redirectUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // Handle customer routes
  if (pathname.startsWith('/customer')) {
    if (!token || token.role !== 'customer') {
      const redirectUrl = new URL('/auth/signin', request.url);
      redirectUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(redirectUrl);
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