"use client";
import React from 'react';
import Image from 'next/image';
import Styles from './categories.module.css';

const Categories = () => {
  return (
    <div className={`${Styles.carousel} carousel carousel-center bg-neutral rounded-box max-w-md space-x-4 p-4`}>
      <div className="carousel-item">
        <Image
          src="/images/120riyaloffer.jpg"
          alt='firstslide'
          width={200}
          height={200}
          className="rounded-box"
        />
      </div>
      <div className="carousel-item">
        <Image
          src="/images/120riyaloffer.jpg"
          alt='secondslide'
          width={200}
          height={200}
          className="rounded-box"
        />
      </div>
      {/* Add the rest of your carousel items here */}
    </div>
  );
}

export default Categories;