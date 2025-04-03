"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './Hero.module.css';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    "/images/hero1.jpg",
    "/images/hero2.jpg",
    "/images/hero3.jpg",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, );

  const goToSlide = (direction) => {
    setCurrentSlide((prevSlide) => {
      if (direction === 'next') {
        return (prevSlide + 1) % slides.length;
      } else {
        return prevSlide === 0 ? slides.length - 1 : prevSlide - 1;
      }
    });
  };

  return (
    <div className={styles.heroContainer}>
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`${styles.slide} ${index === currentSlide ? styles.active : ''}`}
        >
          <Image
            src={slide}
            alt={`Hero Slide ${index + 1}`}
            fill
            style={{ objectFit: "cover" }}
            priority
          />
        </div>
      ))}
      <button 
        className={`${styles.arrowButton} ${styles.leftArrow}`} 
        onClick={() => goToSlide('prev')}
        aria-label="Previous slide"
      >
        <span className={styles.arrowIcon}></span>
      </button>
      <button 
        className={`${styles.arrowButton} ${styles.rightArrow}`} 
        onClick={() => goToSlide('next')}
        aria-label="Next slide"
      >
        <span className={styles.arrowIcon}></span>
      </button>
    </div>
  );
};

export default Hero;