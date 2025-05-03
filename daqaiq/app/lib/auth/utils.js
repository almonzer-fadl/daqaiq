import { AUTH_CONFIG } from './config';

export function getDomainType(host) {
  if (!host) return 'customer';
  
  if (host.startsWith('supplier.')) {
    return 'supplier';
  } else if (host.startsWith('admin.')) {
    return 'admin';
  }
  return 'customer';
}

export function getAuthConfig(domainType) {
  return AUTH_CONFIG[domainType] || AUTH_CONFIG.customer;
}

export function isPublicPath(pathname, domainType) {
  // Common public paths for all domains
  if (AUTH_CONFIG.publicPaths.common.some(path => 
    pathname === path || pathname.startsWith(`${path}/`)
  )) {
    return true;
  }

  // Customer-specific public paths
  if (domainType === 'customer' && AUTH_CONFIG.publicPaths.customer.some(path => 
    pathname === path || pathname.startsWith(`${path}/`)
  )) {
    return true;
  }

  return false;
}

export function validateEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

export function validatePassword(password) {
  return password && password.length >= 8;
}

export function getErrorMessage(error) {
  if (typeof error === 'string') return error;
  
  if (error?.message) return error.message;
  
  return 'An unexpected error occurred. Please try again.';
}

export function sanitizeUser(user) {
  if (!user) return null;
  
  // Only include safe user data
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    status: user.status,
  };
}

export function getRedirectPath(domainType, currentPath) {
  const config = getAuthConfig(domainType);
  
  // If current path is a valid path for the domain, use it
  if (currentPath && !currentPath.startsWith('/auth')) {
    return currentPath;
  }
  
  return config.defaultRedirect;
} 