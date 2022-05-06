import { useState, useEffect, FormEvent, useContext } from 'react';
import {
  updateProfile,
  updateEmail,
  updatePassword,
  signInWithEmailAndPassword,
} from '@firebase/auth';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { auth } from '../configuration/firebase';
import LoginModal from './LoginModal';
import loginErrors from '../helpers/loginErrors';
import { EditProfileBasicProps, EditProfilePasswordProps, LoginErrors } from '../../types';
import { UseUpdateDoc } from '../hooks/useManageDoc';
import { AuthContext } from '../../context/auth';

function EditProfile() {
  const { user } = useContext(AuthContext);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [error, setError] = useState<string>('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [clicked, setClicked] = useState(false);

  const formSchema = Yup.object().shape({
    password: Yup.string()
      .required('password is required')
      .min(8, 'password length should be at least 8 characters'),
    repeatPassword: Yup.string()
      .required('Confirm password is required')
      .oneOf([Yup.ref('password')], 'Passwords must and should match'),
  });
  const validationOpt = { resolver: yupResolver(formSchema) };

  const {
    register,
    handleSubmit,
    formState: { errors: errorsBasic },
    reset,
  } = useForm<EditProfileBasicProps>();

  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    formState: { errors: errorsPassword },
    reset: resetPassword,
  } = useForm<EditProfilePasswordProps>(validationOpt);

  useEffect(() => {
    if (clicked && !error) {
      const prepareToChangePassword = () => {
        setClicked(false);
        signInWithEmailAndPassword(auth, loginData.email, loginData.password)
          .then(async (userCredential) => {
            const newUser = userCredential.user;
            resetPassword();
            await updatePassword(newUser, newPassword);
            setPasswordModalOpen(false);
            setLoginData({ email: '', password: '' });
            toast.success('password updated');
          })
          .catch(({ code }: { code: keyof LoginErrors }) => {
            const errorCode = code;
            setError(loginErrors[errorCode]);
          });
      };
      prepareToChangePassword();
    }
  }, [clicked, loginData, error, newPassword, resetPassword]);

  const onSubmitBasic = async (basic: EditProfileBasicProps) => {
    if (!user) return;
    if (basic.username) {
      await UseUpdateDoc('users', [user.uid], {
        name: basic.username,
      });
      await updateProfile(user, {
        displayName: basic.username,
      });
    }
    if (basic.email) {
      await UseUpdateDoc('users', [user.uid], {
        email: basic.email,
      });
      await updateEmail(user, basic.email);
    }
    if (basic.status)
      await UseUpdateDoc('users', [user.uid], {
        isOnline: basic.status,
      });
    reset();
    toast.success('Successfully updated basic data.');
  };

  const onSubmitPassword = (password: EditProfilePasswordProps) => {
    if (!user) return;
    setNewPassword(password.password);
    updatePassword(user, password.password)
      .then(() => {
        resetPassword();
        toast.success('password updated');
      })
      .catch(() => setPasswordModalOpen(true));
  };
  const reauthenticateChangePassword = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setClicked(true);
    setError(!loginData.email || !loginData.password ? 'All fields are required' : '');
  };

  return (
    <details>
      <summary>Edit Profile</summary>
      <form onSubmit={handleSubmit(onSubmitBasic)} className="editProfile-form">
        <label htmlFor="username">
          username
          <input
            type="text"
            className={errorsBasic.username ? 'input-error' : ''}
            autoComplete="username"
            placeholder="username"
            {...register('username', { maxLength: 30 })}
          />
        </label>
        <label htmlFor="email">
          email
          <input
            type="text"
            className={errorsBasic.email ? 'input-error' : ''}
            autoComplete="email"
            placeholder="email"
            {...register('email', { pattern: /^\S+@\S+$/i })}
          />
        </label>
        <label htmlFor="status">
          status
          <select
            {...register('status')}
            name="status"
            className={errorsBasic.status ? 'input-error' : ''}
          >
            <option value="true">online</option>
            <option value="false">offline</option>
          </select>
        </label>

        <input type="submit" />
      </form>

      <form onSubmit={handleSubmitPassword(onSubmitPassword)} className="editProfile-form">
        <input hidden type="text" autoComplete="username" />
        <label htmlFor="password">
          password
          <input
            type="password"
            className={errorsPassword.password ? 'input-error' : ''}
            autoComplete="new-password"
            placeholder="password"
            {...registerPassword('password')}
          />
          <p className="p-error">{errorsPassword.password?.message}</p>
        </label>
        <label htmlFor="repeatPassword">
          Repeat password
          <input
            type="password"
            className={errorsPassword.repeatPassword ? 'input-error' : ''}
            autoComplete="new-password"
            placeholder="Repeat password"
            {...registerPassword('repeatPassword')}
          />
          <p className="p-error">{errorsPassword.repeatPassword?.message}</p>
        </label>

        <input type="submit" />
      </form>
      <LoginModal
        loginData={loginData}
        error={error}
        isOpen={passwordModalOpen}
        onSubmit={reauthenticateChangePassword}
        onChange={setLoginData}
        header="You need to login to change password"
      />
    </details>
  );
}

export default EditProfile;
