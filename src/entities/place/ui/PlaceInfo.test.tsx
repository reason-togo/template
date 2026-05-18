import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PlaceInfo } from './PlaceInfo';

describe('PlaceInfo', () => {
  it('renders title and location', () => {
    render(<PlaceInfo title="군산 근대역사박물관" location="전북 군산시" />);
    expect(screen.getByText('군산 근대역사박물관')).toBeInTheDocument();
    expect(screen.getByText('전북 군산시')).toBeInTheDocument();
  });

  it('renders with long title', () => {
    render(
      <PlaceInfo
        title="경상북도 안동시 하회마을 전통가옥"
        location="경북 안동시"
      />
    );
    expect(screen.getByText('경상북도 안동시 하회마을 전통가옥')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <PlaceInfo title="공산성" location="충남 공주시" className="custom-class" />
    );
    const wrapper = container.firstChild;
    expect(wrapper).toHaveClass('custom-class');
  });

  it('renders MapPin icon', () => {
    const { container } = render(
      <PlaceInfo title="테스트" location="서울" />
    );
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('has correct title styles', () => {
    render(<PlaceInfo title="군산 근대역사박물관" location="전북 군산시" />);
    const title = screen.getByText('군산 근대역사박물관');
    expect(title).toHaveClass('text-xl', 'font-bold', 'text-secondary');
  });

  it('has correct location styles', () => {
    const { container } = render(
      <PlaceInfo title="테스트" location="전북 군산시" />
    );
    const locationDiv = container.querySelector('.flex.items-center');
    expect(locationDiv).toHaveClass('text-sm', 'text-muted-foreground');
  });
});
