"use client";
import { useState } from 'react';
import styles from './services.module.css';
import Header from '../components/Header';
import Footer from '../components/footer';

const serviceCategories = {
  Offers: {
    title: "خدمات الفحص",
    services: [
      {
        id: 1,
        title: "فحص شامل",
        description: "فحص شامل للسيارة مع تقرير مفصل",
        icon: "🚗",
        link: "/prices"
      },
      // Add more services (up to 7 per category)
    ]
  },
  inspection: {
    title: "خدمات الفحص",
    services: [
      {
        id: 1,
        title: "فحص شامل",
        description: "فحص شامل للسيارة مع تقرير مفصل",
        icon: "🚗",
        link: "/prices"
      },
      // Add more services (up to 7 per category)
    ]
  },
  maintenance: {
    title: "خدمات الصيانة",
    services: [
      {
        id: 8,
        title: "صيانة دورية",
        description: "صيانة دورية شاملة للسيارة",
        icon: "🔧",
        link: "/maintenance"
      },
      // Add more services (up to 7 per category)
    ]
  },
  // Add more categories...
}

export default function Services() {
  const [searchTerm, setSearchTerm] = useState('');

  const filterServices = (services) => {
    return services.filter(service =>
      service.title.includes(searchTerm) ||
      service.description.includes(searchTerm)
    );
  };

  return (
    <main className={styles.container}>
      <Header />
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="ابحث عن الخدمة..."
          className={styles.searchBar}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className={styles.content}>
        <h1 className={styles.title}>خدماتنا</h1>
        {Object.entries(serviceCategories).map(([key, category]) => (
          <div key={key} className={styles.categorySection}>
            <div className={styles.categoryHeader}>
              <h2 className={styles.categoryTitle}>{category.title}</h2>
              <button className={styles.viewAllButton}>عرض الكل</button>
            </div>
            <div className={styles.servicesContainer}>
              <div className={styles.servicesRow}>
                {filterServices(category.services).map((service) => (
                  <div key={service.id} className={styles.serviceCard}>
                    <div className={styles.serviceIcon}>{service.icon}</div>
                    <h3 className={styles.serviceTitle}>{service.title}</h3>
                    <p className={styles.serviceDescription}>{service.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </main>
  );
}