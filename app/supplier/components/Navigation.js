'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { SUPPLIER_TRANSLATIONS as t } from '@/constants/translations';

export default function Navigation() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/auth/signin' });
  };

  const navigation = [
    { name: t.dashboard, href: '/', icon: '📊' },
    { name: t.products, href: '/supplier/products', icon: '📦' },
    { name: t.orders, href: '/supplier/orders', icon: '🛍️' },
    { name: t.inventory, href: '/supplier/inventory', icon: '📋' },
    { name: t.analytics, href: '/supplier/analytics', icon: '📈' },
  ];

  const isActive = (path) => pathname === path;

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden bg-white p-2 rounded-md shadow-md"
      >
        <svg
          className="h-6 w-6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {isMobileMenuOpen ? (
            <path d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full bg-white shadow-lg transition-all duration-300 z-40 ${
          isSidebarOpen ? 'w-64' : 'w-20'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo and Toggle */}
          <div className="flex items-center justify-between p-4 border-b">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold text-blue-600">دقائق</span>
            </Link>
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-md hover:bg-gray-100"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isSidebarOpen ? (
                  <path d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                ) : (
                  <path d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                )}
              </svg>
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 overflow-y-auto py-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-4 py-3 text-sm font-medium ${
                  isActive(item.href)
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <span className="ml-3">{item.icon}</span>
                {isSidebarOpen && <span>{item.name}</span>}
              </Link>
            ))}
          </nav>

          {/* User Profile Section - Clickable */}
          <Link href="/supplier/profile" className="border-t p-4 hover:bg-gray-50">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-lg">
                    {session?.user?.name?.[0]?.toUpperCase() || '👤'}
                  </span>
                </div>
              </div>
              {isSidebarOpen && (
                <div className="mr-3">
                  <p className="text-sm font-medium text-gray-700">
                    {session?.user?.name}
                  </p>
                  <p className="text-xs text-gray-500">{session?.user?.email}</p>
                  <p className="text-xs text-blue-500 mt-1">{t.editProfile}</p>
                </div>
              )}
            </div>
          </Link>

          {/* Logout Button */}
          <div className="p-4 border-t">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-3 text-gray-700 rounded-lg hover:bg-red-50 hover:text-red-700"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span className="mr-4">{t.logout}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Backdrop */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 z-40 lg:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b">
            <Link href="/supplier" className="flex items-center">
              <span className="text-xl font-bold text-blue-600">دقائق</span>
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 rounded-md hover:bg-gray-100"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto py-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-4 py-3 text-sm font-medium ${
                  isActive(item.href)
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="ml-3">{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>

          {/* User Profile Section - Clickable */}
          <Link href="/supplier/profile" className="border-t p-4 hover:bg-gray-50" onClick={() => setIsMobileMenuOpen(false)}>
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-lg">
                    {session?.user?.name?.[0]?.toUpperCase() || '👤'}
                  </span>
                </div>
              </div>
              <div className="mr-3">
                <p className="text-sm font-medium text-gray-700">
                  {session?.user?.name}
                </p>
                <p className="text-xs text-gray-500">{session?.user?.email}</p>
                <p className="text-xs text-blue-500 mt-1">{t.editProfile}</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
} 