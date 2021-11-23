import React from 'react';
import Bestsellers from './Bestsellers';
import ShopSlider from './ShopSlider';

const Shop = ({ shopList, bestsellers }) => {
  return (
    <section className="shop">
      <div className="container">
        <h2 className="headerTextStroke">Shop</h2>
        <h3 className="headerwTextStroke">Shop</h3>

        {/* <h3 className="headerwTextStroke">Latest</h3> */}
        <div className="shop-latest">
          <ShopSlider shopList={shopList} />
        </div>

        <h3 className="headerwTextStroke">Bestsellers</h3>
        <div className="bestsellers">
          <Bestsellers bestsellers={bestsellers} />
        </div>

        <div className="personal-order">
          <p>If our offer does not include what you are looking for, write to us and place your personal order.</p>
        </div>
      </div>
    </section>
  );
};

export default Shop;
