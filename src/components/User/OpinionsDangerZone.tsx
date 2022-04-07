import { useState, useEffect, FormEvent } from 'react';
import { deleteUser, signInWithEmailAndPassword } from 'firebase/auth';
import { confirmAlert } from 'react-confirm-alert';
import { toast } from 'react-toastify';
import { auth } from '../configuration/firebase';
import LoginModal from './LoginModal';
import loginErrors from '../helpers/loginErrors';
import { LoginErrors } from '../../types';
import { UseDeleteDoc } from '../helpers/useManageDoc';

function OpinionsDangerZone() {
  const [data, setData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    if (clicked && !error) {
      const prepareToDelete = () => {
        setClicked(false);
        signInWithEmailAndPassword(auth, data.email, data.password)
          .then(async (userCredential) => {
            const { user } = userCredential;
            await deleteUser(user);
            setDeleteModalOpen(false);
            setData({ email: '', password: '' });
          })
          .catch(({ code }: { code: keyof LoginErrors }) => {
            const errorCode = code;
            setError(loginErrors[errorCode]);
          });
      };
      prepareToDelete();
    }
  }, [clicked, data, error]);

  const deleteAccount = async () => {
    if (!auth.currentUser) return;
    await UseDeleteDoc('users', [auth.currentUser.uid]);
    deleteUser(auth.currentUser)
      .then(() => toast.success('Account deleted'))
      .catch(() => setDeleteModalOpen(true));
  };
  const reauntheticateDeleteAccount = (e: FormEvent<HTMLFormElement>) => {
    setClicked(true);
    e.preventDefault();
    setError(!data.email || !data.password ? 'All fields are required' : '');
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
          onClick: () => {},
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
