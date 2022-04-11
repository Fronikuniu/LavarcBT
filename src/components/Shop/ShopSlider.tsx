import React, { useEffect, useState } from 'react';
import { IoIosArrowDropleft, IoIosArrowDropright } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { Image } from '../../types';

interface ShopSliderProps {
  shopList: Image[];
}

function ShopSlider({ shopList }: ShopSliderProps) {
  const [current, setCurrent] = useState(0);
  const { length } = shopList;

  const prev = current === 0 ? length - 1 : current - 1;
  const next = current === length - 1 ? 0 : current + 1;

  const prevSlide = () => setCurrent(prev);
  const nextSlide = () => setCurrent(next);

  useEffect(() => {
    const shopTimeout = setTimeout(() => setCurrent(next), 10000);
    return () => clearTimeout(shopTimeout);
  });

  return (
    <div className="slider">
      <IoIosArrowDropleft onClick={prevSlide} className="arrow arrowPrev" role="button" />
      <IoIosArrowDropright onClick={nextSlide} className="arrow arrowNext" role="button" />

      {shopList.map((item, index) => (
        <React.Fragment key={item.id}>
          <div className={prev === index ? 'item prev' : 'item'}>
            {prev === index && <img src={item.imageSrc} alt="" />}
          </div>

          <div className={current === index ? 'item current' : 'item'}>
            {current === index && (
              <>
                <Link to={`/shop/${item.id}`}>
                  <img src={item.imageSrc} alt="" />
                </Link>
                <p className="title">
                  <Link to={`/shop/${item.id}`}>{item.title}</Link>
                </p>
                <p className="price">${item.price}</p>
                <Link to={`/shop/${item.id}`} className="details">
                  Details
                </Link>
              </>
            )}
          </div>

          <div className={next === index ? 'item next' : 'item'}>
            {next === index && <img src={item.imageSrc} alt="" />}
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}

export default ShopSlider;
