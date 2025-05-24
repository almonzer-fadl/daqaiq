'use client';

import { usePathname } from 'next/navigation';
import HeaderTop from '@/components/navigation/HeaderTop';
import NavbarMain from '@/components/navigation/NavbarMain';
import NavLinks from '@/components/navigation/NavLinks';
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