"use client"
import { useState, useRef, useEffect } from "react"
import styles from "./ProductSlider.module.css"
import Link from "next/link"
import Image from "next/image"

export default function ProductSlider({ categoryData, sectionId }) {
  const scrollRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  
  // Function to handle scroll events and update arrow visibility
  const handleScroll = () => {
    const container = scrollRef.current;
    if (!container) return;
    
    // Check if we can scroll left (right arrow visibility in RTL)
    const canScrollLeft = container.scrollLeft < 0;
    
    // Check if we can scroll right (left arrow visibility in RTL)
    const isAtStart = Math.abs(
      container.scrollWidth + container.scrollLeft - container.clientWidth
    ) < 10;
    
    setShowLeftArrow(canScrollLeft);
    setShowRightArrow(!isAtStart);
  };

  // Initialize scroll position tracking
  useEffect(() => {
    const initArrows = () => {
      const container = scrollRef.current;
      if (container) {
        // Initial arrow visibility checks for RTL
        const canScrollRight = container.scrollWidth > container.clientWidth;
        setShowRightArrow(canScrollRight);
        
        // Add scroll event listener with throttling
        let ticking = false;
        container.addEventListener('scroll', () => {
          if (!ticking) {
            window.requestAnimationFrame(() => {
              handleScroll();
              ticking = false;
            });
            ticking = true;
          }
        });
      }
    };
    
    // Use a timeout to ensure refs are set
    const timer = setTimeout(initArrows, 100);
    return () => clearTimeout(timer);
  }, [categoryData]);

  // Scroll function with fixed direction for RTL
  const scrollCategory = (direction) => {
    const container = scrollRef.current;
    if (!container) return;
    
    const cardWidth = 250; // Approximate width of a card + margin
    // For RTL layout, the scrolling direction needs to be inverted
    const scrollAmount = direction === "next" ? cardWidth : -cardWidth;
    
    container.scrollBy({
      left: scrollAmount,
      behavior: "smooth"
    });
  };

  // Helper function to render star ratings
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const stars = [];

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <span key={`star-${i}`} className={styles.star}>
            ★
          </span>,
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <span key={`star-${i}`} className={styles.star}>
            ★
          </span>,
        );
      } else {
        stars.push(
          <span key={`star-${i}`} className={styles.emptyStar}>
            ☆
          </span>,
        );
      }
    }

    return stars;
  };

  return (
    <section className={styles.container} id={sectionId || ""}>
      <div className={styles.content}>
        <div className={styles.categorySection}>
          <div className={styles.categoryHeader}>
            <h2 className={styles.categoryTitle}>{categoryData.title}</h2>
            <Link href={`/services/${sectionId}`} className={styles.viewAllButton}>
              اكتشف المزيد
              <span className={styles.viewAllArrow}>←</span>
            </Link>
          </div>

          <div className={styles.sliderContainer}>
            {showLeftArrow && (
              <button
                className={`${styles.arrowButton} ${styles.leftArrow}`}
                onClick={() => scrollCategory("prev")}
                aria-label="Previous products"
              >
                <span className={styles.arrowIcon}>❮</span>
              </button>
            )}

            <div className={styles.servicesContainer} ref={scrollRef}>
              <div className={styles.servicesRow}>
                {categoryData.services.map((product) => (
                  <Link 
                    key={product.id} 
                    href={`/products/${product.id}`}
                    className={styles.productCard}
                  >
                    <div className={styles.productImageWrapper}>
                      <button 
                        className={styles.wishlistButton} 
                        aria-label="Add to wishlist"
                        onClick={(e) => {
                          e.preventDefault(); // Prevent navigation
                          e.stopPropagation(); // Prevent card click event
                          // Handle wishlist logic here
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className={styles.heartIcon}
                        >
                          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                        </svg>
                      </button>

                      {product.badge && (
                        <div className={styles.badgeWrapper} style={{ backgroundColor: product.badgeColor }}>
                          <span className={styles.badgeText}>{product.badge}</span>
                        </div>
                      )}

                      <div className={styles.productImage}>
                        <Image
                          src={product.image || "/images/products/placeholder.jpg"}
                          alt={product.title}
                          width={200}
                          height={200}
                          className={styles.image}
                        />
                      </div>

                      {product.freeShipping && (
                        <div className={styles.shippingBadge}>
                          <span className={styles.shippingIcon}>🚚</span>
                          <span>{product.shippingText}</span>
                        </div>
                      )}
                    </div>

                    <div className={styles.productInfo}>
                      <h3 className={styles.productTitle}>{product.title}</h3>
                      <p className={styles.productDescription}>{product.description}</p>

                      <div className={styles.ratingsRow}>
                        <div className={styles.rating}>{renderStars(product.rating)}</div>
                        <span className={styles.reviewCount}>({product.reviewCount})</span>
                      </div>

                      <div className={styles.priceWrapper}>
                        <span className={styles.discountPrice}>{product.discountPrice} SAR</span>
                        <span className={styles.originalPrice}>{product.originalPrice} SAR</span>
                        <span className={styles.discountBadge}>%{product.discountPercentage}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {showRightArrow && (
              <button
                className={`${styles.arrowButton} ${styles.rightArrow}`}
                onClick={() => scrollCategory("next")}
                aria-label="Next products"
              >
                <span className={styles.arrowIcon}>❯</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}