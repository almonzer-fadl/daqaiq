import { validateEmail, validatePassword } from './utils';

export function validateName(name) {
  return name && name.trim().length >= 2;
}

export function validatePhoneNumber(phone) {
  // Basic international phone number validation
  const phoneRegex = /^\+?[1-9]\d{1,14}$/;
  return phoneRegex.test(phone.replace(/[\s-]/g, ''));
}

export function validateRegistrationData(data, type = 'customer') {
  const errors = {};

  if (!validateName(data.name)) {
    errors.name = 'Name must be at least 2 characters long';
  }

  if (!validateEmail(data.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!validatePassword(data.password)) {
    errors.password = 'Password must be at least 8 characters long';
  }

  if (data.password !== data.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }

  if (type === 'supplier') {
    if (!data.companyName?.trim()) {
      errors.companyName = 'Company name is required';
    }
    if (!validatePhoneNumber(data.phone || '')) {
      errors.phone = 'Please enter a valid phone number';
    }
    if (!data.address?.trim()) {
      errors.address = 'Address is required';
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

export const REGISTRATION_FIELDS = {
  customer: [
    { name: 'name', label: 'Full Name', type: 'text', required: true },
    { name: 'email', label: 'Email Address', type: 'email', required: true },
    { name: 'password', label: 'Password', type: 'password', required: true },
    { name: 'confirmPassword', label: 'Confirm Password', type: 'password', required: true },
  ],
  supplier: [
    { name: 'name', label: 'Full Name', type: 'text', required: true },
    { name: 'email', label: 'Email Address', type: 'email', required: true },
    { name: 'password', label: 'Password', type: 'password', required: true },
    { name: 'confirmPassword', label: 'Confirm Password', type: 'password', required: true },
    { name: 'companyName', label: 'Company Name', type: 'text', required: true },
    { name: 'phone', label: 'Phone Number', type: 'tel', required: true },
    { name: 'address', label: 'Business Address', type: 'textarea', required: true },
    { name: 'taxNumber', label: 'Tax Registration Number', type: 'text', required: false },
    { name: 'website', label: 'Company Website', type: 'url', required: false },
  ],
  admin: [
    { name: 'name', label: 'Full Name', type: 'text', required: true },
    { name: 'email', label: 'Email Address', type: 'email', required: true },
    { name: 'password', label: 'Password', type: 'password', required: true },
    { name: 'confirmPassword', label: 'Confirm Password', type: 'password', required: true },
    { name: 'adminCode', label: 'Admin Registration Code', type: 'text', required: true },
  ]
}; 