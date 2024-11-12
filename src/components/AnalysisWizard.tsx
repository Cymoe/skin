import React, { useState } from 'react';
import { UserProfile } from '../types';
import { ColorAnalyzer } from './ColorAnalyzer';
import { ColorPaletteDisplay } from './ColorPaletteDisplay';
import { ColorHarmony } from './ColorHarmony';
import { Progress } from './Progress';
import { AnalysisMetrics } from './AnalysisMetrics';

type Step = 'upload' | 'analysis' | 'metrics' | 'harmony' | 'palette';

export function AnalysisWizard() {
  const [currentStep, setCurrentStep] = useState<Step>('upload');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  const steps = [
    { id: 'upload', label: 'Photo Upload' },
    { id: 'analysis', label: 'Analysis' },
    { id: 'metrics', label: 'Your Colors' },
    { id: 'harmony', label: 'Color Harmony' },
    { id: 'palette', label: 'Final Palette' }
  ];

  const handleAnalysisComplete = (profile: UserProfile) => {
    setUserProfile(profile);
    setCurrentStep('analysis');
    // Simulate analysis time
    setTimeout(() => setCurrentStep('metrics'), 2000);
  };

  const handleNext = () => {
    const stepOrder: Step[] = ['upload', 'analysis', 'metrics', 'harmony', 'palette'];
    const currentIndex = stepOrder.indexOf(currentStep);
    if (currentIndex < stepOrder.length - 1) {
      setCurrentStep(stepOrder[currentIndex + 1]);
    }
  };

  const handleBack = () => {
    const stepOrder: Step[] = ['upload', 'analysis', 'metrics', 'harmony', 'palette'];
    const currentIndex = stepOrder.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(stepOrder[currentIndex - 1]);
    }
  };

  const getCurrentStepIndex = () => {
    return steps.findIndex(step => step.id === currentStep);
  };

  const fashionColors = {
    primary: ['#2C3E50', '#E74C3C', '#8E44AD'],
    accent: ['#3498DB', '#F1C40F', '#1ABC9C'],
    neutral: ['#ECF0F1', '#95A5A6', '#7F8C8D']
  };

  const renderStep = () => {
    switch (currentStep) {
      case 'upload':
        return <ColorAnalyzer onAnalysisComplete={handleAnalysisComplete} />;
      
      case 'analysis':
        return (
          <div className="flex flex-col items-center justify-center py-12 animate-fadeIn">
            <div className="w-24 h-24 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mb-6" />
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Analyzing Your Colors</h2>
            <p className="text-gray-600">We're processing your photo to create your perfect palette...</p>
          </div>
        );
      
      case 'metrics':
        return userProfile && (
          <div className="animate-fadeIn">
            <AnalysisMetrics
              skinTone={userProfile.skinTone}
              undertone={userProfile.undertone}
              fashionColors={fashionColors}
            />
            <div className="mt-8 flex justify-end">
              <button
                onClick={handleNext}
                className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors"
              >
                Next: Color Harmony
              </button>
            </div>
          </div>
        );
      
      case 'harmony':
        return userProfile && (
          <div className="animate-fadeIn">
            <ColorHarmony colors={fashionColors} />
            <div className="mt-8 flex justify-between">
              <button
                onClick={handleBack}
                className="text-gray-600 hover:text-gray-800 transition-colors"
              >
                Back
              </button>
              <button
                onClick={handleNext}
                className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors"
              >
                View Final Palette
              </button>
            </div>
          </div>
        );
      
      case 'palette':
        return userProfile && (
          <div className="animate-fadeIn">
            <ColorPaletteDisplay
              colors={userProfile.colorPalette || []}
              skinTone={userProfile.skinTone}
              undertone={userProfile.undertone}
              fashionColors={fashionColors}
            />
            <div className="mt-8 flex justify-start">
              <button
                onClick={handleBack}
                className="text-gray-600 hover:text-gray-800 transition-colors"
              >
                Back to Color Harmony
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Progress 
        steps={steps} 
        currentStep={getCurrentStepIndex()} 
        className="mb-8" 
      />
      
      <div className="min-h-[600px]">
        {renderStep()}
      </div>
    </div>
  );
}