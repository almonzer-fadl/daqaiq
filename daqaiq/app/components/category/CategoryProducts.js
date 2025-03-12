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
          href={`/product/${product.slug}`}
          key={product._id}
          className={styles.productCard}
        >
          <div className={styles.imageWrapper}>
            <Image
              src={product.images[0]}
              alt={product.name}
              width={300}
              height={400}
              className={styles.productImage}
            />
            {product.discount > 0 && (
              <span className={styles.discountBadge}>
                {product.discount}% خصم
              </span>
            )}
          </div>
          
          <div className={styles.productInfo}>
            <h3 className={styles.productName}>{product.name}</h3>
            <div className={styles.brandName}>{product.brand}</div>
            
            <div className={styles.priceContainer}>
              <span className={styles.currentPrice}>
                {product.price} ريال
              </span>
              {product.originalPrice > product.price && (
                <span className={styles.originalPrice}>
                  {product.originalPrice} ريال
                </span>
              )}
            </div>

            {product.rating > 0 && (
              <div className={styles.rating}>
                <span className={styles.stars}>
                  {'★'.repeat(Math.floor(product.rating))}
                  {'☆'.repeat(5 - Math.floor(product.rating))}
                </span>
                <span className={styles.reviewCount}>
                  ({product.reviewCount})
                </span>
              </div>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
} 