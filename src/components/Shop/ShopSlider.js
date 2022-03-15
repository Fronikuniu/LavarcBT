import React, { useEffect, useState } from 'react';
import { IoIosArrowDropleft, IoIosArrowDropright } from 'react-icons/io';
import { Link } from 'react-router-dom';

const ShopSlider = ({ shopList }) => {
  const [current, setCurrent] = useState(0);
  const length = shopList.length;

  const regex = / /gm;
  const subst = `_`;

  const prev = current === 0 ? length - 1 : current - 1;
  const next = current === length - 1 ? 0 : current + 1;

  const prevSlide = () => {
    setCurrent(prev);
  };

  const nextSlide = () => {
    setCurrent(next);
  };

  useEffect(() => {
    let t = setTimeout(() => {
      setCurrent(next);
    }, 10000);
    return () => {
      clearTimeout(t);
    };
  });

  return (
    <div className="slider">
      <IoIosArrowDropleft onClick={prevSlide} className="arrow arrowPrev" role="button" />
      <IoIosArrowDropright onClick={nextSlide} className="arrow arrowNext" role="button" />

      {shopList.map((item, index) => {
        const titleUrl = item.title.replace(regex, subst);

        return (
          <React.Fragment key={index}>
            <div className={prev === index ? 'item prev' : 'item'}>
              {prev === index && (
                <>
                  <img src={item.image} alt="" />
                </>
              )}
            </div>

            <div className={current === index ? 'item current' : 'item'}>
              {current === index && (
                <>
                  <Link to={`/shop/${titleUrl}`}>
                    <img src={item.image} alt="" />
                  </Link>
                  <p className="title">
                    <Link to={`/shop/${titleUrl}`}>{item.title}</Link>
                  </p>
                  <p className="price">${item.price}</p>
                  <Link to={`/shop/${titleUrl}`} className="details">
                    Details
                  </Link>
                </>
              )}
            </div>

            <div className={next === index ? 'item next' : 'item'}>
              {next === index && (
                <>
                  <img src={item.image} alt="" />
                </>
              )}
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default ShopSlider;
