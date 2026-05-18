import type { Meta, StoryObj } from '@storybook/react';
import { CourseList } from './CourseList';
import { MOCK_COURSES } from '@/shared/mock/courses';

const meta = {
  title: 'Features/CourseList',
  component: CourseList.Root,
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
} satisfies Meta<typeof CourseList.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FullCourse: Story = {
  render: () => {
    const course = MOCK_COURSES[0];
    return (
      <CourseList.Root>
        {course.items.map((item, index) => (
          <div key={item.id}>
            <CourseList.Item
              number={index + 1}
              title={item.name}
              duration={item.duration}
              cost={item.cost}
            />
            {item.transport && (
              <CourseList.Transport
                type={item.transport.type}
                duration={item.transport.duration}
              />
            )}
          </div>
        ))}
      </CourseList.Root>
    );
  },
};

export const TwoSteps: Story = {
  render: () => (
    <CourseList.Root>
      <div>
        <CourseList.Item
          number={1}
          title="군산 근대역사박물관"
          duration="2시간"
          cost="무료"
        />
        <CourseList.Transport type="walk" duration="5분" />
      </div>
      <div>
        <CourseList.Item
          number={2}
          title="경암동 철길마을"
          duration="30분"
          cost="무료"
        />
      </div>
    </CourseList.Root>
  ),
};

export const WithCarTransport: Story = {
  render: () => (
    <CourseList.Root>
      <div>
        <CourseList.Item
          number={1}
          title="이성당 빵집"
          duration="30분"
          cost="5천원"
        />
        <CourseList.Transport type="car" duration="15분" />
      </div>
      <div>
        <CourseList.Item
          number={2}
          title="군산 내항 야경"
          duration="30분"
          cost="무료"
        />
      </div>
    </CourseList.Root>
  ),
};

export const SingleStep: Story = {
  render: () => (
    <CourseList.Root>
      <CourseList.Item
        number={1}
        title="강릉 커피거리"
        duration="3시간"
        cost="2만원"
      />
    </CourseList.Root>
  ),
};
