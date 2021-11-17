import NavItem from './NavItem';
import NavLogo from './NavLogo';
import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { IoCaretDownCircleOutline } from 'react-icons/io5';
import { HiMenuAlt3 } from 'react-icons/hi';
import { db, auth } from '../configuration/firebase';
import { getDoc, doc } from 'firebase/firestore';

function Nav({ loggedUser, logout }) {
  const location = useLocation();
  const navi = useRef();
  const [user, setUser] = useState('');

  const [openUserProfile, setOpenUserProfile] = useState(false);
  const dropdown = useRef();

  const stickyNav = () => {
    if (window.scrollY >= 70) {
      navi.current.classList.add('active');
    } else {
      navi.current.classList.remove('active');
    }
  };

  const changeOpen = (event) => {
    if (dropdown.current && !dropdown.current.contains(event.target)) {
      setOpenUserProfile(false);
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
    window.addEventListener('mousedown', changeOpen);
    return () => {
      window.removeEventListener('scroll', stickyNav);
      window.removeEventListener('mousedown', changeOpen);
    };
  }, [location, user]);

  return (
    <nav className={location.pathname !== '/' ? 'nav sticky' : 'nav'} ref={navi}>
      <div className="container">
        <div className="nav__links">
          <NavItem>about</NavItem>
          <NavItem>gallery</NavItem>
          <NavLogo></NavLogo>
          <NavItem>shop</NavItem>
          <NavItem>contact</NavItem>
        </div>

        <div className={`user ${openUserProfile ? 'open' : ''}`} ref={dropdown}>
          {loggedUser ? (
            <div
              className="user__avatar"
              onClick={() => {
                setOpenUserProfile(!openUserProfile);
              }}
            >
              <img src={user?.avatar ? user.avatar : loggedUser.photoURL} alt="" />
              <IoCaretDownCircleOutline className="user__avatar--arrow" />
            </div>
          ) : (
            <div>
              <Link to="/auth">SignIn</Link>
            </div>
          )}
          <div className="user-dropdown">
            <p>
              <Link to="/settings">Profile</Link>
            </p>

            <hr />

            <button
              className="btn"
              onClick={() => {
                logout();
                setOpenUserProfile(false);
              }}
            >
              Logout
            </button>
          </div>
        </div>

        <div className="rwd-menu">
          <HiMenuAlt3 />
        </div>
      </div>
    </nav>
  );
}

Nav.propTypes = {
  loggedUser: PropTypes.object,
};

export default Nav;
