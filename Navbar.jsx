// src/components/Navbar.jsx
import React, { useState } from 'react';
import SearchBar from './SearchBar.jsx';

// Accept cartItems as a prop
const Navbar = ({ siteName, onSearch, onCartClick, cartItems }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Calculate total quantity of items in the cart
  const totalCartQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  const closeSidebar = () => setIsOpen(false);

  return (
    <nav className="bg-gray-800 p-4 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center flex-wrap">
        {/* Left: Site Name */}
        <div className="flex-shrink-0 text-white text-2xl font-bold cursor-pointer">
          {siteName}
        </div>

        {/* Middle: Search Bar (appears wider on larger screens) */}
        <div className="order-3 w-full mt-3 md:order-none md:w-auto md:mt-0 md:flex-grow md:mx-8 flex justify-center">
          <SearchBar onSearch={onSearch} />
        </div>

        {/* Right: Cart (as a simple text button) and Hamburger Menu */}
        <div className="flex items-center space-x-4">
          {/* Cart button - visible on medium screens and up. Now with a count badge. */}
          <button
            onClick={onCartClick}
            className="text-white hover:text-gray-300 focus:outline-none hidden md:flex items-center space-x-1 px-3 py-2 rounded-md relative"
          >
            <span>Cart</span>
            {totalCartQuantity > 0 && ( // Conditionally render badge if items exist
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {totalCartQuantity}
              </span>
            )}
          </button>

          {/* Hamburger Menu Button (for mobile only) */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white hover:text-gray-300 focus:outline-none p-2 border border-white rounded"
            aria-label="Toggle navigation"
          >
            <span className="text-xl">☰</span>
          </button>
        </div>
      </div>

      {/* Mobile Sidebar/Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={closeSidebar}
          aria-hidden="true"
        ></div>
      )}

      {/* Sidebar Content (visible only on mobile, slides in/out) */}
      <div
        className={`fixed top-0 left-0 h-full bg-gray-800 w-48 p-4 transform transition-transform duration-300 ease-in-out z-50 md:hidden
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-white text-xl font-bold">Menu</h2>
          <button
            onClick={closeSidebar}
            className="text-white hover:text-gray-300 focus:outline-none p-2 border border-white rounded"
            aria-label="Close menu"
          >
            <span className="text-xl">X</span>
          </button>
        </div>
        <ul className="flex flex-col space-y-4 text-white">
          <li><a href="#" onClick={closeSidebar} className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700">Home</a></li>
          <li><a href="#" onClick={closeSidebar} className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700">Products</a></li>
          <li><a href="#" onClick={closeSidebar} className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700">About Us</a></li>
          <li>
            <button
              onClick={() => { onCartClick(); closeSidebar(); }}
              className="w-full text-left px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 flex items-center space-x-2 relative"
            >
              <span>View Cart</span>
              {totalCartQuantity > 0 && ( // Conditionally render badge for sidebar
                <span className="ml-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {totalCartQuantity}
                </span>
              )}
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;