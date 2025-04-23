'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { SUPPLIER_TRANSLATIONS as t } from '../../../constants/translations';

export default function SupplierRegister() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phoneNumber: '',
    businessName: '',
    businessType: '',
    taxId: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validate form data
    if (!formData.name || !formData.email || !formData.password || !formData.businessName || !formData.businessType || !formData.taxId) {
      setError(t.requiredField);
      setLoading(false);
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError(t.invalidEmail);
      setLoading(false);
      return;
    }

    // Validate password length
    if (formData.password.length < 6) {
      setError(t.passwordTooShort);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/auth/register/supplier', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || t.registrationFailed);
      }

      setSuccess(true);
      setTimeout(() => {
        router.push('/auth/signin/supplier');
      }, 3000);
    } catch (err) {
      setError(err.message || t.registrationFailed);
    } finally {
      setLoading(false);
    }
  };

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
          <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="mr-3">
                <p className="text-sm text-green-700">
                  {t.registrationSuccess}
                </p>
              </div>
            </div>
          </div>
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

            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="name" className="sr-only">{t.fullName}</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-[#4F46E5] focus:border-[#4F46E5] focus:z-10 sm:text-sm text-right"
                  placeholder={t.fullName}
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="email" className="sr-only">{t.email}</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#4F46E5] focus:border-[#4F46E5] focus:z-10 sm:text-sm text-right"
                  placeholder={t.email}
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">{t.password}</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#4F46E5] focus:border-[#4F46E5] focus:z-10 sm:text-sm text-right"
                  placeholder={t.password}
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="phoneNumber" className="sr-only">{t.phoneNumber}</label>
                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#4F46E5] focus:border-[#4F46E5] focus:z-10 sm:text-sm text-right"
                  placeholder={t.phoneNumber}
                  value={formData.phoneNumber}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="businessName" className="sr-only">{t.businessName}</label>
                <input
                  id="businessName"
                  name="businessName"
                  type="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#4F46E5] focus:border-[#4F46E5] focus:z-10 sm:text-sm text-right"
                  placeholder={t.businessName}
                  value={formData.businessName}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="businessType" className="sr-only">{t.businessType}</label>
                <select
                  id="businessType"
                  name="businessType"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#4F46E5] focus:border-[#4F46E5] focus:z-10 sm:text-sm text-right"
                  value={formData.businessType}
                  onChange={handleChange}
                >
                  <option value="">{t.selectType}</option>
                  <option value="corporation">{t.businessTypes.corporation}</option>
                  <option value="llc">{t.businessTypes.llc}</option>
                  <option value="partnership">{t.businessTypes.partnership}</option>
                  <option value="soleProprietorship">{t.businessTypes.soleProprietorship}</option>
                </select>
              </div>
              <div>
                <label htmlFor="taxId" className="sr-only">{t.taxId}</label>
                <input
                  id="taxId"
                  name="taxId"
                  type="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-[#4F46E5] focus:border-[#4F46E5] focus:z-10 sm:text-sm text-right"
                  placeholder={t.taxId}
                  value={formData.taxId}
                  onChange={handleChange}
                />
              </div>
            </div>

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