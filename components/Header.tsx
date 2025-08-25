
import React from 'react';
import ShoppingCartIcon from './icons/ShoppingCartIcon';

interface HeaderProps {
  cartItemCount: number;
}

const Header: React.FC<HeaderProps> = ({ cartItemCount }) => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-10">
      <div className="container mx-auto px-4 lg:px-6 py-4 flex justify-between items-center">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            <span className="text-indigo-600 dark:text-indigo-400">Shoholic</span>
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400 -mt-1">Your Virtual Shopping Assistant</p>
        </div>
        <div className="relative">
          <ShoppingCartIcon className="h-8 w-8 text-gray-600 dark:text-gray-300" />
          {cartItemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {cartItemCount}
            </span>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;