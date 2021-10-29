import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from '@firebase/auth';
import React, { useState } from 'react';
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
import Chat from './components/Contact/Chat';
import { doc, setDoc, Timestamp } from '@firebase/firestore';

function App() {
  const [registerNewUserData, setRegisterNewUserData] = useState([]);
  const [loginData, setLoginData] = useState([]);
  const [loggedUser, setLoggedUser] = useState({});
  const [loginError, setLoginError] = useState('');
  const [registerError, setRegisterError] = useState('');
  const history = useHistory();

  onAuthStateChanged(auth, (currentUser) => {
    setLoggedUser(currentUser);
  });

  // Register
  const registerNewUser = async () => {
    await createUserWithEmailAndPassword(auth, registerNewUserData.Email, registerNewUserData.Password, registerNewUserData.Login)
      .then((userCredential) => {
        const user = userCredential.user;

        updateProfile(user, {
          displayName: registerNewUserData.Name,
          photoURL: 'https://remaxgem.com/wp-content/themes/tolips/images/placehoder-user.jpg',
        });

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

  // Logout
  const logout = async () => {
    await signOut(auth);
  };

  return (
    <Router>
      <Nav />

      <Switch>
        <Route exact path="/">
          <Home />
          <About />
          <GallerySlider images={Images.slice(-7)} />
        </Route>

        <Route exact path="/Auth">
          <Auth />
        </Route>
        <Route path="/Auth/Login">
          {/* Add redirect to '/' when user logged */}
          <Login setLoginData={setLoginData} loginUser={loginUser} logout={logout} loggedUser={loggedUser} loginError={loginError} />
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

        <Route exact path="/Contact"></Route>
        <Route path="/Contact/Email"></Route>
        <Route path="/Contact/Chat">{loggedUser ? <Chat /> : <Redirect to="/Auth/Login" />}</Route>
      </Switch>

      <Footer />
    </Router>
  );
}

export default App;
