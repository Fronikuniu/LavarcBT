import React, { useState, useEffect } from 'react';
import { deleteUser, signInWithEmailAndPassword } from 'firebase/auth';
import { confirmAlert } from 'react-confirm-alert';
import { toast } from 'react-toastify';
import { deleteDoc, doc } from 'firebase/firestore';
import { auth, db } from '../configuration/firebase';
import LoginModal from './LoginModal';

function OpinionsDangerZone() {
  const [data, setData] = useState({ Email: '', Password: '' });
  const [error, setError] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [clicked, setClicked] = useState(false);

  useEffect(async () => {
    if (clicked && !error) {
      setClicked(false);
      await signInWithEmailAndPassword(auth, data.Email, data.Password)
        .then((userCredential) => {
          const { user } = userCredential;
          deleteUser(user).then(() => toast.success('Account deleted'));
          setDeleteModalOpen(false);
          setData({ Email: '', Password: '' });
        })
        .catch((err) => {
          const errorCode = err.code;
          if (errorCode === 'auth/missing-email') setError('Missing email.');
          else if (errorCode === 'auth/wrong-password')
            setError('The password provided is not valid.');
          else if (errorCode === 'auth/user-not-found')
            setError('The member with the given email does not exist.');
        });
    }
  }, [clicked, data, error]);

  const deleteAccount = async () => {
    await deleteDoc(doc(db, 'users', auth.currentUser.uid));
    deleteUser(auth.currentUser)
      .then(() => toast.success('Account deleted'))
      .catch(() => setDeleteModalOpen(true));
  };
  const reauntheticateDeleteAccount = (e) => {
    setClicked(true);
    e.preventDefault();
    setError(!data.Email || !data.Password ? 'All fields are required' : false);
  };

  const deleteConfirm = () => {
    confirmAlert({
      title: 'Are you sure to delete your account?',
      message: 'This will permamently delete your account.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => deleteAccount(),
        },
        {
          label: 'No',
        },
      ],
    });
  };

  return (
    <details>
      <summary className="summary-danger">Danger Zone</summary>
      <div className="dangerzone">
        <p>
          Do you want to delete your account?{' '}
          <button type="button" className="btn danger" onClick={() => deleteConfirm()}>
            Delete
          </button>
        </p>
      </div>
      <LoginModal
        data={data}
        error={error}
        isOpen={deleteModalOpen}
        onSubmit={reauntheticateDeleteAccount}
        onChange={setData}
        header="You need to login to delete account"
      />
    </details>
  );
}

export default OpinionsDangerZone;
