import FoodCard from './FoodCard'

function FoodList({ spots, selectedSpot, onSelectSpot }) {
  return (
    <section className="food-list" id="spots">
      <h2>Food spots near Hunter</h2>
      <p className="section-note">
        These are sample locations for now. Real places can be added later.
      </p>

      <div className="food-card-grid">
        {spots.map((spot) => (
          <FoodCard
            key={spot.id}
            spot={spot}
            isSelected={selectedSpot?.id === spot.id}
            onSelectSpot={onSelectSpot}
          />
        ))}
      </div>

      {selectedSpot && (
        <p className="selected-note">Selected: {selectedSpot.name}</p>
      )}
    </section>
  )
}

export default FoodList
