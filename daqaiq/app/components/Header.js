"use client";

import { useState } from 'react';
import Image from 'next/image';
import logoImg from '@/public/logo.png';
import LoginPage from './loginPage'; // Import the LoginPage component

function Header() {
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const toggleSubmenu = () => {
    setIsSubmenuOpen(!isSubmenuOpen);
  };

  const handleLoginClick = () => {
    setShowPopup(true);
  };

  const handleCloseClick = () => {
    setShowPopup(false);
  };

  return (
    <div className="navbar bg-base-0 fixed top-0 left-0 right-0 z-[1000] flex items-center justify-between">
      <div className="navbar-start flex items-center">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden bg-#E88213">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-2 w-45 p-2 shadow text-white lg:text-black">
            <li><a href="#">الرئيسية</a></li>
            <li><a>من نحن</a></li>
            <li>
              <a onClick={toggleSubmenu}>خدماتنا</a>
              {isSubmenuOpen && (
                <ul className="p-2">
                  <li><a>Submenu 1</a></li>
                  <li><a>Submenu 2</a></li>
                </ul>
              )}
            </li>
            <li><a>الأسعار</a></li>
            <li><a>موقعنا</a></li>
            <li><a>تواصل معنا</a></li>
            <li><a>الأسئلة الشائعة</a></li>
          </ul>
        </div>
        <button className="btn btn-ghost text-xl ml-2" onClick={handleLoginClick}>الدخول</button>
      </div>
      <div className="navbar-center hidden lg:flex flex-grow justify-center">
        <ul className="menu menu-horizontal px-1 flex gap-4 text-white lg:text-black">
          <li><a>الأسئلة الشائعة</a></li>
          <li><a>تواصل معنا</a></li>
          <li><a>موقعنا</a></li>
          <li><a>الأسعار</a></li>
          <li>
            <a onClick={toggleSubmenu}>خدماتنا</a>
            {isSubmenuOpen && (
              <ul className="p-2">
                <li><a>Submenu 1</a></li>
                <li><a>Submenu 2</a></li>
              </ul>
            )}
          </li>
          <li><a>من نحن</a></li>
          <li><a href="#">الرئيسية</a></li>
        </ul>
      </div>
      <div className="navbar-end flex items-center">
        <a className="ml-2" href='#'>
          <Image src={logoImg} alt="Logo" width={100} height={100} /> {/* Adjusted size */}
        </a>
      </div>
      {showPopup && <LoginPage onClose={handleCloseClick} />} {/* Render the LoginPage component */}
    </div>
  );
}

export default Header;