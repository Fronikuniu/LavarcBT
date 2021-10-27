import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from '@firebase/auth';
import React, { useState } from 'react';
import { auth } from './components/configuration/firebase';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
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

function App() {
  const [registerNewUserData, setRegisterNewUserData] = useState([]);
  const [loginData, setLoginData] = useState([]);
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
    await signInWithEmailAndPassword(auth, loginData.Email, loginData.Password)
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
          <Login setLoginData={setLoginData} loginUser={loginUser} logout={logout} loggedUser={loggedUser} />
        </Route>
        <Route path="/Auth/Register">
          <Register setRegisterNewUserData={setRegisterNewUserData} registerNewUser={registerNewUser} loggedUser={loggedUser} logout={logout} />
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
      </Switch>

      <Footer />
    </Router>
  );
}

export default App;
