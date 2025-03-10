"use client";
import React, { useRef } from "react";
import styles from "./categories.module.css";
import Link from "next/link";
import Image from "next/image";

const categoriesData = [
  { image: "/Icons/battery.svg", name: "Categorey 1" },
  { image: "/Icons/carwash.svg", name: "Categorey 2" },
  { image: "/Icons/electricalservice.svg", name: "Categorey 3" },
  { image: "/Icons/engine.svg", name: "Categorey 4" },
  { image: "/Icons/gearstick.svg", name: "Categorey 5" },
  { image: "/Icons/oit.svg", name: "Categorey 6" },
  { image: "/Icons/piston.svg", name: "Categorey 7" },
  { image: "/Icons/reperation.svg", name: "Categorey 8" },
  { image: "/Icons/suspension.svg", name: "Categorey 9" },
  { image: "/Icons/tire.svg", name: "Categorey 10" },
];

const Categories = () => {
  const categoriesRef = useRef(null);

  // Updated scroll function to work correctly with RTL layout
  const scrollCategories = (direction) => {
    if (categoriesRef.current) {
      // For RTL layout, we need to reverse the scroll direction
      // because scrollLeft increases as you scroll right-to-left in RTL
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
        <h2 className={styles.sectionTitle}>الفئات</h2>
        <Link href="/Categorey" className={styles.seeAllLink}>
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
              <span className={styles.arrowIcon}>&lt;</span>
            </button>
            
            {/* Categories container with RTL direction */}
            <div className={styles.categories} ref={categoriesRef}>
              {categoriesData.map((category, index) => (
                <Link
                  href={`/brands/${category.name.toLowerCase().replace(/\s+/g, "-")}`}
                  key={index}
                  className={styles.category}
                >
                  <div className={styles.imageWrapper}>
                    <Image src={category.image} alt={category.name} width={100} height={100} />
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
              <span className={styles.arrowIcon}>&gt;</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;