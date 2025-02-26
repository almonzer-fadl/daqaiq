"use client";
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/footer';

export default function About() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <div className="container mx-auto px-4 pt-24">
        <h1 className="text-4xl font-bold text-center mb-8 text-primary">من نحن؟</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
          <div className="space-y-4">
            <p className="text-lg text-right">
              نحن شركة متخصصة في فحص وصيانة السيارات، نقدم خدماتنا بأعلى معايير الجودة والدقة.
            </p>
            {/* Add more content as needed */}
          </div>
          <div className="relative h-[400px]">
            <img
              src="/about-image.jpg"
              alt="About Us"
              className="rounded-lg object-cover w-full h-full"
            />
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}