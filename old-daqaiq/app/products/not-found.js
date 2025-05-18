'use client';

import Link from 'next/link';

export default function ProductNotFound() {
  return (
    <div className="flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          المنتج غير موجود
        </h1>
        <p className="text-gray-600 mb-8">
          عذراً، لم نتمكن من العثور على المنتج الذي تبحث عنه. ربما تم إزالته أو لم يعد متوفراً.
        </p>
        <div className="space-x-4">
          <a 
            href="/products"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ml-4"
          >
            تصفح المنتجات
          </a>
          <a 
            href="/"
            className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            العودة للرئيسية
          </a>
        </div>
      </div>
    </div>
  );
} 