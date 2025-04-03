import { render, screen } from '@testing-library/react';
import Header from '../../../Old Files/Header';

describe('Header', () => {
  it('renders logo', () => {
    render(<Header />);
    const logo = screen.getByAltText('دقائق');
    expect(logo).toBeInTheDocument();
  });
});