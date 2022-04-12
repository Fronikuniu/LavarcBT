import { Link } from 'react-router-dom';
import { MdOutlineAddShoppingCart } from 'react-icons/md';
import { Image } from '../../types';
import useDocsSnapshot from '../helpers/useDocsSnapshot';

interface BestsellersProps {
  addToCart: (item: Image) => void;
}

function Bestsellers({ addToCart }: BestsellersProps) {
  const { data: bestsellers } = useDocsSnapshot<Image>(`gallery`, [], {
    whereArg: ['bestseller', '>', 0],
    orderByArg: ['bestseller', 'desc'],
    limitArg: 8,
  });

  return (
    <>
      {bestsellers.map((bestseller) => (
        <div className="item" key={bestseller.title}>
          <MdOutlineAddShoppingCart
            className="addToList"
            title="Add to cart"
            onClick={() => addToCart(bestseller)}
          />
          <Link to={`/gallery/${bestseller.id}`}>
            <img src={bestseller.imageSrc} alt="" />
          </Link>
          <Link to={`/gallery/${bestseller.id}`}>
            <p>{bestseller.title}</p>
          </Link>
          <p className="cost">
            {bestseller.sale ? (
              <>
                <span className="price">${bestseller.price}</span>
                <span className="sale">${bestseller.sale}</span>
              </>
            ) : (
              <span>${bestseller.price}</span>
            )}
          </p>
        </div>
      ))}
    </>
  );
}

export default Bestsellers;
