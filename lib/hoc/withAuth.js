'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';
import LoadingAuth from '@/app/components/LoadingAuth';

export function withAuth(WrappedComponent, requiredRole) {
  return function ProtectedRoute(props) {
    const { isAuthenticated, isLoading, role } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
      if (!isLoading && !isAuthenticated) {
        // Determine the appropriate signin route based on the required role
        let signinPath = '/auth/signin';
        if (requiredRole === 'supplier') {
          signinPath = '/supplier/auth/signin';
        } else if (requiredRole === 'main-admin') {
          signinPath = '/admin/auth/signin';
        }

        // Add the current path as a callback URL
        const searchParams = new URLSearchParams();
        searchParams.set('callbackUrl', pathname);
        router.push(`${signinPath}?${searchParams.toString()}`);
        return;
      }

      if (!isLoading && isAuthenticated && role !== requiredRole) {
        // Redirect to appropriate dashboard or home based on actual role
        if (role === 'supplier') {
          router.push('/supplier/dashboard');
        } else if (role === 'main-admin') {
          router.push('/admin/dashboard');
        } else if (role === 'customer') {
          router.push('/customer/dashboard');
        } else {
          router.push('/');
        }
      }
    }, [isLoading, isAuthenticated, role, router, pathname]);

    if (isLoading) {
      return <LoadingAuth />;
    }

    if (!isAuthenticated || role !== requiredRole) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
} 