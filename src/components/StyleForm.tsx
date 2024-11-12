import React from 'react';
import { StyleFormProps, UserProfile } from '../types';

export function StyleForm({ userProfile, onSubmit }: StyleFormProps) {
  const [formData, setFormData] = React.useState<UserProfile>(userProfile);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Height</label>
          <input
            type="text"
            name="height"
            value={formData.height}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
            placeholder="5'10''"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Weight</label>
          <input
            type="text"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
            placeholder="150 lbs"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Waist Size</label>
          <input
            type="text"
            name="waistSize"
            value={formData.waistSize}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
            placeholder="32"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Season</label>
          <select
            name="season"
            value={formData.season}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
          >
            <option value="spring">Spring</option>
            <option value="summer">Summer</option>
            <option value="autumn">Autumn</option>
            <option value="winter">Winter</option>
          </select>
        </div>
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors"
        >
          Update Preferences
        </button>
      </div>
    </form>
  );
}