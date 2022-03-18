import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

function GallerySingle({ images }) {
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
              What's built: <span>{image?.desc}</span>
            </p>
            <p>
              This beautiful building was built by:{' '}
              <Link to={`/builder/${image?.builder}`}>{image?.builder}</Link>
            </p>
            <div
              role="link"
              onClick={() => window.open(image?.imgurAlbum)}
              onKeyDown={() => window.open(image?.imgurAlbum)}
              tabIndex="0"
            >
              <p>Want to see more of this building? Click!</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

GallerySingle.propTypes = {
  images: PropTypes.array.isRequired,
};

export default GallerySingle;
