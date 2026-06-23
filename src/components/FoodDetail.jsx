import React from 'react'
import ReviewForm from './ReviewForm'

function FoodDetail({ spot, onUpdateSpotReviews }) {
  if (!spot) {
    return null
  }

  const handleAddReview = (newReview) => {
    const updatedReviews = [...spot.reviews, newReview]
    onUpdateSpotReviews(spot.id, updatedReviews)
  }

  return (
    <section className="food-detail">
      <h2>{spot.name} details</h2>
      <p>{spot.description}</p>

      <div className="detail-grid">
        <div>
          <h3>Location</h3>
          <p>{spot.location}</p>
        </div>
        <div>
          <h3>Hours</h3>
          <p>{spot.hours}</p>
        </div>
        <div>
          <h3>Price</h3>
          <p>{spot.priceRange}</p>
        </div>
        <div>
          <h3>Rating</h3>
          <p>{spot.rating} / 5</p>
        </div>
      </div>

      <div className="detail-section">
        <h3>Menu items</h3>
        <ul>
          {spot.menu.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="detail-section">
        <h3>Student reviews</h3>
        <div className="review-list">
          {spot.reviews.map((review) => (
            <article className="review-card" key={review.name}>
              <strong>
                {review.name} - {review.rating} / 5
              </strong>
              <p>{review.text}</p>
            </article>
          ))}
        </div>
      </div>

      <ReviewForm onAddReview={handleAddReview} />
    </section>
  )
}

export default FoodDetail