/**
 * ChatBox Component - Simple & Clean Weather Chat
 * 
 * Features:
 * - Black & white theme only
 * - Responsive design (desktop/mobile)
 * - Quick question suggestions
 * - Simple and user-friendly
 */

import React, { useState, useRef, useEffect } from 'react';
import { sendMessageToWeatherAgent } from '../api.js';

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Common weather questions
  const quickQuestions = [
    "What's the weather in New York?",
    "Current temperature in London",
    "Weather forecast for Tokyo",
    "Is it raining in Paris?"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage = inputMessage.trim();
    setShowSuggestions(false);
    
    setMessages(prev => [...prev, {
      id: Date.now(),
      type: 'user',
      content: userMessage,
      timestamp: new Date()
    }]);

    setInputMessage('');
    setIsLoading(true);

    try {
      const agentResponse = await sendMessageToWeatherAgent(userMessage);
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        type: 'agent',
        content: agentResponse,
        timestamp: new Date()
      }]);
    } catch (error) {
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        type: 'error',
        content: error.message,
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleQuickQuestion = (question) => {
    setInputMessage(question);
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  const handleInputChange = (e) => {
    setInputMessage(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="flex flex-col h-screen w-full max-w-none lg:max-w-4xl lg:mx-auto bg-white">
      {/* Header */}
      <div className="bg-black text-white px-4 lg:px-6 py-4 border-b">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-white text-black rounded-full flex items-center justify-center font-bold">
            W
          </div>
          <div>
            <h1 className="text-lg lg:text-xl font-semibold">Weather Chat</h1>
            <p className="text-sm text-gray-300 hidden lg:block">Get weather updates for any city</p>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto px-4 lg:px-6 py-4 space-y-4">
        {/* Welcome Message & Quick Questions */}
        {messages.length === 0 && (
          <div className="space-y-6">
            <div className="text-center py-8 lg:py-12">
              <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                ☀
              </div>
              <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-2">Welcome to Weather Chat</h2>
              <p className="text-gray-600 mb-6">Ask me about weather conditions anywhere in the world</p>
              
              {/* Quick Questions */}
              {showSuggestions && (
                <div className="max-w-md mx-auto">
                  <p className="text-sm text-gray-500 mb-3">Try these common questions:</p>
                  <div className="grid grid-cols-1 gap-2">
                    {quickQuestions.map((question, index) => (
                      <button
                        key={index}
                        onClick={() => handleQuickQuestion(question)}
                        className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 transition-colors text-sm"
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Messages */}
        {messages.map((message) => (
          <div key={message.id} className="animate-fade-in">
            {message.type === 'user' ? (
              <div className="flex justify-end mb-4">
                <div className="bg-black text-white px-4 py-2 rounded-2xl rounded-br-md max-w-xs lg:max-w-lg">
                  <p className="text-sm">{message.content}</p>
                </div>
              </div>
            ) : (
              <div className="flex justify-start mb-4">
                <div className="flex space-x-2 max-w-xs lg:max-w-lg">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-xs">🤖</span>
                  </div>
                  <div className={`px-4 py-2 rounded-2xl rounded-bl-md ${
                    message.type === 'error' 
                      ? 'bg-gray-100 text-red-600 border border-red-200' 
                      : 'bg-gray-100 text-gray-900'
                  }`}>
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Loading */}
        {isLoading && (
          <div className="flex justify-start mb-4">
            <div className="flex space-x-2 max-w-xs lg:max-w-lg">
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                <span className="text-xs">🤖</span>
              </div>
              <div className="bg-gray-100 px-4 py-2 rounded-2xl rounded-bl-md">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                  <span className="text-sm text-gray-600">Getting weather...</span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t bg-white px-4 lg:px-6 py-4">
        <form onSubmit={handleSubmit} className="flex space-x-3">
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              value={inputMessage}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder="Ask about weather in any city..."
              disabled={isLoading}
              className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:border-black disabled:bg-gray-50 text-sm lg:text-base"
              maxLength={200}
            />
          </div>
          <button
            type="submit"
            disabled={isLoading || !inputMessage.trim()}
            className="w-12 h-12 bg-black text-white rounded-full hover:bg-gray-800 focus:outline-none disabled:bg-gray-300 transition-colors flex items-center justify-center"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            )}
          </button>
        </form>
        
        {/* Character count */}
        <div className="text-xs text-gray-400 mt-2 text-right">
          {inputMessage.length}/200
        </div>
      </div>
    </div>
  );
};

export default ChatBox;