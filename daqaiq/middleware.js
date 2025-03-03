import { NextResponse } from 'next/server';

export function middleware(request) {
  // Get maintenance mode from environment variable
  const MAINTENANCE_MODE = process.env.NEXT_PUBLIC_MAINTENANCE_MODE === 'false';
  
  // Add paths that should be accessible during maintenance
  const allowedPaths = [
    '/maintenance',
    '/api/health',
    '/favicon.ico',
    '/_next',
    '/images',
    '/static'
  ];

  if (MAINTENANCE_MODE && 
      !allowedPaths.some(path => request.nextUrl.pathname.startsWith(path))) {
    const url = request.nextUrl.clone();
    url.pathname = '/maintenance';
    return NextResponse.rewrite(url);
  }

  // Protect dashboard routes
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    const token = request.cookies.get('token');
    
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};