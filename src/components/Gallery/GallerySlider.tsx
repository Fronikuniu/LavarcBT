import React, { useEffect, useState } from 'react';
import { IoIosArrowDropleft, IoIosArrowDropright } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { Image } from '../../types';
import useDocs from '../hooks/useDocs';

function GallerySlider() {
  const [current, setCurrent] = useState(0);
  const { data: images } = useDocs<Image>('gallery', {
    orderByArg: ['createdAt', 'asc'],
    limitArg: 7,
  });
  const { length } = images;

  const prev = current === 0 ? length - 1 : current - 1;
  const next = current === length - 1 ? 0 : current + 1;

  useEffect(() => {
    const galleryTimeout = setTimeout(() => setCurrent(next), 10000);
    return () => clearTimeout(galleryTimeout);
  });

  const prevSlide = () => setCurrent(prev);
  const nextSlide = () => setCurrent(next);

  return (
    <section className="gallery-latest">
      <div className="container">
        <h2 className="headerTextStroke">Latest</h2>
        <p className="headerwTextStroke">Projects</p>
      </div>
      <div className="slider">
        <IoIosArrowDropleft onClick={prevSlide} className="arrow arrowPrev" role="button" />
        <IoIosArrowDropright onClick={nextSlide} className="arrow arrowNext" role="button" />

        {images.map((img, index) => {
          return (
            <React.Fragment key={img.id}>
              <div className="slide hidden">
                {prev === index && <img src={img.imageSrc} alt="" />}
              </div>

              <div key={img.id} className={current === index ? 'slide active' : 'slide hidden'}>
                {current === index && (
                  <>
                    <p>
                      <Link to={`gallery/${img.id}`}>{img.title}</Link>
                    </p>
                    <img
                      src={img.imageSrc}
                      alt={`Slider ${img.id} item`}
                      className={current === index ? 'current' : ''}
                    />
                    <p>
                      <Link to={`builder/${img.builder}`}>{img.builder}</Link>
                    </p>
                  </>
                )}
              </div>

              <div className="slide hidden">
                {next === index && <img src={img.imageSrc} alt="" />}
              </div>
            </React.Fragment>
          );
        })}
      </div>
      <div className="container show-more">
        <Link to="gallery">Show more!</Link>
      </div>
    </section>
  );
}

export default GallerySlider;
