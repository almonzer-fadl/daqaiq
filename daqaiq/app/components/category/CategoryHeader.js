'use client';

import { useState } from 'react';
import styles from './CategoryHeader.module.css';

const sortOptions = [
  { label: 'الأحدث', value: 'newest' },
  { label: 'السعر: من الأقل إلى الأعلى', value: 'price-asc' },
  { label: 'السعر: من الأعلى إلى الأقل', value: 'price-desc' },
  { label: 'الأكثر مبيعاً', value: 'best-selling' },
];

export default function CategoryHeader({ categoryName, productCount, onSort }) {
  const [sortBy, setSortBy] = useState('newest');

  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortBy(value);
    onSort?.(value);
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
      </div>
    </div>
  );
} 