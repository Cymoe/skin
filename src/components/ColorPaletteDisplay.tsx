import React from 'react';
import { Shirt } from 'lucide-react';
import { ColorHarmony } from './ColorHarmony';
import { AnalysisMetrics } from './AnalysisMetrics';
import { ShareResults } from './ShareResults';

interface ColorPaletteDisplayProps {
  colors: string[];
  skinTone: string;
  undertone?: string;
  fashionColors: {
    primary: string[];
    accent: string[];
    neutral: string[];
  };
}

export function ColorPaletteDisplay({ colors, skinTone, undertone, fashionColors }: ColorPaletteDisplayProps) {
  return (
    <div className="space-y-8">
      {/* Dark Mode Metrics Display */}
      <div className="bg-gray-900 p-8 rounded-2xl">
        <AnalysisMetrics 
          skinTone={skinTone}
          undertone={undertone}
          fashionColors={fashionColors}
        />
      </div>

      {/* Color Categories */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center gap-2 mb-6">
          <Shirt className="w-5 h-5 text-teal-600" />
          <h3 className="text-xl font-semibold text-gray-800">Your Color Palette</h3>
        </div>

        <div className="space-y-6">
          {[
            { title: 'Statement Colors', colors: fashionColors.primary, usage: 'Perfect for dresses, tops, and outerwear' },
            { title: 'Accent Colors', colors: fashionColors.accent, usage: 'Great for accessories and accent pieces' },
            { title: 'Base Colors', colors: fashionColors.neutral, usage: 'Ideal for pants, skirts, and basics' }
          ].map((category, idx) => (
            <div key={idx} className="bg-gray-50 rounded-xl p-6">
              <h4 className="font-medium text-gray-800 mb-4">{category.title}</h4>
              <div className="flex flex-wrap gap-4">
                {category.colors.map((color, colorIdx) => (
                  <div key={colorIdx} className="space-y-2">
                    <div
                      className="w-20 h-20 rounded-lg shadow-sm transform hover:scale-105 transition-transform"
                      style={{ backgroundColor: color }}
                    />
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-700">{color}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-600 mt-4">{category.usage}</p>
            </div>
          ))}
        </div>
      </div>

      <ColorHarmony colors={fashionColors} />
      
      {/* Share Results Section */}
      <ShareResults colorPalette={fashionColors} />
    </div>
  );
}