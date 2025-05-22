'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';

const AuthContext = createContext({
  isAuthenticated: false,
  isLoading: true,
  user: null,
  role: null,
  isSupplier: false,
  isAdmin: false,
  isCustomer: false,
});

export function AuthProvider({ children }) {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Update loading state based on session status
    setIsLoading(status === 'loading');
  }, [status]);

  const value = {
    isAuthenticated: !!session?.user,
    isLoading,
    user: session?.user,
    role: session?.user?.role,
    isSupplier: session?.user?.role === 'supplier',
    isAdmin: session?.user?.role === 'main-admin',
    isCustomer: session?.user?.role === 'customer',
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Custom hooks for specific roles
export function useSupplierAuth() {
  const { isSupplier, isLoading, user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading && !isSupplier && !pathname.startsWith('/supplier/auth/')) {
      router.push('/supplier/auth/signin');
    }
  }, [isLoading, isSupplier, router, pathname]);

  return { isSupplier, isLoading, user };
}

export function useAdminAuth() {
  const { isAdmin, isLoading, user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading && !isAdmin && !pathname.startsWith('/admin/auth/')) {
      router.push('/admin/auth/signin');
    }
  }, [isLoading, isAdmin, router, pathname]);

  return { isAdmin, isLoading, user };
}

export function useCustomerAuth() {
  const { isCustomer, isLoading, user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading && !isCustomer && pathname.startsWith('/customer/') && !pathname.startsWith('/customer/auth/')) {
      router.push('/auth/signin');
    }
  }, [isLoading, isCustomer, router, pathname]);

  return { isCustomer, isLoading, user };
} 