'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import HeroSlider from '@/components/HeroSlider';
import CategorySlider from '@/components/category-slider/CategorySlider';
import ProductSlider from '@/components/products/ProductSlider';

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // If authenticated supplier, redirect to dashboard
  useEffect(() => {
    if (status === 'authenticated' && session?.user?.role === 'supplier') {
      router.push('/dashboard');
    }
  }, [session, status, router]);

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-4 mb-12">
        <HeroSlider />
      </section>

      {/* Categories Section */}
      <section className="container mx-auto px-4 mb-12">
        <CategorySlider />
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4 mb-12">
        <ProductSlider 
          categoryData={{
            title: "منتجات مميزة",
            products: [] // Will be fetched from API
          }}
          sectionId="featured"
        />
      </section>

      {/* New Arrivals */}
      <section className="container mx-auto px-4 mb-12">
        <ProductSlider 
          categoryData={{
            title: "وصل حديثاً",
            products: [] // Will be fetched from API
          }}
          sectionId="new-arrivals"
        />
      </section>

      {/* Best Sellers */}
      <section className="container mx-auto px-4 mb-12">
        <ProductSlider 
          categoryData={{
            title: "الأكثر مبيعاً",
            products: [] // Will be fetched from API
          }}
          sectionId="best-sellers"
        />
      </section>

      {/* Why Choose Us */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">لماذا تختار دقائق؟</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-white rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center shadow-lg">
                <i className="fas fa-shipping-fast text-3xl text-primary"></i>
              </div>
              <h3 className="text-xl font-semibold mb-2">توصيل سريع</h3>
              <p className="text-gray-600">توصيل لجميع مناطق المملكة</p>
            </div>
            <div className="text-center">
              <div className="bg-white rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center shadow-lg">
                <i className="fas fa-shield-alt text-3xl text-primary"></i>
              </div>
              <h3 className="text-xl font-semibold mb-2">ضمان الجودة</h3>
              <p className="text-gray-600">منتجات أصلية 100%</p>
            </div>
            <div className="text-center">
              <div className="bg-white rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center shadow-lg">
                <i className="fas fa-headset text-3xl text-primary"></i>
              </div>
              <h3 className="text-xl font-semibold mb-2">دعم فني</h3>
              <p className="text-gray-600">متوفر على مدار الساعة</p>
            </div>
            <div className="text-center">
              <div className="bg-white rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center shadow-lg">
                <i className="fas fa-wallet text-3xl text-primary"></i>
              </div>
              <h3 className="text-xl font-semibold mb-2">أسعار تنافسية</h3>
              <p className="text-gray-600">أفضل الأسعار في السوق</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}