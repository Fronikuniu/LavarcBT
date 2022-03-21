import React from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { updateProfile, updateEmail, updatePassword } from '@firebase/auth';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { auth, db } from '../configuration/firebase';

function EditProfile({ loggedUser }) {
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
  } = useForm();

  const {
    register: register2,
    handleSubmit: handleSubmit2,
    formState: { errors: errors2 },
  } = useForm(validationOpt);

  const onSubmitBasic = async (data) => {
    if (data.Username) {
      await updateDoc(doc(db, 'users', auth.currentUser.uid), {
        name: data.Username,
      });
      updateProfile(loggedUser, {
        displayName: data.Username,
      });
    }
    if (data.Email) {
      await updateDoc(doc(db, 'users', auth.currentUser.uid), {
        email: data.Email,
      });
      updateEmail(auth.currentUser, data.Email);
    }
    if (data.Status)
      await updateDoc(doc(db, 'users', auth.currentUser.uid), {
        isOnline: data.Status,
      });
    toast.success('Successfully updated basic data.');
  };

  const onSubmitPassword = (data) => {
    // Need to fix
    updatePassword(auth.currentUser, data.Password);
    toast.success('Successfully updated password.');
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
          {errors.Username?.message}
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
          {errors.Email?.message}
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
    </details>
  );
}

EditProfile.propTypes = {
  loggedUser: PropTypes.object.isRequired,
};

export default EditProfile;
