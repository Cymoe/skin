import React from 'react';
import { Header } from './components/Header';
import { AnalysisWizard } from './components/AnalysisWizard';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <AnalysisWizard />
    </div>
  );
}