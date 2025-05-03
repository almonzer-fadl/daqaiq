"use client";
import React from 'react';
import styles from './location.module.css';
import HeaderTop from "../components/HeaderTop";
import NavbarMain from "../components/NavbarMain";
import NavLinks from "../components/NavLinks";
import FooterMain from '../components/FooterMain';
import Image from 'next/image';

export default function Location() {
  const handleMapClick = () => {
    window.open('https://maps.app.goo.gl/2K7jBtSmDNpmc4no7', '_blank');
  };

  return (
    <main className="min-h-screen bg-white">
      <HeaderTop />
      <NavbarMain />
      <NavLinks />
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className="text-4xl font-bold text-center mb-8">موقعنا</h1>
        </div>
        <div className={styles.content}>
          <div className={styles.infosection}>
            <h2 className="text-2xl font-bold text-black text-right">العنوان</h2>
            <p className="text-lg text-right">
              المملكة العربية السعودية، الرياض
              <br />
              شارع الرئيسي، مبنى رقم 123
            </p>
            <div className="space-y-2 text-right">
              <p className="text-black font-bold">ساعات العمل:</p>
              <p>السبت - الخميس: 9 صباحاً - 9 مساءً</p>
              <p>الجمعة: مغلق</p>
            </div>
          </div>
          <div className={styles.mapsection}>
            <div 
              onClick={handleMapClick} 
              style={{ cursor: 'pointer' }}
            >
              <Image
                src="/map-preview.png"
                alt="موقعنا على الخريطة"
                width={600}
                height={400}
                style={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: '8px'
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <FooterMain />
    </main>
  );
}