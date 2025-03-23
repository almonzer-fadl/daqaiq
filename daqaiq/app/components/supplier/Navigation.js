'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SUPPLIER_ROUTES } from '../../config/urls';
import { SUPPLIER_TRANSLATIONS as t } from '../../constants/translations';

const Navigation = () => {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    {
      label: t.dashboard,
      href: SUPPLIER_ROUTES.dashboard,
      icon: '📊',
    },
    {
      label: t.products,
      href: SUPPLIER_ROUTES.products,
      icon: '📦',
    },
    {
      label: t.orders,
      href: SUPPLIER_ROUTES.orders,
      icon: '🛍️',
    },
    {
      label: t.inventory,
      href: SUPPLIER_ROUTES.inventory,
      icon: '📋',
    },
    {
      label: t.analytics,
      href: SUPPLIER_ROUTES.analytics,
      icon: '📈',
    },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-0 right-0 p-4 z-50">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
        >
          <span className="sr-only">{isMobileMenuOpen ? 'إغلاق القائمة' : 'فتح القائمة'}</span>
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Sidebar for Desktop */}
      <div className={`hidden lg:flex lg:flex-col fixed right-0 top-0 h-full bg-white shadow-lg transition-all duration-300 ease-in-out ${isSidebarOpen ? 'w-64' : 'w-20'}`}>
        <div className="flex items-center justify-between p-4 border-b">
          <Link href={SUPPLIER_ROUTES.dashboard} className={`text-xl font-bold text-blue-600 ${!isSidebarOpen && 'hidden'}`}>
            {t.supplierPortal}
          </Link>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isSidebarOpen ? "M9 5l7 7-7 7" : "M15 19l-7-7 7-7"} />
            </svg>
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto">
          <div className="px-2 py-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors duration-200 ${
                  pathname === item.href
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <span className="ml-3">{item.icon}</span>
                {isSidebarOpen && <span className="mr-4">{item.label}</span>}
              </Link>
            ))}
          </div>
        </nav>
      </div>

      {/* Mobile Sidebar */}
      <div className={`lg:hidden fixed inset-0 z-40 ${isMobileMenuOpen ? '' : 'hidden'}`}>
        {/* Backdrop */}
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setIsMobileMenuOpen(false)}></div>

        {/* Sidebar Panel */}
        <div className="fixed inset-y-0 right-0 flex max-w-xs w-full bg-white shadow-xl">
          <div className="w-64 flex flex-col h-full">
            <div className="flex items-center justify-between p-4 border-b">
              <Link href={SUPPLIER_ROUTES.dashboard} className="text-xl font-bold text-blue-600" onClick={() => setIsMobileMenuOpen(false)}>
                {t.supplierPortal}
              </Link>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto">
              <div className="px-2 py-4 space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors duration-200 ${
                      pathname === item.href
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="ml-3">{item.icon}</span>
                    <span className="mr-4">{item.label}</span>
                  </Link>
                ))}
              </div>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation; 