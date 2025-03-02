import { render, screen, fireEvent } from '@testing-library/react';
import LoginPage from '../loginPage';

describe('LoginPage', () => {
  it('handles form submission', () => {
    const mockOnClose = jest.fn();
    render(<LoginPage onClose={mockOnClose} />);

    // Get form elements
    const emailInput = screen.getByPlaceholderText('البريد الإلكتروني');
    const passwordInput = screen.getByPlaceholderText('كلمة المرور');
    const submitButton = screen.getByRole('button', { name: /تسجيل الدخول/i });

    // Simulate user input
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    // Submit form
    fireEvent.click(submitButton);

    // Add your assertions here
    expect(emailInput).toHaveValue('test@example.com');
    expect(passwordInput).toHaveValue('password123');
  });
});