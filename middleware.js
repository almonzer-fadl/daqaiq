import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request) {
  const { pathname, host } = request.nextUrl;
  
  // Get the token
  const token = await getToken({ req: request });
  
  // Handle supplier routes
  if (pathname.startsWith('/supplier')) {
    // Skip auth check for login-related pages
    if (pathname.startsWith('/supplier/auth/')) {
      return NextResponse.next();
    }

    // Check authentication for protected routes
    if (!token) {
      return NextResponse.redirect(new URL('/supplier/auth/signin', request.url));
    }

    // Check role for protected routes
    if (token.role !== 'supplier') {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/supplier/:path*'
  ],
}; 