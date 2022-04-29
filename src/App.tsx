import { useEffect, useState, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from '@firebase/auth';
import { Timestamp } from '@firebase/firestore';
import {
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  User as FirebaseUser,
} from 'firebase/auth';
import { ToastContainer } from 'react-toastify';
import { auth } from './components/configuration/firebase';
import Nav from './components/Nav/Nav';
import Footer from './components/Footer/Footer';
import ScrollToTop from './components/helpers/ScrollToTop';
import loginErrors from './components/helpers/loginErrors';
import ShopHome from './components/Shop/ShopHome';
import ShopIcon from './components/Shop/ShopIcon';
import LoaderFullScreen from './components/Loader/LoaderFullScreen';
import { LoginData, LoginErrors } from './types';
import { UseDoc, UseSetDoc, UseUpdateDoc } from './components/hooks/useManageDoc';
import useShopCart from './components/hooks/useShopCart';
import 'react-toastify/dist/ReactToastify.css';

const Home = lazy(() => import('./components/Home/Home'));
const Auth = lazy(() => import('./components/Auth/Auth'));
const About = lazy(() => import('./components/About/About'));
const AboutMembers = lazy(() => import('./components/About/AboutMembers'));
const GallerySlider = lazy(() => import('./components/Gallery/GallerySlider'));
const Gallery = lazy(() => import('./components/Gallery/Gallery'));
const GallerySingle = lazy(() => import('./components/Gallery/GallerySingle'));
const SingleMember = lazy(() => import('./components/About/SingleMember'));
const Login = lazy(() => import('./components/Auth/Login'));
const Register = lazy(() => import('./components/Auth/Register'));
const Chat = lazy(() => import('./components/User/Chat'));
const Settings = lazy(() => import('./components/User/Settings'));
const Contact = lazy(() => import('./components/Contact/Contact'));
const Recommendations = lazy(() => import('./components/Recommendations/Recommendations'));
const Shop = lazy(() => import('./components/Shop/Shop'));
const RecommendationForm = lazy(() => import('./components/Recommendations/RecommendationForm'));
const ShopCart = lazy(() => import('./components/Shop/ShopCart'));
const ShopItems = lazy(() => import('./components/Shop/ShopItems'));

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

      <Suspense fallback={<LoaderFullScreen />}>
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
      </Suspense>

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
