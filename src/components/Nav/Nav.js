import NavItem from './NavItem';
import NavLogo from './NavLogo';
import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { IoCaretDownCircleOutline } from 'react-icons/io5';
import { db, auth } from '../configuration/firebase';
import { getDoc, doc } from 'firebase/firestore';

function Nav({ loggedUser }) {
  const location = useLocation();
  const navi = useRef();
  const [user, setUser] = useState('');

  const stickyNav = () => {
    if (window.scrollY >= 70) {
      navi.current.classList.add('active');
    } else {
      navi.current.classList.remove('active');
    }
  };

  useEffect(() => {
    if (auth.currentUser) {
      let uid = auth.currentUser.uid;

      getDoc(doc(db, 'users', uid)).then((docSnap) => {
        if (docSnap.exists) {
          setUser(docSnap.data());
        }
      });
    }

    window.addEventListener('scroll', stickyNav);
    return () => {
      window.removeEventListener('scroll', stickyNav);
    };
  }, [location, user]);

  return (
    <nav className={location.pathname !== '/' ? 'nav sticky' : 'nav'} ref={navi}>
      <div className="container">
        <NavItem>about</NavItem>
        <NavItem>gallery</NavItem>
        <NavLogo></NavLogo>
        <NavItem>shop</NavItem>
        <NavItem>contact</NavItem>

        <div className="user">
          {loggedUser ? (
            <div className="user__avatar">
              <Link to="/settings">
                <img src={user?.avatar ? user.avatar : loggedUser.photoURL} alt="" />
                <IoCaretDownCircleOutline className="user__avatar--arrow" />
              </Link>
            </div>
          ) : (
            <div>
              <Link to="/auth/login">SignIn</Link>
              <Link to="/auth/register">SignUp</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

Nav.propTypes = {
  loggedUser: PropTypes.object,
};

export default Nav;
