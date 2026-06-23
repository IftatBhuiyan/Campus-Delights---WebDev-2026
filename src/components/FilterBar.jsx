import React from 'react'
import SortDropdown from './SortDropdown'
import './FilterBar.css'

function FilterBar({ searchQuery, setSearchQuery, priceFilter, setPriceFilter, sortBy, onSortChange }) {
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

      <SortDropdown sortBy={sortBy} onSortChange={onSortChange} />

      {(searchQuery || priceFilter) && (
        <button 
          onClick={() => { setSearchQuery(''); setPriceFilter(''); }}
          className="filter-clear-btn"
        >
          Clear
        </button>
      )}
    </div>
  )
}

export default FilterBar