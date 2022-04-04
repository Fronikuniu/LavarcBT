import Modal from 'react-modal';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { FormEvent } from 'react';

Modal.setAppElement('#root');

interface LoginModalProps {
  data: { email: string; password: string };
  header: string;
  error: string | boolean;
  isOpen: boolean;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onChange: (data: { email: string; password: string }) => void;
}

function LoginModal({ data, error, isOpen, onSubmit, onChange, header }: LoginModalProps) {
  return (
    <Modal isOpen={isOpen} contentLabel="Delete account modal" className="modal-form">
      <div className="content">
        <h2>{header}</h2>
        <form onSubmit={onSubmit}>
          <label htmlFor="email">
            Email
            <input
              type="email"
              name="email"
              placeholder="Email"
              id="email"
              className={error ? 'input-error' : ''}
              onChange={(e) => onChange({ ...data, email: e.target.value })}
            />
          </label>
          <label htmlFor="password">
            Password
            <input
              placeholder="Password"
              type="password"
              name="password"
              id="password"
              className={error ? 'input-error' : ''}
              onChange={(e) => onChange({ ...data, password: e.target.value })}
            />
            {error && <p className="p-error">{error}</p>}
          </label>

          <input type="submit" value="Login" />
        </form>
      </div>
    </Modal>
  );
}

export default LoginModal;
