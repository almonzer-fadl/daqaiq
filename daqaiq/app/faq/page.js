"use client";
import React, { useState } from 'react';
import styles from './faq.module.css';
import HeaderTop from "../components/HeaderTop";
import NavbarMain from "../components/NavbarMain";
import NavLinks from "../components/NavLinks";
import FooterMain from '../components/FooterMain';

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
      answer: "نقدم خدمات فحص السيارات الشاملة، بما في ذلك فحص المحرك، نظام التعليق، الفرامل، التكييف، والكهرباء. نستخدم أحدث التقنيات والمعدات لضمان دقة النتائج وجودة الخدمة."
    },
    {
      question: "كم تستغرق عملية الفحص؟",
      answer: "تستغرق عملية الفحص الشامل عادةً من 45 إلى 60 دقيقة. قد يختلف الوقت حسب نوع السيارة وحالتها. نحرص على إجراء الفحص بدقة وعناية دون تأخير غير ضروري."
    },
    {
      question: "هل تقدمون خدمة الصيانة الدورية؟",
      answer: "نعم، نقدم خدمات الصيانة الدورية الشاملة لجميع أنواع السيارات. تشمل خدماتنا تغيير الزيت، فحص وتغيير الفلاتر، ضبط الإطارات، وفحص البطارية وجميع الأنظمة الحيوية في السيارة."
    },
    {
      question: "هل تقدمون ضمان على خدماتكم؟",
      answer: "نعم، نقدم ضمان على جميع خدماتنا وقطع الغيار المستخدمة. مدة الضمان تختلف حسب نوع الخدمة وقطع الغيار المستخدمة. نحن نستخدم فقط قطع غيار أصلية ومعتمدة لضمان جودة وموثوقية الخدمة."
    },
    {
      question: "هل يجب حجز موعد مسبق؟",
      answer: "نرحب بالعملاء المباشرين، لكننا نفضل الحجز المسبق لضمان توفر الخدمة في الوقت المناسب لكم. يمكنكم حجز موعد عبر موقعنا الإلكتروني أو الاتصال بنا مباشرة."
    }
  ];

  return (
    <main className="min-h-screen bg-white">
      <HeaderTop />
      <NavbarMain />
      <NavLinks />
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
      <FooterMain />
    </main>
  );
}