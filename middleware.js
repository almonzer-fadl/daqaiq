import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request) {
  const { pathname, host } = request.nextUrl;
  
  // Get the token
  const token = await getToken({ req: request });
  
  // If on main domain and trying to access supplier routes, redirect to supplier subdomain
  if (!host.startsWith('supplier.') && pathname.startsWith('/supplier')) {
    return NextResponse.redirect(new URL(pathname, `https://supplier.${host}`));
  }

  // Protected supplier routes
  if (pathname.startsWith('/supplier') && !pathname.startsWith('/supplier/auth')) {
    if (!token) {
      // Not authenticated, redirect to login
      return NextResponse.redirect(new URL('/supplier/auth/signin', request.url));
    }

    if (token.role !== 'supplier') {
      // Not a supplier, redirect to home
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  // Allow all other requests to pass through
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)',
    '/supplier/:path*'
  ],
}; 