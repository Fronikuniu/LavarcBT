import { deleteObject, getDownloadURL, ref, uploadBytes } from '@firebase/storage';
import { useState, useEffect } from 'react';
import { AiFillCamera } from 'react-icons/ai';
import { getDoc, doc, updateDoc } from 'firebase/firestore';
import { updateProfile } from '@firebase/auth';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { storage, db, auth } from '../configuration/firebase';
import OpinionsAdmin from './OpinionsAdmin';
import EditProfile from './EditProfile';
import OpinionsDangerZone from './OpinionsDangerZone';
import GalleryForm from './GalleryForm';
import GalleryAdmin from './GalleryAdmin';
import { LoggedUser, User } from '../../types';

interface SettingsProps {
  loggedUser: LoggedUser;
  loggedUserData: User;
}

function Settings({ loggedUser, loggedUserData }: SettingsProps) {
  const [image, setImage] = useState<File | null>(null);
  const [user, setUser] = useState<User>({} as User);

  useEffect(() => {
    // trzeba poprawic aktualizowanie się danych
    if (auth.currentUser) {
      const { uid } = auth.currentUser;

      getDoc(doc(db, 'users', uid))
        .then((docSnap) => {
          if (docSnap.exists()) setUser(docSnap.data() as User);
        })
        .catch(() => {});
    }

    if (image) {
      const uploadImage = async () => {
        const imgRef = ref(storage, `avatars/${new Date().getTime()} - ${image.name}`);

        try {
          if (!auth.currentUser) return;
          if (user.avatarPath) await deleteObject(ref(storage, user.avatarPath));

          const snapshot = await uploadBytes(imgRef, image);
          const url = await getDownloadURL(ref(storage, snapshot.ref.fullPath));

          await updateDoc(doc(db, 'users', auth.currentUser.uid), {
            avatar: url,
            avatarPath: snapshot.ref.fullPath,
          });
          // @ts-ignore
          await updateProfile(loggedUser, {
            photoURL: url,
          });
          setImage(null);
          toast.success('Ustawiono nowy avatar!');
        } catch (err) {
          toast.error('Błąd przy wyborze avatara!');
        }
      };
      uploadImage()
        .then(() => {})
        .catch(() => {});
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
              <label htmlFor="file">
                <AiFillCamera />
                <input
                  type="file"
                  name="file"
                  id="file"
                  accept="image/*"
                  onChange={(e) => setImage((e.target.files as FileList)[0])}
                />
              </label>
            </div>
          </div>

          <div className="settings__informations__info">
            <p>Name: {user?.name}</p>
            <p>Email: {user?.email}</p>
            <p>Status: {user?.isOnline ? 'online' : 'offline'}</p>
          </div>
        </div>

        <EditProfile loggedUser={loggedUser} />

        {loggedUserData.isAdmin && (
          <>
            <OpinionsAdmin />
            <GalleryForm />
            <GalleryAdmin />
          </>
        )}

        <OpinionsDangerZone />
      </div>
    </section>
  ) : null;
}

Settings.propTypes = {
  loggedUser: PropTypes.object.isRequired,
  loggedUserData: PropTypes.object.isRequired,
};

export default Settings;
