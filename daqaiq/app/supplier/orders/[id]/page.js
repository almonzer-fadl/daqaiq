'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { toast } from 'react-hot-toast';
import Image from 'next/image';
import Link from 'next/link';

export default function OrderDetails() {
  const { data: session } = useSession();
  const router = useRouter();
  const params = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchOrder = useCallback(async () => {
    try {
      const response = await fetch(`/api/supplier/orders/${params.id}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'فشل في جلب بيانات الطلب');
      }

      setOrder(data.order);
    } catch (error) {
      console.error('Error fetching order:', error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }, [params.id]);

  useEffect(() => {
    if (session?.user && params?.id) {
      fetchOrder();
    }
  }, [session, params?.id, fetchOrder]);

  const handleStatusChange = async (newStatus) => {
    try {
      const response = await fetch(`/api/supplier/orders/${params.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'فشل في تحديث حالة الطلب');
      }

      setOrder(data.order);
      toast.success('تم تحديث حالة الطلب بنجاح');
    } catch (error) {
      console.error('Error updating order status:', error);
      toast.error(error.message);
    }
  };

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

  const getStatusText = (status) => {
    const statusMap = {
      pending: 'قيد الانتظار',
      processing: 'قيد المعالجة',
      shipped: 'تم الشحن',
      delivered: 'تم التوصيل',
      cancelled: 'ملغي'
    };
    return statusMap[status] || status;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">الطلب غير موجود</h2>
          <p className="mt-2 text-gray-600">الطلب الذي تبحث عنه غير موجود أو ليس لديك صلاحية لعرضه.</p>
          <Link
            href="/supplier/orders"
            className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            العودة إلى الطلبات
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            طلب #{order.orderNumber}
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            تم الطلب في {formatDate(order.createdAt)}
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex items-center gap-4">
          <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(order.status)}`}>
            {getStatusText(order.status)}
          </span>
          <select
            value={order.status}
            onChange={(e) => handleStatusChange(e.target.value)}
            className="border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="pending">قيد الانتظار</option>
            <option value="processing">قيد المعالجة</option>
            <option value="shipped">تم الشحن</option>
            <option value="delivered">تم التوصيل</option>
            <option value="cancelled">ملغي</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Customer Information */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">معلومات العميل</h2>
          <div className="space-y-3">
            <p>
              <span className="text-gray-600">الاسم:</span>{' '}
              <span className="font-medium">{order.customer?.name || 'غير متوفر'}</span>
            </p>
            <p>
              <span className="text-gray-600">البريد الإلكتروني:</span>{' '}
              <span className="font-medium">{order.customer?.email || 'غير متوفر'}</span>
            </p>
          </div>
        </div>

        {/* Shipping Information */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">معلومات الشحن</h2>
          <div className="space-y-3">
            <p>
              <span className="text-gray-600">العنوان:</span>{' '}
              <span className="font-medium">
                {order.shippingAddress.addressLine1}
                {order.shippingAddress.addressLine2 && `، ${order.shippingAddress.addressLine2}`}
              </span>
            </p>
            <p>
              <span className="text-gray-600">المدينة:</span>{' '}
              <span className="font-medium">{order.shippingAddress.city}</span>
            </p>
            <p>
              <span className="text-gray-600">المنطقة:</span>{' '}
              <span className="font-medium">{order.shippingAddress.state}</span>
            </p>
            <p>
              <span className="text-gray-600">الرمز البريدي:</span>{' '}
              <span className="font-medium">{order.shippingAddress.postalCode}</span>
            </p>
            <p>
              <span className="text-gray-600">الدولة:</span>{' '}
              <span className="font-medium">{order.shippingAddress.country}</span>
            </p>
            <p>
              <span className="text-gray-600">الهاتف:</span>{' '}
              <span className="font-medium">{order.shippingAddress.phone}</span>
            </p>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">ملخص الطلب</h2>
          <div className="space-y-3">
            <p className="flex justify-between">
              <span className="text-gray-600">المجموع الفرعي:</span>
              <span className="font-medium">ر.س{order.subtotal.toFixed(2)}</span>
            </p>
            <p className="flex justify-between">
              <span className="text-gray-600">الشحن:</span>
              <span className="font-medium">ر.س{order.shippingCost.toFixed(2)}</span>
            </p>
            <p className="flex justify-between">
              <span className="text-gray-600">الضريبة:</span>
              <span className="font-medium">ر.س{order.tax.toFixed(2)}</span>
            </p>
            <div className="border-t pt-3 mt-3">
              <p className="flex justify-between font-bold">
                <span>المجموع الكلي:</span>
                <span>ر.س{order.total.toFixed(2)}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Order Items */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-4">المنتجات</h2>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">المنتج</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">السعر</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الكمية</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">المجموع</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {order.items.map((item, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {item.product?.image && (
                        <div className="flex-shrink-0 h-10 w-10 relative">
                          <Image
                            src={item.product.image}
                            alt={item.product.name}
                            fill
                            className="rounded-md object-cover"
                          />
                        </div>
                      )}
                      <div className="mr-4">
                        <div className="text-sm font-medium text-gray-900">{item.product?.name}</div>
                        {item.variant && (
                          <div className="text-sm text-gray-500">{item.variant.name}</div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ر.س{item.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.quantity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ر.س{(item.price * item.quantity).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 