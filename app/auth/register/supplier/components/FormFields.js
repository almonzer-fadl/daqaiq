'use client';

import { SUPPLIER_TRANSLATIONS as t } from '../../../../../constants/translations';

export function FormFields({ formData, handleChange, error }) {
  return (
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
      {/* ... rest of the form fields ... */}
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
  );
} 