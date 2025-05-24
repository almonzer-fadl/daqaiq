'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import LandingHeader from '@/components/supplier/LandingHeader';

export default function SupplierLanding() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // If authenticated supplier, redirect to dashboard
  useEffect(() => {
    if (status === 'authenticated' && session?.user?.role === 'supplier') {
      router.push('/supplier/dashboard');
    }
  }, [session, status, router]);

  return (
    <div className="min-h-screen bg-white">
      <LandingHeader />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main dir="rtl" className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="text-center lg:text-right">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block">ابدأ البيع مع دقائق</span>
                  <span className="block text-blue-600">وانمي تجارتك</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  انضم إلى مجتمع الموردين في دقائق وواصل إلى آلاف العملاء المحتملين. نوفر لك منصة متكاملة لإدارة مبيعاتك وتنمية اعمالك
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <a
                      href="#"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
                    >
                      ابدا الآن
                    </a>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            {/* Feature 1 */}
            <div className="text-center">
              <div className="flex items-center justify-center h-16 w-16 rounded-md bg-blue-100 text-blue-600 mx-auto">
                <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="mt-4 text-xl font-medium text-gray-900">نمو سريع</h3>
              <p className="mt-2 text-base text-gray-500">
                اصل إلى آلاف العملاء المحتملين وانمي مبيعاتك بشكل سريع
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center">
              <div className="flex items-center justify-center h-16 w-16 rounded-md bg-blue-100 text-blue-600 mx-auto">
                <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <h3 className="mt-4 text-xl font-medium text-gray-900">إدارة سهلة</h3>
              <p className="mt-2 text-base text-gray-500">
                لوحة تحكم متكاملة لإدارة منتجاتك وطلباتك بكل سهولة
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center">
              <div className="flex items-center justify-center h-16 w-16 rounded-md bg-blue-100 text-blue-600 mx-auto">
                <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="mt-4 text-xl font-medium text-gray-900">دعم متواصل</h3>
              <p className="mt-2 text-base text-gray-500">
                فريق دعم متخصص لمساعدتك في كل خطوة
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-50">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            <span className="block">جاهز لبدء رحلة النجاح؟</span>
            <span className="block text-blue-600">انضم إلى دقائق اليوم.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link
                href="/supplier/auth/signup"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                سجل الآن
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 