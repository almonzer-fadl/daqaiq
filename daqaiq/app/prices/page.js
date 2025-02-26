"use client";
import React from 'react';
import styles from './prices.module.css';
import Header from '../components/Header';
import Footer from '../components/footer';

export default function Prices() {
  const prices = [
    {
      title: "الباقة الأساسية",
      price: "299",
      features: ["فحص المحرك", "فحص الفرامل", "فحص التعليق"],
    },
    {
      title: "الباقة المتقدمة",
      price: "499",
      features: ["جميع خدمات الباقة الأساسية", "فحص الكهرباء", "فحص التكييف"],
    },
    {
      title: "الباقة الشاملة",
      price: "799",
      features: ["جميع خدمات الباقة المتقدمة", "فحص الكمبيوتر", "تقرير مفصل"],
    },
  ];

  return (
    <main className="min-h-screen bg-white">
      <Header />
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className="text-4xl font-bold text-center mb-8">الأسعار</h1>
        </div>
        <div className={styles.priceCards}>
          {prices.map((plan, index) => (
            <div key={index} className={styles.card}>
              <h2 className="text-2xl font-bold text-primary mb-4">{plan.title}</h2>
              <div className={styles.price}>
                {plan.price} ريال
              </div>
              <ul className={styles.features}>
                {plan.features.map((feature, idx) => (
                  <li key={idx} className={styles.feature}>
                    <span>{feature}</span>
                    <span className="ml-2 text-green-500">✓</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}