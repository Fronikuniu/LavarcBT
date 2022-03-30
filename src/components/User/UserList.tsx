import { doc, onSnapshot } from '@firebase/firestore';
import { useEffect, useState } from 'react';
import userPlaceholder from '../../images/placeholder-user.jpg';
import { LastMessage, User } from '../../types';
import { db } from '../configuration/firebase';

interface UserListProps {
  sender: string;
  user: User;
  selectUser: (data: User) => void;
  usersChat: User;
}

function UserList({ sender, user, selectUser, usersChat }: UserListProps) {
  const [receiver] = useState(user?.uid);
  const [data, setData] = useState<LastMessage>({} as LastMessage);

  useEffect(() => {
    const id = sender > receiver ? `${sender + receiver}` : `${receiver + sender}`;
    const unsub = onSnapshot(doc(db, 'lastMessage', id), (res) =>
      setData(res.data() as LastMessage)
    );

    return () => unsub();
  }, [receiver, sender]);

  return (
    <div
      className={`users-list__user ${usersChat.name === user.name ? 'selected' : ''}`}
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

        {data && data?.media ? (
          <p className={`truncate ${data?.from !== sender && data?.unread && 'new-message'}`}>
            <strong>{data.from === sender ? 'You: ' : ''}</strong>
            Sent the picture
          </p>
        ) : (
          <p className={`truncate ${data?.from !== sender && data?.unread && 'new-message'}`}>
            <strong>{data?.from === sender ? 'You: ' : ''}</strong>
            {data?.messageText}
          </p>
        )}
      </div>
    </div>
  );
}

export default UserList;