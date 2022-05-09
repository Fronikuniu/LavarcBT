import { Link } from 'react-router-dom';
import { Image } from '../../types';
import Bestsellers from './Bestsellers';
import OrderForm from './OrderForm';
import ShopSlider from './ShopSlider';

interface ShopProps {
  addToCart: (item: Image) => void;
}

function Shop({ addToCart }: ShopProps) {
  return (
    <section className="shop">
      <div className="container">
        <h1 className="headerTextStroke">Shop</h1>
        <p className="headerwTextStroke">Shop</p>

        <div className="shop-latest">
          <ShopSlider addToCart={addToCart} />
        </div>

        <p className="headerwTextStroke">Bestsellers</p>
        <div className="bestsellers">
          <Bestsellers addToCart={addToCart} />
        </div>
        <div className="fullShop">
          <Link to="shop/items">
            <button type="button" className="btn primary">
              Show more
            </button>
          </Link>
        </div>

        <div className="personal-order">
          <p>
            If our offer does not include what you are looking for, write to us and place your
            personal order.
          </p>

          <OrderForm />
        </div>
      </div>
    </section>
  );
}

export default Shop;
