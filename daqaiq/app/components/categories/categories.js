"use client";
import React, { useState, useRef, useEffect } from "react";
import styles from "./categories.module.css";
import Link from "next/link";
import Image from "next/image";

const categoriesData = [
  { image: "/Icons/battery.svg", name: "Brand 1" },
  { image: "/Icons/carwash.svg", name: "Brand 2" },
  { image: "/Icons/electricalservice.svg", name: "Brand 3" },
  { image: "/Icons/engine.svg", name: "Brand 4" },
  { image: "/Icons/gearstick.svg", name: "Brand 5" },
  { image: "/Icons/oit.svg", name: "Brand 6" },
  { image: "/Icons/piston.svg", name: "Brand 7" },
  { image: "/Icons/reperation.svg", name: "Brand 8" },
  { image: "/Icons/suspension.svg", name: "Brand 9" },
  { image: "/Icons/tire.svg", name: "Brand 10" },
];

const Categories = () => {
  const categoriesRef = useRef(null);

  const scrollCategories = (direction) => {
    if (categoriesRef.current) {
      const scrollAmount = 200; // Adjust scroll distance per click
      categoriesRef.current.scrollBy({
        left: direction === "next" ? scrollAmount : -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className={styles.categoriesContainer}>
      <div className={styles.categoriesCard}>
        <div className={styles.categoriesWrapper}>
          <button
            className={`${styles.arrowButton} ${styles.leftArrow}`}
            onClick={() => scrollCategories("prev")}
            aria-label="Previous slide"
          >
            <span className={styles.arrowIcon}>&lt;</span>
          </button>
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
  );
};

export default Categories;
