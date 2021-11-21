import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import AuthImages from '../helpers/AuthImages';
import { BsFacebook } from 'react-icons/bs';
import { FcGoogle } from 'react-icons/fc';

const Login = ({ setLoginData, logInWithFacebook, logInWithGoogle, loginError, loginUser, loggedUser, logout }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => setLoginData(data);

  console.log(loginError);

  return (
    <div className="container">
      <div className="login">
        <AuthImages />

        <div className="auth__form">
          <div className="auth__form-login">
            <h1>Login</h1>
            <p>Welcome again! We hope you will stay with us for longer!</p>

            <div className="auth__form-login__socials">
              <BsFacebook onClick={logInWithFacebook} />
              <FcGoogle onClick={logInWithGoogle} />
            </div>

            <div className="horizontal-or"></div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                type="text"
                className={errors.Email?.type === 'required' || errors.Email?.type === 'pattern' ? 'input-error' : ''}
                placeholder={errors.Email?.type === 'required' ? 'Email is required!' : 'Email'}
                autoComplete="email"
                {...register('Email', { required: true, pattern: /^\S+@\S+$/i })}
              />

              <input
                type="password"
                className={errors.Password?.type === 'required' || errors.Password?.type === 'minLength' ? 'input-error' : ''}
                placeholder={errors.Password?.type === 'required' ? 'Password is required!' : 'Password'}
                autoComplete="current-password"
                {...register('Password', { required: true, minLength: 6 })}
              />

              {loginError ? <p className="par-error">{loginError}</p> : ''}

              <p>
                Have you forgotten your password? <Link to="">Click!</Link>
              </p>

              <input type="submit" onClick={loginUser} value="Sign up!" />
            </form>

            <p>
              Don't have an account? <Link to="/auth/register">Sign up.</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
