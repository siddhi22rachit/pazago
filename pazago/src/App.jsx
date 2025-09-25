/**
 * Main App Component
 * 
 * This is the root component of the Weather Chat Agent application.
 * It provides the main layout and renders the ChatBox component.
 * Features responsive design and modern styling.
 */

import React from 'react';
import ChatBox from './components/ChatBox.jsx';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <div className="h-screen flex flex-col">
        <ChatBox />
      </div>
    </div>
  );
}

export default App;