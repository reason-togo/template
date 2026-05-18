import type { Meta, StoryObj } from '@storybook/react';
import { CourseStep } from './CourseStep';

const meta = {
  title: 'Entities/Course/CourseStep',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="w-[390px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const FirstStep: Story = {
  render: () => (
    <CourseStep.Root>
      <CourseStep.Number number={1} />
      <CourseStep.Content>
        <CourseStep.Title>군산 근대역사박물관</CourseStep.Title>
        <CourseStep.Info duration="2시간" cost="무료" />
      </CourseStep.Content>
    </CourseStep.Root>
  ),
};

export const MiddleStep: Story = {
  render: () => (
    <CourseStep.Root>
      <CourseStep.Number number={2} />
      <CourseStep.Content>
        <CourseStep.Title>경암동 철길마을</CourseStep.Title>
        <CourseStep.Info duration="30분" cost="무료" />
      </CourseStep.Content>
    </CourseStep.Root>
  ),
};

export const WithCost: Story = {
  render: () => (
    <CourseStep.Root>
      <CourseStep.Number number={3} />
      <CourseStep.Content>
        <CourseStep.Title>이성당 빵집</CourseStep.Title>
        <CourseStep.Info duration="30분" cost="5천원" />
      </CourseStep.Content>
    </CourseStep.Root>
  ),
};

export const LongTitle: Story = {
  render: () => (
    <CourseStep.Root>
      <CourseStep.Number number={4} />
      <CourseStep.Content>
        <CourseStep.Title>군산 내항 야경 포토스팟</CourseStep.Title>
        <CourseStep.Info duration="1시간" cost="무료" />
      </CourseStep.Content>
    </CourseStep.Root>
  ),
};

export const MultipleCourseSteps: Story = {
  render: () => (
    <div className="space-y-4">
      <CourseStep.Root>
        <CourseStep.Number number={1} />
        <CourseStep.Content>
          <CourseStep.Title>군산 근대역사박물관</CourseStep.Title>
          <CourseStep.Info duration="2시간" cost="무료" />
        </CourseStep.Content>
      </CourseStep.Root>
      <CourseStep.Root>
        <CourseStep.Number number={2} />
        <CourseStep.Content>
          <CourseStep.Title>경암동 철길마을</CourseStep.Title>
          <CourseStep.Info duration="30분" cost="무료" />
        </CourseStep.Content>
      </CourseStep.Root>
      <CourseStep.Root>
        <CourseStep.Number number={3} />
        <CourseStep.Content>
          <CourseStep.Title>이성당 빵집</CourseStep.Title>
          <CourseStep.Info duration="30분" cost="5천원" />
        </CourseStep.Content>
      </CourseStep.Root>
    </div>
  ),
};
