import React from 'react'
import ReviewForm from './ReviewForm'
import './FoodDetail.css'

function FoodDetail({ spot, onUpdateSpotReviews }) {
  if (!spot) {
    return null
  }

  const handleAddReview = (newReview) => {
    // Safe fallback for current reviews array
    const currentReviews = spot.reviews || [];
    const updatedReviews = [...currentReviews, newReview]
    onUpdateSpotReviews(spot._id, updatedReviews) // Changed spot.id to spot._id for MongoDB
  }

  return (
    <section className="food-detail">
      <h2>{spot.name} details</h2>
      <p>{spot.description}</p>

      <div className="detail-grid">
        <div>
          <h3>Location</h3>
          <p>{spot.location || 'N/A'}</p>
        </div>
        <div>
          <h3>Hours</h3>
          <p>{spot.hours || 'N/A'}</p>
        </div>
        <div>
          <h3>Price</h3>
          <p>{spot.priceRange || 'N/A'}</p>
        </div>
        <div>
          <h3>Rating</h3>
          <p>{spot.rating || 0} / 5</p>
        </div>
      </div>

      <div className="detail-section">
        <h3>Menu items</h3>
        <ul>
          {/* Safe map for menu items */}
          {spot.menu?.map((item, index) => (
            <li key={index}>{item}</li>
          )) || <li>No menu items listed.</li>}
        </ul>
      </div>

      <div className="detail-section">
        <h3>Student reviews</h3>
        <div className="review-list">
          {/* Safe map for reviews */}
          {spot.reviews?.map((review, index) => (
            <article className="review-card" key={index}>
              <strong>
                {review.name || 'Anonymous'} - {review.rating || 0} / 5
              </strong>
              <p>{review.text}</p>
            </article>
          )) || <p>No reviews yet.</p>}
        </div>
      </div>

      <ReviewForm onAddReview={handleAddReview} />
    </section>
  )
}

export default FoodDetail