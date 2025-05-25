import { SUPPLIER_TRANSLATIONS as t } from '@/constants/supplier-translations';
import Link from 'next/link';

export function SuccessMessage() {
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg text-center">
      <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
        <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h3 className="mt-4 text-lg font-medium text-gray-900">
        {t.auth.signup.success}
      </h3>
      <p className="mt-2 text-sm text-gray-600">
        {t.auth.signup.successMessage}
      </p>
      <div className="mt-6">
        <Link
          href="/supplier/auth/signin"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {t.auth.signup.login}
        </Link>
      </div>
    </div>
  );
} 