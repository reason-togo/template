import type { Meta, StoryObj } from '@storybook/react';
import { PlaceInfo } from './PlaceInfo';

const meta = {
  title: 'Entities/Place/PlaceInfo',
  component: PlaceInfo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: '장소명',
    },
    location: {
      control: 'text',
      description: '위치',
    },
  },
} satisfies Meta<typeof PlaceInfo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: '군산 근대역사박물관',
    location: '전북 군산시',
  },
};

export const LongTitle: Story = {
  args: {
    title: '경상북도 안동시 하회마을 전통가옥',
    location: '경북 안동시',
  },
};

export const ShortTitle: Story = {
  args: {
    title: '공산성',
    location: '충남 공주시',
  },
};
