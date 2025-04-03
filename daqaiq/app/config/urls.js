// Base URLs
export const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://daqaiq.com';
export const SUPPLIER_URL = process.env.NEXT_PUBLIC_SUPPLIER_URL || 'https://supplier.daqaiq.com';

// Auth URLs
export const AUTH_URLS = {
  signin: '/auth/signin',
  signup: '/auth/register',
  forgotPassword: '/auth/forgot-password',
  supplierSignin: '/auth/signin/supplier',
  supplierSignup: '/auth/register/supplier',
};

// Supplier URLs
export const SUPPLIER_ROUTES = {
  dashboard: '/',
  products: '/products',
  addProduct: '/products/add',
  editProduct: (id) => `/products/${id}/edit`,
  viewProduct: (id) => `/products/${id}`,
  orders: '/orders',
  viewOrder: (id) => `/orders/${id}`,
  inventory: '/inventory',
  analytics: '/analytics',
  profile: '/profile',
};

// Customer URLs
export const CUSTOMER_ROUTES = {
  home: '/',
  products: '/products',
  viewProduct: (slug) => `/products/${slug}`,
  category: '/category',
  viewCategory: (slug) => `/category/${slug}`,
  viewSubcategory: (categorySlug, subcategorySlug) => 
    `/category/${categorySlug}?subcategory=${subcategorySlug}`,
  cart: '/cart',
  wishlist: '/wishlist',
  about: '/about',
  contact: '/contact',
  faq: '/faq',
  location: '/location',
  help: '/help',
  prices: '/prices',
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