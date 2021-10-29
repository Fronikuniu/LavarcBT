/* eslint-disable no-unused-vars */
import React from 'react';
import { signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';
import { Link, useHistory } from 'react-router-dom';
import { auth, db } from '../configuration/firebase';
import AuthImages from '../helpers/AuthImages';
import { doc, setDoc, Timestamp } from '@firebase/firestore';

const Auth = () => {
  const history = useHistory();

  const logInWithGoogle = () => {
    const providerGoogle = new GoogleAuthProvider();

    signInWithPopup(auth, providerGoogle)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;

        const pushUserToFirestore = async () => {
          await setDoc(doc(db, 'users', user.uid), {
            uid: user.uid,
            name: user.displayName,
            email: user.email,
            createdAt: Timestamp.fromDate(new Date()),
            isOnline: true,
          });
        };
        pushUserToFirestore();

        history.replace('/');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(errorCode, errorMessage, email, credential);
      });
  };

  const logInWithFacebook = () => {
    const providerFacebook = new FacebookAuthProvider();

    signInWithPopup(auth, providerFacebook)
      .then((result) => {
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;

        const pushUserToFirestore = async () => {
          await setDoc(doc(db, 'users', user.uid), {
            uid: user.uid,
            name: user.displayName,
            email: user.email,
            createdAt: Timestamp.fromDate(new Date()),
            isOnline: true,
          });
        };
        pushUserToFirestore();

        history.replace('/');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = FacebookAuthProvider.credentialFromError(error);
        console.log(errorCode, errorMessage, email, credential);
      });
  };

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

              <p className="select__method-p1">Create an account, it's free! Thanks to it you will be able to communicate with our community.</p>

              <div className="select__method-buttons">
                <button className="btn" onClick={logInWithGoogle}>
                  Sign up with Google
                </button>
                <button className="btn" onClick={logInWithFacebook}>
                  Sign up with Facebook
                </button>
                <Link to="/Auth/Register" className="btn primary">
                  Sign up with Email
                </Link>
              </div>

              <p className="select__method-p2">
                Already a member? <Link to="/Auth/Login">Log in.</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
