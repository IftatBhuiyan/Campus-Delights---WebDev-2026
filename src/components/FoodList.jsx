import React, { useState } from 'react'
import FoodCard from './FoodCard'
import FilterBar from './FilterBar'
import './FoodList.css'

function FoodList({ spots, selectedSpot, onSelectSpot, sortBy, onSortChange }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [priceFilter, setPriceFilter] = useState('')

  const filteredSpots = spots.filter((spot) => {
    const matchesSearch =
      spot.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      spot.cuisine.toLowerCase().includes(searchQuery.toLowerCase())
      
    const matchesPrice = priceFilter === '' || spot.priceRange === priceFilter

    return matchesSearch && matchesPrice
  })

  return (
    <section className="food-list" id="spots">
      <h2>Food spots near Hunter</h2>
      <p className="section-note">
        These are sample locations for now. Real places can be added later.
      </p>

      <FilterBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        priceFilter={priceFilter}
        setPriceFilter={setPriceFilter}
        sortBy={sortBy}
        onSortChange={onSortChange}
      />

      {filteredSpots.length === 0 ? (
        <div className="no-results">
          <p>No spots found.</p>
        </div>
      ) : (
        <div className="food-card-grid">
          {filteredSpots.map((spot) => (
            <FoodCard
              key={spot.id}
              spot={spot}
              isSelected={selectedSpot?.id === spot.id}
              onSelectSpot={onSelectSpot}
            />
          ))}
        </div>
      )}

      {selectedSpot && (
        <p className="selected-note">Selected: {selectedSpot.name}</p>
      )}
    </section>
  )
}

export default FoodList