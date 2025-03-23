'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SUPPLIER_ROUTES } from '../../config/urls';
import { SUPPLIER_TRANSLATIONS as t } from '../../constants/translations';

const Navigation = () => {
  const pathname = usePathname();

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
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex flex-1">
            <div className="flex-shrink-0 flex items-center">
              <Link href={SUPPLIER_ROUTES.dashboard} className="text-xl font-bold text-blue-600 hover:text-blue-700">
                {t.supplierPortal}
              </Link>
            </div>
            <div className="hidden sm:flex sm:space-x-0 sm:space-x-reverse sm:mr-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`inline-flex items-center px-4 pt-1 border-b-2 text-sm font-medium transition-colors duration-200 ${
                    pathname === item.href
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-300'
                  }`}
                >
                  <span className="ml-2">{item.icon}</span>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">فتح القائمة</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="sm:hidden" id="mobile-menu">
        <div className="pt-2 pb-3 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block py-2 px-4 text-base font-medium border-r-4 ${
                pathname === item.href
                  ? 'border-blue-500 text-blue-600 bg-blue-50'
                  : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-900'
              }`}
            >
              <span className="inline-block ml-2">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation; 