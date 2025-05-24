"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { CUSTOMER_ROUTES, AUTH_URLS } from "../config/urls";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showAuthDropdown, setShowAuthDropdown] = useState(false);
  const { data: session } = useSession();

  const handleSearchClick = () => {
    if (searchQuery) {
      // Replace with your actual search functionality
      alert(`Searching for: ${searchQuery}`);
    }
  };

  const handleSearchKeyPress = (e) => {
    if (e.key === "Enter" && searchQuery) {
      // Replace with your actual search functionality
      alert(`Searching for: ${searchQuery}`);
    }
  };

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' });
    setShowAuthDropdown(false);
  };

  return (
    <nav dir="rtl" className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-row-reverse justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
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

          {/* Search Bar */}
          <div className="flex-1 flex items-center justify-center px-2 lg:px-6">
            <div className="max-w-lg w-full">
              <div className="relative">
                <input
                  type="text"
                  placeholder="ابحث عن قطع الغيار..."
                  className="w-full bg-gray-100 rounded-lg pr-10 pl-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleSearchKeyPress}
                />
                <button
                  className="absolute right-0 top-0 mt-2 mr-3 text-gray-400 hover:text-gray-600"
                  onClick={handleSearchClick}
                >
                  🔍
                </button>
              </div>
            </div>
          </div>

          {/* Auth Dropdown and Cart */}
          <div className="flex gap-4 items-center">
            {/* Cart */}
            <Link href="/cart" className="hover:text-primary">
              🛒
            </Link>

            {/* Auth Dropdown */}
            <div className="relative">
              <button
                className="hover:text-primary focus:outline-none"
                onClick={() => setShowAuthDropdown(!showAuthDropdown)}
                onBlur={() => setTimeout(() => setShowAuthDropdown(false), 200)}
              >
                👤
              </button>
              {showAuthDropdown && (
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                  <div className="py-1" role="menu">
                    {session ? (
                      <>
                        <Link
                          href={CUSTOMER_ROUTES.profile}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-right"
                        >
                          الملف الشخصي
                        </Link>
                        <Link
                          href={CUSTOMER_ROUTES.orders}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-right"
                        >
                          طلباتي
                        </Link>
                        <button
                          onClick={handleSignOut}
                          className="block w-full text-right px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          تسجيل الخروج
                        </button>
                      </>
                    ) : (
                      <>
                        <Link
                          href={AUTH_URLS.signin}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-right"
                        >
                          تسجيل الدخول
                        </Link>
                        <Link
                          href={AUTH_URLS.signup}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-right"
                        >
                          إنشاء حساب
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
