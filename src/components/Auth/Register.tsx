import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { FormErrors, LoginData } from '../../types';
import AuthImages from '../helpers/AuthImages';

interface RegisterProps {
  registerError: string;
  registerNewUser: (data: LoginData) => void;
}

function Register({ registerError, registerNewUser }: RegisterProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const registerErrors: FormErrors = errors;

  const onSubmit = (data: LoginData) => registerNewUser(data);

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
                    registerErrors.name?.type === 'required' ||
                    registerErrors.name?.type === 'minLength'
                      ? 'input-error'
                      : ''
                  }
                  placeholder={
                    registerErrors.name?.type === 'required' ? 'Name is required!' : 'Name'
                  }
                  autoComplete="name"
                  value={register.name}
                  {...register('name', { required: true, minLength: 6 })}
                />
              </label>

              <label htmlFor="email">
                email
                <input
                  type="email"
                  id="email"
                  className={
                    registerErrors.email?.type === 'required' ||
                    registerErrors.email?.type === 'pattern'
                      ? 'input-error'
                      : ''
                  }
                  placeholder={
                    registerErrors.email?.type === 'required' ? 'Email is required!' : 'Email'
                  }
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
                    registerErrors.password?.type === 'required' ||
                    registerErrors.password?.type === 'minLength'
                      ? 'input-error'
                      : ''
                  }
                  placeholder={
                    registerErrors.password?.type === 'required'
                      ? 'Password is required!'
                      : 'Password'
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
