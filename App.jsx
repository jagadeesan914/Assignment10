// src/App.jsx
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar.jsx';
import ProductCard from './components/ProductCard.jsx';
import FilterAndSortOptions from './components/FilterAndSortOptions.jsx';
import CartModal from './components/CartModal.jsx';
import productsData from './data/products.js';

function App() {
  const [products, setProducts] = useState(productsData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [selectedGender, setSelectedGender] = useState('All'); // NEW: State for selected gender
  const [sortOrder, setSortOrder] = useState('none');
  const [cartItems, setCartItems] = useState([]);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);

  const categories = [...new Set(productsData.map((product) => product.category))];
  const brands = [...new Set(productsData.map((product) => product.brand))];
  // NEW: Dynamically extract unique genders
  const genders = [...new Set(productsData.map((product) => product.gender))].filter(Boolean); // .filter(Boolean) removes any undefined/null if a product lacks a gender

  useEffect(() => {
    let filteredProducts = [...productsData];

    // 1. Apply Search Filter
    if (searchTerm) {
      filteredProducts = filteredProducts.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (product.brand && product.brand.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // 2. Apply Category Filter
    if (selectedCategory !== 'All') {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === selectedCategory
      );
    }

    // 3. Apply Brand Filter
    if (selectedBrand !== 'All') {
      filteredProducts = filteredProducts.filter(
        (product) => product.brand === selectedBrand
      );
    }

    // 4. Apply Gender Filter (NEW FILTER LOGIC)
    if (selectedGender !== 'All') {
      filteredProducts = filteredProducts.filter(
        (product) => product.gender === selectedGender
      );
    }

    // 5. Apply Sorting
    switch (sortOrder) {
      case 'price-asc':
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case 'rating-desc':
        filteredProducts.sort((a, b) => b.rating - a.rating);
        break;
      case 'rating-asc':
        filteredProducts.sort((a, b) => a.rating - b.rating);
        break;
      case 'brand-asc':
        filteredProducts.sort((a, b) => (a.brand || '').localeCompare(b.brand || ''));
        break;
      default:
        filteredProducts.sort((a, b) => a.id - b.id);
        break;
    }

    setProducts(filteredProducts);
  }, [searchTerm, selectedCategory, selectedBrand, selectedGender, sortOrder]); // Add selectedGender to dependencies

  const handleAddToCart = (productToAdd) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(item => item.id === productToAdd.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === productToAdd.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevItems, { ...productToAdd, quantity: 1 }];
      }
    });
  };

  const handleRemoveFromCart = (productId) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(item => item.id === productId);

      if (existingItem && existingItem.quantity > 1) {
        return prevItems.map(item =>
          item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
        );
      } else {
        return prevItems.filter(item => item.id !== productId);
      }
    });
  };

  const openCartModal = () => {
    setIsCartModalOpen(true);
  };

  const closeCartModal = () => {
    setIsCartModalOpen(false);
  };

  const handleCartIconClick = () => {
    openCartModal();
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <Navbar
        siteName="Cinderella Dresses"
        onSearch={setSearchTerm}
        onCartClick={handleCartIconClick}
        cartItems={cartItems}
      />

      <main className="container mx-auto p-5">
        <FilterAndSortOptions
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          brands={brands}
          selectedBrand={selectedBrand}
          onBrandChange={setSelectedBrand}
          genders={genders} // NEW: Pass genders list
          selectedGender={selectedGender} // NEW: Pass selected gender state
          onGenderChange={setSelectedGender} // NEW: Pass gender change handler
          sortOrder={sortOrder}
          onSortChange={setSortOrder}
        />
        <div className="flex flex-wrap justify-center gap-5 p-5">
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))
          ) : (
            <p className="text-xl text-gray-600">No products found matching your criteria.</p>
          )}
        </div>
      </main>

      {isCartModalOpen && (
        <CartModal
          cartItems={cartItems}
          onClose={closeCartModal}
          onRemoveItem={handleRemoveFromCart}
        />
      )}
    </div>
  );
}

export default App;