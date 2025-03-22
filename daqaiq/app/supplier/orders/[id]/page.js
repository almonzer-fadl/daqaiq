'use client';

import { useState, useEffect } from 'react';
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

  useEffect(() => {
    if (session?.user && params?.id) {
      fetchOrder();
    }
  }, [session, params?.id]);

  const fetchOrder = async () => {
    try {
      const response = await fetch(`/api/supplier/orders/${params.id}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch order');
      }

      setOrder(data.order);
    } catch (error) {
      console.error('Error fetching order:', error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

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
        throw new Error(data.error || 'Failed to update order status');
      }

      setOrder(data.order);
      toast.success('Order status updated successfully');
    } catch (error) {
      console.error('Error updating order status:', error);
      toast.error(error.message);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
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

  if (!order) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Order not found</h2>
          <p className="mt-2 text-gray-600">The order you're looking for doesn't exist or you don't have permission to view it.</p>
          <Link
            href="/supplier/orders"
            className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Back to Orders
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
            Order #{order.orderNumber}
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Placed on {formatDate(order.createdAt)}
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex items-center gap-4">
          <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(order.status)}`}>
            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
          </span>
          <select
            value={order.status}
            onChange={(e) => handleStatusChange(e.target.value)}
            className="border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Customer Information */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Customer Information</h2>
          <div className="space-y-3">
            <p>
              <span className="text-gray-600">Name:</span>{' '}
              <span className="font-medium">{order.customer?.name || 'N/A'}</span>
            </p>
            <p>
              <span className="text-gray-600">Email:</span>{' '}
              <span className="font-medium">{order.customer?.email || 'N/A'}</span>
            </p>
          </div>
        </div>

        {/* Shipping Information */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Shipping Information</h2>
          <div className="space-y-3">
            <p>
              <span className="text-gray-600">Address:</span>{' '}
              <span className="font-medium">
                {order.shippingAddress.addressLine1}
                {order.shippingAddress.addressLine2 && `, ${order.shippingAddress.addressLine2}`}
              </span>
            </p>
            <p>
              <span className="text-gray-600">City:</span>{' '}
              <span className="font-medium">{order.shippingAddress.city}</span>
            </p>
            <p>
              <span className="text-gray-600">State:</span>{' '}
              <span className="font-medium">{order.shippingAddress.state}</span>
            </p>
            <p>
              <span className="text-gray-600">Postal Code:</span>{' '}
              <span className="font-medium">{order.shippingAddress.postalCode}</span>
            </p>
            <p>
              <span className="text-gray-600">Country:</span>{' '}
              <span className="font-medium">{order.shippingAddress.country}</span>
            </p>
            <p>
              <span className="text-gray-600">Phone:</span>{' '}
              <span className="font-medium">{order.shippingAddress.phone}</span>
            </p>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
          <div className="space-y-3">
            <p className="flex justify-between">
              <span className="text-gray-600">Subtotal:</span>
              <span className="font-medium">${order.subtotal.toFixed(2)}</span>
            </p>
            <p className="flex justify-between">
              <span className="text-gray-600">Shipping:</span>
              <span className="font-medium">${order.shippingCost.toFixed(2)}</span>
            </p>
            <p className="flex justify-between">
              <span className="text-gray-600">Tax:</span>
              <span className="font-medium">${order.tax.toFixed(2)}</span>
            </p>
            <div className="border-t pt-3">
              <p className="flex justify-between font-semibold">
                <span>Total:</span>
                <span>${order.total.toFixed(2)}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Order Items */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-4">Order Items</h2>
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {order.items.map((item, index) => (
              <li key={index} className="p-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 w-16 h-16 relative">
                    <Image
                      src={item.product?.images?.[0] || '/placeholder.png'}
                      alt={item.product?.name || 'Product image'}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {item.product?.name || 'Product name not available'}
                    </p>
                    {item.variant && (
                      <p className="text-sm text-gray-500">
                        Variant: {item.variant}
                      </p>
                    )}
                    <p className="text-sm text-gray-500">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                  <div className="flex-shrink-0 text-sm font-medium text-gray-900">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Back Button */}
      <div className="mt-8">
        <Link
          href="/supplier/orders"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          ← Back to Orders
        </Link>
      </div>
    </div>
  );
} 