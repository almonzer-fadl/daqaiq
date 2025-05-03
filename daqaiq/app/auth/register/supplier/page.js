'use client';

import Image from 'next/image';
import Link from 'next/link';
import { SUPPLIER_TRANSLATIONS as t } from '../../../../constants/translations';
import { FormFields } from './components/FormFields';
import { SuccessMessage } from './components/SuccessMessage';
import { useSupplierForm } from './hooks/useSupplierForm';

export default function SupplierRegister() {
  const {
    formData,
    loading,
    error,
    success,
    handleChange,
    handleSubmit,
  } = useSupplierForm();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8" dir="rtl">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="flex justify-center">
            <Image
              src="/images/logo.png"
              alt="Daqaiq Logo"
              width={150}
              height={150}
              className="h-12 w-auto"
            />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {t.registerNewSupplier}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {t.alreadyHaveAccount}{' '}
            <Link href="/auth/signin" className="font-medium text-[#4F46E5] hover:text-[#4338CA]">
              {t.signIn}
            </Link>
          </p>
        </div>

        {success ? (
          <SuccessMessage />
        ) : (
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border-l-4 border-red-400 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="mr-3">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              </div>
            )}

            <FormFields
              formData={formData}
              handleChange={handleChange}
              error={error}
            />

            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#4F46E5] hover:bg-[#4338CA] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4F46E5] disabled:bg-[#4F46E5]/70"
              >
                {loading ? t.registering : t.register}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
} 