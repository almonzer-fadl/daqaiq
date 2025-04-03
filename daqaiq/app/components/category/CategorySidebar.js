'use client';

import { useState } from 'react';
import styles from './CategorySidebar.module.css';

const priceRanges = [
  { id: '0-50', label: '0 - 50 ريال' },
  { id: '50-100', label: '50 - 100 ريال' },
  { id: '100-200', label: '100 - 200 ريال' },
  { id: '200-500', label: '200 - 500 ريال' },
  { id: '500+', label: '500+ ريال' },
];

const brands = [
  'Nike', 'Adidas', 'Puma', 'Under Armour', 'New Balance',
  'Reebok', 'ASICS', 'Fila', 'Converse', 'Vans'
];

const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'];

const colors = [
  { name: 'أسود', value: 'black' },
  { name: 'أبيض', value: 'white' },
  { name: 'أحمر', value: 'red' },
  { name: 'أزرق', value: 'blue' },
  { name: 'أخضر', value: 'green' },
];

export default function CategorySidebar({ category }) {
  const [expandedSections, setExpandedSections] = useState({
    price: true,
    brand: true,
    size: true,
    color: true,
    rating: true,
  });
  
  const [selectedFilters, setSelectedFilters] = useState({
    price: [],
    brand: [],
    size: [],
    color: [],
    rating: null,
  });

  const handleFilterChange = (type, value) => {
    setSelectedFilters(prev => {
      const newFilters = { ...prev };
      
      if (type === 'rating') {
        newFilters.rating = value;
      } else if (newFilters[type].includes(value)) {
        newFilters[type] = newFilters[type].filter(item => item !== value);
      } else {
        newFilters[type] = [...newFilters[type], value];
      }
      
      return newFilters;
    });
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.filterSection}>
        <div 
          className={styles.sectionHeader} 
          onClick={() => toggleSection('price')}
        >
          <h3>السعر</h3>
          <span className={expandedSections.price ? styles.arrowUp : styles.arrowDown}>
            ▼
          </span>
        </div>
        
        {expandedSections.price && (
          <div className={styles.sectionContent}>
            {priceRanges.map(range => (
              <label key={range.id} className={styles.filterItem}>
                <input
                  type="checkbox"
                  checked={selectedFilters.price.includes(range.id)}
                  onChange={() => handleFilterChange('price', range.id)}
                  className={styles.checkbox}
                />
                <span className={styles.checkmark}></span>
                {range.label}
              </label>
            ))}
          </div>
        )}
      </div>
      
      <div className={styles.filterSection}>
        <div 
          className={styles.sectionHeader} 
          onClick={() => toggleSection('brand')}
        >
          <h3>الماركة</h3>
          <span className={expandedSections.brand ? styles.arrowUp : styles.arrowDown}>
            ▼
          </span>
        </div>
        
        {expandedSections.brand && (
          <div className={styles.sectionContent}>
            {brands.map(brand => (
              <label key={brand} className={styles.filterItem}>
                <input
                  type="checkbox"
                  checked={selectedFilters.brand.includes(brand)}
                  onChange={() => handleFilterChange('brand', brand)}
                  className={styles.checkbox}
                />
                <span className={styles.checkmark}></span>
                {brand}
              </label>
            ))}
          </div>
        )}
      </div>
      
      <div className={styles.filterSection}>
        <div 
          className={styles.sectionHeader} 
          onClick={() => toggleSection('size')}
        >
          <h3>المقاس</h3>
          <span className={expandedSections.size ? styles.arrowUp : styles.arrowDown}>
            ▼
          </span>
        </div>
        
        {expandedSections.size && (
          <div className={`${styles.sectionContent} ${styles.sizeGrid}`}>
            {sizes.map(size => (
              <div
                key={size}
                className={`${styles.sizeBox} ${selectedFilters.size.includes(size) ? styles.selectedSize : ''}`}
                onClick={() => handleFilterChange('size', size)}
              >
                {size}
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className={styles.filterSection}>
        <div 
          className={styles.sectionHeader} 
          onClick={() => toggleSection('rating')}
        >
          <h3>التقييم</h3>
          <span className={expandedSections.rating ? styles.arrowUp : styles.arrowDown}>
            ▼
          </span>
        </div>
        
        {expandedSections.rating && (
          <div className={styles.sectionContent}>
            {[5, 4, 3, 2, 1].map(rating => (
              <label key={rating} className={styles.filterItem}>
                <input
                  type="radio"
                  name="rating"
                  checked={selectedFilters.rating === rating}
                  onChange={() => handleFilterChange('rating', rating)}
                  className={styles.checkbox}
                />
                <span className={styles.checkmark}></span>
                <span className={styles.stars}>
                  {'★'.repeat(rating)}
                  {'☆'.repeat(5 - rating)}
                </span>
                <span className={styles.ratingText}>و أعلى</span>
              </label>
            ))}
          </div>
        )}
      </div>
      
      <button className={styles.applyFilters}>
        تطبيق الفلاتر
      </button>
    </div>
  );
} 