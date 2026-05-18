import type { Meta, StoryObj } from '@storybook/react';
import { PlaceImage } from './PlaceImage';

const meta = {
  title: 'Entities/Place/PlaceImage',
  component: PlaceImage,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    src: {
      control: 'text',
      description: '이미지 URL (없으면 gradient placeholder)',
    },
    alt: {
      control: 'text',
      description: '이미지 대체 텍스트',
    },
  },
  decorators: [
    (Story) => (
      <div className="w-[390px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof PlaceImage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithoutImage: Story = {
  args: {
    alt: '군산 근대역사박물관',
  },
};

export const WithImageURL: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800',
    alt: '강릉 커피거리',
  },
};

export const LongName: Story = {
  args: {
    alt: '경상북도 안동시 하회마을 전통가옥',
  },
};
