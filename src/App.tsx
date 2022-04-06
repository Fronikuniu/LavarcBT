import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from '@firebase/auth';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { doc, setDoc, Timestamp, updateDoc } from '@firebase/firestore';
import {
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  User as FirebaseUser,
} from 'firebase/auth';
import { ToastContainer } from 'react-toastify';
import { auth, db } from './components/configuration/firebase';
import About from './components/About/About';
import AboutMembers from './components/About/AboutMembers';
import Home from './components/Home/Home';
import Nav from './components/Nav/Nav';
import GallerySlider from './components/Gallery/GallerySlider';
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
import RecommendationForm from './components/Recommendations/RecommendationForm';
import 'react-toastify/dist/ReactToastify.css';
import loginErrors from './components/helpers/loginErrors';
import { LoginData, LoginErrors } from './types';

function App() {
  const [registerError, setRegisterError] = useState('');
  const [loginError, setLoginError] = useState('');

  const [loggedUser, setLoggedUser] = useState<FirebaseUser | null>(null);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) setLoggedUser(currentUser);
    });
  }, []);

  // Register
  const registerNewUser = (data: LoginData) => {
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then(async (userCredential) => {
        const { user } = userCredential;

        await updateProfile(user, {
          displayName: data.name,
          photoURL: 'https://remaxgem.com/wp-content/themes/tolips/images/placehoder-user.jpg',
        });

        await setDoc(doc(db, 'users', user.uid), {
          uid: user.uid,
          name: data.name,
          email: user.email,
          createdAt: Timestamp.fromDate(new Date()),
          isOnline: true,
        });
      })
      .catch(({ code }: { code: string }) => {
        const errorCode = code;

        setRegisterError(
          errorCode === 'auth/email-already-in-use'
            ? 'There is already an account for the given email.'
            : ''
        );
      });
  };

  // Login
  const loginUser = (data: LoginData) => {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then(async (userCredential) => {
        const { user } = userCredential;
        await updateDoc(doc(db, 'users', user.uid), { isOnline: true });
      })
      .catch(({ code }: { code: keyof LoginErrors }) => {
        const errorCode = code;
        setLoginError(loginErrors[errorCode]);
      });
  };

  const logInWithGoogle = () => {
    const providerGoogle = new GoogleAuthProvider();

    signInWithPopup(auth, providerGoogle)
      .then(async (result) => {
        const { user } = result;

        await setDoc(doc(db, 'users', user.uid), {
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          createdAt: Timestamp.fromDate(new Date()),
          isOnline: true,
        });
      })
      .catch(() => {});
  };

  const logInWithFacebook = () => {
    const providerFacebook = new FacebookAuthProvider();

    signInWithPopup(auth, providerFacebook)
      .then(async (result) => {
        const { user } = result;

        await setDoc(doc(db, 'users', user.uid), {
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          createdAt: Timestamp.fromDate(new Date()),
          isOnline: true,
        });
      })
      .catch(() => {});
  };

  // Logout
  const logout = async () => {
    if (loggedUser) {
      await updateDoc(doc(db, 'users', loggedUser.uid), {
        isOnline: false,
      });
      await signOut(auth);
      setLoggedUser(null);
    }
  };

  return (
    <Router>
      <ScrollToTop />
      <Nav loggedUser={loggedUser} logout={logout} />

      <Switch>
        <Route exact path="/">
          <Home />
          <About />
          <GallerySlider />
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
          <AboutMembers />
        </Route>

        <Route exact path="/gallery">
          <Gallery />
        </Route>
        <Route path="/gallery/:id">
          <GallerySingle />
        </Route>

        <Route path="/builder/:name">
          <SingleMember />
        </Route>

        <Route exact path="/shop">
          <Shop shopList={ShopList} bestsellers={ShopList.slice(0, 8)} />
        </Route>
        <Route path="/shop/:title" />

        <Route exact path="/contact">
          <Contact />
        </Route>
        <Route path="/contact/chat">
          {loggedUser ? <Chat loggedUser={loggedUser} /> : <Redirect to="/auth" />}
        </Route>

        <Route path="/settings">
          {loggedUser ? <Settings loggedUser={loggedUser} /> : <Redirect to="/auth" />}
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
