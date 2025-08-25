import React from 'react';
import CheckCircleIcon from './icons/CheckCircleIcon';

interface CheckoutSuccessProps {
    onNewSession: () => void;
}

const CheckoutSuccess: React.FC<CheckoutSuccessProps> = ({ onNewSession }) => {
    return (
        <div className="bg-gray-100 dark:bg-gray-900 min-h-screen flex items-center justify-center font-sans">
            <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-lg mx-auto">
                <CheckCircleIcon className="w-20 h-20 text-green-500 mx-auto mb-4" />
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Checkout Complete!</h1>
                <p className="text-gray-600 dark:text-gray-300 mb-6">Thank you for your purchase. Your order has been placed successfully.</p>
                <button
                    onClick={onNewSession}
                    className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
                >
                    Start New Shopping Session
                </button>
            </div>
        </div>
    );
};

export default CheckoutSuccess;
