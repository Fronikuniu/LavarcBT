import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { BsFacebook } from 'react-icons/bs';
import { FcGoogle } from 'react-icons/fc';
import PropTypes from 'prop-types';
import AuthImages from '../helpers/AuthImages';

function Login({ logInWithFacebook, logInWithGoogle, loginError, loginUser }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => loginUser(data);

  return (
    <div className="container">
      <div className="login">
        <AuthImages />

        <div className="auth__form">
          <div className="auth__form-login">
            <h1>Login</h1>
            <p>Welcome again! We hope you will stay with us for longer!</p>

            <div className="auth__form-login__socials">
              <BsFacebook onClick={logInWithFacebook} role="button" />
              <FcGoogle onClick={logInWithGoogle} role="button" />
            </div>

            <div className="horizontal-or" />

            <form onSubmit={handleSubmit(onSubmit)}>
              <label htmlFor="login">
                Email
                <input
                  type="email"
                  id="email"
                  className={
                    errors.Email?.type === 'required' || errors.Email?.type === 'pattern'
                      ? 'input-error'
                      : ''
                  }
                  placeholder={errors.Email?.type === 'required' ? 'Email is required!' : 'Email'}
                  autoComplete="email"
                  {...register('Email', { required: true, pattern: /^\S+@\S+$/i })}
                />
              </label>

              <label htmlFor="password">
                Password
                <input
                  type="password"
                  id="password"
                  className={
                    errors.Password?.type === 'required' || errors.Password?.type === 'minLength'
                      ? 'input-error'
                      : ''
                  }
                  placeholder={
                    errors.Password?.type === 'required' ? 'Password is required!' : 'Password'
                  }
                  autoComplete="current-password"
                  {...register('Password', { required: true, minLength: 6 })}
                />
              </label>

              {loginError ? <p className="par-error">{loginError}</p> : ''}

              <p>
                Have you forgotten your password? <Link to="/reset-password">Click!</Link>
              </p>

              <input type="submit" value="Sign up!" />
            </form>

            <p>
              {" Don't have an account?"} <Link to="/auth/register">Sign up.</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

Login.propTypes = {
  logInWithFacebook: PropTypes.func.isRequired,
  logInWithGoogle: PropTypes.func.isRequired,
  loginError: PropTypes.string,
  loginUser: PropTypes.func.isRequired,
};

export default Login;
