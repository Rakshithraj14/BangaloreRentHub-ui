import React from 'react'
import ResultCard from './ResultCard'
import type { Rental } from '../types'

interface ResultsListProps {
  items: Rental[]
  loading: boolean
}

export default function ResultsList({ items, loading }: ResultsListProps) {
  // Loading state
  if (loading) {
    return (
      <div className="mt-8">
        <div className="flex flex-col items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          <p className="mt-4 text-gray-600">Searching for properties...</p>
          <p className="mt-1 text-sm text-gray-500">
            This may take a few moments while we fetch fresh listings
          </p>
        </div>
      </div>
    )
  }

  // Empty state - no search performed yet
  if (items.length === 0) {
    return (
      <div className="mt-8">
        <div className="text-center py-12">
          <svg
            className="mx-auto h-16 w-16 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          <h3 className="mt-4 text-lg font-medium text-gray-900">
            Start your search
          </h3>
          <p className="mt-2 text-sm text-gray-500 max-w-md mx-auto">
            Enter a location and adjust filters above to find rental properties in
            Bangalore. We'll search across multiple platforms to bring you the best
            results.
          </p>
        </div>
      </div>
    )
  }

  // Results display
  return (
    <div className="mt-8">
      {/* Results Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          {items.length} {items.length === 1 ? 'Property' : 'Properties'} Found
        </h2>
        
        {/* Sort/Filter options could go here in future */}
        <div className="text-sm text-gray-500">
          Sorted by relevance
        </div>
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 gap-4">
        {items.map((rental, index) => (
          <ResultCard key={rental.id || `${rental.source_url}-${index}`} rental={rental} />
        ))}
      </div>

      {/* Load More / Pagination could go here */}
      {items.length >= 50 && (
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Showing first 50 results. Refine your search for more specific results.
          </p>
        </div>
      )}
    </div>
  )
}

