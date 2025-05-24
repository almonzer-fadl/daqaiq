'use client';

import { usePathname } from 'next/navigation';
import HeaderTop from '@/components/HeaderTop';
import NavbarMain from '@/components/NavbarMain';
import NavLinks from '@/components/NavLinks';
import FooterMain from '@/components/FooterMain';

export default function NavigationWrapper({ children }) {
  const pathname = usePathname();
  const isMaintenancePage = pathname === '/maintenance';

  if (isMaintenancePage) {
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