"use client"
import { useState, useRef, useEffect } from "react"
import styles from "./servicessection.module.css"
import Link from "next/link"
import Image from "next/image"

const serviceCategories = {
  Offers: {
    title: "منتجات السيارات المميزة",
    services: [
      {
        id: 1,
        title: "إطارات بريدجستون",
        description: "إطارات للسيارات السيدان مقاس 16",
        image: "/placeholder.svg?height=300&width=300",
        rating: 5,
        reviewCount: 195,
        originalPrice: 699.99,
        discountPrice: 489.99,
        discountPercentage: 30,
        badge: "كمية كبيرة",
        badgeColor: "#07b99f",
        link: "/product/1",
        freeShipping: true,
        shippingText: "شحن مجاني فوق 500 ر.س",
      },
      {
        id: 2,
        title: "زيت موبيل 1",
        description: "زيت محرك اصطناعي بالكامل 5W-30",
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.8,
        reviewCount: 3252,
        originalPrice: 267.93,
        discountPrice: 133.29,
        discountPercentage: 51,
        badge: "الأكثر مبيعاً",
        badgeColor: "#fe3d50",
        link: "/product/2",
        freeShipping: true,
        shippingText: "شحن مجاني فوق 500 ر.س",
      },
      {
        id: 3,
        title: "مساحات بوش",
        description: "مجموعة مساحات زجاج أمامية مقاومة للماء",
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.7,
        reviewCount: 39,
        originalPrice: 172.27,
        discountPrice: 146.43,
        discountPercentage: 15,
        badge: "جودة عالية",
        badgeColor: "#b036e0",
        link: "/product/3",
        freeShipping: true,
        shippingText: "شحن مجاني فوق 500 ر.س",
      },
      {
        id: 4,
        title: "بطارية إنرجايزر",
        description: "بطارية سيارة 60 أمبير مع ضمان 3 سنوات",
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.9,
        reviewCount: 581,
        originalPrice: 859.8,
        discountPrice: 558.87,
        discountPercentage: 35,
        badge: "كمية كبيرة",
        badgeColor: "#07b99f",
        link: "/product/4",
        freeShipping: true,
        shippingText: "شحن مجاني فوق 500 ر.س",
      },
      {
        id: 5,
        title: "عطر سيارة فاخر",
        description: "عطر سيارة طويل الأمد برائحة المسك",
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.8,
        reviewCount: 586,
        originalPrice: 280.0,
        discountPrice: 140.0,
        discountPercentage: 50,
        badge: "كمية كبيرة",
        badgeColor: "#07b99f",
        link: "/product/5",
        freeShipping: true,
        shippingText: "شحن مجاني",
      },
      {
        id: 6,
        title: "شاحن سيارة USB",
        description: "شاحن سريع متعدد المنافذ بتقنية QC 3.0",
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.8,
        reviewCount: 1587,
        originalPrice: 142.99,
        discountPrice: 100.09,
        discountPercentage: 30,
        badge: "تخفيضات سريعة",
        badgeColor: "#ff6600",
        link: "/product/6",
        freeShipping: true,
        shippingText: "شحن مجاني فوق 500 ر.س",
      },
    ],
  },
}

export default function ProductSlider() {
  const scrollRefs = useRef({});
  const [showLeftArrow, setShowLeftArrow] = useState({});
  const [showRightArrow, setShowRightArrow] = useState({});
  
  // Function to handle scroll events and update arrow visibility
  const handleScroll = (categoryKey) => {
    const container = scrollRefs.current[categoryKey];
    if (!container) return;
    
    // Check if we can scroll left (right arrow visibility in RTL)
    const canScrollLeft = container.scrollLeft < 0;
    
    // Check if we can scroll right (left arrow visibility in RTL)
    const isAtStart = Math.abs(
      container.scrollWidth + container.scrollLeft - container.clientWidth
    ) < 10;
    
    // Only update state if the values have actually changed to prevent re-renders
    setShowLeftArrow(prev => {
      if (prev[categoryKey] !== canScrollLeft) {
        return { ...prev, [categoryKey]: canScrollLeft };
      }
      return prev;
    });
    
    setShowRightArrow(prev => {
      if (prev[categoryKey] !== !isAtStart) {
        return { ...prev, [categoryKey]: !isAtStart };
      }
      return prev;
    });
  };

  // Initialize scroll position tracking for each category
  useEffect(() => {
    const initArrows = () => {
      Object.keys(serviceCategories).forEach(key => {
        const container = scrollRefs.current[key];
        if (container) {
          // Initial arrow visibility checks for RTL
          const canScrollRight = container.scrollWidth > container.clientWidth;
          const canScrollLeft = container.scrollLeft < 0;
          
          setShowRightArrow(prev => ({ ...prev, [key]: canScrollRight }));
          setShowLeftArrow(prev => ({ ...prev, [key]: canScrollLeft }));
          
          // Add scroll event listener with throttling
          let ticking = false;
          container.addEventListener('scroll', () => {
            if (!ticking) {
              window.requestAnimationFrame(() => {
                handleScroll(key);
                ticking = false;
              });
              ticking = true;
            }
          });
        }
      });
    };
    
    // Use a timeout to ensure refs are set
    const timer = setTimeout(initArrows, 100);
    return () => clearTimeout(timer);
  }, []);

  // Scroll function with fixed direction for RTL
  const scrollCategory = (categoryKey, direction) => {
    const container = scrollRefs.current[categoryKey];
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

  // Function to initialize refs
  const setRef = (el, categoryKey) => {
    if (el) {
      scrollRefs.current[categoryKey] = el;
    }
  };

  return (
    <section className={styles.container}>
      <div className={styles.content}>
        {Object.entries(serviceCategories).map(([key, category]) => (
          <div key={key} className={styles.categorySection}>
            <div className={styles.categoryHeader}>
              <h2 className={styles.categoryTitle}>{category.title}</h2>
              <Link href={`/services/${key}`} className={styles.viewAllButton}>
                اكتشف المزيد
                <span className={styles.viewAllArrow}>←</span>
              </Link>
            </div>

            <div className={styles.sliderContainer}>
              {showRightArrow[key] && (
                <button
                  className={`${styles.arrowButton} ${styles.rightArrow}`}
                  onClick={() => scrollCategory(key, "next")}
                  aria-label="Next products"
                >
                  <span className={styles.arrowIcon}>❯</span>
                </button>
              )}

              <div 
                className={styles.servicesContainer} 
                ref={(el) => setRef(el, key)}
              >
                <div className={styles.servicesRow}>
                  {category.services.map((product) => (
                    <div key={product.id} className={styles.productCard}>
                      <div className={styles.productImageWrapper}>
                        <button className={styles.wishlistButton} aria-label="Add to wishlist">
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

                        <Link href={product.link}>
                          <div className={styles.productImage}>
                            <Image
                              src={product.image || "/placeholder.svg"}
                              alt={product.title}
                              width={200}
                              height={200}
                              className={styles.image}
                            />
                          </div>
                        </Link>

                        {product.freeShipping && (
                          <div className={styles.shippingBadge}>
                            <span className={styles.shippingIcon}>🚚</span>
                            <span>{product.shippingText}</span>
                          </div>
                        )}
                      </div>

                      <Link href={product.link} className={styles.productLink}>
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
                    </div>
                  ))}
                </div>
              </div>

              {showLeftArrow[key] && (
                <button
                  className={`${styles.arrowButton} ${styles.leftArrow}`}
                  onClick={() => scrollCategory(key, "prev")}
                  aria-label="Previous products"
                >
                  <span className={styles.arrowIcon}>❮</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}