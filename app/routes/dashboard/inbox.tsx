// src/components/Messages.jsx
import React from 'react';

const Messages = () => {
  const messages = [
    { id: 1, sender: 'John Doe', subject: 'Inquiry about product X', date: '2025-06-18' },
    { id: 2, sender: 'Jane Smith', subject: 'Feedback on recent order', date: '2025-06-17' },
    { id: 3, sender: 'Peter Jones', subject: 'Technical support needed', date: '2025-06-16' },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="px-[30vw] py-[10vh]">

 <h2 className="text-2xl font-bold text-gray-800 mb-4">Messages</h2>
      <ul>
        {messages.map(message => (
          <li key={message.id} className="border-b border-gray-200 py-3 last:border-b-0">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-700">{message.sender}</span>
              <span className="text-sm text-gray-500">{message.date}</span>
            </div>
            <p className="text-gray-600 mt-1">{message.subject}</p>
          </li>
        ))}
      </ul>

        </div>
     
    </div>
  );
};

export default Messages;