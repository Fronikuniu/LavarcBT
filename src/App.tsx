import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Nav from './components/Nav/Nav';
import Footer from './components/Footer/Footer';
import ScrollToTop from './components/helpers/ScrollToTop';
import ShopHome from './components/Shop/ShopHome';
import ShopIcon from './components/Shop/ShopIcon';
import LoaderFullScreen from './components/Loader/LoaderFullScreen';
import ToastConfiguration from './components/helpers/ToastConfiguration';
import useShopCart from './components/hooks/useShopCart';
import AuthProvider from './context/auth';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './components/helpers/PrivateRoute';
import { routes } from './routes';

const Home = lazy(() => import('./components/Home/Home'));
const Auth = lazy(() => import('./components/Auth/Auth'));
const About = lazy(() => import('./components/About/About'));
const Gallery = lazy(() => import('./components/Gallery/Gallery'));
const GallerySingle = lazy(() => import('./components/Gallery/GallerySingle'));
const SingleMember = lazy(() => import('./components/About/SingleMember'));
const Login = lazy(() => import('./components/Auth/Login'));
const Register = lazy(() => import('./components/Auth/Register'));
const Chat = lazy(() => import('./components/User/Chat'));
const Settings = lazy(() => import('./components/User/Settings'));
const Contact = lazy(() => import('./components/Contact/Contact'));
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
            <Route exact path={routes.home}>
              <Home />
            </Route>

            <PrivateRoute exact redirect={routes.settings} component={Auth} path={routes.auth} />
            <PrivateRoute redirect={routes.settings} component={Login} path={routes.login} />
            <PrivateRoute redirect={routes.settings} component={Register} path={routes.register} />

            <Route path={routes.about}>
              <About />
            </Route>

            <Route exact path={routes.gallery}>
              <Gallery />
            </Route>
            <Route path={routes.gallerySingle}>
              <GallerySingle addToCart={addToCart} />
            </Route>

            <Route path={routes.builder}>
              <SingleMember />
            </Route>

            <Route exact path={routes.shop}>
              <Shop addToCart={addToCart} />
            </Route>
            <Route path={routes.shopItems}>
              <ShopItems addToCart={addToCart} />
            </Route>

            <Route exact path={routes.contact}>
              <Contact />
            </Route>
            <PrivateRoute component={Chat} path={routes.chat} />

            <PrivateRoute component={Settings} path={routes.settings} />

            <Route exact path={routes.recommendation}>
              <RecommendationForm />
            </Route>

            <Route path={routes.shopCart}>
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
        <ToastConfiguration />
        <ShopIcon length={length} />
      </Router>
    </AuthProvider>
  );
}

export default App;
