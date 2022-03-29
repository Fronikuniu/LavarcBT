import React from 'react';
import { IoSend } from 'react-icons/io5';
import { BiImageAdd } from 'react-icons/bi';
import PropTypes from 'prop-types';

function MessageForm({ handleSubmit, messageText, setMessageText, setMessageImage }) {
  return (
    <form className="chat-form" onSubmit={handleSubmit}>
      <label htmlFor="img">
        <BiImageAdd role="button" />
        <input
          type="file"
          name="img"
          id="img"
          accept="image/*"
          onChange={(e) => setMessageImage(e.target.files[0])}
        />
      </label>

      <div className="chat-form-message">
        <textarea
          rows="1"
          placeholder="Message..."
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
        />

        <label htmlFor="enter-message">
          <IoSend className="send" role="button" />
          <input type="submit" id="enter-message" />
        </label>
      </div>
    </form>
  );
}

MessageForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  messageText: PropTypes.string.isRequired,
  setMessageText: PropTypes.func.isRequired,
  setMessageImage: PropTypes.func.isRequired,
};

export default MessageForm;
