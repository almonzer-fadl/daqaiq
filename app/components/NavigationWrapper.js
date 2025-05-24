'use client';

import { usePathname } from 'next/navigation';
import HeaderTop from '@/components/HeaderTop';
import NavbarMain from '@/components/NavbarMain';
import NavLinks from '@/components/NavLinks';
import FooterMain from '@/components/FooterMain';

export default function NavigationWrapper({ children }) {
  const pathname = usePathname();
  const isMaintenancePage = pathname === '/maintenance';
  
  // Check if we're on the supplier subdomain
  const isSupplierDomain = typeof window !== 'undefined' && window.location.host.startsWith('supplier.');

  // Don't show navigation for maintenance page or supplier subdomain
  if (isMaintenancePage || isSupplierDomain) {
    return <>{children}</>;
  }

  return (
    <>
      <HeaderTop />
      <NavbarMain />
      <NavLinks />
      <main>{children}</main>
      <FooterMain />
    </>
  );
} 