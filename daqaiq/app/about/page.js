"use client";
import React from 'react';
import styles from './about.module.css';
import Headertop from "../components/headertop";
import Navbar from "../components/navbar";
import Navlinks from "../components/navlinks";
import Footer from '../components/footer';
import Image from 'next/image';

export default function About() {
  return (
    <main className= "min-h-screen">
      <Headertop />
      <Navbar />
      <Navlinks />
      <div className={styles.container}>
        <div className={styles.header}>
        <h1 className="text-4xl font-bold text-center mb-8">من نحن؟</h1>
        </div>
        <div className="container mx-auto px-4 pt-24">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
            <div className="space-y-4 bg-#999A9E p-6 rounded-lg shadow-md">
              <p className={styles.textsection}>
                مرحباً بكم في دقائق - وجهتكم الموثوقة لخدمات السيارات المتميزة. نحن شركة رائدة في مجال فحص وصيانة السيارات، نجمع بين الخبرة العميقة والتكنولوجيا المتطورة لنقدم لكم خدمات استثنائية. يعمل فريقنا المحترف بشغف وتفانٍ لضمان سلامة وأداء مركبتكم بأعلى المعايير. نلتزم بتقديم خدمة شفافة وموثوقة، مع التركيز على رضا العملاء وتوفير حلول مخصصة تلبي احتياجاتكم الفردية.
              </p>
            </div>
            <div className={styles.imagesection}>
              <Image
                src="/about-image.jpg"
                alt="About Us"
                width={500}
                height={300}
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}