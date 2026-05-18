import type { Meta, StoryObj } from '@storybook/react';
import { PlaceCard } from './PlaceCard';
import { MOCK_PLACES } from '@/shared/mock/places';

const meta = {
  title: 'Features/PlaceCard',
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

export const WithRealtimeReason: Story = {
  render: () => {
    const place = MOCK_PLACES[0]; // 군산 근대역사박물관
    return (
      <PlaceCard.Root>
        <PlaceCard.Image src={place.imageUrl} alt={place.name} />
        <PlaceCard.Content>
          <PlaceCard.Header title={place.name} location={place.location} />
          {place.realtimeReason && (
            <PlaceCard.Highlight>
              <strong className="text-primary-400">지금 출발하면</strong>{' '}
              {place.realtimeReason}
            </PlaceCard.Highlight>
          )}
          <p className="text-sm text-secondary leading-relaxed">
            {place.description}
          </p>
          <PlaceCard.Stats time={place.estimatedTime} cost={place.estimatedCost} />
        </PlaceCard.Content>
      </PlaceCard.Root>
    );
  },
};

export const WithoutRealtimeReason: Story = {
  render: () => {
    const place = MOCK_PLACES[1]; // 공주 공산성
    return (
      <PlaceCard.Root>
        <PlaceCard.Image src={place.imageUrl} alt={place.name} />
        <PlaceCard.Content>
          <PlaceCard.Header title={place.name} location={place.location} />
          <p className="text-sm text-secondary leading-relaxed">
            {place.description}
          </p>
          <PlaceCard.Stats time={place.estimatedTime} cost={place.estimatedCost} />
        </PlaceCard.Content>
      </PlaceCard.Root>
    );
  },
};

export const MultipleCards: Story = {
  render: () => (
    <div className="space-y-6">
      {MOCK_PLACES.map((place) => (
        <PlaceCard.Root key={place.id}>
          <PlaceCard.Image src={place.imageUrl} alt={place.name} />
          <PlaceCard.Content>
            <PlaceCard.Header title={place.name} location={place.location} />
            {place.realtimeReason && (
              <PlaceCard.Highlight>
                <strong className="text-primary-400">지금 출발하면</strong>{' '}
                {place.realtimeReason}
              </PlaceCard.Highlight>
            )}
            <p className="text-sm text-secondary leading-relaxed">
              {place.description}
            </p>
            <PlaceCard.Stats time={place.estimatedTime} cost={place.estimatedCost} />
          </PlaceCard.Content>
        </PlaceCard.Root>
      ))}
    </div>
  ),
};

export const MinimalCard: Story = {
  render: () => (
    <PlaceCard.Root>
      <PlaceCard.Image alt="테스트 장소" />
      <PlaceCard.Content>
        <PlaceCard.Header title="테스트 장소" location="서울 종로구" />
        <p className="text-sm text-secondary leading-relaxed">
          간단한 설명입니다.
        </p>
        <PlaceCard.Stats time="2시간" cost="1만원" />
      </PlaceCard.Content>
    </PlaceCard.Root>
  ),
};
