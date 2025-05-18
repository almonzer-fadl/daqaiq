'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function PageMaintenance() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-4" dir="rtl">
            <div className="max-w-3xl w-full text-center space-y-8 bg-white rounded-2xl shadow-xl p-8 mx-4">
                {/* Logo */}
                <div className="flex justify-center">
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

                <h1 className="text-4xl font-bold text-gray-900">الموقع قيد الإنشاء</h1>
                
                <p className="text-xl text-gray-600 max-w-xl mx-auto">
                    نحن نعمل بجد لتحسين موقعنا وتقديم تجربة أفضل لكم.
                    في هذه الأثناء، يمكنكم زيارة متجرنا أو الاتصال بنا مباشرة.
                </p>

                <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                    {/* Store Visit Section */}
                    <div className="bg-blue-50 p-6 rounded-xl">
                        <h2 className="text-xl font-semibold text-blue-900 mb-3">زيارة المتجر</h2>
                        <p className="text-blue-700">
                        الرياض صناعية الرمال  <br />
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
                        <p className="text-green-700 space-y-2">
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

                <div className="pt-6">
                    <p className="text-sm text-gray-500">
                        شكراً لصبركم! سنعود قريباً.
                    </p>
                </div>
            </div>
        </div>
    );
} 