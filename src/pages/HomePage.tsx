import React, { useState } from 'react';
import { Search, AlertCircle } from 'lucide-react';
import { verifyClaim } from '../utils/api';
import { VerificationResult } from '../types';
import LoadingSpinner from '../components/LoadingSpinner';
import ResultCard from '../components/ResultCard';

export default function HomePage() {
  const [claim, setClaim] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<VerificationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!claim.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await verifyClaim(claim.trim());
      setResult(data);
    } catch (err: any) {
      setError(err.message || 'An error occurred while verifying the claim');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setClaim('');
    setResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Verify Claims with AI
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Enter any claim or statement below and our AI will analyze it for accuracy, 
            providing you with a verdict, confidence level, and credible sources.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Input Form */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="claim" className="block text-sm font-medium text-gray-700 mb-3">
                    Enter a claim to verify
                  </label>
                  <textarea
                    id="claim"
                    rows={4}
                    value={claim}
                    onChange={(e) => setClaim(e.target.value)}
                    placeholder="e.g., The Earth is flat, COVID-19 vaccines alter DNA, etc."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-gray-900 placeholder-gray-500"
                    disabled={loading}
                    required
                  />
                </div>
                
                <div className="flex gap-4">
                  <button
                    type="submit"
                    disabled={loading || !claim.trim()}
                    className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {loading ? (
                      <LoadingSpinner size="sm" />
                    ) : (
                      <Search className="w-5 h-5" />
                    )}
                    {loading ? 'Analyzing...' : 'Verify Claim'}
                  </button>
                  
                  {(result || error) && (
                    <button
                      type="button"
                      onClick={handleReset}
                      className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
                    >
                      Reset
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-medium text-red-800 mb-1">
                      Error Verifying Claim
                    </h3>
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Loading State */}
          {loading && (
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
              <div className="text-center">
                <LoadingSpinner size="lg" />
                <p className="mt-4 text-gray-600">Analyzing your claim...</p>
                <p className="text-sm text-gray-500 mt-2">This may take a few moments</p>
              </div>
            </div>
          )}

          {/* Results */}
          {result && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900">Verification Results</h2>
              <ResultCard data={result} claim={claim} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}