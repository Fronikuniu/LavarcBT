import { doc, onSnapshot } from '@firebase/firestore';
import { useEffect, useState } from 'react';
import userPlaceholder from '../../images/placeholder-user.webp';
import { LastMessage, UserData } from '../../types';
import { db } from '../configuration/firebase';

interface UserListProps {
  sender: string;
  user: UserData;
  selectUser: (data: UserData) => void;
  usersChat: UserData | null;
}

function UserList({ sender, user, selectUser, usersChat }: UserListProps) {
  const [receiver] = useState(user?.uid);
  const [lastMessage, setLastMessage] = useState<LastMessage | null>(null);

  useEffect(() => {
    const id = sender > receiver ? `${sender + receiver}` : `${receiver + sender}`;
    const unsub = onSnapshot(doc(db, 'lastMessage', id), (res) =>
      setLastMessage(res.data() as LastMessage)
    );

    return () => unsub();
  }, [receiver, sender]);

  return (
    <div
      className={`users-list__user ${usersChat && usersChat.name === user.name ? 'selected' : ''}`}
      onClick={() => selectUser(user)}
      onKeyDown={() => selectUser(user)}
      role="button"
      tabIndex={0}
    >
      <div className="users-list__user--img">
        <img src={user.avatar || userPlaceholder} alt="" />
        <div className={user.isOnline ? 'check-online online' : 'check-online'} />
      </div>
      <div className="users-list__user--info">
        <p className="truncate name">{user.name}</p>

        {lastMessage && lastMessage?.media ? (
          <p
            className={`truncate ${
              lastMessage?.from !== sender && lastMessage?.unread && 'new-message'
            }`}
          >
            <strong>{lastMessage.from === sender ? 'You: ' : ''}</strong>
            Sent the picture
          </p>
        ) : (
          <p
            className={`truncate ${
              lastMessage?.from !== sender && lastMessage?.unread && 'new-message'
            }`}
          >
            <strong>{lastMessage?.from === sender ? 'You: ' : ''}</strong>
            {lastMessage?.messageText}
          </p>
        )}
      </div>
    </div>
  );
}

export default UserList;
