import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const GallerySingle = ({ images }) => {
  const [image, setImage] = useState([]);
  const { id } = useParams();

  useEffect(() => setImage(images.find((img) => img.id === Number(id))), [images, id]);

  return (
    <section className="gallery__single">
      <div className="container">
        <div className="gallery__single__content">
          <div className="gallery__single__content-img">
            <img src={image?.imageSrc} alt="" />
          </div>
          <div className="gallery__single__content-text">
            <p>
							
              {'What\'s built:'} <span>{image?.desc}</span>
            </p>
            <p>
              This beautiful building was built by: <Link to={`/builder/${image?.builder}`}>{image?.builder}</Link>
            </p>
            <p onClick={() => window.open(image?.imgurAlbum)}>Want to see more of this building? Click!</p>
          </div>
        </div>
      </div>
    </section>
  );
};

GallerySingle.propTypes = {
  images: PropTypes.array.isRequired,
};

export default GallerySingle;
