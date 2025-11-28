import React, { useState, FormEvent } from 'react'
import { searchRentals } from '../api/client'
import type { Rental, SearchParams } from '../types'

interface SearchFormProps {
  onResults: (results: Rental[]) => void
  onLoadingChange: (loading: boolean) => void
  onError: (error: string | null) => void
}

// Popular localities in Bangalore for quick selection
const POPULAR_LOCALITIES = [
  'HSR Layout',
  'Indiranagar',
  'Koramangala',
  'Whitefield',
  'Marathahalli',
  'Electronic City',
  'Jayanagar',
  'BTM Layout',
  'Bellandur',
  'Sarjapur Road',
]

export default function SearchForm({
  onResults,
  onLoadingChange,
  onError,
}: SearchFormProps) {
  const [location, setLocation] = useState('HSR Layout')
  const [bhk, setBhk] = useState<number | ''>('')
  const [minRent, setMinRent] = useState<number | ''>('')
  const [maxRent, setMaxRent] = useState<number | ''>('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    // Validation
    if (!location.trim()) {
      onError('Please enter a location')
      return
    }

    if (minRent !== '' && maxRent !== '' && minRent > maxRent) {
      onError('Minimum rent cannot be greater than maximum rent')
      return
    }

    // Clear previous error
    onError(null)
    onLoadingChange(true)

    try {
      const params: SearchParams = {
        location: location.trim(),
      }

      if (bhk !== '') params.bhk = Number(bhk)
      if (minRent !== '') params.minRent = Number(minRent)
      if (maxRent !== '') params.maxRent = Number(maxRent)

      const results = await searchRentals(params)
      onResults(results)

      if (results.length === 0) {
        onError('No results found. Try adjusting your search filters.')
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to fetch results. Please try again.'
      onError(errorMessage)
      onResults([])
    } finally {
      onLoadingChange(false)
    }
  }

  const handleReset = () => {
    setLocation('HSR Layout')
    setBhk('')
    setMinRent('')
    setMaxRent('')
    onResults([])
    onError(null)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Location Field */}
      <div>
        <label htmlFor="location" className="label">
          Location *
        </label>
        <div className="space-y-2">
          <input
            id="location"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter locality (e.g., HSR Layout)"
            className="input-field"
            required
          />
          {/* Popular Localities Quick Select */}
          <div className="flex flex-wrap gap-2">
            {POPULAR_LOCALITIES.map((locality) => (
              <button
                key={locality}
                type="button"
                onClick={() => setLocation(locality)}
                className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                  location === locality
                    ? 'bg-primary-100 border-primary-500 text-primary-700'
                    : 'bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100'
                }`}
              >
                {locality}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Filters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* BHK */}
        <div>
          <label htmlFor="bhk" className="label">
            BHK
          </label>
          <select
            id="bhk"
            value={bhk}
            onChange={(e) => setBhk(e.target.value ? Number(e.target.value) : '')}
            className="input-field"
          >
            <option value="">Any</option>
            <option value="1">1 BHK</option>
            <option value="2">2 BHK</option>
            <option value="3">3 BHK</option>
            <option value="4">4 BHK</option>
            <option value="5">5+ BHK</option>
          </select>
        </div>

        {/* Min Rent */}
        <div>
          <label htmlFor="minRent" className="label">
            Min Rent (₹)
          </label>
          <input
            id="minRent"
            type="number"
            value={minRent}
            onChange={(e) => setMinRent(e.target.value ? Number(e.target.value) : '')}
            placeholder="5000"
            min="0"
            step="1000"
            className="input-field"
          />
        </div>

        {/* Max Rent */}
        <div>
          <label htmlFor="maxRent" className="label">
            Max Rent (₹)
          </label>
          <input
            id="maxRent"
            type="number"
            value={maxRent}
            onChange={(e) => setMaxRent(e.target.value ? Number(e.target.value) : '')}
            placeholder="50000"
            min="0"
            step="1000"
            className="input-field"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button type="submit" className="btn-primary flex-1 md:flex-initial">
          <span className="flex items-center justify-center gap-2">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            Search Properties
          </span>
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Reset
        </button>
      </div>
    </form>
  )
}

