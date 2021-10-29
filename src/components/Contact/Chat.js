import React, { useState } from 'react';

const Chat = () => {
  const [messages, setMessages] = useState([]);

  setMessages();

  return (
    <div className="chat">
      {messages.map(({ id, text, photoURL }) => {
        return (
          <div key={id}>
            <img src={photoURL} alt="" />
            <p>{text}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Chat;
