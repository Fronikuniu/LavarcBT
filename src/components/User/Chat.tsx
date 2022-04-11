import { collection, onSnapshot, orderBy, query, Timestamp } from '@firebase/firestore';
import { User as FirebaseUser } from '@firebase/auth';
import { FormEvent, useEffect, useState } from 'react';
import { ImUsers } from 'react-icons/im';
import { db } from '../configuration/firebase';
import Message from './Message';
import MessageForm from './MessageForm';
import UserList from './UserList';
import { MessageT, UserData } from '../../types';
import useDocsSnapshot from '../helpers/useDocsSnapshot';
import useLoggedUserData from '../helpers/useLoggedUserData';
import { UseAddDoc, UseDoc, UseSetDoc, UseUpdateDoc } from '../helpers/useManageDoc';
import { UseAddImage } from '../helpers/useManageFiles';

interface UsersListProps {
  loggedUser: FirebaseUser;
}

function UsersList({ loggedUser }: UsersListProps) {
  const [usersChat, setUsersChat] = useState<UserData | null>(null);
  const [messageText, setMessageText] = useState('');
  const [messageImage, setMessageImage] = useState<File | null>(null);
  const [allMessages, setAllMessages] = useState<MessageT[]>([]);
  const [sender, setSender] = useState('');
  const [open, setOpen] = useState(false);
  const { data: userData } = useLoggedUserData<UserData>();

  useEffect(() => {
    setSender(loggedUser ? loggedUser.uid : '');
  }, [loggedUser]);

  const { data: usersList } = useDocsSnapshot<UserData>('users', [], {
    whereArg: ['uid', 'not-in', [sender]],
  });

  const adminList = usersList.filter((user) => user.isAdmin);
  const list = userData?.isAdmin ? usersList : adminList;

  const selectUser = async (user: UserData) => {
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

    const { data: docSnapshot } = await UseDoc('lastMessage', [id]);
    if (docSnapshot.data() && docSnapshot.data()?.from !== sender)
      await UseUpdateDoc('lastMessage', [id], { unread: false });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const receiver = usersChat?.uid;
    if (!receiver) return;
    const id = sender > receiver ? `${sender + receiver}` : `${receiver + sender}`;
    let dlUrl;

    if (messageImage) {
      const { url } = await UseAddImage('images', messageImage);
      dlUrl = url;
    }

    await UseAddDoc('messages', [id, 'chat'], {
      messageText,
      from: sender,
      to: receiver,
      createdAt: Timestamp.fromDate(new Date()),
      media: dlUrl || '',
    });

    await UseSetDoc('lastMessage', [id], {
      messageText,
      from: sender,
      to: receiver,
      createdAt: Timestamp.fromDate(new Date()),
      media: dlUrl || '',
      unread: true,
    });

    setMessageText('');
  };

  return (
    <div className="container">
      <section className="chat">
        <div className={`users-container ${open ? 'open' : ''}`}>
          <div className="users-list">
            {list.map((user) => (
              <UserList
                user={user}
                selectUser={selectUser}
                key={user.uid}
                sender={sender}
                usersChat={usersChat}
              />
            ))}
          </div>

          <ImUsers
            className="users-list-btn"
            role="button"
            onClick={() => setOpen(!open)}
            onKeyDown={() => setOpen(!open)}
            onBlur={() => setOpen(false)}
            tabIndex={0}
          />
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
                handleSubmit={handleSubmit}
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

export default UsersList;
