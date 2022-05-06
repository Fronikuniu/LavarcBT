import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { BsFacebook } from 'react-icons/bs';
import { FcGoogle } from 'react-icons/fc';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import AuthImages from '../helpers/AuthImages';
import { LoginData, LoginErrors } from '../../types';
import { logInWithFacebook, logInWithGoogle } from './loginProviders';
import { auth } from '../configuration/firebase';
import { UseUpdateDoc } from '../hooks/useManageDoc';
import loginErrors from '../helpers/loginErrors';

function Login() {
  const [loginError, setLoginError] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>();

  const onSubmit = (loginData: LoginData) =>
    signInWithEmailAndPassword(auth, loginData.email, loginData.password)
      .then(async (userCredential) => {
        const { user } = userCredential;
        await UseUpdateDoc('users', [user.uid], { isOnline: true });
      })
      .catch(({ code }: { code: keyof LoginErrors }) => {
        const errorCode = code;
        setLoginError(loginErrors[errorCode]);
      });

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
                Password
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
                  autoComplete="current-password"
                  {...register('password', { required: true, minLength: 6 })}
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

export default Login;
