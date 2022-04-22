import { useState, useEffect } from 'react';
import { AiFillCamera } from 'react-icons/ai';
import { updateProfile, User as FirebaseUser } from '@firebase/auth';
import { toast } from 'react-toastify';
import { auth } from '../configuration/firebase';
import OpinionsAdmin from './OpinionsAdmin';
import EditProfile from './EditProfile';
import OpinionsDangerZone from './OpinionsDangerZone';
import GalleryForm from './GalleryForm';
import GalleryAdmin from './GalleryAdmin';
import { UserData } from '../../types';
import useLoggedUserData from '../hooks/useLoggedUserData';
import { UseAddImage, UseRemoveImage } from '../hooks/useManageFiles';
import { UseUpdateDoc } from '../hooks/useManageDoc';
import DiscountCodes from './DiscountCodes';

interface SettingsProps {
  loggedUser: FirebaseUser;
}

function Settings({ loggedUser }: SettingsProps) {
  const [image, setImage] = useState<File | null>(null);
  const { data: user } = useLoggedUserData<UserData>();

  useEffect(() => {
    if (image) {
      const uploadImage = async () => {
        if (!auth.currentUser) return;
        if (user && user.avatarPath) await UseRemoveImage(user.avatarPath);

        const { url, path } = await UseAddImage('avatars', image);

        await UseUpdateDoc('users', [auth.currentUser.uid], {
          avatar: url,
          avatarPath: path,
        });
        await updateProfile(loggedUser, {
          photoURL: url,
        });
        setImage(null);
      };
      uploadImage()
        .then(() => toast.success('Ustawiono nowy avatar!'))
        .catch(() => toast.error('Błąd przy wyborze avatara!'));
    }
  }, [image, loggedUser]);

  return loggedUser ? (
    <section className="settings">
      <div className="container">
        <h1>General account settings</h1>

        <div className="settings__informations">
          <div className="settings__informations__image">
            <div>
              <img src={`${user?.avatar ? user.avatar : loggedUser.photoURL}`} alt="" />
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

        {user && user.isAdmin && (
          <>
            <DiscountCodes />
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

export default Settings;
