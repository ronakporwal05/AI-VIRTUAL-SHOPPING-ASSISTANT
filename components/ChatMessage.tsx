
import React from 'react';
import { ChatMessage, MessageSender } from '../types';
import ProductCard from './ProductCard';
import BotIcon from './icons/BotIcon';
import UserIcon from './icons/UserIcon';

interface ChatMessageProps {
  message: ChatMessage;
  onAddToCart: (productId: number) => void;
}

const ChatMessageComponent: React.FC<ChatMessageProps> = ({ message, onAddToCart }) => {
  const isUser = message.sender === MessageSender.USER;

  const messageAlignment = isUser ? 'justify-end' : 'justify-start';
  const bubbleColor = isUser
    ? 'bg-indigo-600 text-white'
    : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200';
  const bubbleStyles = `rounded-lg p-3 max-w-lg shadow ${bubbleColor}`;

  return (
    <div className={`flex items-end gap-3 ${messageAlignment}`}>
      {!isUser && (
        <div className="flex-shrink-0">
          <BotIcon className="w-8 h-8 text-indigo-500" />
        </div>
      )}
      <div className="flex flex-col gap-2">
        <div className={bubbleStyles}>
          <p className="whitespace-pre-wrap">{message.text}</p>
        </div>
        {message.products && message.products.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl">
            {message.products.map(product => (
              <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
            ))}
          </div>
        )}
      </div>
       {isUser && (
        <div className="flex-shrink-0">
          <UserIcon className="w-8 h-8 text-gray-500" />
        </div>
      )}
    </div>
  );
};

export default ChatMessageComponent;
