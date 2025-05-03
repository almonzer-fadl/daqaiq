'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import Image from 'next/image';
import { SUPPLIER_TRANSLATIONS as t } from '../../../../constants/translations';

export default function EditProduct() {
  const router = useRouter();
  const params = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [mainImage, setMainImage] = useState(null);
  const [additionalImages, setAdditionalImages] = useState([]);
  const [mainImagePreview, setMainImagePreview] = useState(null);
  const [additionalImagePreviews, setAdditionalImagePreviews] = useState([]);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    status: '',
    quantity: '',
  });

  const fetchProduct = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/supplier/products/${params.id}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || t.error);
      }

      setProduct(data.product);
      setFormData({
        name: data.product.name,
        description: data.product.description,
        price: data.product.price,
        category: data.product.category,
        status: data.product.status,
        quantity: data.product.quantity,
      });
      
      // Set image previews
      if (data.product.image) {
        setMainImagePreview(data.product.image);
      }
      
      if (data.product.additionalImages && Array.isArray(data.product.additionalImages)) {
        setAdditionalImagePreviews(data.product.additionalImages);
      }
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleMainImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMainImage(file);
      const preview = URL.createObjectURL(file);
      setMainImagePreview(preview);
    }
  };
  
  const handleAdditionalImagesChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setAdditionalImages(prev => [...prev, ...files]);
      const newPreviews = files.map(file => URL.createObjectURL(file));
      setAdditionalImagePreviews(prev => [...prev, ...newPreviews]);
    }
  };
  
  const handleMainImageDelete = () => {
    if (mainImagePreview) {
      if (mainImagePreview.startsWith('blob:')) {
        URL.revokeObjectURL(mainImagePreview);
      }
      setMainImage(null);
      setMainImagePreview(null);
    }
  };

  const removeAdditionalImage = (index) => {
    setAdditionalImages(prev => {
      const updated = [...prev];
      updated.splice(index, 1);
      return updated;
    });
    
    setAdditionalImagePreviews(prev => {
      const updated = [...prev];
      if (updated[index] && updated[index].startsWith('blob:')) {
        URL.revokeObjectURL(updated[index]);
      }
      updated.splice(index, 1);
      return updated;
    });
  };

  // Clean up URL objects when component unmounts
  useEffect(() => {
    return () => {
      additionalImagePreviews.forEach(preview => {
        if (preview.startsWith('blob:')) {
          URL.revokeObjectURL(preview);
        }
      });
    };
  }, [additionalImagePreviews]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      const productFormData = new FormData();
      
      // Add basic product data
      Object.keys(formData).forEach(key => {
        if (formData[key] !== undefined && formData[key] !== null) {
          productFormData.append(key, formData[key]);
        }
      });
      
      // Add main image if changed
      if (mainImage) {
        productFormData.append('image', mainImage);
      }
      
      // Add additional images
      additionalImages.forEach((file) => {
        productFormData.append('additionalImages', file);
      });

      const response = await fetch(`/api/supplier/products/${params.id}`, {
        method: 'PUT',
        body: productFormData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || t.error);
      }

      toast.success(t.success);
      router.push('/supplier/products');
    } catch (error) {
      console.error('Error updating product:', error);
      toast.error(error.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">{t.loading}</div>;
  }

  if (!product) {
    return <div className="flex justify-center items-center min-h-screen">{t.noData}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">{t.editProduct}</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Product Images */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">{t.productImages}</h2>
          
          {/* Main image */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.mainImage}
            </label>
            <div className="flex items-center space-x-4">
              <div className="relative h-24 w-24 overflow-hidden rounded-md group">
                {mainImagePreview ? (
                  <>
                    <Image
                      src={mainImagePreview}
                      alt={formData.name}
                      fill
                      className="object-cover"
                    />
                    <button
                      type="button"
                      onClick={handleMainImageDelete}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </>
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <svg className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
              </div>
              <label className="block">
                <span className="sr-only">{t.chooseMainImage}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleMainImageChange}
                  className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100"
                />
              </label>
            </div>
          </div>
          
          {/* Additional images */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.additionalImages}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4">
              {additionalImagePreviews.map((preview, index) => (
                <div key={index} className="relative group">
                  <div className="relative h-24 w-full overflow-hidden rounded-md">
                    <Image
                      src={preview}
                      alt={`Product image ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeAdditionalImage(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
              <label className="flex flex-col items-center justify-center h-24 border-2 border-dashed border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer">
                <svg className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
                <span className="mt-2 text-sm text-gray-500">{t.addImages}</span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleAdditionalImagesChange}
                  className="sr-only"
                />
              </label>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">{t.productDetails}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {t.productName}
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {t.productPrice}
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {t.productCategory}
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">{t.selectCategory}</option>
                <option value="electronics">{t.electronics}</option>
                <option value="clothing">{t.clothing}</option>
                <option value="home">{t.home}</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {t.productStatus}
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="active">{t.active}</option>
                <option value="inactive">{t.inactive}</option>
                <option value="draft">{t.draft}</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {t.productStock}
              </label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                required
                min="0"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
          
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700">
              {t.productDescription}
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
        
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => router.push('/supplier/products')}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            {t.cancel}
          </button>
          <button
            type="submit"
            disabled={saving}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            {saving ? `${t.saving}...` : t.save}
          </button>
        </div>
      </form>
    </div>
  );
} 