export interface Claim {
  id?: string;
  claim: string;
  verdict: 'TRUE' | 'FALSE' | 'PARTIALLY TRUE' | 'UNVERIFIED';
  confidence: number;
  explanation?: string;
  sources?: Source[];
  created_at?: string;
}

export interface Source {
  title: string;
  url: string;
  snippet: string;
}

export interface VerificationResult {
  verdict: 'TRUE' | 'FALSE' | 'PARTIALLY TRUE' | 'UNVERIFIED';
  confidence: number;
  explanation: string;
  sources?: Source[];
  news_sources?: Source[];
  factcheck_sources?: Source[];
}

export interface ApiError {
  message: string;
  status?: number;
}