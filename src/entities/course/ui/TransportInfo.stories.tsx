import type { Meta, StoryObj } from '@storybook/react';
import { TransportInfo } from './TransportInfo';

const meta = {
  title: 'Entities/Course/TransportInfo',
  component: TransportInfo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['walk', 'car'],
      description: '이동 수단',
    },
    duration: {
      control: 'text',
      description: '이동 시간',
    },
  },
  decorators: [
    (Story) => (
      <div className="w-[390px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof TransportInfo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Walk: Story = {
  args: {
    type: 'walk',
    duration: '5분',
  },
};

export const WalkLong: Story = {
  args: {
    type: 'walk',
    duration: '15분',
  },
};

export const Car: Story = {
  args: {
    type: 'car',
    duration: '10분',
  },
};

export const CarLong: Story = {
  args: {
    type: 'car',
    duration: '30분',
  },
};
