"use client";
import React, { useEffect, useState, useRef } from "react";
import styles from "./CategorySlider.module.css";
import Link from "next/link";
import Image from "next/image";

const CategorySlider = () => {
  const [categories, setCategories] = useState([]);
  const categoriesRef = useRef(null);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch('/api/categories');
      const fetchedCategories = await response.json();
      setCategories(fetchedCategories);
    };

    fetchCategories();
  }, []);

  const scrollCategories = (direction) => {
    if (categoriesRef.current) {
      const scrollAmount = 200;
      categoriesRef.current.scrollBy({
        left: direction === "next" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className={styles.categoriesSection}>
      {/* Header section with title and See All button */}
      <div className={styles.categoriesHeader}>
        <h2 className={styles.sectionTitle}>تصفح الفئات</h2>
        <Link href="/category" className={styles.seeAllLink}>
          جميع الفئات &gt;
        </Link>
      </div>

      <div className={styles.categoriesContainer}>
        <div className={styles.categoriesCard}>
          <div className={styles.categoriesWrapper}>
            {/* Left arrow (appears on right in RTL) */}
            <button
              className={`${styles.arrowButton} ${styles.leftArrow}`}
              onClick={() => scrollCategories("prev")}
              aria-label="Previous slide"
            >
              <span className={styles.arrowIcon}>&#10094;</span>
            </button>
            
            {/* Categories container with RTL direction */}
            <div className={styles.categories} ref={categoriesRef}>
              {categories.map((category) => (
                <Link
                  href={`/category/${category.slug}`}
                  key={category.id}
                  className={styles.category}
                >
                  <div className={styles.imageWrapper}>
                    {category.image ? (
                      <Image 
                        src={category.image} 
                        alt={category.name} 
                        width={100} 
                        height={100}
                        className={styles.categoryImage}
                      />
                    ) : (
                      <div className={styles.placeholderImage}>
                        {category.name.charAt(0)}
                      </div>
                    )}
                    <span className={styles.categoryName}>{category.name}</span>
                  </div>
                </Link>
              ))}
            </div>
            
            {/* Right arrow (appears on left in RTL) */}
            <button
              className={`${styles.arrowButton} ${styles.rightArrow}`}
              onClick={() => scrollCategories("next")}
              aria-label="Next slide"
            >
              <span className={styles.arrowIcon}>&#10095;</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategorySlider; 