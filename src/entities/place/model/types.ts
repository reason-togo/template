export interface Place {
  id: string;
  name: string;
  location: string;
  address: string;
  imageUrl?: string;
  description: string;
  estimatedTime: string;
  estimatedCost: string;
  realtimeReason?: string;
  category: string;
  areaCode: string;
}
