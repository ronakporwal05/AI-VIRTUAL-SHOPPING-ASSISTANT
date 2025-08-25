import React from 'react';
import { CartItem } from '../types';
import ShoppingCartIcon from './icons/ShoppingCartIcon';

interface CartProps {
  cartItems: CartItem[];
  onUpdateQuantity: (productId: number, newQuantity: number) => void;
  onCheckout: () => void;
}

const Cart: React.FC<CartProps> = ({ cartItems, onUpdateQuantity, onCheckout }) => {
  const totalPrice = cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
  const totalPriceInRupees = (totalPrice * 80).toFixed(2);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg flex flex-col h-full max-h-[85vh]">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center gap-3">
        <ShoppingCartIcon className="h-6 w-6 text-gray-600 dark:text-gray-300" />
        <h2 className="text-xl font-bold">Your Cart</h2>
      </div>
      <div className="flex-grow p-4 overflow-y-auto">
        {cartItems.length === 0 ? (
          <div className="text-center text-gray-500 py-10">
            <p>Your cart is empty.</p>
            <p className="text-sm mt-2">Ask the assistant to add some items!</p>
          </div>
        ) : (
          <ul className="space-y-4">
            {cartItems.map(item => {
              const itemPriceInRupees = (item.product.price * 80).toFixed(2);
              return (
                <li key={item.product.id} className="flex items-center gap-4">
                  <img src={item.product.image} alt={item.product.title} className="w-16 h-16 object-contain rounded-md bg-white p-1" />
                  <div className="flex-grow">
                    <p className="font-semibold text-sm truncate">{item.product.title}</p>
                    <p className="text-gray-500 dark:text-gray-400">₹{itemPriceInRupees}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)} className="px-2 py-0.5 border rounded-md">-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)} className="px-2 py-0.5 border rounded-md">+</button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 mt-auto">
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-semibold">Total:</span>
          <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">₹{totalPriceInRupees}</span>
        </div>
        <button
          onClick={onCheckout}
          className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors disabled:bg-gray-400"
          disabled={cartItems.length === 0}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;