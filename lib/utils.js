// Email validation
export function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Phone validation (Saudi format)
export function validatePhone(phone) {
  const phoneRegex = /^((\+9665)|(05))[0-9]{8}$/;
  return phoneRegex.test(phone);
}

// Password validation
export function validatePassword(password) {
  return password.length >= 8;
}

// Send email utility (you can implement this later with your email service)
export async function sendEmail({ to, subject, html }) {
  // Implement your email sending logic here
  console.log('Sending email to:', to, 'Subject:', subject);
  return true;
} 