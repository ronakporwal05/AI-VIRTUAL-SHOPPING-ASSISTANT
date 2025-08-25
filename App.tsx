import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Product, ChatMessage, CartItem, MessageSender, GeminiResponse } from './types';
import { fetchProducts } from './services/fakeStoreApi';
import { initializeGemini, getAiResponse } from './services/geminiService';
import Header from './components/Header';
import ChatInterface from './components/ChatInterface';
import Cart from './components/Cart';
import ApiKeyPrompt from './components/ApiKeyPrompt';
import CheckoutSuccess from './components/CheckoutSuccess';

const WELCOME_MESSAGE: ChatMessage = {
  id: Date.now(),
  text: "Hello! I'm your virtual shopping assistant. How can I help you find the perfect item today? You can ask me for recommendations, search for products, or tell me about your style.",
  sender: MessageSender.AI,
};

export default function App() {
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAiTyping, setIsAiTyping] = useState<boolean>(false);
  const [isCheckoutComplete, setIsCheckoutComplete] = useState<boolean>(false);
  const productsRef = useRef<Product[]>([]);

  useEffect(() => {
    productsRef.current = products;
  }, [products]);

  const addToCart = useCallback((productId: number) => {
    const productToAdd = productsRef.current.find(p => p.id === productId);
    if (!productToAdd) return;

    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.product.id === productId);
      if (existingItem) {
        return prevItems.map(item =>
          item.product.id === productId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { product: productToAdd, quantity: 1 }];
    });
  }, []);

  const processAiResponse = useCallback((response: GeminiResponse) => {
      const aiMessage: ChatMessage = {
          id: Date.now(),
          text: response.reply,
          sender: MessageSender.AI,
      };

      if (response.action === 'RECOMMEND_PRODUCTS' && response.productIds.length > 0) {
          const recommendedProducts = productsRef.current.filter(p => response.productIds.includes(p.id));
          if (recommendedProducts.length > 0) {
              aiMessage.products = recommendedProducts;
          }
      }
      
      if (response.action === 'ADD_TO_CART' && response.productIds.length > 0) {
          addToCart(response.productIds[0]);
          const addedProduct = productsRef.current.find(p => p.id === response.productIds[0]);
          if (addedProduct) {
             aiMessage.text += `\n\nI've added the ${addedProduct.title} to your cart!`;
          }
      }

      setChatMessages(prev => [...prev, aiMessage]);
  }, [addToCart]);


  const handleSendMessage = useCallback(async (message: string) => {
    const userMessage: ChatMessage = { id: Date.now(), text: message, sender: MessageSender.USER };
    setChatMessages(prev => [...prev, userMessage]);
    setIsAiTyping(true);

    try {
      const aiResponse = await getAiResponse(message, chatMessages, products);
      if (aiResponse) {
        processAiResponse(aiResponse);
      } else {
        throw new Error("Received an empty response from AI.");
      }
    } catch (error) {
      console.error("Error getting AI response:", error);
      const errorMessage: ChatMessage = {
        id: Date.now() + 1,
        text: "I'm sorry, I'm having trouble connecting right now. Please try again later.",
        sender: MessageSender.AI,
      };
      setChatMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsAiTyping(false);
    }
  }, [chatMessages, products, processAiResponse]);

  const initializeApp = useCallback(async () => {
    try {
      setIsLoading(true);
      const fetchedProducts = await fetchProducts();
      setProducts(fetchedProducts);
      setChatMessages([WELCOME_MESSAGE]);
    } catch (error) {
      console.error("Failed to fetch products:", error);
       const errorMessage: ChatMessage = {
        id: Date.now(),
        text: "Sorry, I couldn't load the product catalog. Please refresh the page to try again.",
        sender: MessageSender.AI,
      };
      setChatMessages([errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  const handleApiKeySubmit = (key: string) => {
    try {
        initializeGemini(key);
        setApiKey(key);
        initializeApp();
    } catch (error) {
        console.error("Failed to initialize Gemini:", error);
        alert("Failed to initialize with the provided API key. Please check the console for details.");
    }
  };


  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      setCartItems(prevItems => prevItems.filter(item => item.product.id !== productId));
    } else {
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.product.id === productId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const handleCheckout = () => {
    setIsCheckoutComplete(true);
  };

  const handleNewSession = () => {
    setIsCheckoutComplete(false);
    setCartItems([]);
    setChatMessages([WELCOME_MESSAGE]);
  };

  if (!apiKey) {
      return <ApiKeyPrompt onSubmit={handleApiKeySubmit} />;
  }

  if (isCheckoutComplete) {
      return <CheckoutSuccess onNewSession={handleNewSession} />;
  }

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen font-sans text-gray-800 dark:text-gray-200 flex flex-col">
      <Header cartItemCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)} />
      <main className="flex-grow flex flex-col lg:flex-row container mx-auto p-4 lg:p-6 gap-6">
        <div className="lg:w-2/3 flex flex-col h-[85vh]">
          <ChatInterface
            messages={chatMessages}
            onSendMessage={handleSendMessage}
            isLoading={isLoading}
            isAiTyping={isAiTyping}
            onAddToCart={addToCart}
          />
        </div>
        <div className="lg:w-1/3 flex flex-col">
          <Cart cartItems={cartItems} onUpdateQuantity={updateQuantity} onCheckout={handleCheckout} />
        </div>
      </main>
    </div>
  );
}