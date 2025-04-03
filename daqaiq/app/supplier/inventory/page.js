'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { toast } from 'react-hot-toast';
import Link from 'next/link';
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

  useEffect(() => {
    if (session?.user) {
      fetchInventory();
    }
  }, [session, filter, page]);

  const fetchInventory = async () => {
    try {
      const response = await fetch(
        `/api/supplier/inventory?stockStatus=${filter}&page=${page}`
      );
      const data = await response.json();

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
  };

  const handleStockUpdate = async (productId) => {
    try {
      if (!stockAdjustment.quantity) {
        toast.error(t.enterQuantity);
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

      toast.success(t.stockUpdated);
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
    if (product.quantity <= 0) return 'bg-red-100 text-red-800';
    if (product.quantity <= product.lowStockThreshold) return 'bg-yellow-100 text-yellow-800';
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
        <h1 className="text-2xl font-bold text-gray-900">{t.inventory}</h1>
        <div className="mt-4 md:mt-0 flex flex-col md:flex-row gap-4">
          <select
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
              setPage(1);
            }}
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">{t.all}</option>
            <option value="low_stock">{t.lowStock}</option>
            <option value="out_of_stock">{t.outOfStock}</option>
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
          <h2 className="text-lg font-semibold mb-4">{t.bulkUpdateSelectedProducts}</h2>
          <div className="flex flex-wrap gap-4">
            <select
              value={stockAdjustment.type}
              onChange={(e) => setStockAdjustment(prev => ({ ...prev, type: e.target.value }))}
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="increase">{t.addStock}</option>
              <option value="decrease">{t.removeStock}</option>
            </select>
            <input
              type="number"
              value={stockAdjustment.quantity}
              onChange={(e) => setStockAdjustment(prev => ({ ...prev, quantity: e.target.value }))}
              placeholder={t.enterQuantity}
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleBulkUpdate}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              {t.updateSelected} ({selectedProducts.length})
            </button>
          </div>
        </div>
      )}

      {/* Products Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <input
                  type="checkbox"
                  checked={selectedProducts.length === products.length}
                  onChange={handleSelectAll}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.productName}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.description}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.price}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.category}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.currentStock}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.minimumStock}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.status}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.actions}</th>
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
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">{product.name}</div>
                </td>
                <td className="px-6 py-4">
                  <textarea
                    defaultValue={product.description}
                    className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="2"
                  />
                </td>
                <td className="px-6 py-4">
                  <input
                    type="number"
                    defaultValue={product.price}
                    className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </td>
                <td className="px-6 py-4">
                  <select
                    defaultValue={product.category}
                    className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="electronics">{t.electronics}</option>
                    <option value="clothing">{t.clothing}</option>
                    <option value="home">{t.home}</option>
                    <option value="books">{t.books}</option>
                    <option value="toys">{t.toys}</option>
                  </select>
                </td>
                <td className="px-6 py-4">
                  <input
                    type="number"
                    defaultValue={product.quantity}
                    className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </td>
                <td className="px-6 py-4">
                  <input
                    type="number"
                    defaultValue={product.lowStockThreshold}
                    className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStockStatusColor(product)}`}>
                    {product.quantity <= 0 ? t.outOfStock : 
                     product.quantity <= product.lowStockThreshold ? t.lowStock : t.inStock}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  {editingProduct === product._id ? (
                    <div className="flex items-center space-x-4">
                      <select
                        value={stockAdjustment.type}
                        onChange={(e) => setStockAdjustment(prev => ({ ...prev, type: e.target.value }))}
                        className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="increase">{t.addStock}</option>
                        <option value="decrease">{t.removeStock}</option>
                      </select>
                      <input
                        type="number"
                        value={stockAdjustment.quantity}
                        onChange={(e) => setStockAdjustment(prev => ({ ...prev, quantity: e.target.value }))}
                        placeholder={t.enterQuantity}
                        className="border border-gray-300 rounded-md px-2 py-1 w-20 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        onClick={() => handleStockUpdate(product._id)}
                        className="text-green-600 hover:text-green-900 text-sm font-medium"
                      >
                        {t.save}
                      </button>
                      <button
                        onClick={() => {
                          setEditingProduct(null);
                          setStockAdjustment({ quantity: '', type: 'increase' });
                        }}
                        className="text-red-600 hover:text-red-900 text-sm font-medium"
                      >
                        {t.cancel}
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setEditingProduct(product._id)}
                      className="text-blue-600 hover:text-blue-900 text-sm font-medium"
                    >
                      {t.updateStock}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {hasMore && (
        <div className="mt-4 flex justify-center">
          <button
            onClick={() => setPage(prev => prev + 1)}
            className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {t.loadMore}
          </button>
        </div>
      )}

      {products.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">{t.noData}</p>
        </div>
      )}
    </div>
  );
} 