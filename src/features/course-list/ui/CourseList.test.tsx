import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CourseList } from './CourseList';

describe('CourseList', () => {
  it('renders complete course list', () => {
    render(
      <CourseList.Root>
        <CourseList.Item
          number={1}
          title="군산 근대역사박물관"
          duration="2시간"
          cost="무료"
        />
        <CourseList.Transport type="walk" duration="5분" />
        <CourseList.Item
          number={2}
          title="경암동 철길마을"
          duration="30분"
          cost="5천원"
        />
      </CourseList.Root>
    );

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('군산 근대역사박물관')).toBeInTheDocument();
    expect(screen.getByText('2시간')).toBeInTheDocument();
    expect(screen.getByText('무료')).toBeInTheDocument();

    expect(screen.getByText('도보')).toBeInTheDocument();
    expect(screen.getByText('5분')).toBeInTheDocument();

    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('경암동 철길마을')).toBeInTheDocument();
    expect(screen.getByText('30분')).toBeInTheDocument();
    expect(screen.getByText('5천원')).toBeInTheDocument();
  });

  it('renders Root with custom className', () => {
    const { container } = render(
      <CourseList.Root className="custom-class">
        <div>Content</div>
      </CourseList.Root>
    );

    const root = container.firstChild;
    expect(root).toHaveClass('custom-class', 'space-y-2');
  });

  it('renders Item with all props', () => {
    render(
      <CourseList.Item
        number={3}
        title="선유도"
        duration="1시간"
        cost="5,000원"
      />
    );

    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('선유도')).toBeInTheDocument();
    expect(screen.getByText('1시간')).toBeInTheDocument();
    expect(screen.getByText('5,000원')).toBeInTheDocument();
  });

  it('renders Item with custom className', () => {
    const { container } = render(
      <CourseList.Item
        number={1}
        title="테스트"
        duration="1시간"
        cost="무료"
        className="custom-item"
      />
    );

    const item = container.firstChild;
    expect(item).toHaveClass('custom-item');
  });

  it('renders Transport with walk type', () => {
    render(<CourseList.Transport type="walk" duration="10분" />);
    expect(screen.getByText('도보')).toBeInTheDocument();
    expect(screen.getByText('10분')).toBeInTheDocument();
  });

  it('renders Transport with car type', () => {
    render(<CourseList.Transport type="car" duration="20분" />);
    expect(screen.getByText('차량')).toBeInTheDocument();
    expect(screen.getByText('20분')).toBeInTheDocument();
  });

  it('renders Transport with custom className', () => {
    const { container } = render(
      <CourseList.Transport type="walk" duration="5분" className="custom-transport" />
    );

    const transport = container.firstChild;
    expect(transport).toHaveClass('custom-transport');
  });

  it('renders multiple items with separators', () => {
    render(
      <CourseList.Root>
        <CourseList.Item number={1} title="첫 번째" duration="1시간" cost="무료" />
        <CourseList.Transport type="walk" duration="5분" />
        <CourseList.Item number={2} title="두 번째" duration="2시간" cost="무료" />
        <CourseList.Transport type="car" duration="15분" />
        <CourseList.Item number={3} title="세 번째" duration="30분" cost="무료" />
      </CourseList.Root>
    );

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('첫 번째')).toBeInTheDocument();

    expect(screen.getByText('도보')).toBeInTheDocument();
    expect(screen.getByText('5분')).toBeInTheDocument();

    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('두 번째')).toBeInTheDocument();

    expect(screen.getByText('차량')).toBeInTheDocument();
    expect(screen.getByText('15분')).toBeInTheDocument();

    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('세 번째')).toBeInTheDocument();
  });

  it('renders item with gradient number badge', () => {
    render(
      <CourseList.Item number={1} title="테스트" duration="1시간" cost="무료" />
    );

    const number = screen.getByText('1');
    expect(number).toHaveClass('bg-gradient-to-br', 'from-primary-300', 'to-primary-400');
  });

  it('renders separator between duration and cost', () => {
    render(
      <CourseList.Item number={1} title="테스트" duration="1시간" cost="무료" />
    );

    expect(screen.getByText('•')).toBeInTheDocument();
  });

  it('renders transport icons', () => {
    const { container } = render(
      <CourseList.Root>
        <CourseList.Transport type="walk" duration="5분" />
        <CourseList.Transport type="car" duration="10분" />
      </CourseList.Root>
    );

    const svgs = container.querySelectorAll('svg');
    // Each transport has 2 icons: ArrowDown + (Footprints or Car)
    expect(svgs.length).toBeGreaterThanOrEqual(4);
  });
});
