import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Logo } from './Logo';

describe('Logo', () => {
  it('renders logo text', () => {
    render(<Logo />);
    expect(screen.getByText('떠날이유')).toBeInTheDocument();
  });

  it('applies small size class', () => {
    render(<Logo size="sm" />);
    const logo = screen.getByText('떠날이유');
    expect(logo).toHaveClass('text-2xl');
  });

  it('applies medium size class by default', () => {
    render(<Logo />);
    const logo = screen.getByText('떠날이유');
    expect(logo).toHaveClass('text-4xl');
  });

  it('applies large size class', () => {
    render(<Logo size="lg" />);
    const logo = screen.getByText('떠날이유');
    expect(logo).toHaveClass('text-6xl');
  });

  it('applies custom className', () => {
    render(<Logo className="custom-class" />);
    const logo = screen.getByText('떠날이유');
    expect(logo).toHaveClass('custom-class');
  });

  it('has gradient text styling', () => {
    render(<Logo />);
    const logo = screen.getByText('떠날이유');
    expect(logo).toHaveClass('bg-gradient-to-r', 'from-primary-300', 'to-primary-400');
  });
});
