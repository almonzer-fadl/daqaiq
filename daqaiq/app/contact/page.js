"use client";
import React, { useState } from 'react';
import styles from './contact.module.css';
import Header from '../components/Header';
import Footer from '../components/footer';

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
      <Header />
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className="text-4xl font-bold text-black mb-8">تواصل معنا</h1>
        </div>
        <div className={styles.contentWrapper}>
          <div className={styles.formcontainer}>
            <form className={styles.form} onSubmit={checkForm}>
              <div>
                <label className="block text-right mb-2 text-black font-bold">الاسم</label>
                <input
                  type="text"
                  className={styles.input}
                  placeholder="أدخل اسمك"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-right mb-2 text-black font-bold">البريد الإلكتروني</label>
                <input
                  type="email"
                  className={styles.input}
                  placeholder="أدخل بريدك الإلكتروني"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-right mb-2 text-black font-bold">الرسالة</label>
                <textarea
                  className={styles.input}
                  rows="4"
                  placeholder="اكتب رسالتك هنا"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>
              </div>
              <button
                type="submit"
                className={styles.button}>
                إرسال
              </button>
            </form>
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
      <Footer />
    </main>
  );
}