import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { IconButton } from './IconButton';
import { Heart, Share2 } from 'lucide-react';

describe('IconButton', () => {
  it('renders button with icon', () => {
    render(<IconButton icon={Heart} aria-label="찜하기" />);
    const button = screen.getByRole('button', { name: '찜하기' });
    expect(button).toBeInTheDocument();
  });

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(<IconButton icon={Heart} onClick={handleClick} aria-label="찜하기" />);
    const button = screen.getByRole('button', { name: '찜하기' });

    await user.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies custom className', () => {
    render(<IconButton icon={Share2} className="custom-class" aria-label="공유하기" />);
    const button = screen.getByRole('button', { name: '공유하기' });
    expect(button).toHaveClass('custom-class');
  });

  it('has correct accessibility label', () => {
    render(<IconButton icon={Heart} aria-label="찜하기" />);
    expect(screen.getByLabelText('찜하기')).toBeInTheDocument();
  });

  it('applies hover styles', () => {
    render(<IconButton icon={Heart} aria-label="찜하기" />);
    const button = screen.getByRole('button', { name: '찜하기' });
    expect(button).toHaveClass('hover:bg-primary-200');
  });
});
