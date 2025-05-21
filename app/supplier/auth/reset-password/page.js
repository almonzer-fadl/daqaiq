'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function ResetPassword() {
  const { t } = useTranslation('common');
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

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
        text: t('supplier.resetPassword.invalidToken', 'Invalid or missing reset token.')
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
        text: t('supplier.resetPassword.passwordMismatch', 'Passwords do not match.')
      });
      setIsLoading(false);
      return;
    }

    if (password.length < 8) {
      setMessage({
        type: 'error',
        text: t('supplier.resetPassword.passwordTooShort', 'Password must be at least 8 characters long.')
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
          text: t('supplier.resetPassword.success', 'Password has been reset successfully. You can now login with your new password.')
        });
        // Redirect to login page after 3 seconds
        setTimeout(() => {
          router.push('/supplier/auth/login');
        }, 3000);
      } else {
        setMessage({
          type: 'error',
          text: data.message || t('supplier.resetPassword.error', 'An error occurred while resetting your password.')
        });
      }
    } catch (error) {
      setMessage({
        type: 'error',
        text: t('supplier.resetPassword.error', 'An error occurred while resetting your password.')
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
              {t('supplier.resetPassword.invalidTokenTitle', 'Invalid Reset Link')}
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              {t('supplier.resetPassword.invalidTokenMessage', 'This password reset link is invalid or has expired.')}
            </p>
            <div className="mt-4">
              <Link
                href="/supplier/auth/forgot-password"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                {t('supplier.resetPassword.requestNewLink', 'Request a new password reset link')}
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
            {t('supplier.resetPassword.title', 'Reset Your Password')}
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
                {t('common.newPassword', 'New Password')}
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder={t('common.newPassword', 'New Password')}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="sr-only">
                {t('common.confirmPassword', 'Confirm Password')}
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder={t('common.confirmPassword', 'Confirm Password')}
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
                  {t('supplier.resetPassword.resetting', 'Resetting...')}
                </span>
              ) : (
                t('supplier.resetPassword.resetButton', 'Reset Password')
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 