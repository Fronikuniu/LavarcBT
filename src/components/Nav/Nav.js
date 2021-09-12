import NavItem from './NavItem';
import NavLogo from './NavLogo';
import '../../styles/components/nav.scss';
import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router';

function Nav() {
  const location = useLocation();
  const navi = useRef();

  const stickyNav = () => {
    if (window.scrollY >= 70) {
      navi.current.classList.add('active');
    } else {
      navi.current.classList.remove('active');
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', stickyNav);
    return () => {
      window.removeEventListener('scroll', stickyNav);
    };
  }, [location]);

  return (
    <nav className={location.pathname !== '/' ? 'nav sticky' : 'nav'} ref={navi}>
      <div className="container">
        <NavItem>About</NavItem>
        <NavItem>Gallery</NavItem>
        <NavLogo></NavLogo>
        <NavItem>Shop</NavItem>
        <NavItem>Contact</NavItem>
      </div>
    </nav>
  );
}

export default Nav;
