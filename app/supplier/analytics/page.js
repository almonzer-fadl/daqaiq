'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { toast } from 'react-hot-toast';
import dynamic from 'next/dynamic';
import { SUPPLIER_TRANSLATIONS as t } from '@/constants/supplier-translations';

// Dynamically import Chart.js components
const DynamicCharts = dynamic(
  () => import('../../components/DynamicCharts'),
  { ssr: false }
);

export default function SupplierAnalytics() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState('30d');
  const [analytics, setAnalytics] = useState({
    salesOverview: {
      totalSales: 0,
      monthlyRevenue: 0,
      averageOrderValue: 0,
      totalOrders: 0
    },
    topProducts: [],
    salesByCategory: [],
    recentSales: []
  });

  const fetchAnalytics = useCallback(async () => {
    try {
      setLoading(true);
      console.log('Fetching analytics...');
      const response = await fetch(`/api/supplier/analytics?period=${period}`);
      if (!response.ok) throw new Error(t.errorOccurred);
      const data = await response.json();
      console.log('Analytics data received:', data);
      
      // Merge the received data with default values to ensure all properties exist
      const formattedData = {
        salesOverview: {
          totalSales: data.salesOverview?.totalSales || 0,
          monthlyRevenue: data.salesOverview?.monthlyRevenue || 0,
          averageOrderValue: data.salesOverview?.averageOrderValue || 0,
          totalOrders: data.salesOverview?.totalOrders || 0
        },
        topProducts: Array.isArray(data.topProducts) ? data.topProducts.map(product => ({
          name: product.name || 'Unknown',
          totalSales: product.totalSales || 0,
          revenue: product.revenue || 0
        })) : [],
        salesByCategory: Array.isArray(data.salesByCategory) ? data.salesByCategory.map(category => ({
          name: category.name || 'Unknown',
          revenue: category.revenue || 0,
          percentage: category.percentage || 0
        })) : [],
        recentSales: Array.isArray(data.recentSales) ? data.recentSales.map(sale => ({
          date: sale.date || new Date(),
          amount: sale.amount || 0
        })) : []
      };
      console.log('Formatted analytics data:', formattedData);
      setAnalytics(formattedData);
    } catch (error) {
      console.error('Error fetching analytics:', error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }, [period]);

  useEffect(() => {
    if (session) {
      fetchAnalytics();
    }
  }, [session, fetchAnalytics]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('ar-SA', {
      style: 'currency',
      currency: 'SAR',
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">{t.analytics.title}</h1>
        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="7d">{t.analytics.periods.weekly}</option>
          <option value="30d">{t.analytics.periods.monthly}</option>
          <option value="90d">{t.analytics.periods.yearly}</option>
        </select>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">{t.analytics.sections.totalSales}</h3>
          <p className="mt-2 text-3xl font-semibold text-gray-900" dir="ltr">
            {new Intl.NumberFormat('ar-SA', {
              style: 'currency',
              currency: 'SAR'
            }).format(analytics?.salesOverview?.totalSales || 0)}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">{t.analytics.sections.monthlyRevenue}</h3>
          <p className="mt-2 text-3xl font-semibold text-gray-900" dir="ltr">
            {new Intl.NumberFormat('ar-SA', {
              style: 'currency',
              currency: 'SAR'
            }).format(analytics?.salesOverview?.monthlyRevenue || 0)}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">{t.analytics.sections.averageOrderValue}</h3>
          <p className="mt-2 text-3xl font-semibold text-gray-900" dir="ltr">
            {new Intl.NumberFormat('ar-SA', {
              style: 'currency',
              currency: 'SAR'
            }).format(analytics?.salesOverview?.averageOrderValue || 0)}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">{t.analytics.sections.totalOrders}</h3>
          <p className="mt-2 text-3xl font-semibold text-gray-900" dir="ltr">
            {(analytics?.salesOverview?.totalOrders || 0).toLocaleString('ar-SA')}
          </p>
        </div>
      </div>

      {/* Charts */}
      {analytics && <DynamicCharts analytics={analytics} />}
    </div>
  );
} 