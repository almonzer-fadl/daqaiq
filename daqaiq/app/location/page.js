"use client";
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/footer';

export default function Location() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <div className="container mx-auto px-4 pt-24">
        <div className="bg-primary text-white p-8 rounded-lg shadow-lg mb-8">
          <h1 className="text-4xl font-bold text-center mb-8">موقعنا</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
          <div className="space-y-4 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-primary text-right">العنوان</h2>
            <p className="text-lg text-right">
              المملكة العربية السعودية، الرياض
              <br />
              شارع الرئيسي، مبنى رقم 123
            </p>
            <div className="space-y-2 text-right">
              <p className="text-primary font-bold">ساعات العمل:</p>
              <p>السبت - الخميس: 9 صباحاً - 9 مساءً</p>
              <p>الجمعة: مغلق</p>
            </div>
          </div>
          <div className="h-[400px] bg-gray-200 rounded-lg">
            {/* Add your map component here */}
            <div className="w-full h-full rounded-lg">Map goes here</div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}