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

export default function CategorySidebar({ onFilterChange }) {
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [isExpanded, setIsExpanded] = useState({
    price: true,
    brand: true,
    size: true,
    color: true,
  });

  const handleFilterChange = (type, value) => {
    let newSelected;
    switch (type) {
      case 'price':
        newSelected = selectedPriceRanges.includes(value)
          ? selectedPriceRanges.filter(item => item !== value)
          : [...selectedPriceRanges, value];
        setSelectedPriceRanges(newSelected);
        break;
      case 'brand':
        newSelected = selectedBrands.includes(value)
          ? selectedBrands.filter(item => item !== value)
          : [...selectedBrands, value];
        setSelectedBrands(newSelected);
        break;
      case 'size':
        newSelected = selectedSizes.includes(value)
          ? selectedSizes.filter(item => item !== value)
          : [...selectedSizes, value];
        setSelectedSizes(newSelected);
        break;
      case 'color':
        newSelected = selectedColors.includes(value)
          ? selectedColors.filter(item => item !== value)
          : [...selectedColors, value];
        setSelectedColors(newSelected);
        break;
    }

    onFilterChange?.({
      priceRanges: selectedPriceRanges,
      brands: selectedBrands,
      sizes: selectedSizes,
      colors: selectedColors,
    });
  };

  const toggleSection = (section) => {
    setIsExpanded(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className={styles.sidebar}>
      {/* Price Range Filter */}
      <div className={styles.filterSection}>
        <button 
          className={styles.sectionHeader}
          onClick={() => toggleSection('price')}
        >
          <h3>نطاق السعر</h3>
          <span className={styles.expandIcon}>
            {isExpanded.price ? '−' : '+'}
          </span>
        </button>
        {isExpanded.price && (
          <div className={styles.filterOptions}>
            {priceRanges.map(range => (
              <label key={range.id} className={styles.filterOption}>
                <input
                  type="checkbox"
                  checked={selectedPriceRanges.includes(range.id)}
                  onChange={() => handleFilterChange('price', range.id)}
                  className={styles.checkbox}
                />
                <span>{range.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Brand Filter */}
      <div className={styles.filterSection}>
        <button 
          className={styles.sectionHeader}
          onClick={() => toggleSection('brand')}
        >
          <h3>الماركة</h3>
          <span className={styles.expandIcon}>
            {isExpanded.brand ? '−' : '+'}
          </span>
        </button>
        {isExpanded.brand && (
          <div className={styles.filterOptions}>
            {brands.map(brand => (
              <label key={brand} className={styles.filterOption}>
                <input
                  type="checkbox"
                  checked={selectedBrands.includes(brand)}
                  onChange={() => handleFilterChange('brand', brand)}
                  className={styles.checkbox}
                />
                <span>{brand}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Size Filter */}
      <div className={styles.filterSection}>
        <button 
          className={styles.sectionHeader}
          onClick={() => toggleSection('size')}
        >
          <h3>المقاس</h3>
          <span className={styles.expandIcon}>
            {isExpanded.size ? '−' : '+'}
          </span>
        </button>
        {isExpanded.size && (
          <div className={styles.filterOptions}>
            {sizes.map(size => (
              <label key={size} className={styles.filterOption}>
                <input
                  type="checkbox"
                  checked={selectedSizes.includes(size)}
                  onChange={() => handleFilterChange('size', size)}
                  className={styles.checkbox}
                />
                <span>{size}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Color Filter */}
      <div className={styles.filterSection}>
        <button 
          className={styles.sectionHeader}
          onClick={() => toggleSection('color')}
        >
          <h3>اللون</h3>
          <span className={styles.expandIcon}>
            {isExpanded.color ? '−' : '+'}
          </span>
        </button>
        {isExpanded.color && (
          <div className={styles.filterOptions}>
            {colors.map(color => (
              <label key={color.value} className={styles.filterOption}>
                <input
                  type="checkbox"
                  checked={selectedColors.includes(color.value)}
                  onChange={() => handleFilterChange('color', color.value)}
                  className={styles.checkbox}
                />
                <span className={styles.colorOption}>
                  <span 
                    className={styles.colorSwatch} 
                    style={{ backgroundColor: color.value }}
                  />
                  {color.name}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 