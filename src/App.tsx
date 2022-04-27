import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from '@firebase/auth';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { Timestamp } from '@firebase/firestore';
import {
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  User as FirebaseUser,
} from 'firebase/auth';
import { ToastContainer } from 'react-toastify';
import { auth } from './components/configuration/firebase';
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
import ScrollToTop from './components/helpers/ScrollToTop';
import RecommendationForm from './components/Recommendations/RecommendationForm';
import 'react-toastify/dist/ReactToastify.css';
import loginErrors from './components/helpers/loginErrors';
import { LoginData, LoginErrors } from './types';
import { UseDoc, UseSetDoc, UseUpdateDoc } from './components/hooks/useManageDoc';
import useShopCart from './components/hooks/useShopCart';
import ShopIcon from './components/Shop/ShopIcon';
import ShopCart from './components/Shop/ShopCart';
import ShopItems from './components/Shop/ShopItems';

function App() {
  const [registerError, setRegisterError] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loggedUser, setLoggedUser] = useState<FirebaseUser | null>(null);
  const { cart, total, length, addToCart, removeFromCart, clearCart, UseDiscountCode } =
    useShopCart();

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setLoggedUser(currentUser);
        localStorage.setItem('uid', currentUser.uid);
      }
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

        await UseSetDoc('users', [user.uid], {
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
        await UseUpdateDoc('users', [user.uid], { isOnline: true });
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

        const { error } = await UseDoc('users', [user.uid]);

        if (error)
          await UseSetDoc('users', [user.uid], {
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

        const { error } = await UseDoc('users', [user.uid]);

        if (error)
          await UseSetDoc('users', [user.uid], {
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
      await UseUpdateDoc('users', [loggedUser.uid], {
        isOnline: false,
      });
      await signOut(auth);
      setLoggedUser(null);
      localStorage.removeItem('uid');
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
          <GallerySingle addToCart={addToCart} />
        </Route>

        <Route path="/builder/:name">
          <SingleMember />
        </Route>

        <Route exact path="/shop">
          <Shop addToCart={addToCart} />
        </Route>
        <Route path="/shop/items">
          <ShopItems addToCart={addToCart} />
        </Route>

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

        <Route path="/shopCart">
          <ShopCart
            cart={cart}
            total={total}
            length={length}
            removeFromCart={removeFromCart}
            clearCart={clearCart}
            UseDiscountCode={UseDiscountCode}
          />
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
      <ShopIcon length={length} />
    </Router>
  );
}

export default App;
