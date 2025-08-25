# Shoholic: Your Virtual Shopping Assistant

Welcome to Shoholic, a conversational AI-powered shopping assistant designed to help you discover products in real-time based on your preferences.

## 🚀 Features

*   **Conversational Interface**: Chat naturally with an AI to get product recommendations.
*   **Real-time Product Search**: Powered by the Google Gemini API with Google Search grounding, the assistant can find current products, prices, and images from across the web.
*   **Interactive Shopping Cart**: Add items to your cart directly from the chat and manage quantities.
*   **Source Linking**: For transparency, the AI provides links to the websites where it found the product information.
*   **Secure API Key Handling**: Your Google Gemini API key is requested at the start of each session and is only stored in memory, ensuring it's not exposed or saved.

## 🛠️ Tech Stack

*   **Frontend**: React with TypeScript
*   **Styling**: Tailwind CSS
*   **AI & Search**: Google Gemini API (`gemini-2.5-flash` model with Google Search grounding)

## ⚙️ Getting Started

### Prerequisites

*   A modern web browser (like Chrome, Firefox, or Safari).
*   A Google Gemini API key.

### Installation & Setup

1.  **Get a Gemini API Key**:
    *   Visit [Google AI Studio](https://aistudio.google.com/app/apikey) to generate your free API key.

2.  **Run the Application**:
    *   This is a fully client-side application. No build step is required.
    *   Simply download all the project files and open the `index.html` file in your web browser.
    *   For the best experience, it's recommended to serve the files using a local web server (e.g., using the "Live Server" extension in VS Code, or running `python -m http.server` in the project directory).

### How to Use

1.  When you first open the application, you will be prompted to enter your Google Gemini API key.
2.  Paste your key into the input field and click "Start Shopping".
3.  Start chatting with the assistant! You can ask for recommendations like:
    *   "Find me a red dress for under ₹5000"
    *   "I need some new running shoes"
    *   "What are the most popular headphones right now?"
