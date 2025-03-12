'use client';

import { useEffect, useState } from 'react';
import styles from '@/app/components/category/category.module.css';

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

  return (
    <div className={`${styles.layout} ${isFilterOpen ? styles.filterOpen : ''}`}>
      {children}
    </div>
  );
} 