'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { toast } from 'react-hot-toast';
import Image from 'next/image';
import { SUPPLIER_TRANSLATIONS as t } from '../../constants/translations';

export default function SupplierProfile() {
  const { data: session, update: updateSession } = useSession();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    country: '',
    postalCode: '',
    taxId: '',
    businessType: '',
    description: '',
    website: '',
    socialMedia: {
      facebook: '',
      twitter: '',
      instagram: '',
      linkedin: ''
    },
    bankInfo: {
      accountName: '',
      accountNumber: '',
      bankName: '',
      swiftCode: ''
    }
  });

  useEffect(() => {
    if (session?.user) {
      fetchProfile();
    }
  }, [session]);

  const fetchProfile = async () => {
    try {
      const response = await fetch('/api/supplier/profile');
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'فشل في جلب الملف الشخصي');
      }

      const profile = {
        companyName: '',
        contactName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        country: '',
        postalCode: '',
        taxId: '',
        businessType: '',
        description: '',
        website: '',
        socialMedia: {
          facebook: '',
          twitter: '',
          instagram: '',
          linkedin: ''
        },
        bankInfo: {
          accountName: '',
          accountNumber: '',
          bankName: '',
          swiftCode: ''
        },
        ...data.profile,
        socialMedia: {
          facebook: '',
          twitter: '',
          instagram: '',
          linkedin: '',
          ...(data.profile?.socialMedia || {})
        },
        bankInfo: {
          accountName: '',
          accountNumber: '',
          bankName: '',
          swiftCode: '',
          ...(data.profile?.bankInfo || {})
        }
      };

      setFormData(profile);
      if (data.profile?.image) {
        setImagePreview(data.profile.image);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Clean up previous preview URL if it exists
      if (imagePreview && imagePreview.startsWith('blob:')) {
        URL.revokeObjectURL(imagePreview);
      }
      
      setProfileImage(file);
      const preview = URL.createObjectURL(file);
      setImagePreview(preview);
    }
  };

  // Clean up URL objects when component unmounts or when preview changes
  useEffect(() => {
    return () => {
      if (imagePreview && imagePreview.startsWith('blob:')) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const formDataToSend = new FormData();
      
      // Add all form fields except objects
      Object.keys(formData).forEach(key => {
        if (typeof formData[key] === 'object') {
          formDataToSend.append(key, JSON.stringify(formData[key]));
        } else if (formData[key] !== undefined && formData[key] !== null) {
          formDataToSend.append(key, formData[key]);
        }
      });

      // Add profile image if changed
      if (profileImage) {
        formDataToSend.append('image', profileImage);
      }

      const response = await fetch('/api/supplier/profile', {
        method: 'PUT',
        body: formDataToSend,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || t.profileUpdateFailed);
      }

      // Update image preview with the new image from server
      if (data.profile.image) {
        // Clean up previous blob URL if it exists
        if (imagePreview && imagePreview.startsWith('blob:')) {
          URL.revokeObjectURL(imagePreview);
        }
        setImagePreview(data.profile.image);
      }

      // Reset the file input
      setProfileImage(null);

      // Update the user session to reflect changes
      await updateSession({
        ...session,
        user: {
          ...session.user,
          name: formData.contactName || formData.companyName || session.user.name,
          image: data.profile.image || session.user.image
        }
      });

      toast.success(t.profileUpdated);
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error(error.message || t.profileUpdateFailed);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div dir="rtl" className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">{t.profileSettings}</h1>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Profile Image */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">{t.profileImage}</h2>
          <div className="flex items-center space-x-6">
            <div className="relative h-24 w-24">
              {imagePreview ? (
                <Image
                  src={imagePreview}
                  alt={t.profileImage}
                  fill
                  className="rounded-full object-cover"
                />
              ) : (
                <div className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center">
                  <svg className="h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              )}
            </div>
            <label className="block">
              <span className="sr-only">{t.chooseProfileImage}</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
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

        {/* Company Information */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">معلومات الشركة</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">اسم الشركة</label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">اسم جهة الاتصال</label>
              <input
                type="text"
                name="contactName"
                value={formData.contactName}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">البريد الإلكتروني</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">رقم الهاتف</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Address */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">العنوان</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">عنوان الشارع</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">المدينة</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">المنطقة/المحافظة</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">الرمز البريدي</label>
              <input
                type="text"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">الدولة</label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Business Information */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">معلومات العمل</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">الرقم الضريبي</label>
              <input
                type="text"
                name="taxId"
                value={formData.taxId}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">نوع العمل</label>
              <select
                name="businessType"
                value={formData.businessType}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">اختر النوع</option>
                <option value="corporation">شركة مساهمة</option>
                <option value="llc">شركة ذات مسؤولية محدودة</option>
                <option value="partnership">شراكة</option>
                <option value="soleProprietorship">مؤسسة فردية</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">وصف العمل</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Online Presence */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">التواجد الإلكتروني</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">الموقع الإلكتروني</label>
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">فيسبوك</label>
              <input
                type="url"
                name="socialMedia.facebook"
                value={formData.socialMedia.facebook}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                dir="ltr"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">تويتر</label>
              <input
                type="url"
                name="socialMedia.twitter"
                value={formData.socialMedia.twitter}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                dir="ltr"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">لينكد إن</label>
              <input
                type="url"
                name="socialMedia.linkedin"
                value={formData.socialMedia.linkedin}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                dir="ltr"
              />
            </div>
          </div>
        </div>

        {/* Bank Information */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">المعلومات البنكية</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">اسم الحساب</label>
              <input
                type="text"
                name="bankInfo.accountName"
                value={formData.bankInfo.accountName}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">رقم الحساب</label>
              <input
                type="text"
                name="bankInfo.accountNumber"
                value={formData.bankInfo.accountNumber}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                dir="ltr"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">اسم البنك</label>
              <input
                type="text"
                name="bankInfo.bankName"
                value={formData.bankInfo.bankName}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">رمز SWIFT/BIC</label>
              <input
                type="text"
                name="bankInfo.swiftCode"
                value={formData.bankInfo.swiftCode}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                dir="ltr"
              />
            </div>
          </div>
        </div>

        {/* Form Buttons */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onClick={() => window.history.back()}
          >
            {t.cancel}
          </button>
          <button
            type="submit"
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            disabled={saving}
          >
            {saving ? `${t.saving}...` : t.save}
          </button>
        </div>
      </form>
    </div>
  );
} 