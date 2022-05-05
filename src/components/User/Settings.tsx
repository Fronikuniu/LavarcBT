import { useState, useEffect, useContext } from 'react';
import { AiFillCamera } from 'react-icons/ai';
import { updateProfile } from '@firebase/auth';
import { toast } from 'react-toastify';
import OpinionsAdmin from './OpinionsAdmin';
import EditProfile from './EditProfile';
import OpinionsDangerZone from './OpinionsDangerZone';
import GalleryForm from './GalleryForm';
import GalleryAdmin from './GalleryAdmin';
import { UseAddImage, UseRemoveImage } from '../hooks/useManageFiles';
import { UseUpdateDoc } from '../hooks/useManageDoc';
import DiscountCodes from './DiscountCodes';
import { AuthContext } from '../../context/auth';

function Settings() {
  const { user, userData } = useContext(AuthContext);
  const [image, setImage] = useState<File | null>(null);
  console.log(user, userData);

  useEffect(() => {
    if (image) {
      const uploadImage = async () => {
        if (!user) return;
        if (userData && userData.avatarPath) await UseRemoveImage(userData.avatarPath);

        const { url, path } = await UseAddImage('avatars', image);

        await UseUpdateDoc('users', [user.uid], {
          avatar: url,
          avatarPath: path,
        });
        await updateProfile(user, {
          photoURL: url,
        });
        setImage(null);
      };
      uploadImage()
        .then(() => toast.success('Ustawiono nowy avatar!'))
        .catch(() => toast.error('Błąd przy wyborze avatara!'));
    }
  }, [image, user]);

  return user ? (
    <section className="settings">
      <div className="container">
        <h1>General account settings</h1>

        <div className="settings__informations">
          <div className="settings__informations__image">
            <div>
              <img src={`${userData?.avatar ? userData.avatar : user.photoURL}`} alt="" />
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
            <p>Name: {userData?.name}</p>
            <p>Email: {userData?.email}</p>
            <p>Status: {userData?.isOnline ? 'online' : 'offline'}</p>
          </div>
        </div>

        <EditProfile />

        {userData && userData.isAdmin && (
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
