import React from 'react';
import { TabButtonProps } from '../types';

export function TabButton({ active, onClick, icon, text }: TabButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all
        ${active 
          ? 'bg-teal-600 text-white shadow-lg transform scale-105' 
          : 'bg-white text-gray-600 hover:bg-teal-50'}`}
    >
      {icon}
      <span className="font-medium">{text}</span>
    </button>
  );
}