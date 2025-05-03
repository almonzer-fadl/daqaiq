"use client";
import { Inter } from "next/font/google"; // Using Inter as a fallback since Geist is not available in Google Fonts
import "./globals.css"; // Import global CSS styles
import { SessionProvider } from 'next-auth/react';
import { Toaster } from 'react-hot-toast';
import ClientLayout from './components/ClientLayout';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export default function RootLayout({ children }) { // Define the RootLayout functional component
  return (
    <html lang="ar">
      <body className={`${inter.variable} antialiased`}>
        <SessionProvider>
          <ClientLayout>
            {children}
          </ClientLayout>
          <Toaster position="bottom-left" />
        </SessionProvider>
      </body>
    </html>
  );
}