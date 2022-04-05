import { useState, useEffect, FormEvent } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import {
  updateProfile,
  updateEmail,
  updatePassword,
  signInWithEmailAndPassword,
  User as FirebaseUser,
} from '@firebase/auth';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { auth, db } from '../configuration/firebase';
import LoginModal from './LoginModal';
import loginErrors from '../helpers/loginErrors';
import { EditProfileBasicProps, EditProfilePasswordProps, LoginErrors } from '../../types';

interface EditProfileProps {
  loggedUser: FirebaseUser;
}

function EditProfile({ loggedUser }: EditProfileProps) {
  const [data, setData] = useState({ email: '', password: '' });
  const [error, setError] = useState<string>('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [clicked, setClicked] = useState(false);

  const formSchema = Yup.object().shape({
    password: Yup.string()
      .required('password is required')
      .min(8, 'password length should be at least 8 characters'),
    repeatPassword: Yup.string()
      .required('Confirm password is required')
      .oneOf([Yup.ref('password')], 'Passwords must and should match'),
  });
  const validationOpt = { resolver: yupResolver(formSchema) };

  const {
    register,
    handleSubmit,
    formState: { errors: errorsBasic },
    reset,
  } = useForm<EditProfileBasicProps>();

  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    formState: { errors: errorsPassword },
    reset: resetPassword,
  } = useForm<EditProfilePasswordProps>(validationOpt);

  useEffect(() => {
    if (clicked && !error) {
      const prepareToChangePassword = () => {
        setClicked(false);
        signInWithEmailAndPassword(auth, data.email, data.password)
          .then(async (userCredential) => {
            const { user } = userCredential;
            resetPassword();
            await updatePassword(user, newPassword);
            setPasswordModalOpen(false);
            setData({ email: '', password: '' });
            toast.success('password updated');
          })
          .catch(({ code }: { code: keyof LoginErrors }) => {
            const errorCode = code;
            setError(loginErrors[errorCode]);
          });
      };
      prepareToChangePassword();
    }
  }, [clicked, data, error, newPassword, resetPassword]);

  const onSubmitBasic = async (basic: EditProfileBasicProps) => {
    if (!auth.currentUser) return;
    if (basic.username) {
      await updateDoc(doc(db, 'users', auth.currentUser.uid), {
        name: basic.username,
      });
      await updateProfile(loggedUser, {
        displayName: basic.username,
      });
    }
    if (basic.email) {
      await updateDoc(doc(db, 'users', auth.currentUser.uid), {
        email: basic.email,
      });
      await updateEmail(auth.currentUser, basic.email);
    }
    if (basic.status)
      await updateDoc(doc(db, 'users', auth.currentUser.uid), {
        isOnline: basic.status,
      });
    reset();
    toast.success('Successfully updated basic data.');
  };

  const onSubmitPassword = (password: EditProfilePasswordProps) => {
    if (!auth.currentUser) return;
    setNewPassword(password.password);
    updatePassword(auth.currentUser, password.password)
      .then(() => {
        resetPassword();
        toast.success('password updated');
      })
      .catch(() => setPasswordModalOpen(true));
  };
  const reauntheticateChangePassword = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setClicked(true);
    setError(!data.email || !data.password ? 'All fields are required' : '');
  };

  return (
    <details>
      <summary>Edit Profile</summary>
      <form onSubmit={handleSubmit(onSubmitBasic)} className="editProfile-form">
        <label htmlFor="username">
          username
          <input
            type="text"
            className={errorsBasic.username ? 'input-error' : ''}
            autoComplete="username"
            placeholder="username"
            {...register('username', { maxLength: 30 })}
          />
        </label>
        <label htmlFor="email">
          email
          <input
            type="text"
            className={errorsBasic.email ? 'input-error' : ''}
            autoComplete="email"
            placeholder="email"
            {...register('email', { pattern: /^\S+@\S+$/i })}
          />
        </label>
        <label htmlFor="status">
          status
          <select
            {...register('status')}
            name="status"
            className={errorsBasic.status ? 'input-error' : ''}
          >
            <option value="true">online</option>
            <option value="false">offline</option>
          </select>
        </label>

        <input type="submit" />
      </form>

      <form onSubmit={handleSubmitPassword(onSubmitPassword)} className="editProfile-form">
        <input hidden type="text" autoComplete="username" />
        <label htmlFor="password">
          password
          <input
            type="password"
            className={errorsPassword.password ? 'input-error' : ''}
            autoComplete="new-password"
            placeholder="password"
            {...registerPassword('password')}
          />
          <p className="p-error">{errorsPassword.password?.message}</p>
        </label>
        <label htmlFor="repeatPassword">
          Repeat password
          <input
            type="password"
            className={errorsPassword.repeatPassword ? 'input-error' : ''}
            autoComplete="new-password"
            placeholder="Repeat password"
            {...registerPassword('repeatPassword')}
          />
          <p className="p-error">{errorsPassword.repeatPassword?.message}</p>
        </label>

        <input type="submit" />
      </form>
      <LoginModal
        data={data}
        error={error}
        isOpen={passwordModalOpen}
        onSubmit={reauntheticateChangePassword}
        onChange={setData}
        header="You need to login to change password"
      />
    </details>
  );
}

export default EditProfile;
