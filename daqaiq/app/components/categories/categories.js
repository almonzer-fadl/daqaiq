"use client";
import React from 'react';
import Image from 'next/image';
import Styles from './categories.module.css';

const Categories = () => {
  return (
    <div className={`${Styles.carousel} carousel carousel-center bg-neutral rounded-box max-w-md space-x-4 p-4`}>
      <div className="carousel-item">
        <Image
          src="https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp"
          alt='firstslide'
          width={200}
          height={200}
          className="rounded-box"
        />
      </div>
      <div className="carousel-item">
        <Image
          src="https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.webp"
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