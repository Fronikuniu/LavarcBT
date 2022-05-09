import { useContext, useEffect, useRef } from 'react';
import Moment from 'react-moment';
import { AuthContext } from '../../context/auth';
import { MessageT } from '../../types';

interface MessageProps {
  message: MessageT;
}

function Message({ message }: MessageProps) {
  const { user } = useContext(AuthContext);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
  }, [message]);

  return (
    <div
      className={`message ${message.from === user?.uid ? 'sender' : 'receiver'}`}
      ref={scrollRef}
    >
      <div>
        {message.messageText !== '' ? <p>{message.messageText}</p> : null}
        {message.media ? <img src={message.media} alt={message.messageText} /> : null}
        <small>
          {/* @ts-ignore */} {/* eslint-disable-next-line @typescript-eslint/no-unsafe-call */}
          <Moment fromNow>{message.createdAt.toDate()}</Moment>
        </small>
      </div>
    </div>
  );
}

export default Message;
