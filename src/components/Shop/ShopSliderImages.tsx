import React from 'react';
import { MdOutlineAddShoppingCart } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { Image } from '../../types';
import ShopCost from './ShopCost';

interface ShopSliderImagesProps {
  latestProducts: Image[];
  prev: number;
  current: number;
  next: number;
  addToCart: (item: Image) => void;
}

function ShopSliderImages({
  latestProducts,
  prev,
  current,
  next,
  addToCart,
}: ShopSliderImagesProps) {
  return (
    <>
      {latestProducts.map((item, index) => (
        <React.Fragment key={item.id}>
          <div className={prev === index ? 'item prev' : 'item'}>
            {prev === index && <img src={item.imageSrc} alt="" />}
          </div>

          <div className={current === index ? 'item current' : 'item'}>
            {current === index && (
              <>
                <MdOutlineAddShoppingCart
                  className="addToList"
                  title="Add to cart"
                  onClick={() => addToCart(item)}
                />
                <Link to={`/gallery/${item.id}`}>
                  <img src={item.imageSrc} alt="" />
                </Link>
                <p className="title">
                  <Link to={`/gallery/${item.id}`}>{item.title}</Link>
                </p>
                <ShopCost price={item.price} sale={item.sale} />
              </>
            )}
          </div>

          <div className={next === index ? 'item next' : 'item'}>
            {next === index && <img src={item.imageSrc} alt="" />}
          </div>
        </React.Fragment>
      ))}
    </>
  );
}

export default ShopSliderImages;
