export function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePassword(password) {
  return password.length >= 8 && /\d/.test(password);
}

export function validateRegistration(data) {
  const { name, email, password, companyName, companyRegistration } = data;

  if (!name || !email || !password) {
    return 'Name, email, and password are required';
  }

  if (!validateEmail(email)) {
    return 'Invalid email format';
  }

  if (!validatePassword(password)) {
    return 'Password must be at least 8 characters and contain at least one number';
  }

  if (data.role === 'supplier') {
    if (!companyName || !companyRegistration) {
      return 'Company name and registration number are required for suppliers';
    }
  }

  return null;
} 