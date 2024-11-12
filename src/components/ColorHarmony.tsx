import React from 'react';
import { Palette, Sparkles } from 'lucide-react';

interface ColorHarmonyProps {
  colors: {
    primary: string[];
    accent: string[];
    neutral: string[];
  };
}

export function ColorHarmony({ colors }: ColorHarmonyProps) {
  const combinations = [
    {
      name: 'Monochromatic',
      colors: [colors.primary[0], colors.neutral[0], colors.neutral[1]],
      description: 'Different shades of your primary color for a sophisticated look'
    },
    {
      name: 'Complementary',
      colors: [colors.primary[0], colors.accent[1], colors.neutral[0]],
      description: 'Contrasting colors that create visual impact'
    },
    {
      name: 'Triadic',
      colors: [colors.primary[0], colors.accent[0], colors.primary[1]],
      description: 'Three evenly spaced colors for a vibrant, balanced look'
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <Sparkles className="w-5 h-5 text-teal-600" />
        <h3 className="text-xl font-semibold text-gray-800">Color Harmony Guide</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {combinations.map((combo, index) => (
          <div 
            key={index}
            className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <h4 className="font-medium text-gray-800 mb-3">{combo.name}</h4>
            
            {/* Color Preview */}
            <div className="relative h-32 mb-4 rounded-lg overflow-hidden">
              {combo.colors.map((color, i) => (
                <div
                  key={i}
                  className="absolute w-full h-1/3 transition-transform hover:scale-105"
                  style={{
                    backgroundColor: color,
                    top: `${i * 33.33}%`
                  }}
                />
              ))}
            </div>

            {/* Color Codes */}
            <div className="flex gap-2 mb-3">
              {combo.colors.map((color, i) => (
                <div key={i} className="flex items-center gap-1">
                  <div
                    className="w-4 h-4 rounded-full border border-gray-200"
                    style={{ backgroundColor: color }}
                  />
                  <span className="text-xs text-gray-600">{color}</span>
                </div>
              ))}
            </div>

            <p className="text-sm text-gray-600">{combo.description}</p>
          </div>
        ))}
      </div>

      {/* Interactive Color Tips */}
      <div className="mt-8 bg-gray-50 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-3">
          <Palette className="w-5 h-5 text-teal-600" />
          <h4 className="font-medium text-gray-800">How to Mix & Match</h4>
        </div>
        <ul className="text-sm text-gray-600 space-y-2">
          <li>• Use the 60-30-10 rule: main color 60%, secondary 30%, accent 10%</li>
          <li>• Pair neutrals with any combination for balance</li>
          <li>• Use brighter colors as accents for sophisticated looks</li>
          <li>• Match intensity levels for cohesive outfits</li>
        </ul>
      </div>
    </div>
  );
}