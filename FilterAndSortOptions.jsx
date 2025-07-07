// src/components/FilterAndSortOptions.jsx
import React from 'react';

const FilterAndSortOptions = ({
  categories,
  selectedCategory,
  onCategoryChange,
  brands,
  selectedBrand,
  onBrandChange,
  genders, // NEW PROP
  selectedGender, // NEW PROP
  onGenderChange, // NEW PROP
  sortOrder,
  onSortChange,
}) => {
  return (
    <div className="flex flex-wrap justify-center gap-6 mb-5">
      {/* Filter by Category */}
      <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg border border-gray-200">
        <label htmlFor="category-select" className="font-semibold text-gray-700">Filter by Category:</label>
        <select
          id="category-select"
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="p-2 border border-gray-300 rounded-md text-base cursor-pointer bg-white outline-none focus:border-blue-500 transition duration-300"
        >
          <option value="All">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Filter by Brand */}
      <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg border border-gray-200">
        <label htmlFor="brand-select" className="font-semibold text-gray-700">Filter by Brand:</label>
        <select
          id="brand-select"
          value={selectedBrand}
          onChange={(e) => onBrandChange(e.target.value)}
          className="p-2 border border-gray-300 rounded-md text-base cursor-pointer bg-white outline-none focus:border-blue-500 transition duration-300"
        >
          <option value="All">All Brands</option>
          {brands.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </div>

      {/* Filter by Gender (NEW FILTER DROPDOWN) */}
      <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg border border-gray-200">
        <label htmlFor="gender-select" className="font-semibold text-gray-700">Filter by Gender:</label>
        <select
          id="gender-select"
          value={selectedGender}
          onChange={(e) => onGenderChange(e.target.value)}
          className="p-2 border border-gray-300 rounded-md text-base cursor-pointer bg-white outline-none focus:border-blue-500 transition duration-300"
        >
          <option value="All">All Genders</option>
          {genders.map((gender) => (
            <option key={gender} value={gender}>
              {gender}
            </option>
          ))}
        </select>
      </div>

      {/* Sort by Price/Rating/Brand */}
      <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg border border-gray-200">
        <label htmlFor="sort-select" className="font-semibold text-gray-700">Sort by:</label>
        <select
          id="sort-select"
          value={sortOrder}
          onChange={(e) => onSortChange(e.target.value)}
          className="p-2 border border-gray-300 rounded-md text-base cursor-pointer bg-white outline-none focus:border-blue-500 transition duration-300"
        >
          <option value="none">No Sort</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating-desc">Rating: High to Low</option>
          <option value="rating-asc">Rating: Low to High</option>
          <option value="brand-asc">Brand: A to Z</option>
        </select>
      </div>
    </div>
  );
};

export default FilterAndSortOptions;