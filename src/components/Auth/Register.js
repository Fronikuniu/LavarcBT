import React from 'react';
import { useForm } from 'react-hook-form';

const Register = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    props.setRegisterNewUserData(data);
  };

  console.log(props);

  return (
    <div className="register">
      <h2>register</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          className={errors.Login?.type === 'required' ? 'error' : ''}
          placeholder={errors.Login?.type === 'required' ? 'Login is required!' : 'Login'}
          autoComplete="name"
          {...register('Login', { required: true })}
        />

        <input
          type="email"
          className={errors.Email?.type === ('required' || 'pattern') ? 'error' : ''}
          placeholder={errors.Email?.type === 'required' ? 'Email is required!' : 'Email'}
          autoComplete="email"
          {...register('Email', { required: true, pattern: /^\S+@\S+$/i })}
        />

        <input
          type="password"
          className={errors.Password?.type === ('required' || 'minLength') ? 'error' : ''}
          placeholder={errors.Email?.type === 'required' ? 'Password is required!' : 'Password'}
          autoComplete="new-password"
          {...register('Password', { required: true, minLength: 6 })}
        />

        <input type="submit" onClick={props.registerNewUser} />
      </form>
      {props.loggedUser?.email}
    </div>
  );
};

export default Register;
