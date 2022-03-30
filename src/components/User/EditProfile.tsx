import React, { useState, useEffect } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import {
  updateProfile,
  updateEmail,
  updatePassword,
  signInWithEmailAndPassword,
} from '@firebase/auth';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { auth, db } from '../configuration/firebase';
import LoginModal from './LoginModal';
import loginErrors from '../helpers/loginErrors';
import {
  EditProfileBasicProps,
  EditProfilePasswordProps,
  FormErrors,
  LoggedUser,
  LoginErrors,
} from '../../types';

interface EditProfileProps {
  loggedUser: LoggedUser;
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
    formState: { errors },
    reset,
  } = useForm();
  const basicErrors: FormErrors = errors;

  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    formState: { errors: errorsPassword },
    reset: resetPassword,
  } = useForm(validationOpt);
  const passwordErrors: FormErrors = errorsPassword;

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
      // @ts-ignore
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
  const reauntheticateChangePassword = (e: Event) => {
    setClicked(true);
    e.preventDefault();
    setError(!data.email || !data.password ? 'All fields are required' : '');
  };

  return (
    <details>
      <summary>Edit Profile</summary>
      {/* @ts-ignore */}
      <form onSubmit={() => handleSubmit(onSubmitBasic)} className="editProfile-form">
        <label htmlFor="username">
          username
          <input
            type="text"
            className={basicErrors.username ? 'input-error' : ''}
            autoComplete="username"
            placeholder="username"
            {...register('username', { maxLength: 30 })}
          />
        </label>
        <label htmlFor="email">
          email
          <input
            type="text"
            className={basicErrors.email ? 'input-error' : ''}
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
            className={basicErrors.status ? 'input-error' : ''}
          >
            <option value="true">online</option>
            <option value="false">offline</option>
          </select>
        </label>

        <input type="submit" />
      </form>

      {/* @ts-ignore */}
      <form onSubmit={() => handleSubmitPassword(onSubmitPassword)} className="editProfile-form">
        <input hidden type="text" autoComplete="username" />
        <label htmlFor="password">
          password
          <input
            type="password"
            className={passwordErrors.password ? 'input-error' : ''}
            autoComplete="new-password"
            placeholder="password"
            {...registerPassword('password')}
          />
          <p className="p-error">{passwordErrors.password?.message}</p>
        </label>
        <label htmlFor="repeatPassword">
          Repeat password
          <input
            type="password"
            className={passwordErrors.repeatPassword ? 'input-error' : ''}
            autoComplete="new-password"
            placeholder="Repeat password"
            {...registerPassword('repeatPassword')}
          />
          <p className="p-error">{passwordErrors.repeatPassword?.message}</p>
        </label>

        <input type="submit" />
      </form>
      <LoginModal
        data={data}
        error={error}
        isOpen={passwordModalOpen}
        onSubmit={() => reauntheticateChangePassword}
        onChange={setData}
        header="You need to login to change password"
      />
    </details>
  );
}

EditProfile.propTypes = {
  loggedUser: PropTypes.object.isRequired,
};

export default EditProfile;
