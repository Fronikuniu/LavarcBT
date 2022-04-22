import Loader from '../Loader/Loader';
import { Image } from '../../types';
import useDocs from '../hooks/useDocs';
import GalleryCard from './GalleryCard';
import Pagination from '../helpers/Pagination';
import usePaginateData from '../hooks/usePaginateData';
import SearchBar from '../helpers/SearchBar';
import useSearch from '../hooks/useSearch';

function Gallery() {
  const { data: images, isLoading } = useDocs<Image>('gallery', {
    orderByArg: ['createdAt', 'asc'],
  });
  const searchData = useSearch<Image>(images, ['title', 'desc', 'builder']);
  const paginatedData = usePaginateData<Image>(searchData);

  return (
    <section className="gallery">
      <div className="container">
        <h2 className="headerTextStroke">Our all</h2>
        <p className="headerwTextStroke">Projects</p>

        <SearchBar params={['title', 'desc', 'builder']} />

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
              paginatedData.map((img) => <GalleryCard {...img} key={img.id} />)
            )}
          </div>

          <Pagination totalItems={images.length} />
        </div>
      </div>
    </section>
  );
}

export default Gallery;
