import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CourseStep } from './CourseStep';

describe('CourseStep', () => {
  it('renders complete course step', () => {
    render(
      <CourseStep.Root>
        <CourseStep.Number number={1} />
        <CourseStep.Content>
          <CourseStep.Title>군산 근대역사박물관</CourseStep.Title>
          <CourseStep.Info duration="2시간" cost="무료" />
        </CourseStep.Content>
      </CourseStep.Root>
    );

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('군산 근대역사박물관')).toBeInTheDocument();
    expect(screen.getByText('2시간')).toBeInTheDocument();
    expect(screen.getByText('무료')).toBeInTheDocument();
  });

  it('renders number with gradient background', () => {
    const { container } = render(
      <CourseStep.Root>
        <CourseStep.Number number={2} />
      </CourseStep.Root>
    );

    const numberDiv = screen.getByText('2');
    expect(numberDiv).toHaveClass(
      'bg-gradient-to-br',
      'from-primary-300',
      'to-primary-400'
    );
  });

  it('renders title correctly', () => {
    render(
      <CourseStep.Root>
        <CourseStep.Content>
          <CourseStep.Title>경암동 철길마을</CourseStep.Title>
        </CourseStep.Content>
      </CourseStep.Root>
    );

    const title = screen.getByText('경암동 철길마을');
    expect(title).toHaveClass('font-semibold', 'text-secondary');
  });

  it('renders info with separator', () => {
    render(
      <CourseStep.Root>
        <CourseStep.Content>
          <CourseStep.Info duration="30분" cost="5천원" />
        </CourseStep.Content>
      </CourseStep.Root>
    );

    expect(screen.getByText('30분')).toBeInTheDocument();
    expect(screen.getByText('•')).toBeInTheDocument();
    expect(screen.getByText('5천원')).toBeInTheDocument();
  });

  it('applies custom className to Root', () => {
    const { container } = render(
      <CourseStep.Root className="custom-class">
        <CourseStep.Number number={1} />
      </CourseStep.Root>
    );

    const root = container.firstChild;
    expect(root).toHaveClass('custom-class');
  });

  it('renders multiple steps correctly', () => {
    render(
      <div>
        <CourseStep.Root>
          <CourseStep.Number number={1} />
          <CourseStep.Content>
            <CourseStep.Title>첫 번째</CourseStep.Title>
          </CourseStep.Content>
        </CourseStep.Root>
        <CourseStep.Root>
          <CourseStep.Number number={2} />
          <CourseStep.Content>
            <CourseStep.Title>두 번째</CourseStep.Title>
          </CourseStep.Content>
        </CourseStep.Root>
      </div>
    );

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('첫 번째')).toBeInTheDocument();
    expect(screen.getByText('두 번째')).toBeInTheDocument();
  });
});
