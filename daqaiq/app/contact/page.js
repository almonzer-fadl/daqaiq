"use client";
import React from 'react';
import styles from './contact.module.css';
import Header from '../components/Header';
import Footer from '../components/footer';

export default function Contact() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className="text-4xl font-bold text-black mb-8">تواصل معنا</h1>
        </div>
        <div className={styles.contentWrapper}>
          <div className={styles.formcontainer}>
            <form className={styles.form}>
              <div>
                <label className="block text-right mb-2 text-black font-bold">الاسم</label>
                <input
                  type="text"
                  className={styles.input}
                  placeholder="أدخل اسمك"
                />
              </div>
              <div>
                <label className="block text-right mb-2 text-black font-bold">البريد الإلكتروني</label>
                <input
                  type="email"
                  className={styles.input}
                  placeholder="أدخل بريدك الإلكتروني"
                />
              </div>
              <div>
                <label className="block text-right mb-2 text-black font-bold">الرسالة</label>
                <textarea
                  className={styles.input}
                  rows="4"
                  placeholder="اكتب رسالتك هنا"
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