'use client';

import { useEffect, useState } from 'react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalProducts: 0,
    totalSuppliers: 0,
    totalCustomers: 0,
  });

  useEffect(() => {
    // Fetch dashboard stats
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/admin/stats');
        if (response.ok) {
          const data = await response.json();
          setStats(data);
        }
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8">لوحة التحكم</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Orders Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-2">الطلبات</h2>
          <p className="text-3xl font-bold text-indigo-600">{stats.totalOrders}</p>
        </div>

        {/* Products Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-2">المنتجات</h2>
          <p className="text-3xl font-bold text-indigo-600">{stats.totalProducts}</p>
        </div>

        {/* Suppliers Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-2">الموردين</h2>
          <p className="text-3xl font-bold text-indigo-600">{stats.totalSuppliers}</p>
        </div>

        {/* Customers Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-2">العملاء</h2>
          <p className="text-3xl font-bold text-indigo-600">{stats.totalCustomers}</p>
        </div>
      </div>
    </div>
  );
} 