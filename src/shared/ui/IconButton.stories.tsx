import type { Meta, StoryObj } from '@storybook/react';
import { IconButton } from './IconButton';
import { Heart, Share2, ArrowLeft, Settings } from 'lucide-react';

const meta = {
  title: 'Shared/UI/IconButton',
  component: IconButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    icon: {
      control: false,
      description: 'Lucide React 아이콘 컴포넌트',
    },
    onClick: {
      action: 'clicked',
      description: '클릭 이벤트 핸들러',
    },
    'aria-label': {
      control: 'text',
      description: '접근성 레이블',
    },
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const HeartIcon: Story = {
  args: {
    icon: Heart,
    'aria-label': '찜하기',
  },
};

export const ShareIcon: Story = {
  args: {
    icon: Share2,
    'aria-label': '공유하기',
  },
};

export const BackIcon: Story = {
  args: {
    icon: ArrowLeft,
    'aria-label': '뒤로가기',
  },
};

export const SettingsIcon: Story = {
  args: {
    icon: Settings,
    'aria-label': '설정',
  },
};
