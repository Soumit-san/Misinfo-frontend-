import React from 'react';
import { ExternalLink, Clock } from 'lucide-react';
import { VerificationResult, Claim } from '../types';
import VerdictBadge from './VerdictBadge';
import ConfidenceBar from './ConfidenceBar';

interface ResultCardProps {
  data: VerificationResult | Claim;
  claim?: string;
  showTimestamp?: boolean;
}

export default function ResultCard({ data, claim, showTimestamp }: ResultCardProps) {
  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleString();
  };

  // Combine all sources from different arrays
  const getAllSources = () => {
    const sources = [];
    if (data.sources) sources.push(...data.sources);
    if ('news_sources' in data && data.news_sources) sources.push(...data.news_sources);
    if ('factcheck_sources' in data && data.factcheck_sources) sources.push(...data.factcheck_sources);
    return sources;
  };

  const allSources = getAllSources();

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <VerdictBadge verdict={data.verdict} size="lg" />
        {showTimestamp && 'created_at' in data && (
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="w-4 h-4 mr-1" />
            {formatDate(data.created_at)}
          </div>
        )}
      </div>

      {/* Claim */}
      {(claim || ('claim' in data && data.claim)) && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-700 uppercase tracking-wide">
            Claim Analyzed
          </h3>
          <p className="text-lg text-gray-900 leading-relaxed">
            "{claim || ('claim' in data ? data.claim : '')}"
          </p>
        </div>
      )}

      {/* Confidence */}
      <div className="space-y-3">
        <ConfidenceBar confidence={data.confidence} />
      </div>

      {/* Explanation */}
      {data.explanation && (
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gray-700 uppercase tracking-wide">
            Explanation
          </h4>
          <p className="text-gray-700 leading-relaxed">{data.explanation}</p>
        </div>
      )}

      {/* Sources */}
      {allSources.length > 0 && (
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-gray-700 uppercase tracking-wide">
            Sources ({allSources.length})
          </h4>
          <div className="space-y-3">
            {allSources.map((source, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <h5 className="font-medium text-gray-900 mb-2">{source.title}</h5>
                    <p className="text-sm text-gray-600 mb-3 leading-relaxed">
                      {source.snippet}
                    </p>
                  </div>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 truncate">
                    {new URL(source.url).hostname}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}