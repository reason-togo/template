import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PlaceImage } from './PlaceImage';

describe('PlaceImage', () => {
  it('renders gradient placeholder when no src provided', () => {
    const { container } = render(<PlaceImage alt="군산 근대역사박물관" />);
    expect(screen.getByText('군산 근대역사박물관')).toBeInTheDocument();
    const placeholderDiv = container.querySelector('.bg-gradient-to-br');
    expect(placeholderDiv).toBeInTheDocument();
  });

  it('renders image when src is provided', () => {
    render(<PlaceImage src="/test-image.jpg" alt="강릉 커피거리" />);
    const img = screen.getByRole('img', { name: '강릉 커피거리' });
    expect(img).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <PlaceImage alt="테스트" className="custom-class" />
    );
    const wrapper = container.firstChild;
    expect(wrapper).toHaveClass('custom-class');
  });

  it('has correct default dimensions', () => {
    const { container } = render(<PlaceImage alt="테스트" />);
    const wrapper = container.firstChild;
    expect(wrapper).toHaveClass('w-full', 'h-56', 'rounded-t-2xl');
  });

  it('shows alt text in placeholder', () => {
    render(<PlaceImage alt="경상북도 안동시 하회마을" />);
    expect(screen.getByText('경상북도 안동시 하회마을')).toBeInTheDocument();
  });
});
