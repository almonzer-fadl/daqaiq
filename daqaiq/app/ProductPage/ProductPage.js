"use client"
import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./ProductPage.module.css";
import Link from "next/link";

export default function ProductPage({ product, onClose }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  
  // Sample images for the gallery
  const productImages = [
    product?.image || "/placeholder.svg",
    "/images/product-alt-1.jpg",
    "/images/product-alt-2.jpg",
    "/images/product-alt-3.jpg",
  ];

  // Sample sizes - can be customized based on product type
  const sizes = ["S", "M", "L", "XL"];
  const [selectedSize, setSelectedSize] = useState(null);

  useEffect(() => {
    // Disable body scroll when modal is open
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  // Handle increment/decrement quantity
  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  // Calculate discount percentage
  const discountPercentage = product?.discountPercentage || 
    Math.round(((product?.originalPrice - product?.discountPrice) / product?.originalPrice) * 100);

  // Handle adding to cart
  const handleAddToCart = () => {
    if (!selectedSize && sizes.length > 0) {
      alert("الرجاء اختيار المقاس");
      return;
    }
    // Here you would add logic to add to cart
    alert(`تم إضافة ${product?.title} إلى السلة`);
  };

  // Render star ratings
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const stars = [];

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <span key={`star-${i}`} className={styles.star}>
            ★
          </span>
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <span key={`star-${i}`} className={styles.star}>
            ★
          </span>
        );
      } else {
        stars.push(
          <span key={`star-${i}`} className={styles.emptyStar}>
            ☆
          </span>
        );
      }
    }

    return stars;
  };

  if (!product) return null;

  return (
    <div className={styles.productPageOverlay}>
      <div className={styles.productPageContainer}>
        <button className={styles.closeButton} onClick={onClose}>
          <span>×</span>
        </button>
        
        <div className={styles.productPageContent}>
          {/* Left side - Images */}
          <div className={styles.productImagesSection}>
            <div className={styles.mainImageContainer}>
              <div className={styles.wishlistButtonLarge}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                </svg>
              </div>
              
              {product.badge && (
                <div 
                  className={styles.badgeWrapperLarge} 
                  style={{ backgroundColor: product.badgeColor }}
                >
                  <span className={styles.badgeText}>{product.badge}</span>
                </div>
              )}
              
              <Image
                src={productImages[selectedImage]}
                alt={product.title}
                width={500}
                height={500}
                className={styles.mainImage}
              />
            </div>
            
            <div className={styles.thumbnailsContainer}>
              {productImages.map((img, index) => (
                <div 
                  key={index}
                  className={`${styles.thumbnailItem} ${selectedImage === index ? styles.activeThumbnail : ''}`}
                  onClick={() => setSelectedImage(index)}
                >
                  <Image
                    src={img}
                    alt={`${product.title} ${index + 1}`}
                    width={80}
                    height={80}
                    className={styles.thumbnailImage}
                  />
                </div>
              ))}
            </div>
          </div>
          
          {/* Right side - Product Info */}
          <div className={styles.productInfoSection}>
            <div className={styles.brandSection}>
              <Link href="/brand/donaluxe" className={styles.brandLink}>
                {product.brand || "Brand Name"}
              </Link>
            </div>
            
            <h1 className={styles.productTitle}>{product.title}</h1>
            <p className={styles.productDescription}>{product.description}</p>
            
            <div className={styles.ratingsRow}>
              <div className={styles.rating}>{renderStars(product.rating)}</div>
              <span className={styles.reviewCount}>({product.reviewCount} تقييم)</span>
            </div>
            
            <div className={styles.priceSection}>
              <div className={styles.priceWrapper}>
                <span className={styles.discountPrice}>{product.discountPrice} SAR</span>
                <span className={styles.originalPrice}>{product.originalPrice} SAR</span>
                <span className={styles.discountBadge}>%{discountPercentage}</span>
              </div>
              
              {product.freeShipping && (
                <div className={styles.shippingInfo}>
                  <span className={styles.shippingIcon}>🚚</span>
                  <span>{product.shippingText || "شحن مجاني"}</span>
                </div>
              )}
            </div>
            
            {sizes.length > 0 && (
              <div className={styles.sizesSection}>
                <div className={styles.sizeHeader}>
                  <span className={styles.sizeTitle}>المقاس</span>
                  <button 
                    className={styles.sizeGuideButton}
                    onClick={() => setShowSizeGuide(!showSizeGuide)}
                  >
                    دليل المقاسات
                  </button>
                </div>
                
                <div className={styles.sizesGrid}>
                  {sizes.map((size) => (
                    <button
                      key={size}
                      className={`${styles.sizeButton} ${selectedSize === size ? styles.selectedSize : ''}`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                
                {showSizeGuide && (
                  <div className={styles.sizeGuideModal}>
                    <div className={styles.sizeGuideContent}>
                      <h3>دليل المقاسات</h3>
                      <table className={styles.sizeTable}>
                        <thead>
                          <tr>
                            <th>المقاس</th>
                            <th>الطول (سم)</th>
                            <th>العرض (سم)</th>
                            <th>الوزن (كجم)</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>S</td>
                            <td>160-165</td>
                            <td>80-85</td>
                            <td>50-55</td>
                          </tr>
                          <tr>
                            <td>M</td>
                            <td>165-170</td>
                            <td>85-90</td>
                            <td>55-65</td>
                          </tr>
                          <tr>
                            <td>L</td>
                            <td>170-175</td>
                            <td>90-95</td>
                            <td>65-75</td>
                          </tr>
                          <tr>
                            <td>XL</td>
                            <td>175-180</td>
                            <td>95-100</td>
                            <td>75-85</td>
                          </tr>
                        </tbody>
                      </table>
                      <button 
                        className={styles.closeGuideButton}
                        onClick={() => setShowSizeGuide(false)}
                      >
                        إغلاق
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
            
            <div className={styles.quantitySection}>
              <span className={styles.quantityLabel}>الكمية</span>
              <div className={styles.quantityControls}>
                <button 
                  className={styles.quantityButton}
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className={styles.quantityValue}>{quantity}</span>
                <button 
                  className={styles.quantityButton}
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= 10}
                >
                  +
                </button>
              </div>
            </div>
            
            <div className={styles.actionsSection}>
              <button 
                className={styles.addToCartButton}
                onClick={handleAddToCart}
              >
                إضافة إلى السلة
              </button>
              
              <button className={styles.buyNowButton}>
                شراء الآن
              </button>
            </div>
            
            <div className={styles.productDetails}>
              <h3 className={styles.detailsTitle}>تفاصيل المنتج</h3>
              <div className={styles.detailsContent}>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>رقم المنتج:</span>
                  <span className={styles.detailValue}>{product.id}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>المادة:</span>
                  <span className={styles.detailValue}>قطن 95%، إيلاستين 5%</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>الموديل:</span>
                  <span className={styles.detailValue}>عالي الخصر</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>بلد المنشأ:</span>
                  <span className={styles.detailValue}>تركيا</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>الضمان:</span>
                  <span className={styles.detailValue}>ضمان الجودة لمدة سنة</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}