import React from 'react';
import { Palette } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Palette className="w-8 h-8 text-teal-600" />
            <h1 className="text-2xl font-bold text-gray-900">Fashion Color AI</h1>
          </div>
          <p className="text-gray-600">Discover Your Perfect Color Palette</p>
        </div>
      </div>
    </header>
  );
}