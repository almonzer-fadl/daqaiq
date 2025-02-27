"use client";
import React from 'react';
import styles from './location.module.css';
import Header from '../components/Header';
import Footer from '../components/footer';

export default function Location() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className="text-4xl font-bold text-center mb-8">موقعنا</h1>
        </div>
        <div className={styles.content}>
          <div className={styles.infosection}>
            <h2 className="text-2xl font-bold text-primary text-right">العنوان</h2>
            <p className="text-lg text-right">
              المملكة العربية السعودية، الرياض
              <br />
              شارع الرئيسي، مبنى رقم 123
            </p>
            <div className="space-y-2 text-right">
              <p className="text-primary font-bold">ساعات العمل:</p>
              <p>السبت - الخميس: 9 صباحاً - 9 مساءً</p>
              <p>الجمعة: مغلق</p>
            </div>
          </div>
          <div className={styles.mapsection}>
            {/* Add your map component here */}
            <div className="w-full h-full rounded-lg">Map goes here</div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}