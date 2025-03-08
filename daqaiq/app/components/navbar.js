"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");

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

  return (
    <div className="navbar bg-base-100 shadow-md px-6 py-3 flex flex-row-reverse justify-between items-center">
      {/* Logo */}
      <Link href="/" className="text-2xl font-bold text-primary">
        <Image
          src="/images/logo.png"
          alt="Daqaiq Logo"
          width={120}
          height={40}
        />
      </Link>

      {/* Search Bar */}
      <div className="relative w-1/3">
        <input
          type="text"
          placeholder="البحث عن فئة أو منتج أو علامة تجارية"
          className="input input-bordered w-full pl-12"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleSearchKeyPress}
        />
        <span
          className="absolute left-3 top-2.5 text-gray-400 cursor-pointer"
          onClick={handleSearchClick}
        >
          🔍
        </span>
      </div>

      {/* User Actions */}
      <div className="flex gap-4">
        <Link href="/login" className="hover:text-primary">👤</Link>
        <Link href="/cart" className="hover:text-primary">🛒</Link>
        <Link href="/wishlist" className="hover:text-primary">❤️</Link>
        <Link href="/help" className="hover:text-primary">🎧</Link>
      </div>

      <style jsx>{`
        .navbar {
          border-bottom: 1px solid #e5e7eb;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          height: 75.2px;
        }

        input {
          direction: rtl; /* Right to left text alignment */
          background-color: #f3f4f6; /* Grayish background */
          border-color: #d1d5db; /* Border color */
        }

        input:focus {
          border-color: #6b7280; /* Focus border color */
          outline: none;
          ring-color: #d1d5db;
        }

        .input-bordered {
          border-width: 1px;
        }

        span {
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default Navbar;
