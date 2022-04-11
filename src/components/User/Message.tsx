import { useEffect, useRef } from 'react';
import { User as FirebaseUser } from '@firebase/auth';
import Moment from 'react-moment';
import { MessageT } from '../../types';

interface MessageProps {
  message: MessageT;
  loggedUser: FirebaseUser;
}

function Message({ message, loggedUser }: MessageProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
  }, [message]);

  return (
    <div
      className={`message ${message.from === loggedUser.uid ? 'sender' : 'receiver'}`}
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
