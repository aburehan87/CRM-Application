'use client'
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faRobot, faUser } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");

  // Handle sending user message
  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      sender: "user",
      text: inputValue,
      timestamp: new Date(),
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);

    // Mock API call to get AI response
    try {
      const response = await axios.post("/api/ask-ai", {
        question: inputValue,
      });

      const aiMessage = {
        sender: "ai",
        text: response.data.answer,
        timestamp: new Date(),
      };

      setMessages((prevMessages) => [...prevMessages, aiMessage]);
    } catch (error) {
      const errorMessage = {
        sender: "ai",
        text: "Sorry, there was an error. Please try again later.",
        timestamp: new Date(),
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    }

    setInputValue(""); // Clear input field after sending
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Chat Window */}
      <div className="flex-1 overflow-auto p-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex items-start mb-4 ${
              message.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {message.sender === "ai" && (
              <FontAwesomeIcon
                icon={faRobot}
                className="text-blue-500 mr-2"
              />
            )}
            <div
              className={`max-w-xs p-3 rounded-lg ${
                message.sender === "user"
                  ? "bg-indigo-500 text-white"
                  : "bg-gray-300 text-black"
              }`}
            >
              {message.text}
            </div>
            {message.sender === "user" && (
              <FontAwesomeIcon
                icon={faUser}
                className="text-indigo-500 ml-2"
              />
            )}
          </div>
        ))}
      </div>

      {/* Input Section */}
      <div className="flex items-center p-4 border-t border-gray-300 bg-white">
        <input
          type="text"
          className="flex-1 p-2 border rounded-lg focus:outline-none"
          placeholder="Ask a question..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
        />
        <button
          className="ml-4 p-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600"
          onClick={handleSendMessage}
        >
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </div>
    </div>
  );
};

export default ChatInterface;
