import React, { useEffect, useState } from 'react';
import { IoIosArrowDropleft, IoIosArrowDropright } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore';
import { db } from '../configuration/firebase';
import { Image } from '../../types';

function GallerySlider() {
  const [current, setCurrent] = useState(0);
  const [images, setImages] = useState<Image[]>([]);
  const { length } = images;
  const prev = current === 0 ? length - 1 : current - 1;
  const next = current === length - 1 ? 0 : current + 1;

  useEffect(() => {
    const galleryTimeout = setTimeout(() => setCurrent(next), 10000);
    return () => clearTimeout(galleryTimeout);
  });

  useEffect(() => {
    const getGallery = async () => {
      const q = query(collection(db, 'gallery'), orderBy('createdAt'), limit(7));
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

  const prevSlide = () => setCurrent(prev);
  const nextSlide = () => setCurrent(next);

  return (
    <section className="gallery-latest">
      <div className="container">
        <h2 className="headerTextStroke">Latest</h2>
        <h3 className="headerwTextStroke">Projects</h3>
      </div>
      <div className="slider">
        <IoIosArrowDropleft onClick={prevSlide} className="arrow arrowPrev" role="button" />
        <IoIosArrowDropright onClick={nextSlide} className="arrow arrowNext" role="button" />

        {images.map((img, index) => {
          return (
            <div key={img.id} className={current === index ? 'slide active' : 'slide'}>
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
