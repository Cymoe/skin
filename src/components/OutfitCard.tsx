import React from 'react';
import { OutfitRecommendation } from '../types';

interface OutfitCardProps {
  outfit: OutfitRecommendation;
}

export function OutfitCard({ outfit }: OutfitCardProps) {
  if (!outfit || !outfit.colors) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{outfit.name}</h3>
        <p className="text-gray-600 mb-4">{outfit.description}</p>
        
        <div className="flex items-center gap-2 mb-4">
          <span className="text-sm text-gray-500">Season:</span>
          <span className="px-2 py-1 bg-gray-100 rounded-full text-sm text-gray-700 capitalize">
            {outfit.season}
          </span>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <span className="text-sm text-gray-500">Occasion:</span>
          <span className="px-2 py-1 bg-gray-100 rounded-full text-sm text-gray-700 capitalize">
            {outfit.occasion}
          </span>
        </div>

        <div className="space-y-2">
          <span className="text-sm text-gray-500">Recommended Colors:</span>
          <div className="flex flex-wrap gap-2">
            {outfit.colors.map((color, index) => (
              <div
                key={`${color}-${index}`}
                className="w-8 h-8 rounded-full border border-gray-200"
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}