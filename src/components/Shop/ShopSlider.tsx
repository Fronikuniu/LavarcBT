import { useEffect, useState } from 'react';
import { IoIosArrowDropleft, IoIosArrowDropright } from 'react-icons/io';
import { Image } from '../../types';
import useDocsSnapshot from '../helpers/useDocsSnapshot';
import ShopSliderImages from './ShopSliderImages';

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

      <ShopSliderImages
        prev={prev}
        current={current}
        next={next}
        addToCart={addToCart}
        latestProducts={latestProducts}
      />
    </div>
  );
}

export default ShopSlider;
