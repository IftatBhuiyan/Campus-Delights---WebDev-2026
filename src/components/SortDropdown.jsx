import React from 'react';
import './SortDropdown.css';

function SortDropdown({ sortBy, onSortChange }) {
  return (
    <div className="sort-dropdown-container">
      <label htmlFor="spot-sort" className="sort-label">Sort By:</label>
      <select
        id="spot-sort"
        className="sort-select"
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value)}
      >
        <option value="default">None</option>
        <option value="rating-desc">Highest Rated</option>
        <option value="distance-asc">Closest Distance</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
      </select>
    </div>
  );
}

export default SortDropdown;