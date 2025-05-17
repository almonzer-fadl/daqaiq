import { Inter } from "next/font/google"; // Using Inter as a fallback since Geist is not available in Google Fonts
import "./globals.css"; // Import global CSS styles
import ClientProviders from './components/ClientProviders';

const inter = Inter({
  subsets: ['latin', 'arabic'],
  variable: '--font-inter',
});

export const metadata = {
  title: {
    template: '%s | دقائق',
    default: 'دقائق - خدمات فحص السيارات',
  },
  description: 'خدمات فحص السيارات في المملكة العربية السعودية',
  keywords: 'دقائق - دقه في دقائق ,فحص سيارات, صيانة سيارات, دقائق',
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'ar_SA',
    url: 'https://daqaiq.com',
    siteName: 'دقائق',
  }
};

export default function RootLayout({ children }) { // Define the RootLayout functional component
  return (
    <html lang="ar" dir="rtl">
      <body className={`${inter.variable} font-sans antialiased`}>
        <ClientProviders>
          {children}
        </ClientProviders>
          <Toaster position="bottom-left" />
        </AuthProvider>
      </body>
    </html>
  );
}