import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PlaceCard } from './PlaceCard';

describe('PlaceCard', () => {
  it('renders complete place card', () => {
    render(
      <PlaceCard.Root>
        <PlaceCard.Image src="/museum.jpg" alt="군산 근대역사박물관 사진" />
        <PlaceCard.Content>
          <PlaceCard.Header title="군산 근대역사박물관" location="전북 군산시" />
          <PlaceCard.Highlight>
            <strong className="text-primary-400">지금 출발하면</strong> 석양을 볼 수 있어요.
          </PlaceCard.Highlight>
          <PlaceCard.Stats time="2시간" cost="무료" />
        </PlaceCard.Content>
      </PlaceCard.Root>
    );

    expect(screen.getByText('군산 근대역사박물관')).toBeInTheDocument();
    expect(screen.getByText('전북 군산시')).toBeInTheDocument();
    expect(screen.getByText('지금 출발하면')).toBeInTheDocument();
    expect(screen.getByText('예상 시간')).toBeInTheDocument();
    expect(screen.getByText('2시간')).toBeInTheDocument();
    expect(screen.getByText('예상 비용')).toBeInTheDocument();
    expect(screen.getByText('무료')).toBeInTheDocument();
  });

  it('renders Root with custom className', () => {
    const { container } = render(
      <PlaceCard.Root className="custom-class">
        <div>Content</div>
      </PlaceCard.Root>
    );

    const card = container.firstChild;
    expect(card).toHaveClass('custom-class');
  });

  it('renders Image with src', () => {
    render(<PlaceCard.Image src="/test.jpg" alt="테스트 이미지" />);
    const img = screen.getByRole('img', { name: '테스트 이미지' });
    expect(img).toBeInTheDocument();
  });

  it('renders Image without src (gradient placeholder)', () => {
    render(<PlaceCard.Image alt="플레이스홀더" />);
    expect(screen.getByText('플레이스홀더')).toBeInTheDocument();
  });

  it('renders Header correctly', () => {
    render(<PlaceCard.Header title="경암동 철길마을" location="강릉시" />);
    expect(screen.getByText('경암동 철길마을')).toBeInTheDocument();
    expect(screen.getByText('강릉시')).toBeInTheDocument();
  });

  it('renders Content with children', () => {
    render(
      <PlaceCard.Content>
        <div>Test Content</div>
      </PlaceCard.Content>
    );
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('renders Highlight with children', () => {
    render(
      <PlaceCard.Highlight>
        <strong>하이라이트</strong> 메시지
      </PlaceCard.Highlight>
    );
    expect(screen.getByText('하이라이트')).toBeInTheDocument();
    expect(screen.getByText(/메시지/)).toBeInTheDocument();
  });

  it('renders Stats with time and cost', () => {
    render(<PlaceCard.Stats time="3시간" cost="10,000원" />);
    expect(screen.getByText('예상 시간')).toBeInTheDocument();
    expect(screen.getByText('3시간')).toBeInTheDocument();
    expect(screen.getByText('예상 비용')).toBeInTheDocument();
    expect(screen.getByText('10,000원')).toBeInTheDocument();
  });

  it('applies custom className to Stats', () => {
    const { container } = render(
      <PlaceCard.Stats time="1시간" cost="무료" className="custom-stats" />
    );
    const statsDiv = container.firstChild;
    expect(statsDiv).toHaveClass('custom-stats');
  });

  it('renders multiple place cards', () => {
    render(
      <div>
        <PlaceCard.Root>
          <PlaceCard.Content>
            <PlaceCard.Header title="첫 번째 장소" location="서울" />
          </PlaceCard.Content>
        </PlaceCard.Root>
        <PlaceCard.Root>
          <PlaceCard.Content>
            <PlaceCard.Header title="두 번째 장소" location="부산" />
          </PlaceCard.Content>
        </PlaceCard.Root>
      </div>
    );

    expect(screen.getByText('첫 번째 장소')).toBeInTheDocument();
    expect(screen.getByText('두 번째 장소')).toBeInTheDocument();
  });

  it('renders Clock icon in Highlight', () => {
    const { container } = render(
      <PlaceCard.Highlight>메시지</PlaceCard.Highlight>
    );
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('has correct card overflow style', () => {
    const { container } = render(
      <PlaceCard.Root>
        <div>Content</div>
      </PlaceCard.Root>
    );
    const card = container.firstChild;
    expect(card).toHaveClass('overflow-hidden');
  });
});
