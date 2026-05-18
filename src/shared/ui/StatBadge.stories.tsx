import type { Meta, StoryObj } from '@storybook/react';
import { StatBadge } from './StatBadge';

const meta = {
  title: 'Shared/UI/StatBadge',
  component: StatBadge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: '레이블',
    },
    value: {
      control: 'text',
      description: '값',
    },
  },
} satisfies Meta<typeof StatBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Time: Story = {
  args: {
    label: '예상 시간',
    value: '4시간',
  },
};

export const Cost: Story = {
  args: {
    label: '예상 비용',
    value: '2만원',
  },
};

export const Distance: Story = {
  args: {
    label: '거리',
    value: '120km',
  },
};

export const Multiple: Story = {
  render: () => (
    <div className="flex gap-3">
      <StatBadge label="예상 시간" value="4시간" />
      <StatBadge label="예상 비용" value="2만원" />
    </div>
  ),
};
