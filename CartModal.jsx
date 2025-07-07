// src/components/CartModal.jsx
import React from 'react';

const CartModal = ({ cartItems, onClose, onRemoveItem }) => {
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto relative">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Your Shopping Cart</h2>

        {cartItems.length === 0 ? (
          <p className="text-gray-600 mb-4">Your cart is empty.</p>
        ) : (
          <>
            <div className="space-y-4 mb-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center border-b pb-2 last:border-b-0">
                  <img
                    src={item.image || 'https://via.placeholder.com/50'}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded mr-4"
                  />
                  <div className="flex-grow">
                    <h3 className="font-semibold text-lg text-gray-800">{item.name}</h3>
                    {item.brand && <p className="text-sm text-gray-500">Brand: {item.brand}</p>} {/* NEW: Display Brand */}
                    <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                    <p className="text-md text-blue-600 font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="ml-4 p-1 text-gray-500 hover:text-red-500 rounded-full hover:bg-gray-100 transition duration-200 focus:outline-none"
                    aria-label={`Remove ${item.name}`}
                  >
                    <span className="text-xl font-bold">X</span>
                  </button>
                </div>
              ))}
            </div>
            <div className="border-t pt-4 mt-4">
              <p className="text-lg font-semibold text-gray-800">Total Items: {totalItems}</p>
              <p className="text-xl font-bold text-blue-700">Total Price: ${totalPrice.toFixed(2)}</p>
            </div>
          </>
        )}

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition duration-200"
          >
            Close
          </button>
          {cartItems.length > 0 && (
            <button
              onClick={() => {
                alert(`Success! Your order for ${totalItems} items totaling $${totalPrice.toFixed(2)} has been placed.`);
                onClose();
              }}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
            >
              Proceed to Checkout
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartModal;