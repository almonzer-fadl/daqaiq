'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';

export default function AdminLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const pathname = usePathname();

  const navItems = [
    { href: '/admin', label: 'لوحة التحكم', icon: '📊' },
    { href: '/admin/users', label: 'المستخدمين', icon: '👥' },
    { href: '/admin/suppliers', label: 'الموردين', icon: '🏭' },
    { href: '/admin/products', label: 'المنتجات', icon: '📦' },
    { href: '/admin/orders', label: 'الطلبات', icon: '🛍️' },
    { href: '/admin/settings', label: 'الإعدادات', icon: '⚙️' },
  ];

  const handleSignOut = async () => {
    await signOut({ redirect: true, callbackUrl: '/auth/signin' });
  };

  return (
    <div className="min-h-screen bg-gray-100" dir="rtl">
      {/* Sidebar */}
      <aside className={`fixed top-0 right-0 z-40 w-64 h-screen transition-transform ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-800">
          <div className="flex items-center justify-between mb-5">
            <span className="text-xl font-semibold text-white">لوحة التحكم</span>
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-gray-400 hover:text-white">
              {isSidebarOpen ? '✕' : '☰'}
            </button>
          </div>
          
          <nav className="space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center p-2 rounded-lg ${
                  pathname === item.href
                    ? 'bg-gray-700 text-white'
                    : 'text-gray-300 hover:bg-gray-700'
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
            
            <button
              onClick={handleSignOut}
              className="flex items-center w-full p-2 text-gray-300 rounded-lg hover:bg-gray-700"
            >
              <span className="mr-3">🚪</span>
              <span>تسجيل الخروج</span>
            </button>
          </nav>
        </div>
      </aside>

      {/* Main content */}
      <div className={`p-4 ${isSidebarOpen ? 'mr-64' : 'mr-0'}`}>
        <div className="p-4 rounded-lg bg-white shadow-sm min-h-screen">
          {children}
        </div>
      </div>

      {/* Mobile menu button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed bottom-4 right-4 p-2 bg-gray-800 text-white rounded-full shadow-lg md:hidden"
      >
        {isSidebarOpen ? '✕' : '☰'}
      </button>
    </div>
  );
} 