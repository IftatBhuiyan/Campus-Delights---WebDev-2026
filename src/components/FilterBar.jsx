import React from 'react'
import SortDropdown from './SortDropdown'
import './FilterBar.css'

function FilterBar({
  searchQuery,
  setSearchQuery,
  searchSuggestions,
  priceFilter,
  setPriceFilter,
  walkingTimeFilter,
  setWalkingTimeFilter,
  openNowOnly,
  setOpenNowOnly,
  bestForFilter,
  setBestForFilter,
  bestForOptions,
  sortBy,
  onSortChange,
}) {
  return (
    <div className="filter-container">
      <div className="filter-search-wrap">
        <input
          type="text"
          list="food-spot-suggestions"
          placeholder="Search by restaurant, cuisine, or vibe..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="filter-search-input"
        />

        <datalist id="food-spot-suggestions">
          {searchSuggestions.map((suggestion) => (
            <option key={suggestion} value={suggestion} />
          ))}
        </datalist>
      </div>
      
      <select
        value={priceFilter}
        onChange={(e) => setPriceFilter(e.target.value)}
        className="filter-select-input"
      >
        <option value="">Budget</option>
        <option value="$">$</option>
        <option value="$$">$$</option>
        <option value="$$$">$$$</option>
      </select>

      <select
        value={walkingTimeFilter}
        onChange={(e) => setWalkingTimeFilter(e.target.value)}
        className="filter-select-input"
      >
        <option value="">Walk time</option>
        <option value="5">Within 5 min</option>
        <option value="10">Within 10 min</option>
        <option value="15">Within 15 min</option>
        <option value="20">Within 20 min</option>
      </select>

      <select
        value={bestForFilter}
        onChange={(e) => setBestForFilter(e.target.value)}
        className="filter-select-input"
      >
        <option value="">Best for</option>
        {bestForOptions.map((label) => (
          <option key={label} value={label}>
            {label}
          </option>
        ))}
      </select>

      <label className="filter-checkbox">
        <input
          type="checkbox"
          checked={openNowOnly}
          onChange={(e) => setOpenNowOnly(e.target.checked)}
        />
        Open now
      </label>

      <SortDropdown sortBy={sortBy} onSortChange={onSortChange} />

      {(searchQuery || priceFilter || walkingTimeFilter || openNowOnly || bestForFilter) && (
        <button 
          onClick={() => {
            setSearchQuery('')
            setPriceFilter('')
            setWalkingTimeFilter('')
            setOpenNowOnly(false)
            setBestForFilter('')
          }}
          className="filter-clear-btn"
        >
          Clear
        </button>
      )}
    </div>
  )
}

export default FilterBar