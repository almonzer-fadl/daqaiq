import Link from 'next/link';

export default function NavLinks() {
  return (
    <div className="bg-gray-100 border-t border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-center items-center py-2 space-x-6">
          <Link href="/category/oil-change" className="text-gray-600 hover:text-gray-900">
            تغيير الزيت
          </Link>
          <Link href="/category/brake-service" className="text-gray-600 hover:text-gray-900">
            صيانة الفرامل
          </Link>
          <Link href="/category/battery-service" className="text-gray-600 hover:text-gray-900">
            خدمة البطارية
          </Link>
          <Link href="/category/tire-service" className="text-gray-600 hover:text-gray-900">
            خدمة الإطارات
          </Link>
          <Link href="/category/ac-service" className="text-gray-600 hover:text-gray-900">
            صيانة التكييف
          </Link>
          <Link href="/category/engine-diagnostics" className="text-gray-600 hover:text-gray-900">
            فحص المحرك
          </Link>
        </div>
      </div>
    </div>
  );
} 