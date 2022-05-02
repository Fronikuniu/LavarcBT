import { MdOutlineAddShoppingCart } from 'react-icons/md';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { Image } from '../../types';
import useDocs from '../hooks/useDocs';
import ShopCost from '../Shop/ShopCost';

interface GallerySingleProps {
  addToCart: (item: Image) => void;
}

function GallerySingle({ addToCart }: GallerySingleProps) {
  const { id }: { id: string } = useParams();
  const { data: getImage } = useDocs<Image>('gallery', {
    whereArg: ['id', '==', id],
  });
  const image = getImage[0];

  return (
    <section className="gallery__single">
      <div className="container">
        <div className="gallery__single__content">
          <div className="gallery__single__content-img">
            <img src={image?.imageSrc} alt="" />
          </div>
          <div className="gallery__single__content-text">
            <h1 className="title">
              <span>{image?.title}</span>
            </h1>
            <p className="builder">
              By: <Link to={`/builder/${image?.builder}`}>{image?.builder}</Link>
            </p>
            {image?.desc ? <p className="desc">{image?.desc}</p> : null}
            {image?.price ? <ShopCost price={image.price} sale={image.sale} /> : null}
            <div
              role="link"
              onClick={() => window.open(image?.imgurAlbum)}
              onKeyDown={() => window.open(image?.imgurAlbum)}
              tabIndex={0}
            >
              <p className="bouncing">Want to see more of this building? Click!</p>
            </div>
            {image?.price ? (
              <button
                type="button"
                className="btn primary btn-addToList"
                onClick={() => addToCart(image)}
              >
                <MdOutlineAddShoppingCart title="Add to cart" className="addToListIcon" /> Add to
                cart
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

export default GallerySingle;
