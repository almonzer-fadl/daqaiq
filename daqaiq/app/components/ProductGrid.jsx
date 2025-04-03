import Image from 'next/image';
import Link from 'next/link';
import styles from './ProductGrid.module.css';

export default function ProductGrid({ products }) {
  if (!products || products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No products found.</p>
      </div>
    );
  }

  return (
    <div className={styles.productGrid}>
      {products.map((product) => (
        <Link
          href={`/products/${product.slug}`}
          key={product._id || product.slug}
          className={styles.productCard}
        >
          <div className={styles.productImage}>
            <Image
              src={product.images?.[0] || '/images/placeholder.jpg'}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
            />
            {product.discount > 0 && (
              <div className={styles.discountBadge}>
                -{product.discount}%
              </div>
            )}
            <div className={styles.productName}>
              {product.name}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
} 