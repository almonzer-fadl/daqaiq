import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '../api/auth/[...nextauth]/route';
import Navigation from '../components/supplier/Navigation';
import { SUPPLIER_TRANSLATIONS as t } from '../constants/translations';
import { AUTH_URLS } from '../config/urls';

export const metadata = {
  title: 'منصة الموردين - دقائق',
  description: 'إدارة المنتجات والطلبات في منصة دقائق',
};

export default async function SupplierLayout({ children }) {
  const session = await getServerSession(authOptions);

  // Check if user is authenticated and is a supplier
  if (!session) {
    redirect(AUTH_URLS.supplierSignin);
  }

  if (session.user.role !== 'supplier') {
    redirect(AUTH_URLS.supplierSignin);
  }

  return (
    <div dir="rtl" lang="ar" className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          {children}
        </div>
      </main>
    </div>
  );
} 