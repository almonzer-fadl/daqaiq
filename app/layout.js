import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import AuthProvider from '@/components/AuthProvider';
import ClientProviders from '@/components/providers/ClientProviders';
import HeaderTop from '@/components/navigation/HeaderTop';
import NavbarMain from '@/components/navigation/NavbarMain';
import NavLinks from '@/components/navigation/NavLinks';
import FooterMain from '@/components/FooterMain';
import NavigationWrapper from '@/components/NavigationWrapper';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  title: 'دقائق - قطع غيار السيارات',
  description: 'متجر دقائق لقطع غيار السيارات - جودة عالية وأسعار منافسة',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body className={inter.className}>
        <AuthProvider>
          <ClientProviders>
            <NavigationWrapper>
              {children}
            </NavigationWrapper>
          </ClientProviders>
          <Toaster position="bottom-left" />
        </AuthProvider>
      </body>
    </html>
  );
}