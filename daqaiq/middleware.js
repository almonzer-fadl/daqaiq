import { NextResponse } from 'next/server';

export function middleware(request) {
  // Set this to true to enable maintenance mode
  const MAINTENANCE_MODE = false;
  
  // Add paths that should be accessible during maintenance
  const allowedPaths = [
    '/maintenance',
    '/api/health', // If you have a health check endpoint
    '/favicon.ico',
  ];

  if (MAINTENANCE_MODE && !allowedPaths.includes(request.nextUrl.pathname)) {
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
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};