'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { SUPPLIER_TRANSLATIONS as t } from '../constants/translations';

export default function SupplierLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const pathname = usePathname();
  const { data: session, status } = useSession();

  const navigation = [
    { name: t.dashboard, href: '/supplier', icon: '📊' },
    { name: t.products, href: '/supplier/products', icon: '📦' },
    { name: t.orders, href: '/supplier/orders', icon: '🛍️' },
    { name: t.inventory, href: '/supplier/inventory', icon: '📋' },
    { name: t.analytics, href: '/supplier/analytics', icon: '📈' },
  ];

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' });
  };

  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!session || session.user.role !== 'supplier') {
    redirect('/auth/signin');
  }

  return (
    <div dir="rtl" className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 right-0 z-50 w-64 bg-white border-l transform lg:transform-none lg:opacity-100 ${
        isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
      } transition-transform duration-300 ease-in-out`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-4 border-b">
            <Link href="/supplier" className="text-xl font-bold text-gray-800">
              {t.supplierPortal}
            </Link>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="p-2 rounded-md lg:hidden"
            >
              ✕
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-2 py-4 space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                    isActive
                      ? 'bg-indigo-50 text-indigo-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <span className="ml-3">{item.icon}</span>
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Profile */}
          <div className="flex items-center justify-between p-4 border-t">
            <Link 
              href="/supplier/profile"
              className="flex items-center group hover:bg-gray-50 rounded-lg p-2 transition-colors duration-200"
            >
              <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div className="mr-3">
                <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">{t.profile}</p>
                <p className="text-xs text-gray-500 group-hover:text-gray-700">{t.viewDetails}</p>
              </div>
            </Link>
            <button
              onClick={handleSignOut}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200"
              title={t.signOut}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile sidebar toggle */}
      {!isSidebarOpen && (
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="fixed p-4 text-gray-500 bg-white rounded-l-lg shadow-lg top-4 right-0 lg:hidden"
        >
          ☰
        </button>
      )}

      {/* Main content */}
      <div className={`${isSidebarOpen ? 'lg:pr-64' : ''} flex flex-col min-h-screen`}>
        <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  );
} 