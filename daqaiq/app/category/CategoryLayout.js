'use client';

import { useEffect, useState } from 'react';
import styles from '../components/category/category.module.css';
import React from 'react';
import Headertop from '../components/headertop';
import Navbar from '../components/navbar';
import Navlinks from '../components/navlinks';

export default function CategoryLayout({ children }) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Close filter sidebar when screen size becomes large
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsFilterOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Toggle filter sidebar
  const toggleFilterSidebar = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  // Clone children and pass the toggleFilterSidebar function and isFilterOpen state
  const childrenWithProps = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { 
        toggleFilterSidebar,
        isFilterOpen
      });
    }
    return child;
  });

  return (
    <div className="page-transition min-h-screen flex flex-col">
      {/* Header components in the same order as homepage */}
      <Headertop />
      <Navbar />
      <Navlinks />
      
      <div className={`flex-grow ${styles.layout} ${isFilterOpen ? styles.filterOpen : ''}`}>
        {isFilterOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setIsFilterOpen(false)}
          />
        )}
        
        <div className="lg:hidden fixed bottom-4 right-4 z-50">
          <button
            onClick={toggleFilterSidebar}
            className="bg-[#f27a1a] text-white p-3 rounded-full shadow-lg"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
          </button>
        </div>
        
        {children}
      </div>
    </div>
  );
} 