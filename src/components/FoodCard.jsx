import React from 'react'
import OpenStatus from './OpenStatus'
import './FoodCard.css'

function FoodCard({ spot, isSelected, onSelectSpot }) {
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

      <p>{spot.description}</p>

      <div className="food-card-info">
        <div className="food-card-stats-left">
          <span className="price-text">{spot.priceRange}</span>
          <span className="dot-separator">•</span>
          <span className="distance-text">{spot.distance}</span>
        </div>
        <span className="review-count-badge">
          💬 {spot.reviews.length} {spot.reviews.length === 1 ? 'review' : 'reviews'}
        </span>
      </div>

      {/* This bottom row spreads the tag pills and the status badge */}
      <div className="food-card-bottom-row">
        <div className="tag-list">
          {spot.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <OpenStatus hours={spot.hours} />
      </div>
    </button>
  )
}

export default FoodCard