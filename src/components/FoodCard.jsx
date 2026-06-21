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
        <span>{spot.priceRange}</span>
        <span>{spot.distance}</span>
      </div>

      <div className="tag-list">
        {spot.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
    </button>
  )
}

export default FoodCard
