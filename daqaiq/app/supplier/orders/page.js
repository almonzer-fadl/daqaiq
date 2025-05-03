'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { toast } from 'react-hot-toast';
import Link from 'next/link';
import { SUPPLIER_TRANSLATIONS as t } from '../../constants/translations';

export default function SupplierOrders() {
  const { data: session } = useSession();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchOrders = useCallback(async () => {
    try {
      const response = await fetch(`/api/supplier/orders?status=${filter}&page=${page}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(t.errorOccurred);
      }

      if (page === 1) {
        setOrders(data.orders);
      } else {
        setOrders(prev => [...prev, ...data.orders]);
      }
      
      setHasMore(data.hasMore);
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error(t.errorOccurred);
    } finally {
      setLoading(false);
    }
  }, [filter, page]);

  useEffect(() => {
    if (session?.user) {
      fetchOrders();
    }
  }, [session, fetchOrders]);

  const createTestOrder = async () => {
    try {
      const response = await fetch('/api/test/create-order', {
        method: 'POST',
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to create test order');
      }

      toast.success('Test order created successfully');
      // Reset the page and fetch orders
      setPage(1);
      setOrders([]); // Clear existing orders
      await fetchOrders();
    } catch (error) {
      console.error('Error creating test order:', error);
      toast.error(error.message);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const response = await fetch(`/api/supplier/orders/${orderId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update order status');
      }

      // Update the order status in the local state
      setOrders(prevOrders =>
        prevOrders.map(order =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );

      toast.success('Order status updated successfully');
    } catch (error) {
      console.error('Error updating order status:', error);
      toast.error(error.message);
    }
  };

  const loadMore = () => {
    setPage(prev => prev + 1);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      processing: 'bg-blue-100 text-blue-800',
      shipped: 'bg-purple-100 text-purple-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.orderNumber?.toString().includes(searchTerm) ||
                         order.customerName?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || order.status === filter;
    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">{t.orders}</h1>
        <div className="mt-4 md:mt-0 flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder={t.search}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm bg-white"
            />
          </div>
          <select
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
              setPage(1);
            }}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">{t.all}</option>
            <option value="pending">{t.pending}</option>
            <option value="processing">{t.processing}</option>
            <option value="shipped">{t.shipped}</option>
            <option value="delivered">{t.delivered}</option>
            <option value="cancelled">{t.cancelled}</option>
          </select>
          <button
            onClick={createTestOrder}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
          >
            {t.createTestOrder}
          </button>
        </div>
      </div>

      {/* Orders List */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {filteredOrders.map((order) => (
            <li key={order._id}>
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <p className="text-sm font-medium text-blue-600 truncate">
                      {t.orderNumber}: #{order.orderNumber}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
                        {t[order.status]}
                      </span>
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                        className="text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="pending">{t.pending || 'قيد الانتظار'}</option>
                        <option value="processing">{t.processing || 'قيد المعالجة'}</option>
                        <option value="shipped">{t.shipped || 'تم الشحن'}</option>
                        <option value="delivered">{t.delivered || 'تم التوصيل'}</option>
                        <option value="cancelled">{t.cancelled || 'ملغي'}</option>
                      </select>
                    </div>
                  </div>
                  <div className="ml-2 flex-shrink-0 flex">
                    <Link
                      href={`/supplier/orders/${order._id}`}
                      className="px-3 py-1 text-sm text-blue-600 hover:text-blue-800"
                    >
                      {t.viewDetails}
                    </Link>
                  </div>
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
                  <div className="sm:flex">
                    <p className="flex items-center text-sm text-gray-500">
                      {t.customerName}: {order.customerName}
                    </p>
                    <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                      {t.total}: ${order.total.toFixed(2)}
                    </p>
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                    <p>
                      {t.orderDate}: {formatDate(order.createdAt)}
                    </p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Load More Button */}
      {hasMore && (
        <div className="mt-4 flex justify-center">
          <button
            onClick={loadMore}
            className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {t.loadMore}
          </button>
        </div>
      )}

      {/* Empty State */}
      {filteredOrders.length === 0 && (
        <div className="text-center py-12">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">{t.noData}</h3>
          <p className="mt-1 text-sm text-gray-500">
            {t.noDataDescription}
          </p>
        </div>
      )}
    </div>
  );
} 