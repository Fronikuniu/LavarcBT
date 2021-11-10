import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { IoIosArrowDropleft, IoIosArrowDropright } from 'react-icons/io';
import { Link } from 'react-router-dom';

const GallerySlider = ({ images }) => {
  const [current, setCurrent] = useState(0);
  const length = images.length;

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
    <section className="gallery-latest">
      <div className="container">
        <h2 className="headerTextStroke">Latest</h2>
        <h3 className="headerwTextStroke">Projects</h3>
      </div>
      <div className="slider">
        <IoIosArrowDropleft onClick={prevSlide} className="arrow arrowPrev" />
        <IoIosArrowDropright onClick={nextSlide} className="arrow arrowNext" />

        {images.map((img, index) => {
          return (
            <div key={img.id} className={current === index ? 'slide active' : 'slide'}>
              {current === index && (
                <>
                  <p>
                    <Link to={`Gallery/${img.id}`}>{img.desc}</Link>
                  </p>
                  <img src={img.imageSrc} alt={`Slider ${img.id} item`} className={current === index ? 'current' : ''} />
                  <p>
                    <Link to={`Builder/${img.builder}`}>{img.builder}</Link>
                  </p>
                </>
              )}
            </div>
          );
        })}
      </div>
      <div className="container show-more">
        <Link to="Gallery">Show more!</Link>
      </div>
    </section>
  );
};

GallerySlider.propTypes = {
  images: PropTypes.array.isRequired,
};

export default GallerySlider;
