import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import AuthImages from '../helpers/AuthImages';

const Register = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    props.setRegisterNewUserData(data);
  };

  return (
    <div className="container">
      <div className="register">
        <AuthImages />

        <div className="auth__form">
          <div className="auth__form-register">
            <h1>Register with Email</h1>
            <p>Create an account, it's free! Thanks to it you will be able to communicate with our community.</p>
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                type="text"
                className={errors.Login?.type === 'required' ? 'input-error' : ''}
                placeholder={errors.Login?.type === 'required' ? 'Login is required!' : 'Login'}
                autoComplete="name"
                {...register('Login', { required: true })}
              />

              <input
                type="email"
                className={errors.Email?.type === ('required' || 'pattern') ? 'input-error' : ''}
                placeholder={errors.Email?.type === 'required' ? 'Email is required!' : 'Email adress'}
                autoComplete="email"
                {...register('Email', { required: true, pattern: /^\S+@\S+$/i })}
              />

              <input
                type="password"
                className={errors.Password?.type === ('required' || 'minLength') ? 'input-error' : ''}
                placeholder={errors.Password?.type === 'required' ? 'Password is required!' : 'Password'}
                autoComplete="new-password"
                {...register('Password', { required: true, minLength: 6 })}
              />

              <p className="disclaimer">
                By creating an account, you agree to Lavarc <Link to="/Privacy-policy">Privacy Policy</Link> and <Link to="Terms-of-Use">Terms of Use</Link>.
              </p>

              <input type="submit" onClick={props.registerNewUser} value="Sign up!" />
            </form>

            <p>
              Already a member? <Link to="/Auth/Login">Log in.</Link>
            </p>
          </div>
        </div>
      </div>
      {props.loggedUser?.email}
    </div>
  );
};

export default Register;
