/* eslint-disable no-unused-vars */
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from '@firebase/auth';
import React, { useEffect, useState } from 'react';
import { auth, db } from './components/configuration/firebase';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import About from './components/About/About';
import AboutMembers from './components/About/AboutMembers';
import Home from './components/Home/Home';
import Nav from './components/Nav/Nav';
import Members from './components/About/Members';
import GallerySlider from './components/Gallery/GallerySlider';
import Images from './components/Gallery/Images';
import Gallery from './components/Gallery/Gallery';
import GallerySingle from './components/Gallery/GallerySingle';
import SingleMember from './components/About/SingleMember';
import Footer from './components/Footer/Footer';
import Auth from './components/Auth/Auth';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Chat from './components/User/Chat';
import { doc, setDoc, Timestamp, updateDoc } from '@firebase/firestore';
import { signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';
import Settings from './components/User/Settings';
import UsersList from './components/User/UsersList';

function App() {
  const [registerNewUserData, setRegisterNewUserData] = useState([]);
  const [loginData, setLoginData] = useState([]);
  const [loggedUser, setLoggedUser] = useState({});
  const [loginError, setLoginError] = useState('');
  const [registerError, setRegisterError] = useState('');

  const history = useHistory();

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setLoggedUser(currentUser);
    });
  }, []);

  // Register
  const registerNewUser = async () => {
    await createUserWithEmailAndPassword(auth, registerNewUserData.Email, registerNewUserData.Password)
      .then((userCredential) => {
        const user = userCredential.user;

        updateProfile(user, {
          displayName: registerNewUserData.Name,
          photoURL: 'https://remaxgem.com/wp-content/themes/tolips/images/placehoder-user.jpg',
        });

        const pushUserToFirestore = async () => {
          await setDoc(doc(db, 'users', user.uid), {
            uid: user.uid,
            name: registerNewUserData.Name,
            email: user.email,
            createdAt: Timestamp.fromDate(new Date()),
            isOnline: true,
          });
        };
        pushUserToFirestore();
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;

        setRegisterError(errorCode === 'auth/email-already-in-use' ? 'There is already an account for the given email.' : '');
      });
  };

  // Login
  const loginUser = async () => {
    await signInWithEmailAndPassword(auth, loginData.Email, loginData.Password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);

        history.replace('/');
      })
      .catch((error) => {
        const errorCode = error.code;

        console.log(errorCode);
        setLoginError(errorCode === 'auth/missing-email' ? '' : 'Missing email.');
        setLoginError(errorCode === 'auth/wrong-password' ? 'The password provided is not valid.' : '');
        setLoginError(errorCode === 'auth/user-not-found' ? 'The member with the given email does not exist.' : '');
      });
  };

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
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = FacebookAuthProvider.credentialFromError(error);
        console.log(errorCode, errorMessage, email, credential);
      });
  };

  // Logout
  const logout = async () => {
    await updateDoc(doc(db, 'users', loggedUser.uid), {
      isOnline: false,
    });
    await signOut(auth);
  };

  return (
    <Router>
      <Nav loggedUser={loggedUser} />

      <Switch>
        <Route exact path="/">
          <Home />
          <About />
          <GallerySlider images={Images.slice(-7)} />
        </Route>

        <Route exact path="/Auth">
          <Auth logInWithGoogle={logInWithGoogle} logInWithFacebook={logInWithFacebook} />
        </Route>
        <Route path="/Auth/Login">
          {/* Add redirect to '/' when user logged */}
          {/* Need to fix overwrite data when pushing google user to firestore */}
          <Login
            setLoginData={setLoginData}
            loginUser={loginUser}
            logInWithGoogle={logInWithGoogle}
            logInWithFacebook={logInWithFacebook}
            logout={logout}
            loggedUser={loggedUser}
            loginError={loginError}
          />
        </Route>
        <Route path="/Auth/Register">
          {/* Add redirect to '/' when user create account */}
          <Register setRegisterNewUserData={setRegisterNewUserData} registerNewUser={registerNewUser} loggedUser={loggedUser} logout={logout} registerError={registerError} />
        </Route>

        <Route path="/About">
          <About />
          <AboutMembers members={Members} />
        </Route>

        <Route exact path="/Gallery">
          <Gallery images={Images} />
        </Route>
        <Route path="/Gallery/:id">
          <GallerySingle images={Images} />
        </Route>

        <Route path="/Builder/:name">
          <SingleMember images={Images} members={Members} />
        </Route>

        <Route exact path="/Contact">
          <UsersList loggedUser={loggedUser} />
        </Route>
        <Route path="/Contact/Email"></Route>
        <Route path="/Contact/Chat">{loggedUser ? <Chat /> : <Redirect to="/Auth/Login" />}</Route>

        <Route path="/Settings">
          <Settings loggedUser={loggedUser} />
        </Route>
      </Switch>

      <Footer />
    </Router>
  );
}

export default App;
