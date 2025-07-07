// src/components/ProductCard.jsx
import React from 'react';

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden w-full sm:w-64">
     <div>
         <img
        src={product.image || 'https://via.placeholder.com/200x250?text=No+Image'} // This line is correct
        alt={product.name}
        className="w-full h-48  object-contain"
      />
     </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-2">Category: {product.category}</p>
        {product.brand && <p className="text-gray-600 text-sm mb-2">Brand: {product.brand}</p>}
        <p className="text-gray-700 mb-2 truncate">{product.description}</p>
        <div className="flex items-center justify-between mb-4">
          <span className="text-blue-600 font-bold text-lg">${product.price.toFixed(2)}</span>
          <span className="flex items-center text-yellow-500 text-sm">
            ⭐ {product.rating.toFixed(1)}
          </span>
        </div>
        <button
          onClick={() => onAddToCart(product)}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;