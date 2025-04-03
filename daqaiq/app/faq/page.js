"use client";
import React, { useState } from 'react';
import styles from './faq.module.css';
import Headertop from "../components/headertop";
import Navbar from "../components/navbar";
import Navlinks from "../components/navlinks";
import Footer from '../components/footer';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.faqitem}>
      <button
        className={styles.question}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg font-semibold text-black">{question}</span>
        <span className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}>▼</span>
      </button>
      {isOpen && (
        <div className={styles.answer}>
          {answer}
        </div>
      )}
    </div>
  );
};

export default function FAQ() {
  const faqs = [
    {
      question: "ما هي خدماتكم الرئيسية؟",
      answer: "نقدم خدمات فحص السيارات الشاملة..."
    },
    {
      question: "كم تستغرق عملية الفحص؟",
      answer: "تستغرق عملية الفحص عادةً من 30 إلى 60 دقيقة..."
    },
    // Add more FAQs as needed
  ];

  return (
    <main className="min-h-screen bg-white">
      <Headertop />
      <Navbar />
      <Navlinks />
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className="text-4xl font-bold text-center mb-8">الأسئلة الشائعة</h1>
        </div>
        <div className="max-w-3xl mx-auto my-12 bg-white rounded-lg shadow-md overflow-hidden">
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}