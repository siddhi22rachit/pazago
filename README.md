# 🌤️ Weather Chat Agent

A modern, responsive React web application that allows users to chat with an AI-powered weather agent. Get instant weather information, forecasts, and climate data through a simple and intuitive chat interface.

## ✨ Features

- **Single-Question Chat Interface**: Ask weather-related questions and get instant responses
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Real-time Loading States**: Visual feedback while waiting for API responses
- **Error Handling**: Graceful error handling with user-friendly messages
- **Modern UI**: Clean, modern design with smooth animations
- **Accessibility**: Keyboard navigation and screen reader friendly

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd weather-chat-agent
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   The `.env` file is already configured with the default API endpoint:
   ```env
   VITE_API_URL=https://millions-screeching-vultur.mastra.cloud/api/agents/weatherAgent/stream
   VITE_THREAD_ID=weather-chat-thread-001
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:3000` to see the application.

## 🏗️ Project Structure

```
src/
├── api.js              # API integration and error handling
├── App.jsx             # Main application component
├── main.jsx            # React entry point
├── index.css           # Global Tailwind CSS styles
└── components/
    └── ChatBox.jsx     # Chat interface component

.env                    # Environment variables
package.json           # Project dependencies and scripts
tailwind.config.js     # Tailwind CSS configuration
vite.config.js         # Vite build configuration
```

## 🎨 Design Features

- **Mobile-First Responsive**: Works perfectly on devices from 320px width and up
- **Modern Chat Bubbles**: Distinct styling for user (blue) and agent (green) messages
- **Loading Animations**: Typing indicator with animated dots
- **Smooth Transitions**: Fade-in and slide-up animations for new messages
- **Error States**: Clear error messaging with red styling
- **Auto-scroll**: Automatically scrolls to new messages

## 🔧 API Integration

The application integrates with the Weather Agent API using the following configuration:

- **Endpoint**: `https://millions-screeching-vultur.mastra.cloud/api/agents/weatherAgent/stream`
- **Method**: POST
- **Headers**: 
  - `x-mastra-dev-playground: true`
  - `Content-Type: application/json`

### Request Format

```json
{
  "messages": [{"role": "user", "content": "USER_MESSAGE"}],
  "runId": "weatherAgent",
  "maxRetries": 2,
  "maxSteps": 5,
  "temperature": 0.5,
  "topP": 1,
  "runtimeContext": {},
  "threadId": "VITE_THREAD_ID",
  "resourceId": "weatherAgent"
}
```

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎯 Usage Examples

Try asking questions like:
- "What's the weather like in New York?"
- "Will it rain tomorrow in London?"
- "What's the temperature in Tokyo?"
- "Is it sunny in California today?"

## 🔒 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_URL` | Weather Agent API endpoint | Pre-configured |
| `VITE_THREAD_ID` | Unique thread identifier | `weather-chat-thread-001` |

## 🌟 Technologies Used

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **JavaScript ES6+** - Modern JavaScript features

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Built with ❤️ using React and Tailwind CSS
