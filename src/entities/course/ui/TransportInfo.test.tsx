import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TransportInfo } from './TransportInfo';

describe('TransportInfo', () => {
  it('renders walk transport', () => {
    render(<TransportInfo type="walk" duration="5분" />);
    expect(screen.getByText('도보')).toBeInTheDocument();
    expect(screen.getByText('5분')).toBeInTheDocument();
  });

  it('renders car transport', () => {
    render(<TransportInfo type="car" duration="15분" />);
    expect(screen.getByText('차량')).toBeInTheDocument();
    expect(screen.getByText('15분')).toBeInTheDocument();
  });

  it('renders ArrowDown icon', () => {
    const { container } = render(<TransportInfo type="walk" duration="5분" />);
    const svgs = container.querySelectorAll('svg');
    expect(svgs.length).toBeGreaterThan(0);
  });

  it('renders Footprints icon for walk', () => {
    const { container } = render(<TransportInfo type="walk" duration="5분" />);
    // Footprints 아이콘이 렌더링되는지 확인 (SVG로 렌더링됨)
    const svgs = container.querySelectorAll('svg');
    expect(svgs.length).toBe(2); // ArrowDown + Footprints
  });

  it('renders Car icon for car', () => {
    const { container } = render(<TransportInfo type="car" duration="10분" />);
    // Car 아이콘이 렌더링되는지 확인 (SVG로 렌더링됨)
    const svgs = container.querySelectorAll('svg');
    expect(svgs.length).toBe(2); // ArrowDown + Car
  });

  it('applies custom className', () => {
    const { container } = render(
      <TransportInfo type="walk" duration="5분" className="custom-class" />
    );
    const wrapper = container.firstChild;
    expect(wrapper).toHaveClass('custom-class');
  });

  it('has correct text styles', () => {
    const { container } = render(<TransportInfo type="walk" duration="5분" />);
    const textDiv = container.querySelector('.text-sm.text-muted-foreground');
    expect(textDiv).toBeInTheDocument();
  });

  it('renders separator between type and duration', () => {
    render(<TransportInfo type="walk" duration="5분" />);
    expect(screen.getByText('•')).toBeInTheDocument();
  });
});
