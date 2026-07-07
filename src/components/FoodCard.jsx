import React from 'react'
import OpenStatus from './OpenStatus'
import { getBestForLabels } from '../utils/foodSpotHelpers'
import './FoodCard.css'

function FoodCard({ spot, isSelected, onSelectSpot }) {
  const reviewCount = spot.reviews?.length || 0
  const bestForLabels = getBestForLabels(spot)

  return (
    <button
      className={`food-card ${isSelected ? 'selected' : ''}`}
      type="button"
      onClick={() => onSelectSpot(spot)}
    >
      <div className="food-card-header">
        <div>
          <h3>{spot.name}</h3>
          <p>{spot.cuisine}</p>
        </div>
        <strong>{spot.rating} / 5</strong>
      </div>

      {/* Added fallback for description */}
      <p>{spot.description || 'No description available.'}</p>

      <div className="food-card-info">
        <div className="food-card-stats-left">
          <span className="price-text">{spot.priceRange || 'N/A'}</span>
          <span className="dot-separator">•</span>
          <span className="distance-text">{spot.distance || 'N/A'}</span>
        </div>
        <span className="review-count-badge">
          {/* Using the safe reviewCount variable here */}
          💬 {reviewCount} {reviewCount === 1 ? 'review' : 'reviews'}
        </span>
      </div>

      <div className="food-card-bottom-row">
        <div className="food-card-chip-stack">
          {bestForLabels.length > 0 && (
            <div className="chip-group">
              <span className="chip-group-label">Best for</span>
              <div className="tag-list">
                {bestForLabels.map((tag) => (
                  <span key={tag} className="best-for-chip">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {spot.tags?.length > 0 && (
            <div className="chip-group">
              <span className="chip-group-label">Tags</span>
              <div className="tag-list">
                {spot.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>
          )}
        </div>
        <OpenStatus hours={spot.hours} />
      </div>
    </button>
  )
}

export default FoodCard