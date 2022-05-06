import { FacebookAuthProvider, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { Timestamp } from 'firebase/firestore';
import { auth } from '../configuration/firebase';
import { UseDoc, UseSetDoc } from '../hooks/useManageDoc';

export const logInWithGoogle = () => {
  const providerGoogle = new GoogleAuthProvider();

  signInWithPopup(auth, providerGoogle)
    .then(async (result) => {
      const {
        user: { uid, displayName, email },
      } = result;

      const { error } = await UseDoc('users', [uid]);

      if (error)
        await UseSetDoc('users', [uid], {
          uid,
          name: displayName,
          email,
          createdAt: Timestamp.fromDate(new Date()),
          isOnline: true,
        });
    })
    .catch(() => {});
};

export const logInWithFacebook = () => {
  const providerFacebook = new FacebookAuthProvider();

  signInWithPopup(auth, providerFacebook)
    .then(async (result) => {
      const {
        user: { uid, displayName, email },
      } = result;

      const { error } = await UseDoc('users', [uid]);

      if (error)
        await UseSetDoc('users', [uid], {
          uid,
          name: displayName,
          email,
          createdAt: Timestamp.fromDate(new Date()),
          isOnline: true,
        });
    })
    .catch(() => {});
};
