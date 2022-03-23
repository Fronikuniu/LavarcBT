import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import AuthImages from '../helpers/AuthImages';

function Register({ registerError, registerNewUser }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => registerNewUser(data);

  return (
    <div className="container">
      <div className="register">
        <AuthImages />

        <div className="auth__form">
          <div className="auth__form-register">
            <h1>Register with Email</h1>

            <p>
              Create an account, it's free! Thanks to it you will be able to communicate with our
              community.
            </p>
            <form onSubmit={handleSubmit(onSubmit)}>
              <label htmlFor="name">
                Username
                <input
                  type="text"
                  id="name"
                  className={
                    errors.Name?.type === 'required' || errors.Name?.type === 'minLength'
                      ? 'input-error'
                      : ''
                  }
                  placeholder={errors.Name?.type === 'required' ? 'Name is required!' : 'Name'}
                  autoComplete="name"
                  value={register.Name}
                  {...register('Name', { required: true, minLength: 6 })}
                />
              </label>

              <label htmlFor="email">
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
                  autoComplete="new-password"
                  {...register('Password', { required: true, minLength: 6 })}
                />
              </label>

              {registerError ? <p className="par-error">{registerError}</p> : ''}

              <p className="disclaimer">
                By creating an account, you agree to Lavarc{' '}
                <Link to="/privacy-policy">Privacy Policy</Link> and{' '}
                <Link to="terms-of-Use">Terms of Use</Link>.
              </p>

              <input type="submit" value="Sign up!" />
            </form>

            <p>
              Already a member? <Link to="/auth/login">Log in.</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

Register.propTypes = {
  registerError: PropTypes.string,
  registerNewUser: PropTypes.func.isRequired,
};

export default Register;
