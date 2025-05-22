'use client';

import { useState } from 'react';
import Link from 'next/link';

const translations = {
  en: {
    title: 'Reset Your Password',
    description: 'Enter your email address and we will send you instructions to reset your password.',
    email: 'Email address',
    sendInstructions: 'Send Reset Instructions',
    sending: 'Sending...',
    success: 'Password reset instructions have been sent to your email.',
    error: 'An error occurred. Please try again.',
    backToLogin: 'Back to login'
  },
  ar: {
    title: 'نسيت كلمة المرور؟',
    description: 'أدخل عنوان بريدك الإلكتروني وسنرسل لك رابطاً لإعادة تعيين كلمة المرور.',
    email: 'البريد الإلكتروني',
    sendLink: 'إرسال رابط إعادة التعيين',
    sending: 'جاري الإرسال...',
    success: 'تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني.',
    error: 'حدث خطأ. يرجى التحقق من البريد الإلكتروني والمحاولة مرة أخرى.',
    backToLogin: 'العودة إلى تسجيل الدخول',
    emailPlaceholder: 'أدخل بريدك الإلكتروني'
  }
};

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });
  const t = translations.ar;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await fetch('/api/supplier/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({
          type: 'success',
          message: t.success
        });
        setEmail('');
      } else {
        setStatus({
          type: 'error',
          message: data.message || t.error
        });
      }
    } catch (error) {
      setStatus({
        type: 'error',
        message: t.error
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
            {t.title}
          </h2>
          <p className="text-sm text-gray-600">
            {t.description}
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {status.message && (
            <div
              className={`p-4 rounded-lg ${
                status.type === 'success'
                  ? 'bg-green-50 text-green-800 border border-green-200'
                  : 'bg-red-50 text-red-800 border border-red-200'
              }`}
            >
              {status.message}
            </div>
          )}

          <div className="rounded-md shadow-sm">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              {t.email}
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder={t.emailPlaceholder}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />
          </div>

          <div className="flex flex-col space-y-4">
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                isLoading ? 'opacity-75 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {t.sending}
                </span>
              ) : (
                t.sendLink
              )}
            </button>

            <Link
              href="/supplier/auth/signin"
              className="text-center text-sm text-blue-600 hover:text-blue-500 font-medium"
            >
              {t.backToLogin}
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
} 