import Image from "next/image";
import Link from "next/link";
import styles from './category.module.css';

export default function CategoryProducts({ products }) {
  if (!products || products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No products found in this category.</p>
      </div>
    );
  }

  return (
    <div className={styles.productsGrid}>
      {products.map((product) => (
        <Link
          href={`/products/${product._id}`}
          key={product._id}
          className={styles.productCard}
        >
          <div className={styles.imageContainer}>
            <Image
              src={product.images[0] || '/placeholder.jpg'}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {product.discount > 0 && (
              <div className={styles.discountBadge}>
                -{product.discount}%
              </div>
            )}
          </div>
          
          <div className={styles.productInfo}>
            <h3 className={styles.productName}>{product.name}</h3>
            
            <div className={styles.productMeta}>
              <span className={styles.brand}>{product.brand}</span>
              {product.rating && (
                <div className={styles.rating}>
                  <div className={styles.stars}>
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={i < Math.floor(product.rating) ? styles.star : styles.emptyStar}>
                        ★
                      </span>
                    ))}
                  </div>
                  <span className={styles.reviewCount}>({product.reviewCount})</span>
                </div>
              )}
            </div>
            
            <div className={styles.priceContainer}>
              <span className={styles.price}>${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className={styles.originalPrice}>${product.originalPrice.toFixed(2)}</span>
              )}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
} 