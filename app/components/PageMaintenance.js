'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function PageMaintenance() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-4" dir="rtl">
            <div className="max-w-6xl w-full grid md:grid-cols-2 gap-8 items-center bg-white rounded-2xl shadow-xl p-8 mx-4">
                {/* Content Section */}
                <div className="text-center md:text-right space-y-6">
                    {/* Logo */}
                    <div className="flex md:justify-start justify-center">
                        <div className="w-32 h-32 relative">
                            <Image
                                src="/images/logo.png"
                                alt="Daqaiq Logo"
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h1 className="text-4xl font-bold text-gray-900">ابدأ البيع مع دقائق</h1>
                        <h2 className="text-2xl font-semibold text-blue-600">وانمي تجارتك</h2>
                        
                        <p className="text-xl text-gray-600">
                            انضم إلى مجتمع الموردين في دقائق وواصل إلى آلاف العملاء المحتملين. نوفر لك
                            منصة متكاملة لإدارة مبيعاتك وتنمية اعمالك
                        </p>

                        <div className="pt-4">
                            <Link 
                                href="https://supplier.daqaiq.com/auth/signup"
                                className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
                            >
                                ابدأ الآن
                            </Link>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                        {/* Store Visit Section */}
                        <div className="bg-blue-50 p-6 rounded-xl">
                            <h2 className="text-xl font-semibold text-blue-900 mb-3">زيارة المتجر</h2>
                            <p className="text-blue-700">
                                الرياض صناعية الرمال <br />
                                <Link 
                                    href="https://maps.app.goo.gl/MVLKVnFgV6HNGQ4c6?g_st=iw" 
                                    target="_blank"
                                    className="text-blue-600 hover:text-blue-800 underline mt-2 inline-block"
                                >
                                    عرض على الخريطة
                                </Link>
                            </p>
                        </div>

                        {/* Contact Section */}
                        <div className="bg-green-50 p-6 rounded-xl">
                            <h2 className="text-xl font-semibold text-green-900 mb-3">اتصل بنا</h2>
                            <p className="text-green-700">
                                <div>
                                    <span className="font-semibold">الهاتف: </span>
                                    <Link 
                                        href="tel:+966555668785" 
                                        className="hover:text-green-900"
                                        dir="ltr"
                                    >
                                        +966555668785
                                    </Link>
                                </div>
                                <div>
                                    <span className="font-semibold">ساعات العمل: </span>
                                    8:30am - 10:00pm
                                </div>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Illustration Section */}
                <div className="hidden md:block relative h-[500px]">
                    <Image
                        src="/images/supplier-hero.svg"
                        alt="Supplier Illustration"
                        fill
                        className="object-contain"
                        priority
                    />
                </div>
            </div>
        </div>
    );
} 