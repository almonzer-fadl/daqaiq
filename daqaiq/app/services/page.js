"use client";
import styles from './services.module.css';
import Header from '../components/Header';
import Footer from '../components/footer';

const services = [
  {
    id: 1,
    title: "فحص السيارات",
    description: "فحص شامل للسيارة قبل الشراء مع تقرير مفصل",
    icon: "🚗",
    link: "/prices"
  },
  {
    id: 2,
    title: "تقييم السيارات",
    description: "تقييم سعر السيارة حسب حالتها وسعر السوق",
    icon: "💰",
    link: "/evaluation"
  },
  {
    id: 3,
    title: "خدمة المعاينة",
    description: "معاينة السيارة في موقعها قبل الشراء",
    icon: "🔍",
    link: "/inspection"
    
  },
  {
    id: 4,
    title: "فحص السيارات",
    description: "فحص شامل للسيارة قبل الشراء مع تقرير مفصل",
    icon: "🚗",
    link: "/prices"
  },
  {
    id: 5,
    title: "تقييم السيارات",
    description: "تقييم سعر السيارة حسب حالتها وسعر السوق",
    icon: "💰",
    link: "/evaluation"
  },
  {
    id: 6,
    title: "خدمة المعاينة",
    description: "معاينة السيارة في موقعها قبل الشراء",
    icon: "🔍",
    link: "/inspection"
    
  }
];

export default function Services() {
  return (
    <main className={styles.container}>
      <Header />
      <div className={styles.content}>
        <h1 className={styles.title}>خدماتنا</h1>
        <div className={styles.servicesGrid}>
          {services.map((service) => (
            <div key={service.id} className={styles.serviceCard}>
              <div className={styles.serviceIcon}>{service.icon}</div>
              <h2 className={styles.serviceTitle}>{service.title}</h2>
              <p className={styles.serviceDescription}>{service.description}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}