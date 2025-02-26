"use client";
import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/footer';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200">
      <button
        className="w-full text-right py-4 px-6 focus:outline-none flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg font-semibold text-primary">{question}</span>
        <span className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}>▼</span>
      </button>
      {isOpen && (
        <div className="px-6 pb-4 text-right text-gray-600">
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
      <Header />
      <div className="container mx-auto px-4 pt-24">
        <div className="bg-primary text-white p-8 rounded-lg shadow-lg mb-8">
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