import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import AuthImages from '../helpers/AuthImages';

const Login = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => props.setLoginData(data);

  return (
    <div className="container">
      <div className="login">
        <AuthImages />

        <div className="auth__form">
          <div className="auth__form-login">
            <h1>Login with Email</h1>
            <p>Welcome again! We hope you will stay with us for longer!</p>
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                type="email"
                className={errors.Email?.type === ('required' || 'pattern') ? 'input-error' : ''}
                placeholder={errors.Email?.type === 'required' ? 'Email is required!' : 'Email'}
                autoComplete="email"
                {...register('Email', { required: true, pattern: /^\S+@\S+$/i })}
              />

              <input
                type="password"
                className={errors.Password?.type === ('required' || 'minLength') ? 'input-error' : ''}
                placeholder={errors.Password?.type === 'required' ? 'Password is required!' : 'Password'}
                autoComplete="current-password"
                {...register('Password', { required: true, minLength: 6 })}
              />

              <p>
                Have you forgotten your password? <Link to="">Click!</Link>
              </p>

              <input type="submit" onClick={props.loginUser} value="Sign up!" />
            </form>

            <p>
              Don't have an account? <Link to="/Auth/Register">Sign up.</Link>
            </p>

            {props.loggedUser?.email}
            <button onClick={props.logout}>Logout</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
