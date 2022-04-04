import Bestsellers from './Bestsellers';
import OrderForm from './OrderForm';
import ShopSlider from './ShopSlider';
import { Image } from '../../types';

interface ShopProps {
  shopList: Image[];
  bestsellers: Image[];
}

function Shop({ shopList, bestsellers }: ShopProps) {
  return (
    <section className="shop">
      <div className="container">
        <h2 className="headerTextStroke">Shop</h2>
        <h3 className="headerwTextStroke">Shop</h3>

        <div className="shop-latest">
          <ShopSlider shopList={shopList} />
        </div>

        <h3 className="headerwTextStroke">Bestsellers</h3>
        <div className="bestsellers">
          <Bestsellers bestsellers={bestsellers} />
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
