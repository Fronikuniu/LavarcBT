import { Link } from 'react-router-dom';
import logo from '../../images/lavarcawatar.png';

function NavLogo() {
  return (
    <div className="nav__item nav__logo">
      <Link to="/">
        <img src={logo} alt="" />
      </Link>
    </div>
  );
}

export default NavLogo;
