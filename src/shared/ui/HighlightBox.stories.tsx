import type { Meta, StoryObj } from '@storybook/react';
import { HighlightBox } from './HighlightBox';

const meta = {
  title: 'Shared/UI/HighlightBox',
  component: HighlightBox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      description: '박스 내용',
    },
  },
} satisfies Meta<typeof HighlightBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <>
        <strong className="text-primary-400">지금 출발하면</strong>{' '}
        박물관을 천천히 둘러보고 석양 무렵 군산 내항에 도착할 수 있어요.
        오늘처럼 맑은 날엔 야경이 특히 아름답습니다.
      </>
    ),
  },
};

export const Short: Story = {
  args: {
    children: '오후 3시쯤 출발하면 석양을 볼 수 있어요.',
  },
};

export const Long: Story = {
  args: {
    children: (
      <>
        <strong className="text-primary-400">지금 출발하면</strong>{' '}
        박물관을 천천히 둘러보고 경암동 철길마을을 걸으며 석양 무렵 군산 내항에 도착할 수 있어요.
        오늘처럼 맑은 날엔 야경이 특히 아름답습니다. 이성당 빵집에 들러 간식도 사가세요.
      </>
    ),
  },
};
