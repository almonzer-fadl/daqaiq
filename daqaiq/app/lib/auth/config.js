export const AUTH_CONFIG = {
  supplier: {
    role: 'supplier',
    baseUrl: process.env.NEXT_PUBLIC_SUPPLIER_URL || 'https://supplier.daqaiq.com',
    authEndpoint: '/api/supplier-auth',
    defaultRedirect: '/supplier',
    loginPath: '/auth/login',
    errorPath: '/auth/error',
    sessionMaxAge: 24 * 60 * 60, // 24 hours
  },
  admin: {
    role: 'main-admin',
    baseUrl: process.env.NEXT_PUBLIC_ADMIN_URL || 'https://admin.daqaiq.com',
    authEndpoint: '/api/admin-auth',
    defaultRedirect: '/admin',
    loginPath: '/auth/login',
    errorPath: '/auth/error',
    sessionMaxAge: 24 * 60 * 60, // 24 hours
  },
  customer: {
    role: 'customer',
    baseUrl: process.env.NEXT_PUBLIC_URL || 'https://daqaiq.com',
    authEndpoint: '/api/customer-auth',
    defaultRedirect: '/',
    loginPath: '/auth/login',
    errorPath: '/auth/error',
    sessionMaxAge: 30 * 24 * 60 * 60, // 30 days
  },
  publicPaths: {
    common: [
      '/auth/login',
      '/auth/register',
      '/auth/forgot-password',
      '/auth/reset-password',
      '/auth/error',
    ],
    customer: [
      '/',
      '/about',
      '/contact',
      '/products',
      '/category',
      '/services',
      '/location',
      '/faq',
    ],
  },
}; 