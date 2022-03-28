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

function EditProfile({ loggedUser }) {
  const [data, setData] = useState({ email: '', password: '' });
  const [error, setError] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [clicked, setClicked] = useState(false);

  const formSchema = Yup.object().shape({
    password: Yup.string()
      .required('password is required')
      .min(8, 'password length should be at least 8 characters'),
    Repeat_password: Yup.string()
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

  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    formState: { errors: errorsPassword },
    reset: resetPassword,
  } = useForm(validationOpt);

  useEffect(() => {
    if (clicked && !error) {
      const prepareToChangePassword = () => {
        setClicked(false);
        signInWithEmailAndPassword(auth, data.email, data.password)
          .then((userCredential) => {
            const { user } = userCredential;
            resetPassword();
            updatePassword(user, newPassword);
            setPasswordModalOpen(false);
            setData({ email: '', password: '' });
            toast.success('password updated');
          })
          .catch((err) => {
            const errorCode = err.code;
            if (errorCode === 'auth/missing-email') setError('Missing email.');
            else if (errorCode === 'auth/wrong-password')
              setError('The password provided is not valid.');
            else if (errorCode === 'auth/user-not-found')
              setError('The member with the given email does not exist.');
          });
      };
      prepareToChangePassword();
    }
  }, [clicked, data, error, newPassword, resetPassword]);

  const onSubmitBasic = async (basic) => {
    if (basic.Username) {
      await updateDoc(doc(db, 'users', auth.currentUser.uid), {
        name: basic.Username,
      });
      updateProfile(loggedUser, {
        displayName: basic.Username,
      });
    }
    if (basic.email) {
      await updateDoc(doc(db, 'users', auth.currentUser.uid), {
        email: basic.email,
      });
      updateEmail(auth.currentUser, basic.email);
    }
    if (basic.Status)
      await updateDoc(doc(db, 'users', auth.currentUser.uid), {
        isOnline: basic.Status,
      });
    reset();
    toast.success('Successfully updated basic data.');
  };

  const onSubmitPassword = (password) => {
    setNewPassword(password.password);
    updatePassword(auth.currentUser, password.password)
      .then(() => {
        resetPassword();
        toast.success('password updated');
      })
      .catch(() => setPasswordModalOpen(true));
  };
  const reauntheticateChangePassword = (e) => {
    setClicked(true);
    e.preventDefault();
    setError(!data.email || !data.password ? 'All fields are required' : false);
  };

  return (
    <details>
      <summary>Edit Profile</summary>
      <form onSubmit={handleSubmit(onSubmitBasic)} className="editProfile-form">
        <label htmlFor="Username">
          Username
          <input
            type="text"
            className={errors.Username ? 'input-error' : ''}
            autoComplete="username"
            placeholder="Username"
            {...register('Username', { maxLength: 30 })}
          />
        </label>
        <label htmlFor="email">
          email
          <input
            type="text"
            className={errors.email ? 'input-error' : ''}
            autoComplete="email"
            placeholder="email"
            {...register('email', { pattern: /^\S+@\S+$/i })}
          />
        </label>
        <label htmlFor="Status">
          Status
          <select
            {...register('Status')}
            name="Status"
            className={errors.Status ? 'input-error' : ''}
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
        <label htmlFor="Repeat_password">
          Repeat password
          <input
            type="password"
            className={errorsPassword.Repeat_password ? 'input-error' : ''}
            autoComplete="new-password"
            placeholder="Repeat password"
            {...registerPassword('Repeat_password')}
          />
          <p className="p-error">{errorsPassword.Repeat_password?.message}</p>
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

EditProfile.propTypes = {
  loggedUser: PropTypes.object.isRequired,
};

export default EditProfile;
