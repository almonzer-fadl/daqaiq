'use client';

export default function Error({ error, reset }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          عذراً، حدث خطأ ما
        </h2>
        <p className="text-gray-600 mb-8">
          {error.message || 'حدث خطأ غير متوقع. الرجاء المحاولة مرة أخرى.'}
        </p>
        <button
          onClick={reset}
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          حاول مرة أخرى
        </button>
      </div>
    </div>
  );
} 