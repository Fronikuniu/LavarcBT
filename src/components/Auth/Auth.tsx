import { Link } from 'react-router-dom';
import AuthImages from '../helpers/AuthImages';

interface AuthProps {
  logInWithGoogle: () => void;
  logInWithFacebook: () => void;
}

function Auth({ logInWithGoogle, logInWithFacebook }: AuthProps) {
  return (
    <div className="auth">
      <div className="container">
        <div className="select-registration-method">
          <AuthImages />
          <div className="methods">
            <div className="select__method">
              <h1 className="select__method-h1">
                <span>Lavarc</span> invites You to join our ranks!
              </h1>

              <p className="select__method-p1">
                Create an account, it's free! Thanks to it you will be able to communicate with our
                community.
              </p>

              <div className="select__method-buttons">
                <button type="button" className="btn" onClick={logInWithGoogle}>
                  Sign up with Google
                </button>
                <button type="button" className="btn" onClick={logInWithFacebook}>
                  Sign up with Facebook
                </button>
                <Link to="/auth/register" className="btn primary">
                  Sign up with Email
                </Link>
              </div>

              <p className="select__method-p2">
                Already a member? <Link to="/auth/login">Log in.</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;
