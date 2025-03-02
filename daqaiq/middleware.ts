import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { withAuth } from 'next-auth/middleware';

// Separate rate limit function
async function checkRateLimit(request: NextRequest) {
  try {
    const ip = request.ip ?? '127.0.0.1';
    const response = await fetch(`${request.nextUrl.origin}/api/rate-limit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ip }),
    });

    return response.ok;
  } catch (error) {
    console.error('Rate limit check failed:', error);
    return true; // Allow request on error to prevent blocking legitimate traffic
  }
}

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')
  
  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  
  return NextResponse.next()
}

export default withAuth(
  async function middleware(request: NextRequest) {
    // Check if it's an API route
    if (request.nextUrl.pathname.startsWith('/api/')) {
      // Skip rate limiting for public routes
      if (request.nextUrl.pathname.startsWith('/api/public/')) {
        return NextResponse.next();
      }

      // Check rate limit
      const isWithinLimit = await checkRateLimit(request);
      if (!isWithinLimit) {
        return NextResponse.json(
          { error: 'Too many requests' },
          { status: 429 }
        );
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        // Always allow public routes
        if (req.nextUrl.pathname.startsWith('/api/public/')) {
          return true;
        }
        
        // Require auth for protected routes
        if (req.nextUrl.pathname.startsWith('/api/') || 
            req.nextUrl.pathname.startsWith('/dashboard/')) {
          return !!token;
        }

        return true;
      },
    },
  }
);

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
};