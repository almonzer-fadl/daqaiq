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
          <h1 className="text-4xl font-bold text-center mb-8">تواصل معنا</h1>
        </div>
        <div className={styles.formcontainer}>
          <form className={styles.form}>
            <div>
              <label className="block text-right mb-2 text-primary font-bold">الاسم</label>
              <input
                type="text"
                className={styles.input}
                placeholder="أدخل اسمك"
              />
            </div>
            <div>
              <label className="block text-right mb-2 text-primary font-bold">البريد الإلكتروني</label>
              <input
                type="email"
                className={styles.input}
                placeholder="أدخل بريدك الإلكتروني"
              />
            </div>
            <div>
              <label className="block text-right mb-2 text-primary font-bold">الرسالة</label>
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
      </div>
      <Footer />
    </main>
  );
}