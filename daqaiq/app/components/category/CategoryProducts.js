'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from './CategoryProducts.module.css';

export default function CategoryProducts({ products = [] }) {
  if (products.length === 0) {
    return (
      <div className={styles.noResults}>
        <p>لم يتم العثور على منتجات</p>
      </div>
    );
  }

  return (
    <div className={styles.productsGrid}>
      {products.map((product) => (
        <Link
          href={`/ProductPage/${product.slug}`}
          key={product.slug}
          className={styles.productCard}
        >
          <div className={styles.imageContainer}>
            {product.discount > 0 && (
              <span className={styles.discountBadge}>
                {product.discount}% خصم
              </span>
            )}
            <div className={styles.productImage}>
              <div 
                className="bg-gray-200 w-full h-full flex items-center justify-center"
                style={{ aspectRatio: '1/1' }}
              >
                <span className="text-gray-500">{product.name}</span>
              </div>
            </div>
          </div>
          
          <div className={styles.productInfo}>
            <h3 className={styles.productName}>{product.name}</h3>
            
            <div className={styles.productMeta}>
              <span className={styles.brand}>{product.brand}</span>
              
              <div className={styles.rating}>
                <span className={styles.stars}>
                  {'★'.repeat(Math.floor(product.rating))}
                  {'☆'.repeat(5 - Math.floor(product.rating))}
                </span>
                <span className={styles.reviewCount}>({product.reviewCount})</span>
              </div>
            </div>
            
            <div className={styles.priceContainer}>
              <span className={styles.price}>{product.price} ريال</span>
              
              {product.originalPrice > product.price && (
                <span className={styles.originalPrice}>
                  {product.originalPrice} ريال
                </span>
              )}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
} 