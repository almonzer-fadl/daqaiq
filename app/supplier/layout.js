'use client';

import { useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { signOut } from 'next-auth/react';
import Navigation from './components/Navigation';

export default function SupplierLayout({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  // Check if current path is an auth route or the landing page
  const isAuthRoute = pathname.startsWith('/auth/');
  const isLandingPage = pathname === '/';
  const isPublicRoute = isAuthRoute || isLandingPage;

  useEffect(() => {
    // Only run the auth check if we're not on a public route
    if (!isPublicRoute) {
      if (status === 'unauthenticated') {
        router.push('/auth/signin');
      } else if (status === 'authenticated' && session?.user?.role !== 'supplier') {
        signOut({ redirect: true, callbackUrl: '/auth/signin' });
      }
    }
  }, [status, session, router, isPublicRoute]);

  // Don't protect public routes
  if (isPublicRoute) {
    return children;
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (status === 'authenticated' && session?.user?.role === 'supplier') {
    return (
      <div dir="rtl" lang="ar" className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="lg:mr-64 transition-all duration-300">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-lg shadow-sm p-6">
              {children}
            </div>
          </div>
        </main>
      </div>
    );
  }

  return null;
} 