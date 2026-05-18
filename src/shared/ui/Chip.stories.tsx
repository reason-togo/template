import type { Meta, StoryObj } from '@storybook/react';
import { Chip } from './Chip';

const meta = {
  title: 'Shared/UI/Chip',
  component: Chip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: '칩 레이블',
    },
    icon: {
      control: 'text',
      description: '이모지 아이콘',
    },
    selected: {
      control: 'boolean',
      description: '선택 상태',
    },
    onClick: {
      action: 'clicked',
      description: '클릭 이벤트 핸들러',
    },
  },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Unselected: Story = {
  args: {
    label: '혼자',
    icon: '👤',
    selected: false,
  },
};

export const Selected: Story = {
  args: {
    label: '혼자',
    icon: '👤',
    selected: true,
  },
};

export const WithoutIcon: Story = {
  args: {
    label: '선택 옵션',
    selected: false,
  },
};

export const LongLabel: Story = {
  args: {
    label: '온 가족이 함께',
    icon: '👨‍👩‍👧‍👦',
    selected: false,
  },
};
