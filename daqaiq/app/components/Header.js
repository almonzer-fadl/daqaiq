"use client"; // Ensures this component is treated as a Client Component

import { useState } from 'react'; // Import useState hook from React
import Image from 'next/image'; // Import Image component from Next.js
import Link from 'next/link'; // Import Link component from Next.js
import logoImg from '@/public/logo.png'; // Import logo image
import LoginPage from './loginPage'; // Import the LoginPage component

function Header() { // Define the Header functional component
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false); // State for submenu visibility
  const [showPopup, setShowPopup] = useState(false); // State for login popup visibility

  const toggleSubmenu = () => { // Function to toggle submenu visibility
    setIsSubmenuOpen(!isSubmenuOpen);
  };

  const handleLoginClick = () => { // Function to show login popup
    setShowPopup(true);
  };

  const handleCloseClick = () => { // Function to hide login popup
    setShowPopup(false);
  };

  return (
    <div className="navbar bg-base-0 fixed top-0 left-0 right-0 z-[1000] flex items-center justify-between">
      {/* Main navbar container */}
      <div className="navbar-start flex items-center">
        {/* Navbar start section */}
        <div className="dropdown">
          {/* Dropdown menu */}
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden bg-#E88213">
            {/* Dropdown button for mobile view */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              {/* SVG icon for dropdown button */}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16" />
                {/* SVG path for icon */}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-2 w-45 p-2 shadow text-white lg:text-black">
            {/* Dropdown menu items */}
            <li><Link href="/">الرئيسية</Link></li>
            <li><Link href="/about">من نحن</Link></li>
            <li><Link href="/services">خدماتنا</Link></li>
            <li><Link href="/prices">الأسعار</Link></li>
            <li><Link href="/location">موقعنا</Link></li>
            <li><Link href="/contact">تواصل معنا</Link></li>
            <li><Link href="/faq">الأسئلة الشائعة</Link></li>
          </ul>
        </div>
        <button className="btn btn-ghost text-xl ml-2" onClick={handleLoginClick}>الدخول</button>
        {/* Login button */}
      </div>
      <div className="navbar-center hidden lg:flex flex-grow justify-center">
        {/* Navbar center section for larger screens */}
        <ul className="menu menu-horizontal px-1 flex gap-4 text-white lg:text-black">
          {/* Horizontal menu items */}
          <li><Link href="/faq">الأسئلة الشائعة</Link></li>
          <li><Link href="/contact">تواصل معنا</Link></li>
          <li><Link href="/location">موقعنا</Link></li>
          <li><Link href="/prices">الأسعار</Link></li>
          <li><Link href="/services">خدماتنا</Link></li>
          <li><Link href="/about">من نحن</Link></li>
          <li><Link href="/">الرئيسية</Link></li>
        </ul>
      </div>
      <div className="navbar-end flex items-center">
        {/* Navbar end section */}
        <a className="ml-2" href='#'>
          <Image src={logoImg} alt="Logo" width={100} height={100} />
          {/* Logo image */}
        </a>
      </div>
      {showPopup && <LoginPage onClose={handleCloseClick} />}
      {/* Render the LoginPage component if showPopup is true */}
    </div>
  );
}

export default Header; // Export the Header component