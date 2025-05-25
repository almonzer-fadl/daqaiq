'use client';

import { SUPPLIER_TRANSLATIONS as t } from '@/constants/supplier-translations';

export function FormFields({ formData, handleChange, error }) {
  return (
    <div className="space-y-4">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
          {error}
        </div>
      )}
      
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          {t.auth.signup.name}
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
          value={formData.name}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          {t.auth.signup.email}
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
          value={formData.email}
          onChange={handleChange}
          dir="ltr"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
          {t.auth.signup.password}
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
          value={formData.password}
          onChange={handleChange}
          dir="ltr"
        />
      </div>

      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
          {t.auth.signup.confirmPassword}
        </label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          required
          className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
          value={formData.confirmPassword}
          onChange={handleChange}
          dir="ltr"
        />
      </div>

      <div>
        <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">
          {t.auth.signup.companyName}
        </label>
        <input
          id="companyName"
          name="companyName"
          type="text"
          required
          className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
          value={formData.companyName}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
          {t.auth.signup.phone}
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          required
          className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
          value={formData.phone}
          onChange={handleChange}
          dir="ltr"
          placeholder="05xxxxxxxx أو +9665xxxxxxxx"
        />
      </div>

      <div>
        <label htmlFor="businessType" className="block text-sm font-medium text-gray-700 mb-1">
          {t.auth.signup.businessType}
        </label>
        <select
          id="businessType"
          name="businessType"
          required
          className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
          value={formData.businessType}
          onChange={handleChange}
        >
          <option value="">اختر نوع النشاط</option>
          <option value="manufacturer">مصنع</option>
          <option value="distributor">موزع</option>
          <option value="retailer">تاجر تجزئة</option>
          <option value="other">أخرى</option>
        </select>
      </div>

      <div>
        <label htmlFor="taxId" className="block text-sm font-medium text-gray-700 mb-1">
          {t.auth.signup.taxId}
        </label>
        <input
          id="taxId"
          name="taxId"
          type="text"
          required
          className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
          value={formData.taxId}
          onChange={handleChange}
          dir="ltr"
          placeholder="الرقم الضريبي المكون من 15 رقم"
        />
      </div>
    </div>
  );
} 