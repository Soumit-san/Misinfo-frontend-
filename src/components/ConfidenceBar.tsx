import React from 'react';

interface ConfidenceBarProps {
  confidence: number;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export default function ConfidenceBar({ 
  confidence, 
  showLabel = true, 
  size = 'md' 
}: ConfidenceBarProps) {
  const getConfidenceColor = (conf: number) => {
    if (conf >= 80) return 'bg-green-500';
    if (conf >= 60) return 'bg-yellow-500';
    if (conf >= 40) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const heightClasses = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
  };

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm font-medium text-gray-700">Confidence</span>
          <span className="text-sm font-bold text-gray-900">{confidence}%</span>
        </div>
      )}
      <div className={`w-full bg-gray-200 rounded-full ${heightClasses[size]}`}>
        <div
          className={`${heightClasses[size]} rounded-full transition-all duration-500 ease-out ${getConfidenceColor(confidence)}`}
          style={{ width: `${confidence}%` }}
        />
      </div>
    </div>
  );
}