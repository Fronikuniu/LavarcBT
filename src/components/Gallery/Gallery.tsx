import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import Loader from '../Loader/Loader';
import { db } from '../configuration/firebase';
import { Image } from '../../types';

function Gallery() {
  const [loading, setLoading] = useState(true);
  const counter = useRef(0);
  const [images, setImages] = useState<Image[]>([]);

  useEffect(() => {
    const getGallery = async () => {
      const q = query(collection(db, 'gallery'), orderBy('createdAt'));
      const querySnapshot = await getDocs(q);
      const gallery: Image[] = [];
      querySnapshot.forEach((doc) => {
        gallery.push(doc.data() as Image);
      });
      setImages(gallery);
    };
    getGallery()
      .then(() => {})
      .catch(() => {});
  }, []);

  const imageLoaded = () => {
    counter.current += 1;
    if (counter.current >= images.length) setLoading(false);
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
            {images.map((img) => {
              return (
                <div className="gallery__content-images__about" onLoad={imageLoaded} key={img.id}>
                  <Link to={`/gallery/${img.id}`}>
                    <img src={img.imageSrc} alt="" />
                  </Link>
                  <div className="gallery__content-images__about-desc">
                    <p>
                      <Link to={`/gallery/${img.id}`}>{img.title}</Link>
                    </p>
                    <p>
                      Builder: <Link to={`/builder/${img.builder}`}>{img.builder}</Link>
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
}

export default Gallery;
