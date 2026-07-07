import React, { useState } from 'react'
import FoodCard from './FoodCard'
import FilterBar from './FilterBar'
import {
  buildSearchSuggestions,
  estimateWalkingMinutes,
  getBestForLabels,
  isSpotOpen,
  normalizeText,
} from '../utils/foodSpotHelpers'
import './FoodList.css'

function FoodList({ spots, selectedSpot, onSelectSpot, sortBy, onSortChange }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [priceFilter, setPriceFilter] = useState('')
  const [walkingTimeFilter, setWalkingTimeFilter] = useState('')
  const [openNowOnly, setOpenNowOnly] = useState(false)
  const [bestForFilter, setBestForFilter] = useState('')

  const searchSuggestions = buildSearchSuggestions(spots)
  const bestForOptions = [...new Set(spots.flatMap((spot) => getBestForLabels(spot)))].sort(
    (left, right) => left.localeCompare(right),
  )

  const filteredSpots = spots.filter((spot) => {
    const searchTerm = normalizeText(searchQuery)
    const searchableText = [spot.name, spot.cuisine, ...(spot.tags || []), ...getBestForLabels(spot)]
      .map((value) => normalizeText(value))
      .join(' ')
    const matchesSearch = !searchTerm || searchableText.includes(searchTerm)
    const matchesPrice = priceFilter === '' || spot.priceRange === priceFilter
    const matchesWalkingTime =
      walkingTimeFilter === '' || estimateWalkingMinutes(spot.distance) <= Number(walkingTimeFilter)
    const matchesOpenNow = !openNowOnly || isSpotOpen(spot.hours)
    const matchesBestFor =
      bestForFilter === '' ||
      getBestForLabels(spot).some((label) => normalizeText(label) === normalizeText(bestForFilter))

    return matchesSearch && matchesPrice && matchesWalkingTime && matchesOpenNow && matchesBestFor
  })

  return (
    <section className="food-list" id="spots">
      <h2>Food spots near Hunter</h2>
      <p className="section-note">
        Click any spot to view full details in a quick panel — no scrolling required.
      </p>

      <FilterBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        searchSuggestions={searchSuggestions}
        priceFilter={priceFilter}
        setPriceFilter={setPriceFilter}
        walkingTimeFilter={walkingTimeFilter}
        setWalkingTimeFilter={setWalkingTimeFilter}
        openNowOnly={openNowOnly}
        setOpenNowOnly={setOpenNowOnly}
        bestForFilter={bestForFilter}
        setBestForFilter={setBestForFilter}
        bestForOptions={bestForOptions}
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
    </section>
  )
}

export default FoodList