import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { Timestamp } from 'firebase/firestore';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { LoginData } from '../../types';
import { auth } from '../configuration/firebase';
import AuthImages from '../helpers/AuthImages';
import { UseSetDoc } from '../hooks/useManageDoc';

function Register() {
  const [registerError, setRegisterError] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>();

  const onSubmit = (registerData: LoginData) =>
    createUserWithEmailAndPassword(auth, registerData.email, registerData.password)
      .then(async (userCredential) => {
        const { user } = userCredential;
        const { uid, email } = user;

        await updateProfile(user, {
          displayName: registerData.name,
          photoURL: 'https://remaxgem.com/wp-content/themes/tolips/images/placehoder-user.jpg',
        });

        await UseSetDoc('users', [uid], {
          uid,
          name: registerData.name,
          email,
          createdAt: Timestamp.fromDate(new Date()),
          isOnline: true,
        });
      })
      .catch(({ code }: { code: string }) => {
        const errorCode = code;

        setRegisterError(
          errorCode === 'auth/email-already-in-use'
            ? 'There is already an account for the given email.'
            : ''
        );
      });

  return (
    <div className="container">
      <div className="register">
        <AuthImages />

        <div className="auth__form">
          <div className="auth__form-register">
            <h1>Register with email</h1>
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
                    errors.name?.type === 'required' || errors.name?.type === 'minLength'
                      ? 'input-error'
                      : ''
                  }
                  placeholder={errors.name?.type === 'required' ? 'Name is required!' : 'Name'}
                  autoComplete="name"
                  {...register('name', { required: true, minLength: 6 })}
                />
              </label>

              <label htmlFor="email">
                email
                <input
                  type="email"
                  id="email"
                  className={
                    errors.email?.type === 'required' || errors.email?.type === 'pattern'
                      ? 'input-error'
                      : ''
                  }
                  placeholder={errors.email?.type === 'required' ? 'Email is required!' : 'Email'}
                  autoComplete="email"
                  {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
                />
              </label>

              <label htmlFor="password">
                password
                <input
                  type="password"
                  id="password"
                  className={
                    errors.password?.type === 'required' || errors.password?.type === 'minLength'
                      ? 'input-error'
                      : ''
                  }
                  placeholder={
                    errors.password?.type === 'required' ? 'Password is required!' : 'Password'
                  }
                  autoComplete="new-password"
                  {...register('password', { required: true, minLength: 6 })}
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
export default Register;
