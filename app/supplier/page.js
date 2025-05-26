'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function SupplierLanding() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Image
                  src="/images/logo.png"
                  alt="Daqaiq Logo"
                  width={120}
                  height={40}
                  className="h-8 w-auto"
                />
              </div>
            </div>
            <div className="flex items-center">
              <Link
                href="/supplier/auth/signin"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                تسجيل دخول
              </Link>
              <Link
                href="/supplier/auth/signup"
                className="ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-primary bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                تسجيل جديد
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-right">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block">انضم إلى شبكة</span>
                  <span className="block text-primary">موردي دقائق</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  وسع نطاق عملك وانضم إلى شبكة موردي قطع غيار السيارات الأكبر في المملكة
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-end">
                  <div className="rounded-md shadow">
                    <Link
                      href="/supplier/auth/signup"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary-dark md:py-4 md:text-lg md:px-10"
                    >
                      ابدأ الآن
                    </Link>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:mr-3">
                    <Link
                      href="#features"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary bg-primary-light hover:bg-primary-lighter md:py-4 md:text-lg md:px-10"
                    >
                      اعرف المزيد
                    </Link>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:left-0 lg:w-1/2">
          <Image
            src="/images/supplier-hero.jpg"
            alt="Supplier Hero"
            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
            width={800}
            height={600}
            priority
          />
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-primary font-semibold tracking-wide uppercase">المميزات</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              لماذا تنضم إلى دقائق؟
            </p>
          </div>

          <div className="mt-10">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              {[
                {
                  title: 'وصول أوسع للعملاء',
                  description: 'اصل إلى آلاف العملاء المحتملين في جميع أنحاء المملكة'
                },
                {
                  title: 'إدارة سهلة للمخزون',
                  description: 'أدر مخزونك وطلباتك بسهولة من خلال لوحة تحكم متطورة'
                },
                {
                  title: 'دعم فني على مدار الساعة',
                  description: 'فريق دعم متخصص جاهز لمساعدتك في أي وقت'
                },
                {
                  title: 'مدفوعات آمنة وسريعة',
                  description: 'استلم مدفوعاتك بشكل آمن وسريع مع نظام دفع موثوق'
                }
              ].map((feature, index) => (
                <div key={index} className="relative">
                  <div className="relative">
                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="mr-16 text-lg leading-6 font-medium text-gray-900">{feature.title}</p>
                  </div>
                  <div className="mt-2 mr-16">
                    <p className="text-base text-gray-500">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-base text-gray-400">© 2024 دقائق. جميع الحقوق محفوظة</p>
          </div>
        </div>
      </footer>
    </div>
  );
} 