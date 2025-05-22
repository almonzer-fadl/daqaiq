import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Helper to get subdomain
function getSubdomain(host) {
  const hostParts = host.split('.');
  if (hostParts.length > 2) {
    return hostParts[0];
  }
  return null;
}

export async function middleware(request) {
  const { pathname, host } = request.nextUrl;
  const subdomain = getSubdomain(host);
  const token = await getToken({ req: request });

  // Handle supplier subdomain
  if (subdomain === 'supplier') {
    // Allow access to auth pages and static files
    if (
      pathname.startsWith('/auth/') ||
      pathname.startsWith('/api/') ||
      pathname.startsWith('/_next/') ||
      pathname === '/' ||  // Allow landing page
      pathname.includes('/static/')
    ) {
      return NextResponse.next();
    }

    // For dashboard and other protected routes
    if (pathname.startsWith('/dashboard')) {
      if (!token || token.role !== 'supplier') {
        // Store the intended URL and redirect to signin
        const signinUrl = new URL('/auth/signin', request.url);
        signinUrl.searchParams.set('callbackUrl', pathname);
        return NextResponse.redirect(signinUrl);
      }
      return NextResponse.next();
    }

    // Allow access to public pages in supplier subdomain
    return NextResponse.next();
  }

  // Handle admin subdomain (similar logic as supplier)
  if (subdomain === 'admin') {
    // Similar logic as supplier, implement when needed
    return NextResponse.next();
  }

  // For main domain, allow all access
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}; 