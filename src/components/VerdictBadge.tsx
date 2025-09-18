import React from 'react';
import { CheckCircle, XCircle, AlertTriangle, HelpCircle } from 'lucide-react';

interface VerdictBadgeProps {
  verdict: 'TRUE' | 'FALSE' | 'PARTIALLY TRUE' | 'UNVERIFIED';
  size?: 'sm' | 'md' | 'lg';
}

export default function VerdictBadge({ verdict, size = 'md' }: VerdictBadgeProps) {
  const configs = {
    TRUE: {
      icon: CheckCircle,
      bgColor: 'bg-green-100',
      textColor: 'text-green-800',
      borderColor: 'border-green-200',
    },
    FALSE: {
      icon: XCircle,
      bgColor: 'bg-red-100',
      textColor: 'text-red-800',
      borderColor: 'border-red-200',
    },
    'PARTIALLY TRUE': {
      icon: AlertTriangle,
      bgColor: 'bg-yellow-100',
      textColor: 'text-yellow-800',
      borderColor: 'border-yellow-200',
    },
    UNVERIFIED: {
      icon: HelpCircle,
      bgColor: 'bg-gray-100',
      textColor: 'text-gray-800',
      borderColor: 'border-gray-200',
    },
  };

  const config = configs[verdict] || configs['UNVERIFIED'];
  const Icon = config.icon;

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base',
  };

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  return (
    <span
      className={`inline-flex items-center gap-1 font-medium rounded-full border ${config.bgColor} ${config.textColor} ${config.borderColor} ${sizeClasses[size]}`}
    >
      <Icon className={iconSizes[size]} />
      {verdict}
    </span>
  );
}