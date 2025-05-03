'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { toast } from 'react-hot-toast';
import Link from 'next/link';
import Image from 'next/image';
import CsvUploader from '../../components/CsvUploader';
import { SUPPLIER_TRANSLATIONS as t } from '../../constants/translations';

export default function InventoryManagement() {
  const { data: session } = useSession();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [stockAdjustment, setStockAdjustment] = useState({
    quantity: '',
    type: 'increase'
  });

  const fetchInventory = useCallback(async () => {
    try {
      console.log('Fetching inventory...');
      const response = await fetch(
        `/api/supplier/inventory?stockStatus=${filter}&page=${page}`
      );
      const data = await response.json();
      console.log('Inventory data received:', data);

      if (!response.ok) {
        throw new Error(t.errorOccurred);
      }

      if (page === 1) {
        setProducts(data.products);
      } else {
        setProducts((prev) => [...prev, ...data.products]);
      }
      setHasMore(data.hasMore);
    } catch (error) {
      console.error('Error fetching inventory:', error);
      toast.error(t.errorOccurred);
    } finally {
      setLoading(false);
    }
  }, [filter, page]);

  useEffect(() => {
    if (session?.user) {
      fetchInventory();
    }
  }, [session, fetchInventory]);

  const handleStockUpdate = async (productId) => {
    try {
      if (!stockAdjustment.quantity) {
        toast.error(t.enterQuantity || 'الرجاء إدخال الكمية');
        return;
      }

      const response = await fetch(`/api/supplier/inventory/${productId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          quantity: parseInt(stockAdjustment.quantity),
          type: stockAdjustment.type,
          reason: `Manual ${stockAdjustment.type} by supplier`
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || t.errorOccurred);
      }

      toast.success(t.stockUpdated || 'تم تحديث المخزون بنجاح');
      setEditingProduct(null);
      setStockAdjustment({ quantity: '', type: 'increase' });
      fetchInventory();
    } catch (error) {
      console.error('Error updating stock:', error);
      toast.error(error.message);
    }
  };

  const handleBulkUpdate = async () => {
    try {
      if (!selectedProducts.length) {
        toast.error('Please select products to update');
        return;
      }

      if (!stockAdjustment.quantity) {
        toast.error(t.enterQuantity);
        return;
      }

      const updates = selectedProducts.map(productId => ({
        productId,
        quantity: parseInt(stockAdjustment.quantity),
        type: stockAdjustment.type,
        reason: `Bulk ${stockAdjustment.type} by supplier`
      }));

      const response = await fetch('/api/supplier/inventory', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ updates }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to perform bulk update');
      }

      toast.success('Bulk update completed successfully');
      setSelectedProducts([]);
      setStockAdjustment({ quantity: '', type: 'increase' });
      fetchInventory(); // Refresh the inventory list
    } catch (error) {
      console.error('Error performing bulk update:', error);
      toast.error(t.errorUpdate);
    }
  };

  const handleProductSelect = (productId) => {
    setSelectedProducts(prev => {
      if (prev.includes(productId)) {
        return prev.filter(id => id !== productId);
      }
      return [...prev, productId];
    });
  };

  const handleSelectAll = () => {
    if (selectedProducts.length === products.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(products.map(product => product._id));
    }
  };

  const getStockStatusColor = (product) => {
    if (product.stock <= 0) return 'bg-red-100 text-red-800';
    if (product.stock <= product.lowStockThreshold) return 'bg-yellow-100 text-yellow-800';
    return 'bg-green-100 text-green-800';
  };

  const handleUploadComplete = (results) => {
    if (results.successful.length > 0) {
      toast.success(`Successfully updated ${results.successful.length} products`);
    }
    if (results.failed.length > 0) {
      toast.error(`Failed to update ${results.failed.length} products`);
    }
    fetchInventory(); // Refresh the inventory list
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
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">{t.inventory || 'إدارة المخزون'}</h1>
        <div className="mt-4 md:mt-0 flex flex-col md:flex-row gap-4">
          <select
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
              setPage(1);
            }}
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">{t.all || 'الكل'}</option>
            <option value="low_stock">{t.lowStock || 'مخزون منخفض'}</option>
            <option value="out_of_stock">{t.outOfStock || 'نفذ المخزون'}</option>
          </select>
        </div>
      </div>

      {/* CSV Uploader */}
      <div className="mb-8">
        <CsvUploader onUploadComplete={handleUploadComplete} />
      </div>

      {/* Bulk Update Section */}
      {selectedProducts.length > 0 && (
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <h2 className="text-lg font-semibold mb-4">{t.bulkUpdate || 'تحديث جماعي'}</h2>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="number"
                value={stockAdjustment.quantity}
                onChange={(e) => setStockAdjustment(prev => ({ ...prev, quantity: e.target.value }))}
                placeholder={t.enterQuantity || 'أدخل الكمية'}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <select
              value={stockAdjustment.type}
              onChange={(e) => setStockAdjustment(prev => ({ ...prev, type: e.target.value }))}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="increase">{t.increase || 'زيادة'}</option>
              <option value="decrease">{t.decrease || 'نقصان'}</option>
              <option value="set">{t.set || 'تعيين'}</option>
            </select>
            <button
              onClick={handleBulkUpdate}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              {t.update || 'تحديث'}
            </button>
          </div>
        </div>
      )}

      {/* Inventory Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                <input
                  type="checkbox"
                  checked={selectedProducts.length === products.length}
                  onChange={handleSelectAll}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t.product || 'المنتج'}
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t.sku || 'رمز المنتج'}
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t.stock || 'المخزون'}
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t.lowStockThreshold || 'حد المخزون المنخفض'}
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t.status || 'الحالة'}
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t.actions || 'الإجراءات'}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="checkbox"
                    checked={selectedProducts.includes(product._id)}
                    onChange={() => handleProductSelect(product._id)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 relative">
                      <Image
                        src={product.image || '/placeholder.png'}
                        alt={product.name}
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>
                    <div className="mr-4">
                      <div className="text-sm font-medium text-gray-900">{product.name}</div>
                      <div className="text-sm text-gray-500">{product.sku}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {product.sku || '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {product.stock}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {product.lowStockThreshold}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStockStatusColor(product)}`}>
                    {product.stock <= 0 ? (t.outOfStock || 'نفذ المخزون') :
                     product.stock <= product.lowStockThreshold ? (t.lowStock || 'مخزون منخفض') :
                     (t.inStock || 'متوفر')}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {editingProduct === product._id ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={stockAdjustment.quantity}
                        onChange={(e) => setStockAdjustment(prev => ({ ...prev, quantity: e.target.value }))}
                        placeholder={t.enterQuantity || 'أدخل الكمية'}
                        className="w-20 px-2 py-1 border border-gray-300 rounded-md"
                      />
                      <select
                        value={stockAdjustment.type}
                        onChange={(e) => setStockAdjustment(prev => ({ ...prev, type: e.target.value }))}
                        className="px-2 py-1 border border-gray-300 rounded-md"
                      >
                        <option value="increase">{t.increase || 'زيادة'}</option>
                        <option value="decrease">{t.decrease || 'نقصان'}</option>
                        <option value="set">{t.set || 'تعيين'}</option>
                      </select>
                      <button
                        onClick={() => handleStockUpdate(product._id)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        {t.save || 'حفظ'}
                      </button>
                      <button
                        onClick={() => setEditingProduct(null)}
                        className="text-gray-600 hover:text-gray-900"
                      >
                        {t.cancel || 'إلغاء'}
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setEditingProduct(product._id)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      {t.edit || 'تعديل'}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Load More Button */}
      {hasMore && (
        <div className="mt-4 text-center">
          <button
            onClick={() => setPage(prev => prev + 1)}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
          >
            {t.loadMore || 'تحميل المزيد'}
          </button>
        </div>
      )}
    </div>
  );
} 