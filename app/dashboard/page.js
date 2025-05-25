'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function SupplierDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [metrics, setMetrics] = useState({
    totalOrders: 0,
    totalProducts: 0,
    rating: 0,
    reviewCount: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Redirect if not authenticated or not a supplier
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    } else if (status === 'authenticated' && session?.user?.role !== 'supplier') {
      router.push('/');
    }
  }, [session, status, router]);

  useEffect(() => {
    async function fetchMetrics() {
      try {
        const response = await fetch('/api/supplier/dashboard/metrics');
        if (response.ok) {
          const data = await response.json();
          setMetrics(data);
        }
      } catch (error) {
        console.error('Error fetching metrics:', error);
      } finally {
        setLoading(false);
      }
    }

    if (session?.user?.role === 'supplier') {
      fetchMetrics();
    }
  }, [session]);

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!session || session?.user?.role !== 'supplier') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">مرحباً {session.user.name}</h1>
          <p className="mt-2 text-gray-600">لوحة تحكم المورد</p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Orders */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900">إجمالي الطلبات</h3>
            <p className="mt-2 text-3xl font-bold text-blue-600">{metrics.totalOrders}</p>
          </div>

          {/* Total Products */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900">إجمالي المنتجات</h3>
            <p className="mt-2 text-3xl font-bold text-green-600">{metrics.totalProducts}</p>
          </div>

          {/* Rating */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900">التقييم</h3>
            <p className="mt-2 text-3xl font-bold text-yellow-600">
              {metrics.rating.toFixed(1)} ⭐
            </p>
          </div>

          {/* Review Count */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900">عدد التقييمات</h3>
            <p className="mt-2 text-3xl font-bold text-purple-600">{metrics.reviewCount}</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <button 
            onClick={() => router.push('/products/new')}
            className="bg-blue-600 text-white p-4 rounded-lg shadow hover:bg-blue-700 transition-colors"
          >
            إضافة منتج جديد
          </button>
          <button 
            onClick={() => router.push('/orders')}
            className="bg-green-600 text-white p-4 rounded-lg shadow hover:bg-green-700 transition-colors"
          >
            عرض الطلبات
          </button>
          <button 
            onClick={() => router.push('/analytics')}
            className="bg-purple-600 text-white p-4 rounded-lg shadow hover:bg-purple-700 transition-colors"
          >
            عرض التحليلات
          </button>
        </div>
      </div>
    </div>
  );
} 