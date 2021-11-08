/* eslint-disable react-hooks/exhaustive-deps */
import { addDoc, collection, doc, getDoc, onSnapshot, orderBy, query, setDoc, Timestamp, updateDoc, where } from '@firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from '@firebase/storage';
import React, { useEffect, useState } from 'react';
import { auth, db, storage } from '../configuration/firebase';
import Message from './Message';
import MessageForm from './MessageForm';
import UserList from './UserList';

const UsersList = ({ loggedUser, loggedUserData }) => {
  const [usersList, setUsersList] = useState([]);
  const [usersChat, setUsersChat] = useState('');
  const [messageText, setMessageText] = useState('');
  const [messageImage, setMessageImage] = useState('');
  const [allMessages, setAllMessages] = useState([]);
  const [sender, setSender] = useState('');

  const adminList = usersList.filter((user) => {
    return user.isAdmin;
  });

  useEffect(() => {
    // need fix sender, when is first render we can see logged user in the users list
    if (auth.currentUser) {
      setSender(auth.currentUser.uid);
    }
    const usersRef = collection(db, 'users');

    const q = query(usersRef, where('uid', 'not-in', [sender]));

    const unsub = onSnapshot(q, (querySnapshot) => {
      let users = [];
      querySnapshot.forEach((doc) => {
        users.push(doc.data());
      });
      setUsersList(users);
    });

    return () => unsub();
  }, [auth.currentUser]);

  const selectUser = async (user) => {
    setUsersChat(user);

    const receiver = user.uid;
    const id = sender > receiver ? `${sender + receiver}` : `${receiver + sender}`;

    const messagesRef = collection(db, 'messages', id, 'chat');
    const q = query(messagesRef, orderBy('createdAt', 'asc'));

    onSnapshot(q, (querySnapshot) => {
      let messages = [];
      querySnapshot.forEach((doc) => {
        messages.push(doc.data());
      });

      setAllMessages(messages);
    });

    const docSnapshot = await getDoc(doc(db, 'lastMessage', id));
    if (docSnapshot.data() && docSnapshot.data().from !== sender) {
      await updateDoc(doc(db, 'lastMessage', id), { unread: false });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const receiver = usersChat.uid;

    const id = sender > receiver ? `${sender + receiver}` : `${receiver + sender}`;

    let url;

    if (messageImage) {
      const imageRef = ref(storage, `images/${new Date().getTime()} - ${messageImage.name}`);
      const snapshot = await uploadBytes(imageRef, messageImage);
      const dlUrl = await getDownloadURL(ref(storage, snapshot.ref.fullPath));
      url = dlUrl;
    }

    await addDoc(collection(db, 'messages', id, 'chat'), {
      messageText,
      from: sender,
      to: receiver,
      createdAt: Timestamp.fromDate(new Date()),
      media: url || '',
    });

    await setDoc(doc(db, 'lastMessage', id), {
      messageText,
      from: sender,
      to: receiver,
      createdAt: Timestamp.fromDate(new Date()),
      media: url || '',
      unread: true,
    });

    setMessageText('');
  };

  return (
    <div className="container">
      <section className="chat">
        <div className="users-container">
          <div className="users-list">
            {loggedUserData.isAdmin
              ? usersList.map((user) => {
                  return <UserList user={user} selectUser={selectUser} key={user.uid} sender={sender} usersChat={usersChat} />;
                })
              : adminList.map((user) => {
                  return <UserList user={user} selectUser={selectUser} key={user.uid} sender={sender} usersChat={usersChat} />;
                })}
          </div>
        </div>

        <div className="chat-container">
          {usersChat ? (
            <>
              <div className="chat-selected">
                <p>{usersChat.name}</p>
              </div>

              <div className="messages">
                {allMessages.length
                  ? allMessages.map((message, i) => {
                      return <Message key={i} message={message} loggedUser={loggedUser} />;
                    })
                  : null}
              </div>

              <MessageForm messageText={messageText} setMessageText={setMessageText} handleSubmit={handleSubmit} setMessageImage={setMessageImage} />
            </>
          ) : (
            <div className="chat-first">
              <p>Select user to start conversation</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default UsersList;
