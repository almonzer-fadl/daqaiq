'use client';

import Link from 'next/link';
import Image from 'next/image';
import { AUTH_URLS } from '@/config/urls';

export default function LandingHeader() {
  return (
    <header dir="rtl">
      {/* Top bar */}
      <div className="bg-gray-100 py-2 text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex gap-4">
              <a href="tel:+966500000000" className="text-gray-600 hover:text-gray-800">
                +966 50 000 0000
              </a>
              <span className="text-gray-400">|</span>
              <a href="mailto:info@daqaiq.com" className="text-gray-600 hover:text-gray-800">
                info@daqaiq.com
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/">
                <Image
                  src="/images/logo.png"
                  alt="Daqaiq Logo"
                  width={120}
                  height={40}
                  className="h-10 w-auto"
                />
              </Link>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex space-x-8 space-x-reverse">
              <Link href="#" className="text-gray-700 hover:text-gray-900">
                من نحن
              </Link>
              <Link href="#" className="text-gray-700 hover:text-gray-900">
                تواصل معنا
              </Link>
              <Link href="#" className="text-gray-700 hover:text-gray-900">
                موقعنا
              </Link>
              <Link href="#" className="text-gray-700 hover:text-gray-900">
                الاسئلة الشائعة
              </Link>
            </nav>

            {/* Auth buttons */}
            <div className="flex items-center gap-4">
              <Link
                href="/auth/signin"
                className="text-gray-700 hover:text-gray-900"
              >
                تسجيل الدخول
              </Link>
              <Link
                href="/auth/signup"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                التسجيل كمورد
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
} 