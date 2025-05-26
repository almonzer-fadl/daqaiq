import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  
  // Skip middleware for non-supplier routes
  if (!pathname.startsWith('/supplier')) {
    return NextResponse.next();
  }

  // Skip auth check for public routes
  if (pathname.startsWith('/supplier/auth/')) {
    return NextResponse.next();
  }

  // Get the token
  const token = await getToken({ req: request });

  // Not authenticated
  if (!token) {
    return NextResponse.redirect(new URL('/supplier/auth/signin', request.url));
  }

  // Not a supplier
  if (token.role !== 'supplier') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/supplier/:path*']
}; 