"use client";
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/footer';

export default function Contact() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <div className="container mx-auto px-4 pt-24">
        <h1 className="text-4xl font-bold text-center mb-8 text-primary">تواصل معنا</h1>
        <div className="max-w-2xl mx-auto my-12">
          <form className="space-y-6">
            <div>
              <label className="block text-right mb-2">الاسم</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                placeholder="أدخل اسمك"
              />
            </div>
            <div>
              <label className="block text-right mb-2">البريد الإلكتروني</label>
              <input
                type="email"
                className="w-full p-2 border rounded-md"
                placeholder="أدخل بريدك الإلكتروني"
              />
            </div>
            <div>
              <label className="block text-right mb-2">الرسالة</label>
              <textarea
                className="w-full p-2 border rounded-md"
                rows="4"
                placeholder="اكتب رسالتك هنا"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-white py-2 rounded-md hover:bg-opacity-90"
            >
              إرسال
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </main>
  );
}