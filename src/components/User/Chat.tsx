import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  Timestamp,
  updateDoc,
  where,
} from '@firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from '@firebase/storage';
import React, { FormEvent, useEffect, useRef, useState } from 'react';
import { ImUsers } from 'react-icons/im';
import PropTypes from 'prop-types';
import { auth, db, storage } from '../configuration/firebase';
import Message from './Message';
import MessageForm from './MessageForm';
import UserList from './UserList';
import { LoggedUser, MessageT, User } from '../../types';

interface UsersListProps {
  loggedUser: LoggedUser;
  loggedUserData: User;
}

function UsersList({ loggedUser, loggedUserData }: UsersListProps) {
  const [usersList, setUsersList] = useState<User[]>([]);
  const [usersChat, setUsersChat] = useState<User>({} as User);
  const [messageText, setMessageText] = useState('');
  const [messageImage, setMessageImage] = useState<File | null>(null);
  const [allMessages, setAllMessages] = useState<MessageT[]>([]);
  const [sender, setSender] = useState('');

  const [open, setOpen] = useState(false);

  const adminList = usersList.filter((user) => user.isAdmin);

  const userList = useRef<HTMLDivElement>(null);

  const changeOpen = (event: MouseEvent & { target: Element }) => {
    if (userList.current && !userList.current.contains(event.target)) setOpen(false);
  };

  useEffect(() => {
    // need fix sender, when is first render we can see logged user in the users list
    if (auth.currentUser) setSender(auth.currentUser.uid);

    const usersRef = collection(db, 'users');

    const q = query(usersRef, where('uid', 'not-in', [sender]));

    const unsub = onSnapshot(q, (querySnapshot) => {
      const users: User[] = [];
      querySnapshot.forEach((res) => {
        users.push(res.data() as User);
      });
      setUsersList(users);
    });
    // @ts-ignore
    window.addEventListener('mousedown', changeOpen);
    return () => {
      unsub();
      // @ts-ignore
      window.removeEventListener('mousedown', changeOpen);
    };
  }, [sender]);

  const selectUser = async (user: User) => {
    setUsersChat(user);

    const receiver = user.uid;
    const id = sender > receiver ? `${sender + receiver}` : `${receiver + sender}`;

    const messagesRef = collection(db, 'messages', id, 'chat');
    const q = query(messagesRef, orderBy('createdAt', 'asc'));

    onSnapshot(q, (querySnapshot) => {
      const messages: MessageT[] = [];
      querySnapshot.forEach((res) => messages.push(res.data() as MessageT));

      setAllMessages(messages);
    });

    const docSnapshot = await getDoc(doc(db, 'lastMessage', id));
    if (docSnapshot.data() && docSnapshot.data()?.from !== sender)
      await updateDoc(doc(db, 'lastMessage', id), { unread: false });
  };

  const handleSubmit = async (e: FormEvent) => {
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
        <div className={`users-container ${open ? 'open' : ''}`}>
          <div className="users-list" ref={userList}>
            {loggedUserData.isAdmin
              ? usersList.map((user) => (
                  <UserList
                    user={user}
                    selectUser={() => selectUser}
                    key={user.uid}
                    sender={sender}
                    usersChat={usersChat}
                  />
                ))
              : adminList.map((user) => (
                  <UserList
                    user={user}
                    selectUser={() => selectUser}
                    key={user.uid}
                    sender={sender}
                    usersChat={usersChat}
                  />
                ))}
          </div>

          <ImUsers className="users-list-btn" onClick={() => setOpen(!open)} role="button" />
        </div>

        <div className="chat-container">
          {usersChat ? (
            <>
              <div className="chat-selected">
                <p>{usersChat.name}</p>
              </div>

              <div className="messages">
                {allMessages.length
                  ? allMessages.map((message) => {
                      return (
                        <Message
                          key={`${message.createdAt}${message.messageText}`}
                          message={message}
                          loggedUser={loggedUser}
                        />
                      );
                    })
                  : null}
              </div>

              <MessageForm
                messageText={messageText}
                setMessageText={setMessageText}
                handleSubmit={() => handleSubmit}
                setMessageImage={setMessageImage}
              />
            </>
          ) : (
            <div className="chat-first">
              <p>Select user to start conversation</p>

              <div className="chat-first-legend">
                <p>Welcome in our chat app</p>

                <p>
                  If you have any questions about your order, please contact{' '}
                  <span>rockyFeller</span>
                </p>

                <p>
                  If you have any other questions you can write to our admins. <br /> You can find
                  the list of administrators on the left side.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

UsersList.propTypes = {
  loggedUser: PropTypes.object.isRequired,
  loggedUserData: PropTypes.object.isRequired,
};

export default UsersList;