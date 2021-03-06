import { Link } from 'react-router-dom';
import logo from '../../images/lavarcawatar.webp';

function NavLogo() {
  return (
    <div className="nav__item nav__logo">
      <Link to="/" aria-label="home">
        <img src={logo} alt="" />
      </Link>
    </div>
  );
}

export default NavLogo;
