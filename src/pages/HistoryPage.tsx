import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, AlertCircle, ArrowRight } from 'lucide-react';
import { getHistory } from '../utils/api';
import { Claim } from '../types';
import LoadingSpinner from '../components/LoadingSpinner';
import VerdictBadge from '../components/VerdictBadge';
import ConfidenceBar from '../components/ConfidenceBar';

export default function HistoryPage() {
  const [history, setHistory] = useState<Claim[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await getHistory();
        setHistory(data);
      } catch (err: any) {
        setError(err.message || 'Failed to load history');
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const handleClaimClick = (id: string) => {
    navigate(`/history/${id}`);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const truncateText = (text: string, maxLength: number = 150) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-gray-600">Loading verification history...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-medium text-red-800 mb-1">
                Error Loading History
              </h3>
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Verification History
          </h1>
          <p className="text-gray-600">
            View your past claim verifications and their results
          </p>
        </div>

        {/* History List */}
        {history.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No History Yet</h3>
            <p className="text-gray-500 mb-6">
              Start verifying claims to see your history here
            </p>
            <button
              onClick={() => navigate('/')}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Verify Your First Claim
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {history.map((claim) => (
              <div
                key={claim.id}
                onClick={() => claim.id && handleClaimClick(claim.id)}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md hover:border-gray-300 cursor-pointer transition-all group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-4">
                    {/* Header Row */}
                    <div className="flex items-start justify-between gap-4">
                      <VerdictBadge verdict={claim.verdict} size="md" />
                      {claim.created_at && (
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="w-4 h-4 mr-1" />
                          {formatDate(claim.created_at)}
                        </div>
                      )}
                    </div>

                    {/* Claim Text */}
                    <div>
                      <p className="text-gray-900 leading-relaxed">
                        "{truncateText(claim.claim)}"
                      </p>
                    </div>

                    {/* Confidence Bar */}
                    <div className="max-w-xs">
                      <ConfidenceBar 
                        confidence={claim.confidence} 
                        size="sm" 
                        showLabel={false}
                      />
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-xs text-gray-500">Confidence</span>
                        <span className="text-xs font-medium text-gray-700">
                          {claim.confidence}%
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Arrow Icon */}
                  <div className="flex-shrink-0">
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}