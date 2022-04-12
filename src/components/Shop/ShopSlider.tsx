import React, { useEffect, useState } from 'react';
import { IoIosArrowDropleft, IoIosArrowDropright } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { MdOutlineAddShoppingCart } from 'react-icons/md';
import { Image } from '../../types';
import useDocsSnapshot from '../helpers/useDocsSnapshot';

interface ShopSliderProps {
  addToCart: (item: Image) => void;
}

function ShopSlider({ addToCart }: ShopSliderProps) {
  const [current, setCurrent] = useState(0);
  const { data: latestProducts } = useDocsSnapshot<Image>(`gallery`, [], {
    whereArg: ['price', '>', 0],
    orderByArg: ['price', 'desc'],
    secOrderByArg: ['createdAt', 'desc'],
    limitArg: 3,
  });
  const { length } = latestProducts;

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
                <p className="cost">
                  {item.sale ? (
                    <>
                      <span className="price">${item.price}</span>
                      <span className="sale">${item.sale}</span>
                    </>
                  ) : (
                    <span>${item.price}</span>
                  )}
                </p>
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
