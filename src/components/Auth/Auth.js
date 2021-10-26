import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from '@firebase/auth';
import React, { useState } from 'react';
import { auth } from '../configuration/firebase';
import Login from './Login';
import Register from './Register';

const Auth = () => {
  const [registerNewUserData, setRegisterNewUserData] = useState([]);
  const [loggedUser, setLoggedUser] = useState({});

  onAuthStateChanged(auth, (currentUser) => {
    setLoggedUser(currentUser);
  });

  // Register
  const registerNewUser = async () => {
    await createUserWithEmailAndPassword(auth, registerNewUserData.Email, registerNewUserData.Password, registerNewUserData.Login)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  // Login
  const loginUser = async () => {
    await signInWithEmailAndPassword(auth, registerNewUserData.Email, registerNewUserData.Password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  // Logout
  const logout = async () => {
    await signOut(auth);
  };

  return (
    <div className="auth">
      <Register setRegisterNewUserData={setRegisterNewUserData} registerNewUser={registerNewUser} loggedUser={loggedUser} />

      <Login loginUser={loginUser} logout={logout} />
    </div>
  );
};

export default Auth;
