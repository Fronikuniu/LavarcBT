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
} from '@firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from '@firebase/storage';
import { User as FirebaseUser } from '@firebase/auth';
import { FormEvent, useEffect, useState } from 'react';
import { ImUsers } from 'react-icons/im';
import { db, storage } from '../configuration/firebase';
import Message from './Message';
import MessageForm from './MessageForm';
import UserList from './UserList';
import { MessageT, UserData } from '../../types';
import useDocsSnapshot from '../helpers/useDocsSnapshot';
import useLoggedUserData from '../helpers/useLoggedUserData';

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

  const { data: usersList } = useDocsSnapshot<UserData>('users', {
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

    const docSnapshot = await getDoc(doc(db, 'lastMessage', id));
    if (docSnapshot.data() && docSnapshot.data()?.from !== sender)
      // useUpdateDoc
      await updateDoc(doc(db, 'lastMessage', id), { unread: false });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const receiver = usersChat?.uid;
    if (!receiver) return;
    const id = sender > receiver ? `${sender + receiver}` : `${receiver + sender}`;
    let url;

    // useAddFile
    if (messageImage) {
      const imageRef = ref(storage, `images/${new Date().getTime()} - ${messageImage.name}`);
      const snapshot = await uploadBytes(imageRef, messageImage);
      const dlUrl = await getDownloadURL(ref(storage, snapshot.ref.fullPath));
      url = dlUrl;
    }

    // useAddDoc
    await addDoc(collection(db, 'messages', id, 'chat'), {
      messageText,
      from: sender,
      to: receiver,
      createdAt: Timestamp.fromDate(new Date()),
      media: url || '',
    });

    // useSetDoc
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
