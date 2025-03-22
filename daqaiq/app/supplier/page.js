'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import { SUPPLIER_TRANSLATIONS as t } from '../constants/translations';

export default function SupplierDashboard() {
  const { data: session } = useSession();
  const [metrics, setMetrics] = useState({
    totalProducts: 0,
    activeOrders: 0,
    monthlyRevenue: 0,
    inventoryValue: 0,
  });

  const [recentOrders, setRecentOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (session?.user) {
      fetchDashboardData();
    }
  }, [session]);

  const fetchDashboardData = async () => {
    try {
      const [metricsResponse, ordersResponse] = await Promise.all([
        fetch('/api/supplier/dashboard/metrics'),
        fetch('/api/supplier/dashboard/recent-orders')
      ]);

      if (!metricsResponse.ok || !ordersResponse.ok) {
        throw new Error(t.errorOccurred);
      }

      const metricsData = await metricsResponse.json();
      const ordersData = await ordersResponse.json();

      setMetrics(metricsData);
      setRecentOrders(ordersData.orders);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast.error(t.errorOccurred);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header with Add Product button */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          {t.welcome}, {session?.user?.name}
        </h1>
        <Link
          href="/supplier/products/add"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {t.addNewProduct}
        </Link>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">{t.totalProducts}</h3>
          <p className="mt-2 text-3xl font-semibold text-gray-900" dir="ltr">
            {metrics.totalProducts.toLocaleString('ar-SA')}
          </p>
          <div className="mt-2">
            <Link href="/supplier/products" className="text-sm text-blue-600 hover:text-blue-800">
              {t.viewAllProducts} ←
            </Link>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">{t.activeOrders}</h3>
          <p className="mt-2 text-3xl font-semibold text-gray-900" dir="ltr">
            {metrics.activeOrders.toLocaleString('ar-SA')}
          </p>
          <div className="mt-2">
            <Link href="/supplier/orders" className="text-sm text-blue-600 hover:text-blue-800">
              {t.viewAllOrders} ←
            </Link>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">{t.monthlyRevenue}</h3>
          <p className="mt-2 text-3xl font-semibold text-gray-900" dir="ltr">
            ${metrics.monthlyRevenue.toLocaleString('ar-SA')}
          </p>
          <div className="mt-2">
            <Link href="/supplier/analytics" className="text-sm text-blue-600 hover:text-blue-800">
              {t.viewAnalytics} ←
            </Link>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">{t.inventoryValue}</h3>
          <p className="mt-2 text-3xl font-semibold text-gray-900" dir="ltr">
            ${metrics.inventoryValue.toLocaleString('ar-SA')}
          </p>
          <div className="mt-2">
            <Link href="/supplier/inventory" className="text-sm text-blue-600 hover:text-blue-800">
              {t.manageInventory} ←
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-5 border-b border-gray-200">
          <h3 className="text-lg font-medium leading-6 text-gray-900">{t.recentOrders}</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t.orderNumber}
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t.customer}
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t.orderTotal}
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t.orderStatus}
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t.date}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t.actions}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentOrders.map((order) => (
                <tr key={order.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900" dir="ltr">
                    #{order.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {order.customer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900" dir="ltr">
                    ${order.amount.toLocaleString('ar-SA')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      order.status === 'completed' ? 'bg-green-100 text-green-800' :
                      order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {t[order.status]}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500" dir="ltr">
                    {new Date(order.date).toLocaleDateString('ar-SA')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                    <Link
                      href={`/supplier/orders/${order.id}`}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      {t.viewDetails}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {recentOrders.length === 0 ? (
          <div className="text-center py-6">
            <p className="text-gray-500">{t.noRecentOrders}</p>
          </div>
        ) : (
          <div className="px-6 py-4 border-t border-gray-200">
            <Link
              href="/supplier/orders"
              className="text-sm font-medium text-blue-600 hover:text-blue-500"
            >
              {t.viewAllOrders} ←
            </Link>
          </div>
        )}
      </div>
    </div>
  );
} 