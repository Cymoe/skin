import React from 'react';
import { Sparkles, Palette, Heart, Zap } from 'lucide-react';

interface ColorCardProps {
  label: string;
  colors: string[];
  icon: React.ReactNode;
  description: string;
}

function ColorCard({ label, colors, icon, description }: ColorCardProps) {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 relative overflow-hidden group hover:bg-white/15 transition-all duration-300">
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-4">
          {icon}
          <h3 className="text-gray-300 text-lg">{label}</h3>
        </div>
        <div className="flex gap-3 mb-4">
          {colors.map((color, index) => (
            <div
              key={index}
              className="w-12 h-12 rounded-lg ring-2 ring-white/20 group-hover:ring-white/30 transition-all duration-300 shadow-lg"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
        <p className="text-sm text-gray-400">{description}</p>
      </div>
    </div>
  );
}

interface AnalysisMetricsProps {
  skinTone: string;
  undertone?: string;
  fashionColors: {
    primary: string[];
    accent: string[];
    neutral: string[];
  };
}

export function AnalysisMetrics({ skinTone, undertone, fashionColors }: AnalysisMetricsProps) {
  const colorCategories = [
    {
      label: "Statement Pieces",
      colors: [fashionColors.primary[0], fashionColors.primary[1]],
      icon: <Sparkles className="w-5 h-5 text-teal-300" />,
      description: "Bold colors for main pieces like dresses and tops"
    },
    {
      label: "Accent Colors",
      colors: [fashionColors.accent[0], fashionColors.accent[1]],
      icon: <Heart className="w-5 h-5 text-teal-300" />,
      description: "Perfect for accessories and detail pieces"
    },
    {
      label: "Essential Base",
      colors: [fashionColors.neutral[0], fashionColors.neutral[1]],
      icon: <Palette className="w-5 h-5 text-teal-300" />,
      description: "Versatile neutrals for foundational pieces"
    },
    {
      label: "Perfect Pairings",
      colors: [fashionColors.primary[0], fashionColors.neutral[0]],
      icon: <Zap className="w-5 h-5 text-teal-300" />,
      description: "Harmonious combinations for complete looks"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Color Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {colorCategories.map((category, index) => (
          <ColorCard
            key={index}
            label={category.label}
            colors={category.colors}
            icon={category.icon}
            description={category.description}
          />
        ))}
      </div>

      {/* Style Guide */}
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
        <h3 className="text-gray-300 text-lg mb-3">Style Guide</h3>
        <div className="space-y-3 text-gray-300 text-sm leading-relaxed">
          <p>• Mix statement pieces with neutral bases</p>
          <p>• Use accent colors to add personality</p>
          <p>• Layer similar tones for sophistication</p>
          <p>• Balance bold colors with neutrals</p>
        </div>
      </div>
    </div>
  );
}