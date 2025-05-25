'use client';

import { useSession } from 'next-auth/react';
import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { SUPPLIER_TRANSLATIONS as t } from '@/constants/supplier-translations';

export default function OrderDetails() {
  const { data: session } = useSession();
  const params = useParams();
  const router = useRouter();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchOrder() {
      try {
        const response = await fetch(`/api/supplier/orders/${params.id}`, {
          headers: {
            'Authorization': `Bearer ${session?.accessToken}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch order');
        }

        const data = await response.json();
        setOrder(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    if (session?.accessToken) {
      fetchOrder();
    }
  }, [session, params.id]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
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

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">{t.orders.notFound}</h2>
          <p className="mt-2 text-gray-600">{t.orders.notFoundMessage}</p>
          <Link
            href="/supplier/orders"
            className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            {t.common.back}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {t.orders.details.title} #{order.orderNumber}
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            {t.orders.details.placed} {formatDate(order.createdAt)}
          </p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
          {t.orders.status[order.status]}
        </span>
      </div>

      {/* Customer Information */}
      <div className="bg-white shadow rounded-lg mb-8">
        <div className="px-6 py-5">
          <h2 className="text-lg font-medium text-gray-900">{t.orders.details.customerInfo}</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <p className="text-sm font-medium text-gray-500">{t.orders.details.name}</p>
              <p className="mt-1">{order.customer.name}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">{t.orders.details.email}</p>
              <p className="mt-1">{order.customer.email}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">{t.orders.details.phone}</p>
              <p className="mt-1">{order.customer.phone}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Order Items */}
      <div className="bg-white shadow rounded-lg mb-8">
        <div className="px-6 py-5">
          <h2 className="text-lg font-medium text-gray-900">{t.orders.details.items}</h2>
          <div className="mt-4">
            <div className="border-t border-gray-200">
              {order.items.map((item) => (
                <div key={item._id} className="py-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 w-16 h-16 border border-gray-200 rounded-md overflow-hidden">
                      <img
                        src={item.product.image || '/placeholder.png'}
                        alt={item.product.name}
                        className="w-full h-full object-center object-cover"
                      />
                    </div>
                    <div className="mr-6">
                      <div className="text-sm font-medium text-gray-900">{item.product.name}</div>
                      <div className="mt-1 text-sm text-gray-500">
                        {t.orders.details.quantity}: {item.quantity}
                      </div>
                    </div>
                  </div>
                  <div className="text-sm font-medium text-gray-900" dir="ltr">
                    {new Intl.NumberFormat('ar-SA', {
                      style: 'currency',
                      currency: 'SAR'
                    }).format(item.price * item.quantity)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Order Summary */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-5">
          <h2 className="text-lg font-medium text-gray-900">{t.orders.details.summary}</h2>
          <dl className="mt-4 space-y-4">
            <div className="flex items-center justify-between">
              <dt className="text-sm text-gray-600">{t.orders.details.subtotal}</dt>
              <dd className="text-sm font-medium text-gray-900" dir="ltr">
                {new Intl.NumberFormat('ar-SA', {
                  style: 'currency',
                  currency: 'SAR'
                }).format(order.subtotal)}
              </dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-sm text-gray-600">{t.orders.details.shipping}</dt>
              <dd className="text-sm font-medium text-gray-900" dir="ltr">
                {new Intl.NumberFormat('ar-SA', {
                  style: 'currency',
                  currency: 'SAR'
                }).format(order.shippingCost)}
              </dd>
            </div>
            <div className="flex items-center justify-between border-t border-gray-200 pt-4">
              <dt className="text-base font-medium text-gray-900">{t.orders.details.total}</dt>
              <dd className="text-base font-medium text-gray-900" dir="ltr">
                {new Intl.NumberFormat('ar-SA', {
                  style: 'currency',
                  currency: 'SAR'
                }).format(order.total)}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
} 