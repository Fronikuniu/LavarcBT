import { Link } from 'react-router-dom';
import { Image } from '../../types';

function GalleryCard({ id, imageSrc, title, builder }: Image) {
  return (
    <div className="gallery__content-images__about">
      <Link to={`/gallery/${id}`}>
        <img src={imageSrc} alt="" />
      </Link>
      <div className="gallery__content-images__about-desc">
        <p>
          <Link to={`/gallery/${id}`}>{title}</Link>
        </p>
        <p>
          Builder: <Link to={`/builder/${builder}`}>{builder}</Link>
        </p>
      </div>
    </div>
  );
}

export default GalleryCard;
