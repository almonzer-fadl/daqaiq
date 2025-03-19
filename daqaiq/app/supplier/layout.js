'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';

export default function SupplierLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const pathname = usePathname();

  const navigation = [
    { name: 'Dashboard', href: '/supplier', icon: '📊' },
    { name: 'Products', href: '/supplier/products', icon: '📦' },
    { name: 'Orders', href: '/supplier/orders', icon: '🛍️' },
    { name: 'Inventory', href: '/supplier/inventory', icon: '📋' },
    { name: 'Analytics', href: '/supplier/analytics', icon: '📈' },
    { name: 'Settings', href: '/supplier/settings', icon: '⚙️' },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 ease-in-out`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-4 border-b">
            <Link href="/supplier" className="text-xl font-bold text-gray-800">
              Supplier Portal
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
                  <span className="mr-3">{item.icon}</span>
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Profile */}
          <div className="flex items-center justify-between p-4 border-t">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-gray-300" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700">Supplier Name</p>
                <p className="text-xs text-gray-500">View Profile</p>
              </div>
            </div>
            <button
              onClick={() => signOut()}
              className="p-2 text-gray-500 hover:text-gray-700"
            >
              🚪
            </button>
          </div>
        </div>
      </div>

      {/* Mobile sidebar toggle */}
      {!isSidebarOpen && (
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="fixed p-4 text-gray-500 bg-white rounded-r-lg shadow-lg top-4 left-0 lg:hidden"
        >
          ☰
        </button>
      )}

      {/* Main content */}
      <div className={`${isSidebarOpen ? 'lg:pl-64' : ''} flex flex-col min-h-screen`}>
        <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  );
} 