/* eslint-disable no-unused-vars */
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from '@firebase/auth';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { doc, getDoc, setDoc, Timestamp, updateDoc } from '@firebase/firestore';
import { signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';
import { ToastContainer } from 'react-toastify';
import { auth, db } from './components/configuration/firebase';
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
import Settings from './components/User/Settings';
import Contact from './components/Contact/Contact';
import Recommendations from './components/Recommendations/Recommendations';
import ShopHome from './components/Shop/ShopHome';
import Shop from './components/Shop/Shop';
import ShopList from './components/Shop/ShopList';
import ScrollToTop from './components/helpers/ScrollToTop';
import 'react-toastify/dist/ReactToastify.css';
import RecommendationForm from './components/Recommendations/RecommendationForm';

function App() {
  const [registerError, setRegisterError] = useState('');
  const [loginError, setLoginError] = useState('');

  const [loggedUser, setLoggedUser] = useState({});
  const [loggedUserData, setLoggedUserData] = useState({});

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => setLoggedUser(currentUser));

    if (auth.currentUser) {
      const { uid } = auth.currentUser;

      getDoc(doc(db, 'users', uid)).then((docSnap) => {
        if (docSnap.exists) setLoggedUserData(docSnap.data());
      });
    }
  }, [auth.currentUser]);

  // Register
  const registerNewUser = async (data) => {
    await createUserWithEmailAndPassword(auth, data.Email, data.Password)
      .then((userCredential) => {
        const { user } = userCredential;

        updateProfile(user, {
          displayName: data.Name,
          photoURL: 'https://remaxgem.com/wp-content/themes/tolips/images/placehoder-user.jpg',
        });

        const pushUserToFirestore = async () => {
          await setDoc(doc(db, 'users', user.uid), {
            uid: user.uid,
            name: data.Name,
            email: user.email,
            createdAt: Timestamp.fromDate(new Date()),
            isOnline: true,
          });
        };
        pushUserToFirestore();
      })
      .catch((error) => {
        const errorCode = error.code;

        setRegisterError(
          errorCode === 'auth/email-already-in-use'
            ? 'There is already an account for the given email.'
            : ''
        );
      });
  };

  // Login
  const loginUser = async (data) => {
    await signInWithEmailAndPassword(auth, data.Email, data.Password)
      .then((userCredential) => {
        const { user } = userCredential;

        updateDoc(doc(db, 'users', user.uid), { isOnline: true });
      })
      .catch((error) => {
        const errorCode = error.code;

        if (errorCode === 'auth/missing-email') setLoginError('Missing email.');
        else if (errorCode === 'auth/wrong-password')
          setLoginError('The password provided is not valid.');
        else if (errorCode === 'auth/user-not-found')
          setLoginError('The member with the given email does not exist.');
      });
  };

  const logInWithGoogle = () => {
    const providerGoogle = new GoogleAuthProvider();

    signInWithPopup(auth, providerGoogle)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const { user } = result;

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
        const { email } = error;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  };

  const logInWithFacebook = () => {
    const providerFacebook = new FacebookAuthProvider();

    signInWithPopup(auth, providerFacebook)
      .then((result) => {
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const { user } = result;

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
        const { email } = error;
        const credential = FacebookAuthProvider.credentialFromError(error);
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
      <ScrollToTop />
      <Nav loggedUser={loggedUser} logout={logout} />

      <Switch>
        <Route exact path="/">
          <Home />
          <About />
          <GallerySlider images={Images.slice(-7)} />
          <Recommendations />
        </Route>

        <Route exact path="/auth">
          <Auth logInWithGoogle={logInWithGoogle} logInWithFacebook={logInWithFacebook} />
        </Route>
        <Route path="/auth/login">
          {/* Need to fix overwrite data when pushing google user to firestore */}
          {loggedUser ? (
            <Redirect to="/" />
          ) : (
            <Login
              loginUser={loginUser}
              logInWithGoogle={logInWithGoogle}
              logInWithFacebook={logInWithFacebook}
              loginError={loginError}
            />
          )}
        </Route>
        <Route path="/auth/register">
          {loggedUser ? (
            <Redirect to="/" />
          ) : (
            <Register registerNewUser={registerNewUser} registerError={registerError} />
          )}
        </Route>

        <Route path="/about">
          <About />
          <AboutMembers members={Members} />
        </Route>

        <Route exact path="/gallery">
          <Gallery images={Images} />
        </Route>
        <Route path="/gallery/:id">
          <GallerySingle images={Images} />
        </Route>

        <Route path="/builder/:name">
          <SingleMember images={Images} members={Members} />
        </Route>

        <Route exact path="/shop">
          <Shop shopList={ShopList} bestsellers={ShopList.slice(0, 8)} />
        </Route>
        <Route path="/shop/:title" />

        <Route exact path="/contact">
          <Contact />
        </Route>
        <Route path="/contact/chat">
          {loggedUser ? (
            <Chat loggedUser={loggedUser} loggedUserData={loggedUserData} />
          ) : (
            <Redirect to="/auth" />
          )}
        </Route>

        <Route path="/settings">
          {loggedUser ? (
            <Settings loggedUser={loggedUser} loggedUserData={loggedUserData} />
          ) : (
            <Redirect to="/auth" />
          )}
        </Route>

        <Route exact path="/recommendation">
          <RecommendationForm />
        </Route>
      </Switch>

      <ShopHome />
      <Footer />
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Router>
  );
}

export default App;
