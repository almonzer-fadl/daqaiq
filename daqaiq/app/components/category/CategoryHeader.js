'use client';

import { useState } from 'react';
import styles from './CategoryHeader.module.css';

const sortOptions = [
  { label: 'الأحدث', value: 'newest' },
  { label: 'السعر: من الأقل إلى الأعلى', value: 'price-asc' },
  { label: 'السعر: من الأعلى إلى الأقل', value: 'price-desc' },
  { label: 'الأكثر مبيعاً', value: 'best-selling' },
];

export default function CategoryHeader({ categoryName, productCount, toggleFilterSidebar }) {
  const [sortBy, setSortBy] = useState('newest');

  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortBy(value);
    // We'll handle sorting in the client component itself
    // This avoids passing event handlers from server to client components
    console.log('Sorting by:', value);
    
    // In a real app, you might use a context or state management library
    // to share this state with other components
  };

  return (
    <div className={styles.header}>
      <div className={styles.info}>
        <h1 className={styles.title}>{categoryName}</h1>
        <span className={styles.count}>{productCount} منتج</span>
      </div>
      
      <div className={styles.controls}>
        <div className={styles.sort}>
          <label htmlFor="sort" className={styles.sortLabel}>
            ترتيب حسب:
          </label>
          <select
            id="sort"
            value={sortBy}
            onChange={handleSortChange}
            className={styles.sortSelect}
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        
        <button 
          className={styles.filterButton}
          onClick={toggleFilterSidebar}
          aria-label="Toggle filters"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2z"/>
          </svg>
          تصفية
        </button>
      </div>
    </div>
  );
} 