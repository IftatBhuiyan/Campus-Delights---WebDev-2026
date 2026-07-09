import './FoodSpotsHero.css'

function FoodSpotsHero({ spots = [] }) {
  const totalReviews = spots.reduce((acc, spot) => acc + (spot.reviews?.length || 0), 0)
  const budgetCount = spots.filter((spot) => spot.priceRange === '$').length
  const avgRating =
    spots.length > 0
      ? (spots.reduce((acc, spot) => acc + (spot.rating || 0), 0) / spots.length).toFixed(1)
      : '0.0'

  return (
    <>
      <section className="food-spots-hero" aria-label="Food spots introduction">
        <div className="food-spots-hero-overlay" />
        <div className="food-spots-hero-copy">
          <p className="food-spots-hero-label">Hunter College, Upper East Side</p>
          <h1>
            Hungry between classes?
            <span>We have got you covered.</span>
          </h1>
          <p className="food-spots-hero-text">
            {spots.length} student-approved food spots within walking distance of Hunter — rated,
            reviewed, and filtered so you can eat well on any budget.
          </p>
          <div className="food-spots-hero-features">
            <span>Budget-friendly picks</span>
            <span>Quick options available</span>
            <span>Student reviewed</span>
          </div>
        </div>
      </section>

      <section className="food-spots-stats" aria-label="Food spots stats">
        <div className="food-spots-stats-grid">
          <div>
            <strong>{spots.length}+</strong>
            <span>Food spots</span>
          </div>
          <div>
            <strong>{budgetCount}</strong>
            <span>Under $10 options</span>
          </div>
          <div>
            <strong>{totalReviews}</strong>
            <span>Student reviews</span>
          </div>
          <div>
            <strong>{avgRating}</strong>
            <span>Avg rating</span>
          </div>
        </div>
      </section>
    </>
  )
}

export default FoodSpotsHero
