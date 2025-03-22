'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SUPPLIER_TRANSLATIONS as t } from '@/app/constants/arabic';

export default function Navigation() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const pathname = usePathname();

  const navigation = [
    { name: t.dashboard, href: '/supplier/dashboard', icon: '📊' },
    { name: t.products, href: '/supplier/products', icon: '📦' },
    { name: t.inventory, href: '/supplier/inventory', icon: '🏭' },
    { name: t.orders, href: '/supplier/orders', icon: '📝' },
    { name: t.analytics, href: '/supplier/analytics', icon: '📈' },
    { name: t.profile, href: '/supplier/profile', icon: '👤' },
  ];

  return (
    <>
      {/* Mobile menu button */}
      <button
        type="button"
        className="lg:hidden fixed top-4 right-4 z-50 p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <span className="sr-only">{isSidebarOpen ? 'إغلاق القائمة' : 'فتح القائمة'}</span>
        {isSidebarOpen ? '✕' : '☰'}
      </button>

      {/* Sidebar */}
      <div className={`fixed inset-y-0 right-0 z-40 w-64 bg-white border-l transform lg:transform-none lg:opacity-100 ${
        isSidebarOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'
      } transition-transform duration-300 ease-in-out`}>
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="flex items-center justify-center h-16 border-b">
            <Link href="/supplier/dashboard" className="text-xl font-bold text-blue-600">
              لوحة المورد
            </Link>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 px-4 py-4 space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                    isActive
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <span className="ml-3">{item.icon}</span>
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* User Menu */}
          <div className="border-t p-4">
            <button
              onClick={() => signOut({ callbackUrl: '/auth/signin' })}
              className="w-full flex items-center px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-md"
            >
              <span className="ml-3">🚪</span>
              تسجيل الخروج
            </button>
          </div>
        </div>
      </div>
    </>
  );
} 