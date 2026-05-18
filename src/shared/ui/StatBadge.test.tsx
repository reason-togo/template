import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { StatBadge } from './StatBadge';

describe('StatBadge', () => {
  it('renders label and value', () => {
    render(<StatBadge label="예상 시간" value="4시간" />);
    expect(screen.getByText('예상 시간')).toBeInTheDocument();
    expect(screen.getByText('4시간')).toBeInTheDocument();
  });

  it('renders cost badge', () => {
    render(<StatBadge label="예상 비용" value="2만원" />);
    expect(screen.getByText('예상 비용')).toBeInTheDocument();
    expect(screen.getByText('2만원')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <StatBadge label="거리" value="120km" className="custom-class" />
    );
    const badge = container.firstChild;
    expect(badge).toHaveClass('custom-class');
  });

  it('has gradient background', () => {
    const { container } = render(<StatBadge label="예상 시간" value="4시간" />);
    const badge = container.firstChild;
    expect(badge).toHaveClass('bg-gradient-to-br', 'from-background', 'to-accent/30');
  });

  it('has correct text styles', () => {
    render(<StatBadge label="예상 시간" value="4시간" />);
    const label = screen.getByText('예상 시간');
    const value = screen.getByText('4시간');

    expect(label).toHaveClass('text-xs', 'text-muted-foreground');
    expect(value).toHaveClass('text-sm', 'font-semibold', 'text-secondary');
  });
});
