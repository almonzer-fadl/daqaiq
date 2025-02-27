"use client";
import React, { useState } from 'react';
import styles from './prices.module.css';
import Header from '../components/Header';
import Footer from '../components/footer';

export default function Prices() {
  const [selectedCategory, setSelectedCategory] = useState('sedan');

  const categories = [
    {
      id: 'sedan',
      name: 'سيارات سيدان',
      icon: 'https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2F035f0cb2f859ff511ff083bdf584d046.cdn.bubble.io%2Ff1720348618278x414051998667448500%2Fsmall.png'
    },
    {
      id: 'suv',
      name: 'سيارات SUV',
      icon: 'https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2F035f0cb2f859ff511ff083bdf584d046.cdn.bubble.io%2Ff1720348630810x260140537009414980%2Fsuv.png'
    },
    {
      id: 'european',
      name: 'سيارات اوربية',
      icon: 'https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2F035f0cb2f859ff511ff083bdf584d046.cdn.bubble.io%2Ff1720348665452x583361443612831400%2Feur.png'
    },
    {
      id: 'luxury',
      name: 'سيارات فارهة',
      icon: 'https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2F035f0cb2f859ff511ff083bdf584d046.cdn.bubble.io%2Ff1720348682078x275515631658935780%2Flux.png'
    },
    {
      id: 'superlux',
      name: 'سيارات فارهة جدا',
      icon: 'https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2F035f0cb2f859ff511ff083bdf584d046.cdn.bubble.io%2Ff1720348693355x778449302683953200%2Fsuper%2520lux.png'
    }
  ];

  const prices = {
    sedan: [
      {
        title: "الباقة الأساسية",
        price: "299",
        features: ["فحص شامل", "تقرير مفصل", "ضمان الفحص"]
      },
      {
        title: "الباقة المتقدمة", 
        price: "399",
        features: ["فحص شامل", "تقرير مفصل", "ضمان الفحص", "فحص كمبيوتر"]
      },
      {
        title: "الباقة الشاملة",
        price: "499", 
        features: ["فحص شامل", "تقرير مفصل", "ضمان الفحص", "فحص كمبيوتر", "تقييم السعر"]
      }
    ],
    suv: [
      {
        title: "الباقة الأساسية",
        price: "399",
        features: ["فحص شامل", "تقرير مفصل", "ضمان الفحص"]
      },
      {
        title: "الباقة المتقدمة", 
        price: "499",
        features: ["فحص شامل", "تقرير مفصل", "ضمان الفحص", "فحص كمبيوتر"]
      },
      {
        title: "الباقة الشاملة",
        price: "599", 
        features: ["فحص شامل", "تقرير مفصل", "ضمان الفحص", "فحص كمبيوتر", "تقييم السعر"]
      }
    ],
    european: [
      {
        title: "الباقة الأساسية",
        price: "499",
        features: ["فحص شامل", "تقرير مفصل", "ضمان الفحص"]
      },
      {
        title: "الباقة المتقدمة", 
        price: "599",
        features: ["فحص شامل", "تقرير مفصل", "ضمان الفحص", "فحص كمبيوتر"]
      },
      {
        title: "الباقة الشاملة",
        price: "699", 
        features: ["فحص شامل", "تقرير مفصل", "ضمان الفحص", "فحص كمبيوتر", "تقييم السعر"]
      }
    ],
    luxury: [
      {
        title: "الباقة الأساسية",
        price: "699",
        features: ["فحص شامل", "تقرير مفصل", "ضمان الفحص"]
      },
      {
        title: "الباقة المتقدمة", 
        price: "799",
        features: ["فحص شامل", "تقرير مفصل", "ضمان الفحص", "فحص كمبيوتر"]
      },
      {
        title: "الباقة الشاملة",
        price: "899", 
        features: ["فحص شامل", "تقرير مفصل", "ضمان الفحص", "فحص كمبيوتر", "تقييم السعر"]
      }
    ],
    superlux: [
      {
        title: "الباقة الأساسية",
        price: "899",
        features: ["فحص شامل", "تقرير مفصل", "ضمان الفحص"]
      },
      {
        title: "الباقة المتقدمة", 
        price: "999",
        features: ["فحص شامل", "تقرير مفصل", "ضمان الفحص", "فحص كمبيوتر"]
      },
      {
        title: "الباقة الشاملة",
        price: "1099", 
        features: ["فحص شامل", "تقرير مفصل", "ضمان الفحص", "فحص كمبيوتر", "تقييم السعر"]
      }
    ]
  };

  return (
    <main className="min-h-screen">
      <Header />
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className="text-4xl font-bold">الاسعار</h1>
        </div>
        <div className={styles.priceSection}>
          <div className={styles.categoryList}>
            {categories.map((category) => (
              <div 
                key={category.id}
                className={styles.categoryItem}
                onClick={() => setSelectedCategory(category.id)}
              >
                <span className={styles.categoryText}>{category.name}</span>
                <img 
                  src={category.icon}
                  alt={category.name}
                  className={styles.categoryIcon}
                />
              </div>
            ))}
          </div>
          <div className={styles.priceCards}>
            {prices[selectedCategory]?.map((plan, index) => (
              <div key={index} className={styles.card}>
                <h2 className={styles.cardTitle}>{plan.title}</h2>
                <div className={styles.price}>
                  {plan.price} ريال
                </div>
                <ul className={styles.features}>
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className={styles.feature}>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}