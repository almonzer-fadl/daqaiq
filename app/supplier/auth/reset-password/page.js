'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

const translations = {
  en: {
    title: 'Reset Your Password',
    newPassword: 'New Password',
    confirmPassword: 'Confirm Password',
    passwordMismatch: 'Passwords do not match.',
    passwordTooShort: 'Password must be at least 8 characters long.',
    success: 'Password has been reset successfully. You can now login with your new password.',
    error: 'An error occurred while resetting your password.',
    invalidToken: 'Invalid or missing reset token.',
    invalidTokenTitle: 'Invalid Reset Link',
    invalidTokenMessage: 'This password reset link is invalid or has expired.',
    requestNewLink: 'Request a new password reset link',
    resetButton: 'Reset Password',
    resetting: 'Resetting...'
  },
  ar: {
    title: 'إعادة تعيين كلمة المرور',
    newPassword: 'كلمة المرور الجديدة',
    confirmPassword: 'تأكيد كلمة المرور',
    passwordMismatch: 'كلمات المرور غير متطابقة.',
    passwordTooShort: 'يجب أن تكون كلمة المرور 8 أحرف على الأقل.',
    success: 'تم إعادة تعيين كلمة المرور بنجاح. يمكنك الآن تسجيل الدخول باستخدام كلمة المرور الجديدة.',
    error: 'حدث خطأ أثناء إعادة تعيين كلمة المرور.',
    invalidToken: 'رمز إعادة التعيين غير صالح أو مفقود.',
    invalidTokenTitle: 'رابط إعادة التعيين غير صالح',
    invalidTokenMessage: 'رابط إعادة تعيين كلمة المرور هذا غير صالح أو منتهي الصلاحية.',
    requestNewLink: 'طلب رابط إعادة تعيين جديد',
    resetButton: 'إعادة تعيين كلمة المرور',
    resetting: 'جاري إعادة التعيين...'
  }
};

export default function ResetPassword() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  // Default to Arabic
  const t = translations.ar;

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [isTokenValid, setIsTokenValid] = useState(true);

  useEffect(() => {
    if (!token) {
      setIsTokenValid(false);
      setMessage({
        type: 'error',
        text: t.invalidToken
      });
    }
  }, [token, t]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ type: '', text: '' });

    if (password !== confirmPassword) {
      setMessage({
        type: 'error',
        text: t.passwordMismatch
      });
      setIsLoading(false);
      return;
    }

    if (password.length < 8) {
      setMessage({
        type: 'error',
        text: t.passwordTooShort
      });
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/supplier/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({
          type: 'success',
          text: t.success
        });
        // Redirect to login page after 3 seconds
        setTimeout(() => {
          router.push('/supplier/auth/login');
        }, 3000);
      } else {
        setMessage({
          type: 'error',
          text: data.message || t.error
        });
      }
    } catch (error) {
      setMessage({
        type: 'error',
        text: t.error
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isTokenValid) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              {t.invalidTokenTitle}
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              {t.invalidTokenMessage}
            </p>
            <div className="mt-4">
              <Link
                href="/supplier/auth/forgot-password"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                {t.requestNewLink}
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {t.title}
          </h2>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {message.text && (
            <div className={`rounded-md p-4 ${
              message.type === 'success' 
                ? 'bg-green-100 border border-green-400 text-green-700' 
                : 'bg-red-100 border border-red-400 text-red-700'
            }`}>
              {message.text}
            </div>
          )}

          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="password" className="sr-only">
                {t.newPassword}
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder={t.newPassword}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="sr-only">
                {t.confirmPassword}
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder={t.confirmPassword}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {t.resetting}
                </span>
              ) : (
                t.resetButton
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 