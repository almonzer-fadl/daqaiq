'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <h1 className="text-9xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-base-content mb-4">Page Not Found</h2>
        <p className="text-base-content/70 mb-8">
          The page you are looking for might have been removed, had its name changed,
          or is temporarily unavailable.
        </p>
        <Link 
          href="/" 
          className="btn btn-primary"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
} 