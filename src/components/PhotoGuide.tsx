import React from 'react';
import { Sun, Camera, XCircle, CheckCircle } from 'lucide-react';

export function PhotoGuide() {
  const guidelines = [
    {
      icon: <Sun className="w-5 h-5 text-teal-600" />,
      title: "Use Natural Light",
      correct: "Face natural daylight, near a window",
      incorrect: "Avoid artificial lighting or direct sunlight"
    },
    {
      icon: <Camera className="w-5 h-5 text-teal-600" />,
      title: "Proper Distance",
      correct: "Keep camera 12-18 inches from face",
      incorrect: "Too close or too far will affect results"
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">How to Take Your Photo</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Photo Examples */}
        <div className="space-y-4">
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
            <img
              src="https://images.unsplash.com/photo-1508186225823-0963cf9ab0de?w=800&h=600&fit=crop"
              alt="Good lighting example"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-md">
              Good
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
            <img
              src="https://images.unsplash.com/photo-1536766820879-059fec98ec0a?w=800&h=600&fit=crop"
              alt="Bad lighting example"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-md">
              Avoid
            </div>
          </div>
        </div>

        {/* Guidelines */}
        <div className="space-y-6">
          {guidelines.map((guideline, index) => (
            <div key={index} className="space-y-3">
              <div className="flex items-center gap-2">
                {guideline.icon}
                <h4 className="font-medium text-gray-800">{guideline.title}</h4>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-600">{guideline.correct}</p>
                </div>
                <div className="flex items-start gap-2">
                  <XCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-600">{guideline.incorrect}</p>
                </div>
              </div>
            </div>
          ))}

          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium text-gray-800 mb-2">Pro Tips:</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Remove makeup for most accurate results</li>
              <li>• Face the camera directly</li>
              <li>• Use a neutral background</li>
              <li>• Ensure face is well-lit and clear</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}