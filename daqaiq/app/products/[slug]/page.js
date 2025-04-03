import { notFound } from 'next/navigation';
import { connectToDatabase } from '@/lib/mongodb'; // Ensure this is the correct import
import Image from 'next/image';
import styles from './ProductDetail.module.css'; // Create this CSS module
import { StarRating } from '@/components/StarRating';
import { HeartIcon } from '@/components/icons/HeartIcon';
import { DeliveryIcon } from '@/components/icons/DeliveryIcon';

async function getProductBySlug(slug) {
  try {
    const { db } = await connectToDatabase();
    const product = await db.collection('products').findOne({ slug });

    // Convert MongoDB document to a plain object
    if (product) {
      return {
        ...product,
        _id: product._id.toString(), // Convert ObjectId to string
      };
    }
    return null;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    return {
      title: 'Product Not Found',
      description: 'The requested product could not be found.'
    };
  }

  return {
    title: product.name,
    description: product.description
  };
}

export default async function ProductPage({ params }) {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  return (
    <div className={styles.container}>
      <div className={styles.productDetail}>
        {/* Left Side - Image Gallery */}
        <div className={styles.imageSection}>
          <div className={styles.mainImage}>
            <Image
              src={product.images[0]}
              alt={product.name}
              width={500}
              height={500}
              className={styles.productImage}
              priority
            />
          </div>
          <div className={styles.thumbnails}>
            {product.images.map((image, index) => (
              <div key={index} className={styles.thumbnail}>
                <Image
                  src={image}
                  alt={`${product.name} - view ${index + 1}`}
                  width={60}
                  height={60}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right Side - Product Info */}
        <div className={styles.productInfo}>
          {/* Country Badge */}
          <div className={styles.countryBadge}>
            <Image 
              src="/images/flags/kr.svg" 
              alt="Made in Korea" 
              width={24} 
              height={16} 
              className={styles.flagIcon} 
            />
            <span>Made in Korea</span>
          </div>

          {/* Product Title */}
          <h1 className={styles.productName}>{product.name}</h1>

          {/* Ratings Section */}
          <div className={styles.ratingsSection}>
            <StarRating rating={product.rating || 4.6} />
            <span className={styles.reviewCount}>(1309)</span>
            <button className={styles.readReviews}>Read reviews</button>
          </div>

          {/* Price Section */}
          <div className={styles.priceSection}>
            <div className={styles.priceHeader}>
              {product.discountPercentage && (
                <span className={styles.discountBadge}>
                  -{product.discountPercentage}%
                </span>
              )}
              <div className={styles.priceDisplay}>
                <span className={styles.currentPrice}>
                  {product.price} SAR
                </span>
                {product.originalPrice && (
                  <span className={styles.originalPrice}>
                    {product.originalPrice} SAR
                  </span>
                )}
              </div>
            </div>
            
            {/* Bank Offers */}
            <div className={styles.bankOffers}>
              <div className={styles.offerCard}>
                <Image src="/stc-logo.png" alt="STC Bank" width={40} height={20} />
                <span>STC Bank Exclusive: Enjoy up to 50% off with bank offers!</span>
              </div>
              <div className={styles.offerCard}>
                <Image src="/tabby-logo.png" alt="Tabby" width={40} height={20} />
                <span>Pay in 4 interest-free payments of 8.90 SAR</span>
              </div>
            </div>
          </div>

          {/* Actions Section */}
          <div className={styles.actions}>
            <div className={styles.quantity}>
              <button className={styles.quantityBtn}>-</button>
              <input type="number" defaultValue={1} min={1} className={styles.quantityInput} />
              <button className={styles.quantityBtn}>+</button>
            </div>
            <button className={styles.addToCartBtn}>ADD TO CART</button>
            <button className={styles.favoriteBtn}>
              <HeartIcon />
            </button>
          </div>

          {/* Delivery Info */}
          <div className={styles.deliveryInfo}>
            <div className={styles.deliveryDate}>
              <span>Delivery: 23 - 26 March</span>
            </div>
            <div className={styles.shippingInfo}>
              <span>Shipped from</span>
              <Image src="/saudi-flag.png" alt="Saudi Arabia" width={20} height={14} />
              <span>Saudi Arabia</span>
              <span className={styles.localDelivery}>Local delivery</span>
            </div>
          </div>

          {/* Product Details */}
          <div className={styles.detailsSection}>
            <div className={styles.detailsHeader}>
              <button className={`${styles.detailTab} ${styles.active}`}>
                Product details
              </button>
              <button className={styles.detailTab}>
                Product information
              </button>
              <button className={styles.detailTab}>
                Ingredients
              </button>
            </div>
            <div className={styles.detailContent}>
              <p>{product.description}</p>
              {product.specifications && (
                <div className={styles.specifications}>
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className={styles.specItem}>
                      <span className={styles.specKey}>{key}</span>
                      <span className={styles.specValue}>{value}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Most Viewed Section */}
          <div className={styles.mostViewed}>
            <span>#1</span>
            <span>Most viewed</span>
            <span>in Face Serums</span>
          </div>
        </div>
      </div>
    </div>
  );
} 