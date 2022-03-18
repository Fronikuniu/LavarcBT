import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function NavItem({ children }) {
  return (
    <div className="nav__links__item">
      <Link to={`/${children}`}>{children}</Link>
    </div>
  );
}

NavItem.propTypes = { children: PropTypes.string.isRequired };

export default NavItem;
