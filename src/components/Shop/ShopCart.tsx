import { FormEvent, useState } from 'react';
import { Image } from '../../types';
import ShopCartList from './ShopCartList';

interface ShopCartProps {
  cart: Image[];
  total: number;
  length: number;
  removeFromCart: (item: Image) => void;
  clearCart: () => void;
  UseDiscountCode: (code: keyof Record<string, number>) => void;
}

function ShopCart({
  cart,
  total,
  length,
  removeFromCart,
  clearCart,
  UseDiscountCode,
}: ShopCartProps) {
  const [discount, setDiscount] = useState('');

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    UseDiscountCode(discount);
  };

  return (
    <div className="shopCart">
      <div className="container">
        <h1 className="headerTextStroke">Your</h1>
        <p className="headerwTextStroke">Cart</p>

        <ShopCartList cart={cart} removeFromCart={removeFromCart} length={length} />
        <hr />

        <div className="shopCart__total">
          <form onSubmit={onSubmit} className="shopCart__form">
            <label htmlFor="discountCode">
              Use discount code:
              <input
                type="text"
                name="discountCode"
                id="discountCode"
                placeholder="code"
                onChange={(e) => setDiscount(e.target.value)}
              />
            </label>
            <input type="submit" value="Check code" />
          </form>

          <div className="total">
            <div className="total-price">
              <p>Total price:</p>
              <p>{total}$</p>
            </div>
            <button
              disabled
              title="Payment is not done yet"
              type="button"
              className="btn primary order-btn"
              onClick={clearCart}
            >
              Order and Pay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShopCart;
