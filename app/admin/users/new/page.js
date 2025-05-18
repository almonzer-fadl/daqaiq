'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewUserPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'customer',
    status: 'active'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    setError(null);
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError('الرجاء إدخال الاسم');
      return false;
    }
    if (!formData.email.trim()) {
      setError('الرجاء إدخال البريد الإلكتروني');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('الرجاء إدخال بريد إلكتروني صحيح');
      return false;
    }
    if (!formData.password) {
      setError('الرجاء إدخال كلمة المرور');
      return false;
    }
    if (formData.password.length < 8) {
      setError('كلمة المرور يجب أن تكون 8 أحرف على الأقل');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('كلمة المرور غير متطابقة');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      setLoading(true);
      const response = await fetch('/api/admin/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.role,
          status: formData.status
        })
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'حدث خطأ أثناء إنشاء المستخدم');
      }

      router.push('/admin/users');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">إضافة مستخدم جديد</h1>
        <button
          onClick={() => router.back()}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          رجوع
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-2">الاسم</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2">البريد الإلكتروني</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2">كلمة المرور</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2">تأكيد كلمة المرور</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2">الدور</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          >
            <option value="customer">عميل</option>
            <option value="supplier">مورد</option>
            <option value="admin">مدير</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 mb-2">الحالة</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          >
            <option value="active">نشط</option>
            <option value="inactive">غير نشط</option>
          </select>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className={`px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'جاري الإنشاء...' : 'إنشاء المستخدم'}
          </button>
        </div>
      </form>
    </div>
  );
} 