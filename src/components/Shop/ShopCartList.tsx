import { IoClose } from 'react-icons/io5';
import { Image } from '../../types';

interface ShopCartListProps {
  cart: Image[];
  removeFromCart: (item: Image) => void;
  lenght: number;
}

function ShopCartList({ cart, removeFromCart, lenght }: ShopCartListProps) {
  return (
    <div className="shopCart__list">
      <div className="legend">
        <p>Products {`(${lenght || 0})`}</p>
        <p>Price</p>
      </div>
      <hr />
      {lenght ? (
        cart.map((item) => (
          <div className="item" key={item.id}>
            <div className="left-side">
              <div className="remove">
                <IoClose className="pointer" onClick={() => removeFromCart(item)} />
              </div>
              <img src={item.imageSrc} alt={item.title} className="image" />
            </div>
            <div className="bottom-side">
              <div className="text">
                <p className="title">{item.title}</p>
                <p className="builder">{item.builder}</p>
              </div>
              <div className="cost">
                {item.sale ? (
                  <div className="sale">
                    <p className="sale-price">{item.price}$</p>
                    <p className="sale-sale">{item.sale}$</p>
                  </div>
                ) : (
                  <p className="price">{item.price}$</p>
                )}
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="placeholder">You have no items in cart.</p>
      )}
    </div>
  );
}

export default ShopCartList;
