import React from 'react';
import { IoSend } from 'react-icons/io5';
import { BiImageAdd } from 'react-icons/bi';
import PropTypes from 'prop-types';

const MessageForm = ({ handleSubmit, messageText, setMessageText, setMessageImage }) => {
  return (
    <form className="chat-form" onSubmit={handleSubmit}>
      <label htmlFor="img">
        <BiImageAdd role="button" />
      </label>
      <input type="file" name="img" id="img" accept="image/*" onChange={(e) => setMessageImage(e.target.files[0])} />

      <div className="chat-form-message">
        <textarea rows="1" placeholder="Message..." value={messageText} onChange={(e) => setMessageText(e.target.value)}></textarea>

        <label htmlFor="enter-message">
          <IoSend className="send" role="button" />
        </label>
        <input type="submit" id="enter-message" />
      </div>
    </form>
  );
};

MessageForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  messageText: PropTypes.string.isRequired,
  setMessageText: PropTypes.func.isRequired,
  setMessageImage: PropTypes.func.isRequired,
};

export default MessageForm;
