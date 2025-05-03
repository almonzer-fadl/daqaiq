'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import ProductForm from '../../../../components/ProductForm';

export default function EditProduct() {
  const router = useRouter();
  const params = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProduct = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/supplier/products/${params.id}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch product');
      }

      setProduct(data.product);
    } catch (error) {
      console.error('Error fetching product:', error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }, [params.id]);

  useEffect(() => {
    if (params?.id) {
      fetchProduct();
    }
  }, [params?.id, fetchProduct]);

  const handleSubmit = async (formData) => {
    try {
      const response = await fetch(`/api/supplier/products/${params.id}`, {
        method: 'PUT',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update product');
      }

      toast.success('Product updated successfully');
      router.push('/supplier/products');
    } catch (error) {
      console.error('Error updating product:', error);
      toast.error(error.message);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (!product) {
    return <div className="flex justify-center items-center min-h-screen">Product not found</div>;
  }

  // Map stock to quantity for the form
  const initialData = { ...product, quantity: product.quantity ?? product.stock ?? 0 };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Edit Product</h1>
      <ProductForm 
        initialData={initialData}
        onSubmit={handleSubmit}
        submitButtonText="Update Product"
      />
    </div>
  );
} 