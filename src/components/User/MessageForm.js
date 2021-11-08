import React from 'react';
import { IoSend } from 'react-icons/io5';
import { BiImageAdd } from 'react-icons/bi';

const MessageForm = ({ handleSubmit, messageText, setMessageText, setMessageImage }) => {
  return (
    <form className="chat-form" onSubmit={handleSubmit}>
      <label htmlFor="img">
        <BiImageAdd />
      </label>
      <input type="file" name="img" id="img" accept="image/*" onChange={(e) => setMessageImage(e.target.files[0])} />

      <div className="chat-form-message">
        <textarea rows="1" placeholder="Message..." value={messageText} onChange={(e) => setMessageText(e.target.value)}></textarea>

        <label htmlFor="enter-message">
          <IoSend className="send" />
        </label>
        <input type="submit" id="enter-message" />
      </div>
    </form>
  );
};

export default MessageForm;
