import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export async function middleware(request) {
  const token = await getToken({ req: request });
  const { pathname, origin, host } = request.nextUrl;

  // Check if the request is for the supplier subdomain
  const isSupplierDomain = host.startsWith('supplier.');
  
  // Check if the request is for the admin subdomain
  const isAdminDomain = host.startsWith('admin.');

  // Public paths that don't require authentication
  const publicPaths = [
    '/auth/signin',
    '/auth/signup',
    '/auth/forgot-password',
    '/auth/reset-password',
    '/api/auth',
    '/api/supplier-auth',
    '/api/admin-auth',
    '/api/customer-auth',
  ];
  
  // Check if the current path is public
  if (publicPaths.some(path => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // If no token and not on a public path, redirect to signin
  if (!token) {
    const callbackUrl = encodeURIComponent(request.url);
    return NextResponse.redirect(
      `${origin}/auth/signin?callbackUrl=${callbackUrl}`
    );
  }

  // Handle supplier domain access
  if (isSupplierDomain) {
    if (!token.roles?.includes('supplier')) {
      return NextResponse.redirect(`${origin}/auth/signin?error=AccessDenied`);
    }
  }

  // Handle admin domain access
  if (isAdminDomain) {
    if (!token.roles?.includes('main-admin')) {
      return NextResponse.redirect(`${origin}/auth/signin?error=AccessDenied`);
    }
  }

  // For main domain, allow access to users with any role
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * 1. _next/static (static files)
     * 2. _next/image (image optimization files)
     * 3. favicon.ico (favicon file)
     * 4. public folder
     * 5. public assets
     */
    '/((?!_next/static|_next/image|favicon.ico|public|assets|images).*)',
  ],
} 