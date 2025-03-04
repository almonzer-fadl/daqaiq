import { NextResponse } from 'next/server';

export function middleware(request) {
  // Keep only maintenance mode logic
  const MAINTENANCE_MODE = process.env.NEXT_PUBLIC_MAINTENANCE_MODE === 'true';
  
  const allowedPaths = [
    '/maintenance',
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
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};