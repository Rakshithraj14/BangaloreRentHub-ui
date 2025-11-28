/**
 * API Client for BangaloreRentHub Backend
 * Handles all HTTP requests to the backend API
 */

import axios, { AxiosError } from 'axios';
import type { SearchParams, SearchResponse, RentalsResponse, Rental } from '../types';

// Get base URL from environment variable or fallback to localhost
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 second timeout
});

/**
 * Search for rental properties based on filters
 * @param params - Search parameters (location, bhk, minRent, maxRent)
 * @returns Array of matching rental listings
 */
export const searchRentals = async (params: SearchParams): Promise<Rental[]> => {
  try {
    const response = await apiClient.post<SearchResponse>('/api/search', params);
    return response.data.results || [];
  } catch (error) {
    handleApiError(error);
    return [];
  }
};

/**
 * Fetch all rentals (optional endpoint)
 * @param limit - Maximum number of results to return
 * @returns Array of rental listings
 */
export const fetchAllRentals = async (limit: number = 50): Promise<Rental[]> => {
  try {
    const response = await apiClient.get<RentalsResponse>('/api/rentals', {
      params: { limit },
    });
    return response.data.data || [];
  } catch (error) {
    handleApiError(error);
    return [];
  }
};

/**
 * Handle API errors with proper error messages
 * @param error - Axios error object
 */
const handleApiError = (error: unknown): void => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;
    
    if (axiosError.response) {
      // Server responded with error
      console.error('API Error:', axiosError.response.status, axiosError.response.data);
      throw new Error(
        (axiosError.response.data as any)?.error || 
        `Server error: ${axiosError.response.status}`
      );
    } else if (axiosError.request) {
      // Request made but no response
      console.error('Network Error:', axiosError.message);
      throw new Error('Unable to reach server. Please check if the backend is running.');
    } else {
      // Error setting up request
      console.error('Request Error:', axiosError.message);
      throw new Error('Failed to make request: ' + axiosError.message);
    }
  } else {
    // Non-Axios error
    console.error('Unexpected Error:', error);
    throw new Error('An unexpected error occurred');
  }
};

export default apiClient;

