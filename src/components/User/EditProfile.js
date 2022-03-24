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

function EditProfile({ loggedUser }) {
  const [data, setData] = useState({ Email: '', Password: '' });
  const [error, setError] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [clicked, setClicked] = useState(false);

  const formSchema = Yup.object().shape({
    Password: Yup.string()
      .required('Password is required')
      .min(8, 'Password length should be at least 8 characters'),
    Repeat_password: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('Password')], 'Passwords must and should match'),
  });
  const validationOpt = { resolver: yupResolver(formSchema) };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const {
    register: register2,
    handleSubmit: handleSubmit2,
    formState: { errors: errors2 },
    reset: reset2,
  } = useForm(validationOpt);

  useEffect(() => {
    if (clicked && !error) {
      const prepareToChangePassword = async () => {
        setClicked(false);
        await signInWithEmailAndPassword(auth, data.Email, data.Password)
          .then((userCredential) => {
            const { user } = userCredential;
            reset2();
            updatePassword(user, newPassword).then(() => toast.success('Password updated'));
            setPasswordModalOpen(false);
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
      };
      prepareToChangePassword();
    }
  }, [clicked, data, error, newPassword]);

  const onSubmitBasic = async (basic) => {
    if (basic.Username) {
      await updateDoc(doc(db, 'users', auth.currentUser.uid), {
        name: basic.Username,
      });
      updateProfile(loggedUser, {
        displayName: basic.Username,
      });
    }
    if (basic.Email) {
      await updateDoc(doc(db, 'users', auth.currentUser.uid), {
        email: basic.Email,
      });
      updateEmail(auth.currentUser, basic.Email);
    }
    if (basic.Status)
      await updateDoc(doc(db, 'users', auth.currentUser.uid), {
        isOnline: basic.Status,
      });
    reset();
    toast.success('Successfully updated basic data.');
  };

  const onSubmitPassword = (password) => {
    setNewPassword(password.Password);
    updatePassword(auth.currentUser, password.Password)
      .then(() => {
        reset2();
        toast.success('Password updated');
      })
      .catch(() => setPasswordModalOpen(true));
  };
  const reauntheticateChangePassword = (e) => {
    setClicked(true);
    e.preventDefault();
    setError(!data.Email || !data.Password ? 'All fields are required' : false);
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
        <label htmlFor="Email">
          Email
          <input
            type="text"
            className={errors.Email ? 'input-error' : ''}
            autoComplete="email"
            placeholder="Email"
            {...register('Email', { pattern: /^\S+@\S+$/i })}
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
        <label htmlFor="Password">
          Password
          <input
            type="password"
            className={errors2.Password ? 'input-error' : ''}
            autoComplete="new-password"
            placeholder="Password"
            {...register2('Password')}
          />
          <p className="p-error">{errors2.Password?.message}</p>
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
