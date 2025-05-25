'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { SUPPLIER_TRANSLATIONS as t } from '@/constants/supplier-translations';

export default function SupplierSignUp() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    companyName: '',
    phone: '',
    businessType: 'manufacturer',
    taxId: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    // Check for empty required fields
    const requiredFields = ['name', 'email', 'password', 'confirmPassword', 'companyName', 'phone', 'businessType', 'taxId'];
    for (const field of requiredFields) {
      if (!formData[field]) {
        setError(`${t.common.required}: ${getFieldLabel(field)}`);
        return false;
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError(t.common.invalidEmail);
      return false;
    }

    // Validate password
    if (formData.password.length < 8) {
      setError(t.common.passwordTooShort);
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError(t.common.passwordMismatch);
      return false;
    }

    // Validate phone number (Saudi format)
    const phoneRegex = /^((\+9665)|(05))[0-9]{8}$/;
    if (!phoneRegex.test(formData.phone)) {
      setError(t.common.invalidPhone);
      return false;
    }

    // Validate tax ID (15 digits)
    const taxIdRegex = /^[0-9]{15}$/;
    if (!taxIdRegex.test(formData.taxId)) {
      setError(t.common.invalidTaxId);
      return false;
    }

    return true;
  };

  const getFieldLabel = (field) => {
    const labels = {
      name: t.auth.signup.name,
      email: t.auth.signup.email,
      password: t.auth.signup.password,
      confirmPassword: t.auth.signup.confirmPassword,
      companyName: t.auth.signup.companyName,
      phone: t.auth.signup.phone,
      businessType: t.auth.signup.businessType,
      taxId: t.auth.signup.taxId
    };
    return labels[field];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/supplier/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          companyName: formData.companyName,
          phone: formData.phone,
          businessType: formData.businessType,
          taxId: formData.taxId
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || t.common.error);
      }

      router.push('/supplier/auth/signin?registered=true');
    } catch (error) {
      console.error('Registration error:', error);
      setError(error.message || t.common.error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div dir="rtl" className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Link href="/supplier">
            <Image
              src="/images/logo.png"
              alt="دقائق"
              width={150}
              height={50}
              className="h-12 w-auto"
            />
          </Link>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {t.auth.signup.title}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          {t.auth.signup.haveAccount}{' '}
          <Link
            href="/supplier/auth/signin"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            {t.auth.signup.login}
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                {t.auth.signup.name}
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                {t.auth.signup.email}
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  dir="ltr"
                />
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                {t.auth.signup.phone}
              </label>
              <div className="mt-1">
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  placeholder={t.auth.signup.phonePlaceholder}
                  value={formData.phone}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  dir="ltr"
                />
              </div>
            </div>

            <div>
              <label htmlFor="businessType" className="block text-sm font-medium text-gray-700">
                {t.auth.signup.businessType}
              </label>
              <div className="mt-1">
                <select
                  id="businessType"
                  name="businessType"
                  required
                  value={formData.businessType}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="manufacturer">{t.auth.signup.businessTypes.manufacturer}</option>
                  <option value="distributor">{t.auth.signup.businessTypes.distributor}</option>
                  <option value="retailer">{t.auth.signup.businessTypes.retailer}</option>
                  <option value="other">{t.auth.signup.businessTypes.other}</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="taxId" className="block text-sm font-medium text-gray-700">
                {t.auth.signup.taxId}
              </label>
              <div className="mt-1">
                <input
                  id="taxId"
                  name="taxId"
                  type="text"
                  required
                  placeholder="الرقم الضريبي المكون من 15 رقم"
                  value={formData.taxId}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  dir="ltr"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                {t.auth.signup.password}
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  dir="ltr"
                />
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                {t.auth.signup.confirmPassword}
              </label>
              <div className="mt-1">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  dir="ltr"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                  isLoading ? 'opacity-75 cursor-not-allowed' : ''
                }`}
              >
                {isLoading ? t.auth.signup.loading : t.auth.signup.submit}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 