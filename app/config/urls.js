// Base URLs
export const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://daqaiq.com';
export const SUPPLIER_URL = process.env.NEXT_PUBLIC_SUPPLIER_URL || 'https://supplier.daqaiq.com';

// Auth URLs
export const AUTH_URLS = {
  // Customer auth
  signin: '/customer/auth/signin',
  signup: '/customer/auth/signup',
  forgotPassword: '/customer/auth/forgot-password',
  
  // Supplier auth
  supplierSignin: '/supplier/auth/signin',
  supplierSignup: '/supplier/auth/signup',
  supplierForgotPassword: '/supplier/auth/forgot-password',
};

// Supplier routes
export const SUPPLIER_ROUTES = {
  home: '/supplier',
  dashboard: '/supplier/dashboard',
  products: '/supplier/products',
  orders: '/supplier/orders',
  settings: '/supplier/settings',
};

// Customer routes
export const CUSTOMER_ROUTES = {
  home: '/',
  profile: '/customer/profile',
  orders: '/customer/orders',
  wishlist: '/customer/wishlist',
  settings: '/customer/settings',
};

// API URLs
export const API_ROUTES = {
  auth: {
    login: '/api/auth/signin',
    register: '/api/auth/register',
    forgotPassword: '/api/auth/forgot-password',
    resetPassword: '/api/auth/reset-password',
  },
  supplier: {
    products: '/api/supplier/products',
    orders: '/api/supplier/orders',
    inventory: '/api/supplier/inventory',
    analytics: '/api/supplier/analytics',
  },
};

// Email
export const CONTACT_EMAIL = 'info@daqaiq.com'; 