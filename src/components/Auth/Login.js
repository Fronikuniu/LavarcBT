import { signOut } from '@firebase/auth';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { auth } from '../configuration/firebase';

const Login = () => {
  const [loginData, setLoginData] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => setLoginData(data);
  console.log(loginData);

  const logout = async () => {
    await signOut(auth);
  };

  console.log(errors);

  return (
    <div className="login">
      <h2>login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" placeholder="Email" autoComplete="email" {...register('Email', { required: true, pattern: /^\S+@\S+$/i })} />
        <input type="password" placeholder="Password" autoComplete="current-password" {...register('Password', { required: true, min: 8 })} />

        <input type="submit" />
      </form>
      <button onClick={logout}></button>
    </div>
  );
};

export default Login;
