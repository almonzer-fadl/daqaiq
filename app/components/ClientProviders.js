"use client";

import { SessionProvider } from 'next-auth/react';
import { Toaster } from 'react-hot-toast';

export default function ClientProviders({ children }) {
  return (
    <SessionProvider>
      {children}
      <Toaster position="bottom-left" />
    </SessionProvider>
  );
} 