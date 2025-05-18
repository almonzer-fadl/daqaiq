export function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePassword(password) {
  return password.length >= 6;
}

export function validateName(name) {
  return name.length >= 2 && name.length <= 50;
}

export function validateBusinessFields(businessName, businessType, taxId) {
  return (
    businessName?.length >= 2 &&
    businessType?.length >= 2 &&
    taxId?.length >= 5
  );
}

export function validatePhoneNumber(phoneNumber) {
  const phoneRegex = /^\+?[1-9]\d{1,14}$/;
  return phoneRegex.test(phoneNumber);
} 