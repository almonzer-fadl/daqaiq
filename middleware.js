import { NextResponse } from 'next/server';

export async function middleware(request) {
  const { pathname, host } = request.nextUrl;
  
  // If on main domain and trying to access supplier routes, redirect to supplier subdomain
  if (!host.startsWith('supplier.') && pathname.startsWith('/supplier')) {
    return NextResponse.redirect(new URL(pathname, `https://supplier.${host}`));
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