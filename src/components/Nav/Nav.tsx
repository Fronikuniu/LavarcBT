import { useContext, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { IoCaretDownCircleOutline } from 'react-icons/io5';
import { MdOutlineClose } from 'react-icons/md';
import { HiMenuAlt3 } from 'react-icons/hi';
import { signOut } from 'firebase/auth';
import NavLogo from './NavLogo';
import NavItem from './NavItem';
import logo from '../../images/lavarcawatar.webp';
import { AuthContext } from '../../context/auth';
import { UseUpdateDoc } from '../hooks/useManageDoc';
import { auth } from '../configuration/firebase';

function Nav() {
  const { user, userData } = useContext(AuthContext);
  const location = useLocation();
  const [openUserProfile, setOpenUserProfile] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const nav = useRef<HTMLElement>(null);

  const stickyNav = () => {
    if (window.scrollY >= 70) nav.current?.classList.add('active');
    else nav.current?.classList.remove('active');
  };

  useEffect(() => {
    window.addEventListener('scroll', stickyNav);
    return () => window.removeEventListener('scroll', stickyNav);
  }, [location]);

  const logout = async () => {
    if (!user) return;
    await UseUpdateDoc('users', [user.uid], {
      isOnline: false,
    });
    await signOut(auth);
  };

  return (
    <nav className={location.pathname !== '/' ? 'nav sticky' : 'nav'} ref={nav}>
      <div className="container">
        <div className="nav__links">
          <NavItem>about</NavItem>
          <NavItem>gallery</NavItem>
          <NavLogo />
          <NavItem>shop</NavItem>
          <NavItem>contact</NavItem>
        </div>
        <div className={`user ${openUserProfile ? 'open' : ''}`}>
          {user ? (
            <div
              className="user__avatar"
              role="button"
              onClick={() => setOpenUserProfile(!openUserProfile)}
              onKeyDown={() => setOpenUserProfile(!openUserProfile)}
              tabIndex={0}
              aria-label="User profile"
            >
              <img src={`${userData?.avatar ? userData.avatar : user?.photoURL}`} alt="" />
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
          aria-label="Button to open mobile menu"
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
            {user ? (
              <>
                <img src={`${userData?.avatar ? userData.avatar : user.photoURL}`} alt="" />
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
