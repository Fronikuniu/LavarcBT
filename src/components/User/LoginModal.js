import React from 'react';
import Modal from 'react-modal';
import 'react-confirm-alert/src/react-confirm-alert.css';
import PropTypes from 'prop-types';

Modal.setAppElement('#root');

function LoginModal({ data, error, isOpen, onSubmit, onChange, header }) {
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
              onChange={(e) => onChange({ ...data, Email: e.target.value })}
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
              onChange={(e) => onChange({ ...data, Password: e.target.value })}
            />
            {error && <p className="p-error">{error}</p>}
          </label>

          <input type="submit" value="Login" />
        </form>
      </div>
    </Modal>
  );
}

LoginModal.propTypes = {
  data: PropTypes.object.isRequired,
  header: PropTypes.string.isRequired,
  error: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.bool.isRequired]),
  isOpen: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default LoginModal;
