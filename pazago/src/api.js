/**
 * API Integration Module
 * 
 * This module handles all API calls to the weather agent service.
 * It includes error handling and proper request formatting.
 */

// Get API configuration from environment variables
const API_URL = import.meta.env.VITE_API_URL;
const THREAD_ID = import.meta.env.VITE_THREAD_ID;

/**
 * Send a message to the weather agent API
 * @param {string} message - The user's weather question
 * @returns {Promise<string>} - The agent's response
 * @throws {Error} - If the API request fails
 */
export const sendMessageToWeatherAgent = async (message) => {
  try {
    // Validate environment variables
    if (!API_URL || !THREAD_ID) {
      throw new Error('API configuration is missing. Please check your environment variables.');
    }

    // Prepare the request payload according to API specification
    const requestBody = {
      messages: [
        {
          role: "user",
          content: message
        }
      ],
      runId: "weatherAgent",
      maxRetries: 2,
      maxSteps: 5,
      temperature: 0.5,
      topP: 1,
      runtimeContext: {},
      threadId: THREAD_ID,
      resourceId: "weatherAgent"
    };

    // Set up request headers
    const headers = {
      "x-mastra-dev-playground": "true",
      "Content-Type": "application/json"
    };

    // Make the API request
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(requestBody)
    });

    // Check if the response is ok
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}: ${response.statusText}`);
    }

    // Handle streaming response
    const responseText = await response.text();
    
    // Debug: Log the raw response to understand the format
    console.log('Raw API Response:', responseText);
    
    // The API returns streaming data with prefixed lines (f:, 9:, a:, e:, 0:, d:)
    const lines = responseText.trim().split('\n');
    let messageTokens = [];
    let toolResults = [];

    // Process each line to extract content
    for (const line of lines) {
      if (line.trim()) {
        try {
          // Check if line has a prefix (like "0:", "f:", etc.)
          const colonIndex = line.indexOf(':');
          if (colonIndex > 0) {
            const prefix = line.substring(0, colonIndex);
            const content = line.substring(colonIndex + 1);
            
            console.log(`Processing line with prefix "${prefix}":`, content);
            
            if (prefix === '0') {
              // These are message content tokens - collect them
              const cleanContent = content.replace(/^"(.*)"$/, '$1'); // Remove quotes if present
              console.log(`Adding token: "${cleanContent}"`);
              messageTokens.push(cleanContent);
            } else if (prefix === 'a') {
              // Tool result - might contain weather data
              try {
                const toolData = JSON.parse(content);
                if (toolData.result) {
                  toolResults.push(toolData.result);
                }
              } catch (e) {
                console.log('Failed to parse tool result:', content);
              }
            } else if (prefix === 'f' || prefix === '9' || prefix === 'e' || prefix === 'd') {
              // Metadata lines - parse as JSON for debugging
              try {
                const metadata = JSON.parse(content);
                console.log(`Metadata (${prefix}):`, metadata);
              } catch (e) {
                console.log(`Failed to parse metadata (${prefix}):`, content);
              }
            }
          }
        } catch (e) {
          console.log('Failed to process line:', line, 'Error:', e.message);
          continue;
        }
      }
    }

    console.log('Collected message tokens:', messageTokens);
    console.log('Tool results:', toolResults);

    // Reconstruct the message from tokens
    if (messageTokens.length > 0) {
      const fullMessage = messageTokens.join('');
      console.log('Reconstructed message:', fullMessage);
      return fullMessage;
    } else if (toolResults.length > 0) {
      // If we have tool results but no message tokens, format the weather data
      const result = toolResults[toolResults.length - 1];
      if (result.temperature !== undefined) {
        return `The current weather in ${result.location || 'the requested location'} is ${result.conditions || 'unknown conditions'} with a temperature of ${result.temperature}°C (feels like ${result.feelsLike}°C). Humidity is ${result.humidity}% and wind speed is ${result.windSpeed} km/h.`;
      }
    }

    // If we still can't find a valid response, return error with debug info
    console.error('No valid messages found. Raw response:', responseText);
    throw new Error(`No valid response received from the API. Found ${messageTokens.length} tokens and ${toolResults.length} tool results.`);
    

  } catch (error) {
    // Log the error for debugging
    console.error('Weather Agent API Error:', error);
    
    // Return a user-friendly error message
    if (error.message.includes('fetch')) {
      throw new Error('Unable to connect to the weather service. Please check your internet connection.');
    } else if (error.message.includes('API configuration')) {
      throw new Error('Weather service is not properly configured.');
    } else {
      throw new Error(error.message || 'An unexpected error occurred while getting weather information.');
    }
  }
};