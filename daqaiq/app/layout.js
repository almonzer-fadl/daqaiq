"use client";
import { Inter } from "next/font/google"; // Using Inter as a fallback since Geist is not available in Google Fonts
import "./globals.css"; // Import global CSS styles
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import Loading from './components/Loading';
import { SessionProvider } from 'next-auth/react';
import { Toaster } from 'react-hot-toast';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export default function RootLayout({ children }) { // Define the RootLayout functional component
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  const isMaintenancePage = pathname === '/maintenance';

  useEffect(() => {
    if (!isMaintenancePage) {
      setIsLoading(true);
      const timeout = setTimeout(() => {
        setIsLoading(false);
      }, 1000); // Adjust loading time as needed

      return () => clearTimeout(timeout);
    }
  }, [pathname, isMaintenancePage]);

  return (
    <html lang="ar">
      <body className={`${inter.variable} antialiased`}>
        <SessionProvider>
          {!isMaintenancePage && isLoading && <Loading />}
          <div
            style={{
              opacity: isLoading && !isMaintenancePage ? 0 : 1,
              transition: 'opacity 0.5s ease-in-out'
            }}
          >
            {children}
          </div>
          <Toaster position="bottom-left" />
        </SessionProvider>
      </body>
    </html>
  );
}