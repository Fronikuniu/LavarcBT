import Loader from '../Loader/Loader';
import { Image } from '../../types';
import useDocs from '../helpers/useDocs';
import GalleryCard from './GalleryCard';

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
            {isLoading ? <Loader /> : images.map((img) => <GalleryCard {...img} key={img.id} />)}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Gallery;
