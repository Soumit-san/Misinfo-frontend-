import { VerificationResult, Claim } from '../types';

const API_BASE_URL = 'https://misinfo-detector-1-yt6z.onrender.com';

class ApiError extends Error {
  status: number;
  
  constructor(message: string, status: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

async function fetchWithError(url: string, options?: RequestInit) {
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new ApiError(
      errorText || `HTTP error! status: ${response.status}`,
      response.status
    );
  }

  return response.json();
}

export async function verifyClaim(claim: string): Promise<VerificationResult> {
  return fetchWithError(`${API_BASE_URL}/check`, {
    method: 'POST',
    body: JSON.stringify({ text: claim }),
  });
}

export async function getHistory(limit: number = 50): Promise<Claim[]> {
  return fetchWithError(`${API_BASE_URL}/history?limit=${limit}`);
}

export async function getHistoryDetail(id: string): Promise<Claim> {
  return fetchWithError(`${API_BASE_URL}/history/${id}`);
}

export async function checkHealth(): Promise<{ status: string }> {
  return fetchWithError(`${API_BASE_URL}/`);
}