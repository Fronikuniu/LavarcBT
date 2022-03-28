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

  useEffect(() => {
    if (clicked && !error) {
      const prepareToChangePassword = async () => {
        setClicked(false);
        await signInWithEmailAndPassword(auth, data.email, data.password)
          .then((userCredential) => {
            const { user } = userCredential;
            updatePassword(user, newPassword).then(() => toast.success('password updated'));
            setPasswordModalOpen(false);
            setData({ email: '', password: '' });
          })
          .catch((err) => {
            const errorCode = err.code;
            setError(loginErrors[errorCode]);
          });
      };
      prepareToChangePassword();
    }
  }, [clicked, data, error, newPassword]);

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
  } = useForm();

  const {
    register: register2,
    handleSubmit: handleSubmit2,
    formState: { errors: errors2 },
  } = useForm(validationOpt);

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
    toast.success('Successfully updated basic data.');
  };

  const onSubmitPassword = (password) => {
    setNewPassword(password.password);
    updatePassword(auth.currentUser, password.password)
      .then(() => toast.success('Password updated'))
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

      <form onSubmit={handleSubmit2(onSubmitPassword)} className="editProfile-form">
        <label htmlFor="password">
          password
          <input
            type="password"
            className={errors2.password ? 'input-error' : ''}
            autoComplete="new-password"
            placeholder="password"
            {...register2('password')}
          />
          <p className="p-error">{errors2.password?.message}</p>
        </label>
        <label htmlFor="Repeat_password">
          Repeat password
          <input
            type="password"
            className={errors2.Repeat_password ? 'input-error' : ''}
            autoComplete="new-password"
            placeholder="Repeat password"
            {...register2('Repeat_password')}
          />
          <p className="p-error">{errors2.Repeat_password?.message}</p>
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
