// src/components/SearchBar.jsx
import React from 'react';

const SearchBar = ({ onSearch }) => {
  return (
    <div className="mb-5 flex justify-center">
      <input
        type="text"
        placeholder="Search products..."
        onChange={(e) => onSearch(e.target.value)}
        className="w-full max-w-md px-4 py-2 border text-white border-gray-300 rounded-full text-base outline-none focus:border-blue-500 transition duration-300"
      />
    </div>
  );
};

export default SearchBar;