'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import AdminLayout from './components/AdminLayout';
import DashboardMetrics from './components/DashboardMetrics';
import RecentActivity from './components/RecentActivity';
import QuickActions from './components/QuickActions';

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [metrics, setMetrics] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalSuppliers: 0,
    totalRevenue: 0,
    pendingOrders: 0,
    lowStockItems: 0,
    activeSuppliers: 0
  });

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/auth/signin');
    } else if (session?.user?.role !== 'admin') {
      router.push('/');
      toast.error('Unauthorized access');
    } else {
      fetchDashboardData();
    }
  }, [session, status]);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch('/api/admin/dashboard/metrics');
      if (!response.ok) throw new Error('Failed to fetch dashboard data');
      const data = await response.json();
      setMetrics(data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast.error('Failed to load dashboard data');
    }
  };

  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <AdminLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-8">Admin Dashboard</h1>
        
        {/* Quick Actions */}
        <QuickActions />
        
        {/* Dashboard Metrics */}
        <DashboardMetrics metrics={metrics} />
        
        {/* Recent Activity */}
        <RecentActivity />
      </div>
    </AdminLayout>
  );
} 