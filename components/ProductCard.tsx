import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (productId: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const priceInRupees = (product.price * 80).toFixed(2);
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
      <div className="h-32 w-full overflow-hidden flex items-center justify-center bg-white">
        <img src={product.image} alt={product.title} className="h-full w-auto object-contain p-2" />
      </div>
      <div className="p-3">
        <h3 className="text-sm font-semibold text-gray-800 dark:text-white truncate" title={product.title}>
          {product.title}
        </h3>
        <div className="flex justify-between items-center mt-2">
          <p className="text-lg font-bold text-indigo-600 dark:text-indigo-400">₹{priceInRupees}</p>
          <button
            onClick={() => onAddToCart(product.id)}
            className="px-3 py-1 bg-indigo-500 text-white text-xs font-bold rounded-full hover:bg-indigo-600 transition-colors"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;