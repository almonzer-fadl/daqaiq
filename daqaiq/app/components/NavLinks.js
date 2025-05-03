"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

const Navlinks = () => {
    return (
        <div className="navbar flex bg-base-100 items-center justify-between">
          {/* Main navbar container */}
          <div className="navbar-center flex flex-grow justify-center px-0">
            {/* Navbar center section for larger screens */}
            <ul className="menu menu-horizontal flex gap-4 text-black">
              {/* Horizontal menu items */}
              <li><Link href="/faq">الأسئلة الشائعة</Link></li>
              <li><Link href="/contact">تواصل معنا</Link></li>
              <li><Link href="/location">موقعنا</Link></li>
              <li><Link href="/about">من نحن</Link></li>
            </ul>
          </div>
          <style jsx>{`
            .navbar {
              border-bottom: 1px solid #e5e7eb;
              box-shadow: 0 2px 4px rgba(0,0,0,0.1); 
              height: 45.6px;
            }
          `}</style>
        </div>
    );
};

export default Navlinks;
