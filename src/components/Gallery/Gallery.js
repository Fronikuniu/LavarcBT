import React from 'react';
import PropTypes from 'prop-types';
import { useState, useRef } from 'react';
import Loader from '../Loader/Loader';
import { Link } from 'react-router-dom';

const Gallery = ({ images }) => {
  const [loading, setLoading] = useState(true);
  const counter = useRef(0);

  const imageLoaded = () => {
    counter.current += 1;
    if (counter.current >= images.length) {
      setLoading(false);
    }
  };

  return (
    <section className="gallery">
      <div className="container">
        <h2 className="headerTextStroke">Our all</h2>
        <h3 className="headerwTextStroke">Projects</h3>

        <div className="gallery__content">
          <div className="gallery__content-loader" style={{ display: loading ? 'block' : 'none' }}>
            <Loader />
          </div>

          <div className="gallery__content-images" style={{ display: loading ? 'none' : 'grid' }}>
            {images.map((img, index) => {
              return (
                <div className="gallery__content-images__about" onLoad={imageLoaded} key={index}>
                  <Link to={`/Gallery/${img.id}`}>
                    <img src={img.imageSrc} alt="" />
                  </Link>
                  <div className="gallery__content-images__about-desc">
                    <p>
                      <Link to={`/Gallery/${img.id}`}>{img.desc}</Link>
                    </p>
                    <p>
                      Builder: <Link to={`/Builder/${img.builder}`}>{img.builder}</Link>
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

Gallery.propTypes = {
  images: PropTypes.array.isRequired,
};

export default Gallery;