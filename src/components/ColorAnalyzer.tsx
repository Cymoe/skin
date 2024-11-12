import React, { useState } from 'react';
import { Camera, Upload, AlertCircle, Loader } from 'lucide-react';
import { UserProfile } from '../types';
import { analyzeSkinTone } from '../services/colorAnalysis';
import { PhotoGuide } from './PhotoGuide';

interface ColorAnalyzerProps {
  onAnalysisComplete: (profile: UserProfile) => void;
}

export function ColorAnalyzer({ onAnalysisComplete }: ColorAnalyzerProps) {
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Reset states
    setError(null);
    setUploadProgress(0);

    // Validate file size
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size should be less than 5MB');
      return;
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file');
      return;
    }

    // Show preview
    const reader = new FileReader();
    reader.onloadstart = () => setUploadProgress(0);
    reader.onprogress = (e) => {
      if (e.lengthComputable) {
        setUploadProgress((e.loaded / e.total) * 50); // First 50% for upload
      }
    };
    reader.onloadend = () => {
      setPreview(reader.result as string);
      setUploadProgress(50);
    };
    reader.readAsDataURL(file);

    setAnalyzing(true);

    try {
      // Simulate analysis progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 500);

      const profile = await analyzeSkinTone(file);
      clearInterval(progressInterval);
      setUploadProgress(100);
      onAnalysisComplete(profile);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to analyze image');
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="space-y-6">
      <PhotoGuide />
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Color Analysis</h2>
        
        <div className="space-y-4">
          <div className="flex items-center justify-center w-full">
            <label 
              className={`flex flex-col items-center justify-center w-full aspect-[4/3] max-h-[600px] border-2 border-dashed rounded-lg cursor-pointer relative overflow-hidden transition-all duration-300 ${
                analyzing ? 'border-teal-300 bg-teal-50' : 'border-gray-300 bg-gray-50 hover:bg-gray-100'
              }`}
            >
              {preview ? (
                <div className="absolute inset-0 w-full h-full">
                  <div className="relative w-full h-full">
                    <img
                      src={preview}
                      alt="Preview"
                      className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-300 ${
                        analyzing ? 'opacity-50' : 'opacity-100'
                      }`}
                    />
                    <div className={`absolute inset-0 bg-black bg-opacity-40 transition-opacity duration-300 flex items-center justify-center ${
                      analyzing ? 'opacity-0' : 'opacity-0 hover:opacity-100'
                    }`}>
                      <div className="flex items-center gap-2 text-white">
                        <Upload className="w-5 h-5" />
                        <p className="text-sm font-medium">Click to change image</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center p-6 text-center">
                  <Camera className={`w-12 h-12 mb-3 transition-colors duration-300 ${
                    analyzing ? 'text-teal-400' : 'text-gray-400'
                  }`} />
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">PNG, JPG or JPEG (max 5MB)</p>
                </div>
              )}
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={analyzing}
              />
            </label>
          </div>

          {/* Progress Bar */}
          {uploadProgress > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  {analyzing ? (
                    <>
                      <Loader className="w-4 h-4 text-teal-600 animate-spin" />
                      <span className="text-teal-600 font-medium">Analyzing colors...</span>
                    </>
                  ) : (
                    <span className="text-gray-600">Upload progress</span>
                  )}
                </div>
                <span className="text-gray-600 font-medium">{Math.round(uploadProgress)}%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-teal-500 transition-all duration-300 ease-out"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 text-red-700 p-4 rounded-md animate-fadeIn">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <p>{error}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}