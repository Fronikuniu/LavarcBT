import { doc, onSnapshot } from '@firebase/firestore';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import userPlaceholder from '../../images/placeholder-user.jpg';
import { db } from '../configuration/firebase';

function UserList({ sender, user, selectUser, usersChat }) {
  const receiver = user?.uid;
  const [data, setData] = useState('');

  useEffect(() => {
    const id = sender > receiver ? `${sender + receiver}` : `${receiver + sender}`;
    const unsub = onSnapshot(doc(db, 'lastMessage', id), (res) => setData(res.data()));

    return () => unsub();
  }, [receiver, sender]);

  return (
    <div
      className={`users-list__user ${usersChat.name === user.name ? 'selected' : ''}`}
      onClick={() => selectUser(user)}
      onKeyDown={() => selectUser(user)}
      role="button"
      tabIndex="0"
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

UserList.propTypes = {
  sender: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  selectUser: PropTypes.func.isRequired,
  usersChat: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.object.isRequired]),
};

export default UserList;
