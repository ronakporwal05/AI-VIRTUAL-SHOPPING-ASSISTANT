import React, { useState } from 'react';

interface ApiKeyPromptProps {
  onSubmit: (apiKey: string) => void;
}

const ApiKeyPrompt: React.FC<ApiKeyPromptProps> = ({ onSubmit }) => {
  const [apiKey, setApiKey] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      onSubmit(apiKey.trim());
    }
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen flex items-center justify-center font-sans">
      <div className="w-full max-w-md mx-auto p-8 bg-white dark:bg-gray-800 rounded-lg shadow-xl">
        <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-2">
          <span className="text-indigo-600 dark:text-indigo-400">Shoholic</span>
        </h1>
        <p className="text-center text-gray-500 dark:text-gray-400 mb-6">
          Your Virtual Shopping Assistant
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Enter your Google Gemini API Key to begin
            </label>
            <input
              id="apiKey"
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              placeholder="Enter your key here"
              required
            />
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-6">
            Your key is used only to communicate with the Gemini API and is not stored or shared.
          </p>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors disabled:bg-indigo-400"
            disabled={!apiKey.trim()}
          >
            Start Shopping
          </button>
        </form>
      </div>
    </div>
  );
};

export default ApiKeyPrompt;
