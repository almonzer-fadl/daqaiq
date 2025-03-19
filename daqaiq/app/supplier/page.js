'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function SupplierDashboard() {
  const [metrics, setMetrics] = useState({
    totalProducts: 0,
    activeOrders: 0,
    monthlyRevenue: 0,
    inventoryValue: 0,
  });

  const [recentOrders, setRecentOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch real data from API
    // Simulated data for now
    setMetrics({
      totalProducts: 150,
      activeOrders: 25,
      monthlyRevenue: 15000,
      inventoryValue: 75000,
    });

    setRecentOrders([
      {
        id: '1',
        customer: 'John Doe',
        amount: 299.99,
        status: 'pending',
        date: '2024-03-19',
      },
      // Add more orders as needed
    ]);

    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <Link
          href="/supplier/products/new"
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
        >
          Add New Product
        </Link>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="p-5 bg-white rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Total Products</h3>
          <p className="mt-1 text-2xl font-semibold text-gray-900">{metrics.totalProducts}</p>
        </div>
        <div className="p-5 bg-white rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Active Orders</h3>
          <p className="mt-1 text-2xl font-semibold text-gray-900">{metrics.activeOrders}</p>
        </div>
        <div className="p-5 bg-white rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Monthly Revenue</h3>
          <p className="mt-1 text-2xl font-semibold text-gray-900">
            ${metrics.monthlyRevenue.toLocaleString()}
          </p>
        </div>
        <div className="p-5 bg-white rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Inventory Value</h3>
          <p className="mt-1 text-2xl font-semibold text-gray-900">
            ${metrics.inventoryValue.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-4 py-5 border-b sm:px-6">
          <h2 className="text-lg font-medium text-gray-900">Recent Orders</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {recentOrders.map((order) => (
            <div key={order.id} className="p-4 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Order #{order.id} - {order.customer}
                  </p>
                  <p className="text-sm text-gray-500">{order.date}</p>
                </div>
                <div className="flex items-center">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    order.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                  <p className="ml-4 text-sm font-medium text-gray-900">
                    ${order.amount.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="px-4 py-4 border-t sm:px-6">
          <Link
            href="/supplier/orders"
            className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
          >
            View all orders →
          </Link>
        </div>
      </div>
    </div>
  );
} 