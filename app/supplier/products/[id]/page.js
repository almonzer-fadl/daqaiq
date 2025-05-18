'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';

export default function ProductDetailsPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true);
        const res = await fetch(`/api/supplier/products/${id}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'فشل في جلب بيانات المنتج');
        setProduct(data.product);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchProduct();
  }, [id]);

  if (loading) return <div className="flex justify-center items-center min-h-screen">جاري التحميل...</div>;
  if (error) return <div className="flex justify-center items-center min-h-screen text-red-600">{error}</div>;
  if (!product) return <div className="flex justify-center items-center min-h-screen">المنتج غير موجود</div>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
      <div className="mb-4">
        <span className="text-lg font-bold text-gray-900">ر.س{product.price}</span>
        <span className="ml-4 text-gray-600">المخزون: {product.quantity ?? product.stock ?? 0}</span>
      </div>
      <div className="mb-4">
        <span className="inline-block px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
          {product.status === 'active' ? 'نشط' : 'غير نشط'}
        </span>
      </div>
      <div className="mb-6">
        <p className="text-gray-700 whitespace-pre-line">{product.description}</p>
      </div>
      {product.image && (
        <div className="mb-6">
          <Image src={product.image} alt={product.name} width={400} height={300} className="rounded-lg object-cover" />
        </div>
      )}
      {product.additionalImages && product.additionalImages.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">صور إضافية</h2>
          <div className="flex flex-wrap gap-4">
            {product.additionalImages.map((img, idx) => (
              <Image key={idx} src={img} alt={product.name + idx} width={120} height={120} className="rounded object-cover" />
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 