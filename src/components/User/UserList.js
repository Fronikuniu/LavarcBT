/* eslint-disable react-hooks/exhaustive-deps */
import { doc, onSnapshot } from '@firebase/firestore';
import React, { useEffect, useState } from 'react';
import userPlaceholder from '../../images/placeholder-user.jpg';
import { db } from '../configuration/firebase';

const UserList = ({ sender, user, selectUser, usersChat }) => {
  const receiver = user?.uid;
  const [data, setData] = useState('');

  useEffect(() => {
    const id = sender > receiver ? `${sender + receiver}` : `${receiver + sender}`;

    let unsub = onSnapshot(doc(db, 'lastMessage', id), (doc) => {
      setData(doc.data());
    });

    return () => unsub();
  }, []);

  return (
    <div className={`users-list__user ${usersChat.name === user.name && 'selected'}`} onClick={() => selectUser(user)}>
      <div className="users-list__user--img">
        <img src={user.avatar || userPlaceholder} alt="" />
        <div className={user.isOnline ? 'check-online online' : 'check-online'}></div>
      </div>
      <div className="users-list__user--info">
        <p>{user.name}</p>

        {data && data?.media ? (
          <p className={`truncate ${data?.from !== sender && data?.unread && 'new-message'}`}>
            <strong>{data.from === sender ? 'You: ' : null}</strong>
            Sent the picture
          </p>
        ) : (
          <p className={`truncate ${data?.from !== sender && data?.unread && 'new-message'}`}>
            <strong>{data?.from === sender ? 'You: ' : null}</strong>
            {data?.messageText}
          </p>
        )}
      </div>
    </div>
  );
};

export default UserList;