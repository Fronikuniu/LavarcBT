import React, { useEffect, useRef } from 'react';
import Moment from 'react-moment';

const Message = ({ message, loggedUser }) => {
  const scrollRef = useRef();

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [message]);

  return (
    <div className={`message ${message.from === loggedUser.uid ? 'sender' : 'receiver'}`} ref={scrollRef}>
      <div>
        <p>{message.messageText}</p>
        {message.media ? <img src={message.media} alt={message.text} /> : null}
        <small>
          <Moment fromNow>{message.createdAt.toDate()}</Moment>
        </small>
      </div>
    </div>
  );
};

export default Message;
