import { Link } from 'react-router-dom';
import { MdOutlineAddShoppingCart } from 'react-icons/md';
import { Image } from '../../types';
import useDocsSnapshot from '../helpers/useDocsSnapshot';
import ShopCost from './ShopCost';

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
          <ShopCost price={bestseller.price} sale={bestseller.sale} />
        </div>
      ))}
    </>
  );
}

export default Bestsellers;
