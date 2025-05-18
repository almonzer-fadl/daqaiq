"use client";
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSession, signOut } from 'next-auth/react';

export default function NavbarMain() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <Image
                src="/logo.png"
                alt="Daqaiq Logo"
                width={120}
                height={40}
                className="h-10 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/services" className="text-gray-700 hover:text-gray-900 px-3 py-2">
              خدماتنا
            </Link>
            <Link href="/products" className="text-gray-700 hover:text-gray-900 px-3 py-2">
              منتجاتنا
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-gray-900 px-3 py-2">
              من نحن
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-gray-900 px-3 py-2">
              اتصل بنا
            </Link>
            {session ? (
              <div className="relative">
                <button
                  onClick={() => signOut()}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  تسجيل خروج
                </button>
              </div>
            ) : (
              <Link
                href="/auth/signin"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                تسجيل دخول
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-gray-900 focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                href="/services"
                className="block text-gray-700 hover:text-gray-900 px-3 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                خدماتنا
              </Link>
              <Link
                href="/products"
                className="block text-gray-700 hover:text-gray-900 px-3 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                منتجاتنا
              </Link>
              <Link
                href="/about"
                className="block text-gray-700 hover:text-gray-900 px-3 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                من نحن
              </Link>
              <Link
                href="/contact"
                className="block text-gray-700 hover:text-gray-900 px-3 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                اتصل بنا
              </Link>
              {session ? (
                <button
                  onClick={() => {
                    signOut();
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left text-gray-700 hover:text-gray-900 px-3 py-2"
                >
                  تسجيل خروج
                </button>
              ) : (
                <Link
                  href="/auth/signin"
                  className="block text-gray-700 hover:text-gray-900 px-3 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  تسجيل دخول
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
} 