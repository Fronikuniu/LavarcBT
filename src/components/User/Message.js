import React, { useEffect, useRef } from 'react';
import Moment from 'react-moment';
import PropTypes from 'prop-types';

const Message = ({ message, loggedUser }) => {
  const scrollRef = useRef();

  useEffect(() => scrollRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' }), [message]);

  return (
    <div className={`message ${message.from === loggedUser.uid ? 'sender' : 'receiver'}`} ref={scrollRef}>
      <div>
        {message.messageText !== '' ? <p>{message.messageText}</p> : null}
        {message.media ? <img src={message.media} alt={message.text} /> : null}
        <small>
          <Moment fromNow>{message.createdAt.toDate()}</Moment>
        </small>
      </div>
    </div>
  );
};

Message.propTypes = {
  message: PropTypes.object.isRequired,
  loggedUser: PropTypes.object.isRequired,
};

export default Message;
