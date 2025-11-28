/**
 * Core type definitions for BangaloreRentHub
 */

export interface Rental {
  id?: string;
  title: string;
  bhk: number | null;
  rent: number;
  location: string;
  area_sqft: number | null;
  furnishing: 'FURNISHED' | 'SEMI_FURNISHED' | 'UNFURNISHED' | null;
  type?: string | null;
  posted_at: Date | string;
  source: string;
  source_url: string;
  created_at?: Date | string;
}

export interface SearchParams {
  location: string;
  bhk?: number;
  minRent?: number;
  maxRent?: number;
}

export interface SearchResponse {
  results: Rental[];
}

export interface RentalsResponse {
  data: Rental[];
}

export interface ApiError {
  error: string;
  message?: string;
}

