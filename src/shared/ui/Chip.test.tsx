import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Chip } from './Chip';

describe('Chip', () => {
  it('renders chip with label', () => {
    render(<Chip label="혼자" selected={false} />);
    expect(screen.getByText('혼자')).toBeInTheDocument();
  });

  it('renders chip with icon and label', () => {
    render(<Chip label="혼자" icon="👤" selected={false} />);
    expect(screen.getByText('👤')).toBeInTheDocument();
    expect(screen.getByText('혼자')).toBeInTheDocument();
  });

  it('applies selected styles when selected', () => {
    render(<Chip label="혼자" icon="👤" selected={true} />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-gradient-to-r', 'from-primary-300', 'to-primary-400');
  });

  it('applies unselected styles when not selected', () => {
    render(<Chip label="혼자" icon="👤" selected={false} />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('border', 'border-primary-200');
  });

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(<Chip label="혼자" selected={false} onClick={handleClick} />);
    const button = screen.getByRole('button');

    await user.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('has focus styles', () => {
    render(<Chip label="혼자" selected={false} />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('focus:outline-none', 'focus:ring-2', 'focus:ring-primary-300');
  });
});
