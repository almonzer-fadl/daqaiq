"use client";
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/footer';

export default function Prices() {
  const prices = [
    {
      title: "الباقة الأساسية",
      price: "299",
      features: ["فحص المحرك", "فحص الفرامل", "فحص التعليق"],
    },
    {
      title: "الباقة المتقدمة",
      price: "499",
      features: ["جميع خدمات الباقة الأساسية", "فحص الكهرباء", "فحص التكييف"],
    },
    {
      title: "الباقة الشاملة",
      price: "799",
      features: ["جميع خدمات الباقة المتقدمة", "فحص الكمبيوتر", "تقرير مفصل"],
    },
  ];

  return (
    <main className="min-h-screen bg-white">
      <Header />
      <div className="container mx-auto px-4 pt-24">
        <div className="bg-primary text-white p-8 rounded-lg shadow-lg mb-8">
          <h1 className="text-4xl font-bold text-center mb-8">الأسعار</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-12">
          {prices.map((plan, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
              <h2 className="text-2xl font-bold text-primary mb-4">{plan.title}</h2>
              <div className="text-4xl font-bold text-secondary mb-6">
                {plan.price} ريال
              </div>
              <ul className="space-y-3 text-right mb-6">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center justify-end">
                    <span>{feature}</span>
                    <span className="ml-2 text-green-500">✓</span>
                  </li>
                ))}
              </ul>
              <button className="w-full bg-primary text-white py-3 px-6 rounded-md hover:bg-opacity-90 transition duration-300">
                اختر الباقة
              </button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}