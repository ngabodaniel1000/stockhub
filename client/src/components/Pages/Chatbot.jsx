import React, { useState } from 'react';
import {marked} from 'marked';

const ChatBot = ({ darkmode }) => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) {
      setResponse('Please enter a message.');
      return;
    }

    setIsLoading(true);
    setResponse('Loading...');

    try {
      const apiResponse = await fetch(
        'https://openrouter.ai/api/v1/chat/completions',
        {
          method: 'POST',
          headers: {
            'Authorization': 'Bearer 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',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'deepseek/deepseek-r1:free',
            messages: [{ role: 'user', content: input }],
          }),
        }
      );

      const data = await apiResponse.json();
      const markdownText = data.choices?.[0]?.message?.content || 'No response received.';
      setResponse(marked.parse(markdownText));
    } catch (error) {
      setResponse(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`min-h-screen p-8 ${darkmode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">AI ChatBot</h1>
        
        <div className={`p-6 rounded-lg mb-6 ${darkmode ? 'bg-gray-800' : 'bg-gray-100'}`}>
          <div className="form-group mb-4">
            <input
              type="text"
              className={`w-full p-3 rounded-lg border ${darkmode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-black border-gray-300'}`}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter your question"
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            />
          </div>
          
          <button 
            className={`px-4 py-2 rounded-lg ${darkmode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white font-medium`}
            onClick={sendMessage}
            disabled={isLoading}
          >
            {isLoading ? 'Thinking...' : 'Ask AI'}
          </button>
        </div>

        <div className={`p-6 rounded-lg ${darkmode ? 'bg-gray-800' : 'bg-gray-100'}`}>
          <h2 className="text-xl font-semibold mb-4">AI Response</h2>
          <div 
            className={`p-4 rounded-lg min-h-32 ${darkmode ? 'bg-gray-700' : 'bg-white'} border ${darkmode ? 'border-gray-600' : 'border-gray-300'}`}
            dangerouslySetInnerHTML={{ __html: response }}
            style={{
              lineHeight: '1.6',
              overflowWrap: 'break-word'
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatBot;