
export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export enum MessageSender {
  USER = 'user',
  AI = 'ai'
}

export interface ChatMessage {
  id: number;
  text: string;
  sender: MessageSender;
  products?: Product[];
}

export interface GeminiResponse {
  reply: string;
  action: 'RECOMMEND_PRODUCTS' | 'ADD_TO_CART' | 'SUMMARIZE_CART' | 'NONE';
  productIds: number[];
}
