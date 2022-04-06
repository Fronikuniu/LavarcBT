import { Link } from 'react-router-dom';
import Loader from '../Loader/Loader';
import { Image } from '../../types';
import useDocs from '../helpers/useDocs';

function Gallery() {
  const { data: images, isLoading } = useDocs<Image>('gallery', {
    orderByArg: ['createdAt', 'asc'],
  });

  return (
    <section className="gallery">
      <div className="container">
        <h2 className="headerTextStroke">Our all</h2>
        <h3 className="headerwTextStroke">Projects</h3>

        <div className="gallery__content">
          <div
            className="gallery__content-loader"
            style={{ display: isLoading ? 'block' : 'none' }}
          >
            <Loader />
          </div>

          <div className="gallery__content-images" style={{ display: isLoading ? 'none' : 'grid' }}>
            {isLoading ? (
              <Loader />
            ) : (
              images.map((img) => {
                return (
                  <div className="gallery__content-images__about" key={img.id}>
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
              })
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Gallery;
