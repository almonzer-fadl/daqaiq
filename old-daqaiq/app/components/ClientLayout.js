"use client";

import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import Loading from './Loading';

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  const isMaintenancePage = pathname === '/maintenance';

  useEffect(() => {
    if (!isMaintenancePage) {
      setIsLoading(true);
      const timeout = setTimeout(() => {
        setIsLoading(false);
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [pathname, isMaintenancePage]);

  return (
    <>
      {!isMaintenancePage && isLoading && <Loading />}
      <div
        style={{
          opacity: isLoading && !isMaintenancePage ? 0 : 1,
          transition: 'opacity 0.5s ease-in-out'
        }}
      >
        {children}
      </div>
    </>
  );
} 