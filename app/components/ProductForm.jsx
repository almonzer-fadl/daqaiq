"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function ProductForm({ initialData, onSubmit, isLoading }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    image: '',
    ...initialData
  });

  const [previewImage, setPreviewImage] = useState(initialData?.image || '');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('الرجاء اختيار ملف صورة صالح');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
      setFormData(prev => ({
        ...prev,
        image: reader.result
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name || !formData.description || !formData.price || !formData.category) {
      setError('الرجاء تعبئة جميع الحقول المطلوبة');
      return;
    }

    try {
      await onSubmit(formData);
    } catch (err) {
      setError(err.message || 'حدث خطأ أثناء حفظ المنتج');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700">اسم المنتج</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">الوصف</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">السعر</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
          min="0"
          step="0.01"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">الفئة</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        >
          <option value="">اختر الفئة</option>
          <option value="oil">زيوت</option>
          <option value="filters">فلاتر</option>
          <option value="brakes">فرامل</option>
          <option value="batteries">بطاريات</option>
          <option value="tires">إطارات</option>
          <option value="accessories">اكسسوارات</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">المخزون</label>
        <input
          type="number"
          name="stock"
          value={formData.stock}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
          min="0"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">صورة المنتج</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="mt-1 block w-full"
        />
        {previewImage && (
          <div className="mt-2">
            <Image
              src={previewImage}
              alt="معاينة المنتج"
              width={200}
              height={200}
              className="rounded-lg object-cover"
            />
          </div>
        )}
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isLoading}
          className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
            isLoading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isLoading ? 'جاري الحفظ...' : 'حفظ المنتج'}
        </button>
      </div>
    </form>
  );
} 