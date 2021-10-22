import { Link } from 'react-router-dom';

function NavItem(props) {
  return (
    <div className="nav__item">
      <Link to={`/${props.children}`}>{props.children}</Link>
    </div>
  );
}

export default NavItem;
