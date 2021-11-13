import React from 'react';
import { Link } from 'react-router-dom';

const ShopHome = () => {
  return (
    <div className="container">
      <section className="shop__info">
        <p>See our offers in the store or compose your order</p>

        <Link to="/shop" className="btn">
          SHOP
        </Link>
      </section>
    </div>
  );
};

export default ShopHome;
