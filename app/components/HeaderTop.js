'use client';

import Link from 'next/link';
import { CONTACT_EMAIL } from '@/config/urls';

export default function HeaderTop() {
  return (
    <div dir="rtl" className="bg-gray-100 py-2 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex gap-4">
            <a href={`tel:+966500000000`} className="text-gray-600 hover:text-gray-800">
              +966 50 000 0000
            </a>
            <span className="text-gray-400">|</span>
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-gray-600 hover:text-gray-800">
              {CONTACT_EMAIL}
            </a>
          </div>
          <div>
            <Link href="/location" className="text-gray-600 hover:text-gray-800">
              موقعنا
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 