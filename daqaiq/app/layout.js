"use client";
import { Geist, Geist_Mono } from "next/font/google"; // Import Geist and Geist_Mono fonts from Google Fonts
import "./globals.css"; // Import global CSS styles
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import Loading from './components/loading';  // lowercase 'loading'

const geistSans = Geist({ // Define the Geist Sans font
  variable: "--font-geist-sans", // Set the CSS variable for the font
  subsets: ["latin"], // Specify the subsets to include
});

const geistMono = Geist_Mono({ // Define the Geist Mono font
  variable: "--font-geist-mono", // Set the CSS variable for the font
  subsets: ["latin"], // Specify the subsets to include
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {!isMaintenancePage && isLoading && <Loading />}
        <div
          style={{
            opacity: isLoading && !isMaintenancePage ? 0 : 1,
            transition: 'opacity 0.5s ease-in-out'
          }}
        >
          {children}
        </div>
      </body>
    </html>
  );
}