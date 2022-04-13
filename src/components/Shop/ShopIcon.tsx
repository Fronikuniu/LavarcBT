import { FaShoppingBasket } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import useRouter from '../helpers/useRouter';

interface ShopIconProps {
  length: number;
}

function ShopIcon({ length }: ShopIconProps) {
  const { pathname } = useRouter();

  return length && pathname !== '/shopCart' ? (
    <Link to="/shopCart" className="shopIcon">
      <div className="content">
        <FaShoppingBasket className="icon" />
        <p className="count">{length}</p>
      </div>
    </Link>
  ) : null;
}

export default ShopIcon;
