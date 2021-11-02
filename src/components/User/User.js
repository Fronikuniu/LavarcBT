import React from 'react';
import userPlaceholder from '../../images/placeholder-user.jpg';

const User = ({ user, selectUser }) => {
  return (
    <div className="users-list__user" onClick={() => selectUser(user)}>
      <div className="users-list__user--img">
        <img src={user.avatar || userPlaceholder} alt="" />
        <div className={user.isOnline ? 'check-online online' : 'check-online'}></div>
      </div>
      <p>{user.name}</p>
    </div>
  );
};

export default User;
