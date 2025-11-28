import React from 'react'
import type { Rental } from '../types'

interface ResultCardProps {
  rental: Rental
}

export default function ResultCard({ rental }: ResultCardProps) {
  // Format rent with Indian numbering system
  const formatRent = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount)
  }

  // Format date
  const formatDate = (date: Date | string) => {
    const d = typeof date === 'string' ? new Date(date) : date
    return d.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  // Get furnishing badge color
  const getFurnishingColor = (furnishing: string | null) => {
    switch (furnishing) {
      case 'FURNISHED':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'SEMI_FURNISHED':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'UNFURNISHED':
        return 'bg-gray-100 text-gray-800 border-gray-200'
      default:
        return 'bg-gray-100 text-gray-600 border-gray-200'
    }
  }

  // Format furnishing text
  const formatFurnishing = (furnishing: string | null) => {
    if (!furnishing) return 'Not specified'
    return furnishing
      .split('_')
      .map((word) => word.charAt(0) + word.slice(1).toLowerCase())
      .join(' ')
  }

  return (
    <div className="card p-5 hover:border-primary-300 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 flex-1">
          {rental.title}
        </h3>
        <span className="ml-3 px-2 py-1 text-xs font-medium bg-primary-100 text-primary-700 rounded-full whitespace-nowrap">
          {rental.source}
        </span>
      </div>

      {/* Location */}
      <div className="flex items-center text-gray-600 mb-3">
        <svg
          className="w-4 h-4 mr-1.5 flex-shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
        <span className="text-sm">{rental.location}</span>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        {/* BHK */}
        <div className="flex flex-col">
          <span className="text-xs text-gray-500 uppercase tracking-wide">BHK</span>
          <span className="text-sm font-medium text-gray-900">
            {rental.bhk ? `${rental.bhk} BHK` : 'N/A'}
          </span>
        </div>

        {/* Rent */}
        <div className="flex flex-col">
          <span className="text-xs text-gray-500 uppercase tracking-wide">Rent</span>
          <span className="text-sm font-semibold text-primary-600">
            {formatRent(rental.rent)}/mo
          </span>
        </div>

        {/* Area */}
        <div className="flex flex-col">
          <span className="text-xs text-gray-500 uppercase tracking-wide">Area</span>
          <span className="text-sm font-medium text-gray-900">
            {rental.area_sqft ? `${rental.area_sqft} sq.ft` : 'N/A'}
          </span>
        </div>

        {/* Furnishing */}
        <div className="flex flex-col">
          <span className="text-xs text-gray-500 uppercase tracking-wide">
            Furnishing
          </span>
          <span
            className={`text-xs font-medium px-2 py-0.5 rounded border inline-block mt-0.5 ${getFurnishingColor(
              rental.furnishing
            )}`}
          >
            {formatFurnishing(rental.furnishing)}
          </span>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <span className="text-xs text-gray-500">
          Posted {formatDate(rental.posted_at)}
        </span>
        <a
          href={rental.source_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
        >
          View Details
          <svg
            className="w-4 h-4 ml-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </a>
      </div>
    </div>
  )
}

