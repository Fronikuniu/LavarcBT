import { deleteObject, getDownloadURL, ref, uploadBytes } from '@firebase/storage';
import React, { useState, useEffect } from 'react';
import { AiFillCamera } from 'react-icons/ai';
import { storage, db, auth } from '../configuration/firebase';
import { getDoc, doc, updateDoc } from 'firebase/firestore';
import { updateProfile } from '@firebase/auth';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

const Settings = ({ loggedUser }) => {
  const [image, setImage] = useState('');
  const [user, setUser] = useState('');

  useEffect(() => {
    if (auth.currentUser) {
      let uid = auth.currentUser.uid;

      getDoc(doc(db, 'users', uid)).then((docSnap) => {
        if (docSnap.exists) setUser(docSnap.data());
      });
    }

    if (image) {
      const uploadImage = async () => {
        const imgRef = ref(storage, `avatars/${new Date().getTime()} - ${image.name}`);

        try {
          if (user.avatarPath) await deleteObject(ref(storage, user.avatarPath));

          const snapshot = await uploadBytes(imgRef, image);
          const url = await getDownloadURL(ref(storage, snapshot.ref.fullPath));

          await updateDoc(doc(db, 'users', auth.currentUser.uid), {
            avatar: url,
            avatarPath: snapshot.ref.fullPath,
          });

          updateProfile(loggedUser, {
            photoURL: url,
          });
          setImage('');
          toast.success('Ustawiono nowy avatar!');
        } catch (err) {
          toast.error('Błąd przy wyborze avatara!');
        }
      };
      uploadImage();
    }
  }, [image, loggedUser, user?.avatarPath]);

  return loggedUser ? (
    <section className="settings">
      <div className="container">
        <h1>General account settings</h1>

        <div className="settings__informations">
          <div className="settings__informations__image">
            <div>
              <img src={user?.avatar ? user.avatar : loggedUser.photoURL} alt="" />
              <label htmlFor="file" role="button">
                <AiFillCamera />
              </label>
              <input type="file" name="file" id="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
            </div>
          </div>

          <div className="settings__informations__info">
            <p>Name: {user?.name}</p>
            <p>Email: {user?.email}</p>
            <p>Status: {user?.isOnline ? 'online' : 'offline'}</p>
          </div>
        </div>
      </div>
    </section>
  ) : null;
};

Settings.propTypes = { loggedUser: PropTypes.object.isRequired };

export default Settings;
