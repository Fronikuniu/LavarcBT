import NavItem from './NavItem';
import NavLogo from './NavLogo';
import '../../styles/components/nav.scss';
import { useEffect } from 'react';

function Nav() {
  const stickyNav = () => {
    let navi = document.querySelector('nav');
    if (window.scrollY >= 70) {
      navi.classList.add('active');
      navi.animate([{ opacity: 0 }, { opacity: 1 }]);
    } else {
      navi.classList.remove('active');
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', stickyNav);

    return () => {
      window.removeEventListener('scroll', stickyNav);
    };
  });

  return (
    <nav className="nav">
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
