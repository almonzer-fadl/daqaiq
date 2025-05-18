'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SUPPLIER_TRANSLATIONS as t } from '../../../../../constants/translations';

export function useSupplierForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phoneNumber: '',
    businessName: '',
    businessType: '',
    taxId: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.password || !formData.businessName || !formData.businessType || !formData.taxId) {
      setError(t.requiredField);
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError(t.invalidEmail);
      return false;
    }

    if (formData.password.length < 6) {
      setError(t.passwordTooShort);
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/auth/register/supplier', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || t.registrationFailed);
      }

      setSuccess(true);
      setTimeout(() => {
        router.push('/auth/signin');
      }, 3000);
    } catch (err) {
      setError(err.message || t.registrationFailed);
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    loading,
    error,
    success,
    handleChange,
    handleSubmit,
  };
} 