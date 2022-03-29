import { Link } from 'react-router-dom';

interface NavItemProps {
  children: React.ReactChild;
}

function NavItem({ children }: NavItemProps) {
  return (
    <div className="nav__links__item">
      <Link to={`/${children}`}>{children}</Link>
    </div>
  );
}

export default NavItem;
