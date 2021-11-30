import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const ShopHome = () => {
  const location = useLocation();

  console.log(location);

  if (location.pathname.includes('shop')) return null;
  else
    return (
      <div className="container">
        <section className="shop__info">
          <p className="shop__info--p">See our offers in the store or compose your order</p>

          <div className="shop__info--a">
            <Link to="/shop" className="btn">
              SHOP
            </Link>
          </div>
        </section>
      </div>
    );
};

export default ShopHome;
