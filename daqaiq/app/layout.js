import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import AuthProvider from './components/providers/AuthProvider';
import ClientProviders from './components/providers/ClientProviders';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  title: 'Daqaiq - Your Trusted Auto Parts Marketplace',
  description: 'Find and buy quality auto parts from trusted suppliers',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ClientProviders>
            {children}
          </ClientProviders>
          <Toaster position="bottom-left" />
        </AuthProvider>
      </body>
    </html>
  );
}