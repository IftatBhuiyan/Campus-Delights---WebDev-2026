import React from 'react'
import OpenStatus from './OpenStatus'
import './FoodCard.css'

function FoodCard({ spot, isSelected, onSelectSpot }) {
  // Use optional chaining (?.) and defaults (|| []) to prevent crashes
  const reviewCount = spot.reviews?.length || 0;

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
        <div className="tag-list">
          {/* Safe mapping for tags */}
          {spot.tags?.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <OpenStatus hours={spot.hours} />
      </div>
    </button>
  )
}

export default FoodCard