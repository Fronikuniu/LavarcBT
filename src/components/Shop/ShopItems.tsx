import { MdOutlineAddShoppingCart } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { Image } from '../../types';
import Pagination from '../helpers/Pagination';
import useDocsSnapshot from '../helpers/useDocsSnapshot';
import usePaginateData from '../helpers/usePaginateData';

interface ShopItemsProps {
  addToCart: (item: Image) => void;
}

function ShopItems({ addToCart }: ShopItemsProps) {
  const { data: shopItems } = useDocsSnapshot<Image>(`gallery`, [], {
    whereArg: ['price', '>', 0],
    orderByArg: ['price', 'desc'],
    secOrderByArg: ['createdAt', 'desc'],
  });

  const paginatedData = usePaginateData<Image>(shopItems);

  return (
    <div className="container">
      <div className="shop-full">
        <h2 className="headerTextStroke">Shop</h2>
        <h3 className="headerwTextStroke">Shop</h3>

        <div className="shop-items">
          {paginatedData.map((item) => (
            <div className="item" key={item.title}>
              <MdOutlineAddShoppingCart
                className="addToList"
                title="Add to cart"
                onClick={() => addToCart(item)}
              />
              <Link to={`/gallery/${item.id}`}>
                <img src={item.imageSrc} alt="" />
              </Link>
              <Link to={`/gallery/${item.id}`}>
                <p>{item.title}</p>
              </Link>
              <p className="cost">
                {item.sale ? (
                  <>
                    <span className="price">${item.price}</span>
                    <span className="sale">${item.sale}</span>
                  </>
                ) : (
                  <span>${item.price}</span>
                )}
              </p>
            </div>
          ))}
        </div>
        <Pagination totalItems={shopItems.length} />
      </div>
    </div>
  );
}

export default ShopItems;
