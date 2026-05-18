import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { HighlightBox } from './HighlightBox';

describe('HighlightBox', () => {
  it('renders children content', () => {
    render(<HighlightBox>테스트 내용</HighlightBox>);
    expect(screen.getByText('테스트 내용')).toBeInTheDocument();
  });

  it('renders with JSX children', () => {
    render(
      <HighlightBox>
        <strong className="text-primary-400">지금 출발하면</strong> 석양을 볼 수 있어요.
      </HighlightBox>
    );
    expect(screen.getByText('지금 출발하면')).toBeInTheDocument();
    expect(screen.getByText(/석양을 볼 수 있어요/)).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <HighlightBox className="custom-class">내용</HighlightBox>
    );
    const box = container.firstChild;
    expect(box).toHaveClass('custom-class');
  });

  it('has gradient background and border', () => {
    const { container } = render(<HighlightBox>내용</HighlightBox>);
    const box = container.firstChild;
    expect(box).toHaveClass(
      'bg-gradient-to-br',
      'from-accent/40',
      'to-primary-200/30',
      'border-l-4',
      'border-primary-300'
    );
  });

  it('renders Clock icon', () => {
    const { container } = render(<HighlightBox>내용</HighlightBox>);
    // lucide-react 아이콘은 SVG로 렌더링됨
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('has correct layout styles', () => {
    const { container } = render(<HighlightBox>내용</HighlightBox>);
    const innerDiv = container.querySelector('.flex.items-start.gap-2');
    expect(innerDiv).toBeInTheDocument();
  });
});
