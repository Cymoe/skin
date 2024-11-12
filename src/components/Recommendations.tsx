import React from 'react';
import { OutfitCard } from './OutfitCard';
import { OutfitRecommendation, UserProfile } from '../types';
import { getOutfitRecommendations } from '../services/outfitRecommendation';

interface RecommendationsProps {
  userProfile: UserProfile;
}

export function Recommendations({ userProfile }: RecommendationsProps) {
  const recommendations: OutfitRecommendation[] = getOutfitRecommendations(userProfile);

  if (!recommendations || recommendations.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">No recommendations available at this time.</p>
      </div>
    );
  }

  return (
    <div className="py-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Outfit Recommendations</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendations.map((outfit) => (
          <OutfitCard key={outfit.id} outfit={outfit} />
        ))}
      </div>
    </div>
  );
}