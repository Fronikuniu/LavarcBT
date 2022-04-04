import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { IoCaretDownCircleOutline } from 'react-icons/io5';
import { MdOutlineClose } from 'react-icons/md';
import { HiMenuAlt3 } from 'react-icons/hi';
import { getDoc, doc } from 'firebase/firestore';
import { db, auth } from '../configuration/firebase';
import NavLogo from './NavLogo';
import NavItem from './NavItem';
import logo from '../../images/lavarcawatar.png';
import { LoggedUser, UserData } from '../../types';

interface NavProps {
  loggedUser: LoggedUser;
  logout: () => Promise<void>;
}

function Nav({ loggedUser, logout }: NavProps) {
  const location = useLocation();
  const [user, setUser] = useState<UserData | null>(null);
  const [openUserProfile, setOpenUserProfile] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const navi = useRef<HTMLElement>(null);

  const stickyNav = () => {
    if (window.scrollY >= 70) navi.current?.classList.add('active');
    else navi.current?.classList.remove('active');
  };

  useEffect(() => {
    if (auth.currentUser) {
      const { uid } = auth.currentUser;

      getDoc(doc(db, 'users', uid))
        .then((docSnap) => {
          if (docSnap.exists()) setUser(docSnap.data() as UserData);
        })
        .catch(() => {});
    }

    window.addEventListener('scroll', stickyNav);
    return () => window.removeEventListener('scroll', stickyNav);
  }, [location]);

  return (
    <nav className={location.pathname !== '/' ? 'nav sticky' : 'nav'} ref={navi}>
      <div className="container">
        <div className="nav__links">
          <NavItem>about</NavItem>
          <NavItem>gallery</NavItem>
          <NavLogo />
          <NavItem>shop</NavItem>
          <NavItem>contact</NavItem>
        </div>
        <div className={`user ${openUserProfile ? 'open' : ''}`}>
          {loggedUser ? (
            <div
              className="user__avatar"
              role="button"
              onClick={() => setOpenUserProfile(!openUserProfile)}
              onKeyDown={() => setOpenUserProfile(!openUserProfile)}
              tabIndex={0}
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
              <Link to="/settings" onClick={() => setOpenUserProfile(false)}>
                Profile
              </Link>
            </p>

            <hr />

            <button
              type="button"
              className="btn"
              onClick={async () => {
                await logout();
                setOpenUserProfile(false);
              }}
            >
              Logout
            </button>
          </div>
        </div>

        <div
          tabIndex={0}
          className="rwd-button"
          onClick={() => setOpenMenu(true)}
          role="button"
          onKeyDown={() => setOpenMenu(true)}
        >
          <HiMenuAlt3 />
        </div>

        <div className={`rwd-menu ${openMenu ? 'open' : ''}`}>
          <div className="logo">
            <div className="container">
              <div className="img">
                <Link to="/" onClick={() => setOpenMenu(false)} aria-label="home">
                  <img src={logo} alt="" />
                </Link>
              </div>

              <MdOutlineClose className="close" onClick={() => setOpenMenu(false)} role="button" />
            </div>
          </div>

          <div className="animation">
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
          </div>

          <div className="menu">
            <p>
              <Link to="/about" onClick={() => setOpenMenu(false)}>
                About
              </Link>
            </p>
            <p>
              <Link to="/gallery" onClick={() => setOpenMenu(false)}>
                Gallery
              </Link>
            </p>
            <p>
              <Link to="/shop" onClick={() => setOpenMenu(false)}>
                Shop
              </Link>
            </p>
            <p>
              <Link to="/contact" onClick={() => setOpenMenu(false)}>
                Contact
              </Link>
            </p>
          </div>

          <div className="rwd-auth">
            {loggedUser ? (
              <>
                <img src={user?.avatar ? user.avatar : loggedUser.photoURL} alt="" />
                <Link to="/settings" onClick={() => setOpenMenu(false)}>
                  Profile
                </Link>
                <hr />
                <button
                  type="button"
                  className="btn"
                  onClick={async () => {
                    await logout();
                    setOpenMenu(false);
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              <div>
                <Link to="/auth">SignIn</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
