'use client';

export default function LoadingAuth() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
        <h2 className="mt-6 text-center text-xl font-medium text-gray-900">
          جاري التحميل...
        </h2>
      </div>
    </div>
  );
} 