import React from 'react';
import './Products.css';

const ProductFilter = ({ filters, onFilterChange }) => {
  const handleFilterChange = (filterType, value) => {
    onFilterChange({
      ...filters,
      [filterType]: value
    });
  };

  return (
    <div className="product-filters">
      <h2>Filters</h2>
      
      <div className="filter-group">
        <label>Product Type</label>
        <select
          value={filters.type}
          onChange={(e) => handleFilterChange('type', e.target.value)}
        >
          <option value="all">All Products</option>
          <option value="compost">Compost</option>
          <option value="bioenzyme">Bioenzyme</option>
        </select>
      </div>

      <div className="filter-group">
        <label>Price Range</label>
        <select
          value={filters.priceRange}
          onChange={(e) => handleFilterChange('priceRange', e.target.value)}
        >
          <option value="all">All Prices</option>
          <option value="0-300">Under ₹300</option>
          <option value="301-600">₹301 - ₹600</option>
          <option value="601+">Above ₹600</option>
        </select>
      </div>

      <div className="filter-group">
        <label>Size/Quantity</label>
        <select
          value={filters.size}
          onChange={(e) => handleFilterChange('size', e.target.value)}
        >
          <option value="all">All Sizes</option>
          <option value="small">Small (1-5L/kg)</option>
          <option value="medium">Medium (6-15L/kg)</option>
          <option value="large">Large (more than 15L/kg)</option>
        </select>
      </div>

      <div className="filter-group">
        <label>Application</label>
        <select
          value={filters.application}
          onChange={(e) => handleFilterChange('application', e.target.value)}
        >
          <option value="all">All Applications</option>
          <option value="garden">Home Garden</option>
          <option value="farm">Agriculture</option>
          <option value="landscape">Landscaping</option>
        </select>
      </div>

      <button 
        className="clear-filters-btn"
        onClick={() => onFilterChange({
          type: 'all',
          priceRange: 'all',
          size: 'all',
          application: 'all'
        })}
      >
        Clear Filters
      </button>
    </div>
  );
};

export default ProductFilter;