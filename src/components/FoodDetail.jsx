import React from 'react'
import ReviewForm from './ReviewForm'
import './FoodDetail.css'

function FoodDetail({ spot, onUpdateSpotReviews, inModal = false }) {
  if (!spot) {
    return null
  }

  const handleAddReview = (newReview) => {
    const currentReviews = spot.reviews || []
    const updatedReviews = [...currentReviews, newReview]
    onUpdateSpotReviews(spot._id || spot.id, updatedReviews)
  }

  return (
    <section className={`food-detail ${inModal ? 'food-detail--modal' : ''}`}>
      <p className="food-detail-description">{spot.description}</p>

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
        {spot.menu?.length > 0 ? (
          <ul>
            {spot.menu.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        ) : (
          <p className="detail-empty">No menu items listed.</p>
        )}
      </div>

      <div className="detail-section">
        <h3>Student reviews</h3>
        <div className="review-list">
          {spot.reviews?.length > 0 ? (
            spot.reviews.map((review, index) => (
              <article className="review-card" key={index}>
                <strong>
                  {review.name || 'Anonymous'} - {review.rating || 0} / 5
                </strong>
                <p>{review.text}</p>
              </article>
            ))
          ) : (
            <p className="detail-empty">No reviews yet. Be the first to share your experience.</p>
          )}
        </div>
      </div>

      <ReviewForm onAddReview={handleAddReview} />
    </section>
  )
}

export default FoodDetail
