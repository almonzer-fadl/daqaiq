const authConfig = {
  supplier: {
    baseUrl: process.env.NEXT_PUBLIC_SUPPLIER_URL || 'https://supplier.daqaiq.com',
    loginPath: '/auth/login',
    callbackUrl: '/supplier',
    authApiPath: '/api/supplier-auth'
  },
  admin: {
    baseUrl: process.env.NEXT_PUBLIC_ADMIN_URL || 'https://admin.daqaiq.com',
    loginPath: '/auth/login',
    callbackUrl: '/admin',
    authApiPath: '/api/admin-auth'
  },
  customer: {
    baseUrl: process.env.NEXT_PUBLIC_URL || 'https://daqaiq.com',
    loginPath: '/auth/login',
    callbackUrl: '/',
    authApiPath: '/api/auth'
  }
};

export default authConfig; 