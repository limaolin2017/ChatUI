import React, { useState, useRef, useEffect } from 'react';
import { Plus, Send, ArrowLeft } from 'lucide-react';

const InteractiveDarkThemeChatInterface = () => {
  const [input, setInput] = useState('');
  const [chatStarted, setChatStarted] = useState(false);
  const [messages, setMessages] = useState([]);
  const chatContainerRef = useRef(null);

  const examplePrompts = [
    "Extract insights from report",
    "Polish your prose",
    "Write a memo"
  ];

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, isUser: true }]);
      setInput('');
      setChatStarted(true);
      
      // Simulate AI response
      setTimeout(() => {
        setMessages(prevMessages => [...prevMessages, { text: "This is a simulated AI response.", isUser: false }]);
      }, 1000);
    }
  };

  const handlePromptClick = (prompt) => {
    setInput(prompt);
    handleSend();
  };

  const handleReturn = () => {
    setChatStarted(false);
    setMessages([]);
    setInput('');
  };

  return (
    <div className="bg-gray-900 text-gray-200 min-h-screen p-6 font-sans">
      <h1 className="text-3xl mb-6">
        <span className="text-orange-400 mr-2">✺</span>
        Good evening, MAOLIN
      </h1>
      
      {!chatStarted ? (
        <div className="bg-gray-800 rounded-lg p-4 mb-6">
          <p className="text-lg mb-4">How can I help you today?</p>
          <div className="flex items-center text-sm text-gray-400 mb-4">
            <span>AI Assistant</span>
            <span className="mx-2">·</span>
            <span>1</span>
          </div>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Get started with an example below"
            className="w-full bg-gray-700 p-3 rounded-md mb-4"
          />
          <div className="flex justify-between items-center">
            <div className="flex space-x-2">
              {examplePrompts.map((prompt, index) => (
                <button key={index} onClick={() => handlePromptClick(prompt)} className="bg-gray-700 px-3 py-2 rounded-md text-sm">
                  {prompt}
                </button>
              ))}
            </div>
            <button className="text-gray-400 flex items-center">
              <Plus size={18} className="mr-1" /> Add content
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-gray-800 rounded-lg p-4 mb-6">
          <button onClick={handleReturn} className="mb-4 flex items-center text-gray-400 hover:text-white">
            <ArrowLeft size={18} className="mr-1" /> Return to main page
          </button>
          <div ref={chatContainerRef} className="h-96 overflow-y-auto mb-4">
            {messages.map((message, index) => (
              <div key={index} className={`mb-2 ${message.isUser ? 'text-right' : 'text-left'}`}>
                <span className={`inline-block p-2 rounded-lg ${message.isUser ? 'bg-blue-600' : 'bg-gray-700'}`}>
                  {message.text}
                </span>
              </div>
            ))}
          </div>
          <div className="flex">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your message..."
              className="flex-grow bg-gray-700 p-3 rounded-l-md"
            />
            <button onClick={handleSend} className="bg-blue-600 p-3 rounded-r-md">
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InteractiveDarkThemeChatInterface;