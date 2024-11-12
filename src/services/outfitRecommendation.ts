import { UserProfile, OutfitRecommendation } from '../types';

export function getOutfitRecommendations(userProfile: UserProfile): OutfitRecommendation[] {
  const { season, undertone } = userProfile;
  
  const recommendations: OutfitRecommendation[] = [
    {
      id: '1',
      name: 'Classic Business Ensemble',
      description: 'A timeless professional look perfect for the office',
      colors: ['#2C3E50', '#ECF0F1', '#3498DB'],
      season: season,
      occasion: 'business'
    },
    {
      id: '2',
      name: 'Casual Weekend Style',
      description: 'Comfortable yet stylish outfit for weekend activities',
      colors: ['#34495E', '#95A5A6', '#E74C3C'],
      season: season,
      occasion: 'casual'
    },
    {
      id: '3',
      name: 'Evening Elegance',
      description: 'Sophisticated outfit for dinner or special events',
      colors: ['#2E4053', '#5D6D7E', '#85929E'],
      season: season,
      occasion: 'formal'
    }
  ];

  return recommendations;
}