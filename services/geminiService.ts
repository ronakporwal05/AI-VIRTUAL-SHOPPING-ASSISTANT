import { GoogleGenAI, Type } from "@google/genai";
import { Product, ChatMessage, GeminiResponse } from '../types';

let ai: GoogleGenAI | null = null;

export const initializeGemini = (apiKey: string) => {
  if (!apiKey) {
    throw new Error("API key is required to initialize Gemini.");
  }
  ai = new GoogleGenAI({ apiKey });
};


const schema = {
  type: Type.OBJECT,
  properties: {
    reply: {
      type: Type.STRING,
      description: "A friendly, conversational reply to the user's message."
    },
    action: {
      type: Type.STRING,
      description: "The action to perform. Must be one of: 'RECOMMEND_PRODUCTS', 'ADD_TO_CART', 'SUMMARIZE_CART', or 'NONE'.",
    },
    productIds: {
      type: Type.ARRAY,
      description: "An array of product IDs (as numbers) related to the action. For example, products to recommend or add to the cart. Can be an empty array if not applicable.",
      items: {
        type: Type.NUMBER,
      }
    }
  },
  required: ['reply', 'action', 'productIds']
};


export const getAiResponse = async (
    userMessage: string,
    chatHistory: ChatMessage[],
    products: Product[]
): Promise<GeminiResponse | null> => {

    if (!ai) {
        throw new Error("Gemini AI service has not been initialized. Please call initializeGemini(apiKey) first.");
    }

    const simplifiedProducts = products.map(({ id, title, price, category, description }) => ({ id, title, price, category, description }));

    const prompt = `
        You are a world-class virtual shopping assistant for an online store called "StyleSphere".
        Your goal is to help users find products they love based on their preferences, style, and budget.
        You must be friendly, helpful, and conversational.
        All prices in the catalog are in USD. The user will see prices in Indian Rupees (₹), where 1 USD is approximately 80 INR. When discussing budget with the user, please consider this conversion.
        You will be given the user's latest message, the entire chat history, and a list of available products in JSON format.
        Based on this information, you must decide on the best response and action.

        You MUST respond with a single valid JSON object that adheres to the provided schema. Do not wrap it in markdown backticks.

        Here is the product catalog (a subset for brevity):
        ${JSON.stringify(simplifiedProducts.slice(0, 20), null, 2)}

        Here is the chat history (user and your previous responses):
        ${JSON.stringify(chatHistory, null, 2)}

        Here is the user's new message:
        "${userMessage}"

        Analyze the user's request in the context of the chat history and product catalog.
        - If the user asks to add something to the cart, use the 'ADD_TO_CART' action and include the ID of the most relevant product. If multiple, pick one and ask for clarification.
        - If the user asks for recommendations (e.g., "show me jackets", "something for my dad", "a dress under ₹4000"), use the 'RECOMMEND_PRODUCTS' action and provide an array of relevant product IDs. Limit recommendations to 2-4 items.
        - If the user wants to see their cart or get a summary, use the 'SUMMARIZE_CART' action.
        - If the user's message is a greeting, small talk, or an unrelated question, use the 'NONE' action and provide a helpful, conversational reply.
        - Be proactive. If a user seems unsure, ask clarifying questions about their style, budget, or occasion.
        - Your 'reply' should always be a natural language text response to the user.

        Now, provide your JSON response.
    `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: schema,
                temperature: 0.5,
            }
        });

        const jsonText = response.text.trim();
        const parsedResponse: GeminiResponse = JSON.parse(jsonText);
        return parsedResponse;
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        return null;
    }
};