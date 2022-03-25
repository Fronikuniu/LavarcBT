import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../configuration/firebase';

function GallerySingle() {
  const [image, setImage] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const getSingleImage = async () => {
      const q = query(collection(db, 'gallery'), where('id', '==', id));

      const querySnapshot = await getDocs(q);

      const img = [];
      querySnapshot.forEach((doc) => {
        img.push(doc.data());
      });
      setImage(img[0]);
    };
    getSingleImage();
  }, [id]);

  return (
    <section className="gallery__single">
      <div className="container">
        <div className="gallery__single__content">
          <div className="gallery__single__content-img">
            <img src={image?.imageSrc} alt="" />
          </div>
          <div className="gallery__single__content-text">
            <p className="title">
              What's built: <span>{image?.title}</span>
            </p>
            <p className="desc">{image?.desc}</p>
            <p className="builder">
              This beautiful building was built by:{' '}
              <Link to={`/builder/${image?.builder}`}>{image?.builder}</Link>
            </p>
            <div
              role="link"
              onClick={() => window.open(image?.imgurAlbum)}
              onKeyDown={() => window.open(image?.imgurAlbum)}
              tabIndex="0"
            >
              <p className="bouncing">Want to see more of this building? Click!</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default GallerySingle;
