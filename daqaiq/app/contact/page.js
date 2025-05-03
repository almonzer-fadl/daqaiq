"use client";
import React, { useState } from 'react';
import styles from './contact.module.css';
import FooterMain from '../components/FooterMain';
import HeaderTop from "../components/HeaderTop";
import NavbarMain from "../components/NavbarMain";
import NavLinks from "../components/NavLinks";

const validateForm = (formData) => {
  const errors = {};
  
  if (!formData.email?.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    errors.email = 'البريد الإلكتروني غير صالح';
  }
  
  if (formData.phone && !formData.phone.match(/^[0-9]{10}$/)) {
    errors.phone = 'رقم الهاتف غير صالح';
  }
  
  return errors;
};

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const checkForm = (e) => {
    e.preventDefault();
    
    if (!name) {
      alert("Don't forget your name!");
      return;
    }
    if (!email) {
      alert("We need your email to say hello back!");
      return;
    }
    if (!message) {
      alert("Don't forget to write your message!");
      return;
    }
  };

  return (
    <main className="min-h-screen">
      <HeaderTop />
      <NavbarMain />
      <NavLinks />
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className="text-4xl font-bold text-black mb-8">تواصل معنا</h1>
        </div>
        <div className={styles.contentWrapper}>
          <div className={styles.formcontainer}>
          </div>
          <div className={styles.infoContainer}>
            <h2 className={styles.infoTitle}>معلومات التواصل</h2>
            <div className={styles.infoItem}>
              <div className={styles.infoIcon}>📍</div>
              <div className={styles.infoText}>
                الرياض، المملكة العربية السعودية
              </div>
            </div>
            <div className={styles.infoItem}>
              <div className={styles.infoIcon}>📞</div>
              <div className={styles.infoText}>
                +966 50 123 4567
              </div>
            </div>
            <div className={styles.infoItem}>
              <div className={styles.infoIcon}>✉️</div>
              <div className={styles.infoText}>
                info@daqaiq.com
              </div>
            </div>
            <div className={styles.infoItem}>
              <div className={styles.infoIcon}>⏰</div>
              <div className={styles.infoText}>
                السبت - الخميس: 9:00 ص - 6:00 م
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterMain />
    </main>
  );
}