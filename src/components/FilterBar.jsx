import React from 'react'

function FilterBar({ searchQuery, setSearchQuery, priceFilter, setPriceFilter }) {
  return (
    <div className="filter-container">
      <input
        type="text"
        placeholder="Search by name or cuisine (e.g., Pizza, Halal)..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="filter-search-input"
      />
      
      <select
        value={priceFilter}
        onChange={(e) => setPriceFilter(e.target.value)}
        className="filter-select-input"
      >
        <option value="">All Prices</option>
        <option value="$">$</option>
        <option value="$$">$$</option>
        <option value="$$$">$$$</option>
      </select>
    </div>
  )
}

export default FilterBar