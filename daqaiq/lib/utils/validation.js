export function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePassword(password) {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{8,}$/;
  return passwordRegex.test(password);
}

export function validatePhone(phone) {
  // Basic phone number validation for Saudi Arabia
  const phoneRegex = /^((\+966)|0)?5\d{8}$/;
  return phoneRegex.test(phone);
}

export function validateName(name) {
  return name && name.length >= 2 && name.length <= 50;
}

export function validateURL(url) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
} 