import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Nav from './components/Nav/Nav';
import Footer from './components/Footer/Footer';
import ScrollToTop from './components/helpers/ScrollToTop';
import ShopHome from './components/Shop/ShopHome';
import ShopIcon from './components/Shop/ShopIcon';
import LoaderFullScreen from './components/Loader/LoaderFullScreen';
import useShopCart from './components/hooks/useShopCart';
import AuthProvider from './context/auth';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './components/helpers/PrivateRoute';

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
  const { cart, total, length, addToCart, removeFromCart, clearCart, UseDiscountCode } =
    useShopCart();

  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <Nav />

        <Suspense fallback={<LoaderFullScreen />}>
          <Switch>
            <Route exact path="/">
              <Home />
              <About />
              <GallerySlider />
              <Recommendations />
            </Route>

            <PrivateRoute exact redirect="/settings" component={Auth} path="/auth" />
            <PrivateRoute redirect="/settings" component={Login} path="/auth/login" />
            <PrivateRoute redirect="/settings" component={Register} path="/auth/register" />

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
            <PrivateRoute component={Chat} path="/contact/chat" />

            <PrivateRoute component={Settings} path="/settings" />

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
    </AuthProvider>
  );
}

export default App;
