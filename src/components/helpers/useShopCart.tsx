import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Image } from '../../types';
import { UseUpdateDoc } from './useManageDoc';

const useShopCart = () => {
  const [cart, setCart] = useState<Image[] | []>([]);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    const newCart = localStorage.getItem('shopCart');
    if (newCart) {
      const parsedCart = JSON.parse(newCart) as Image[];
      setCart(parsedCart);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('shopCart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = async (item: Image) => {
    const isInCart = cart.find((cartItem) => cartItem.id === item.id);
    if (isInCart) toast.warning('Item already in cart!');
    else {
      const newCart = [...cart, item];
      setCart(newCart);
      setTotal(total + item.sale ? item.sale : item.price);
      await UseUpdateDoc('gallery', [item.doc_id], { bestseller: item.bestseller + 1 });
      toast.success('Item added to cart!');
    }
  };

  const removeFromCart = (item: Image) => {
    const newCart = cart.filter((cartItem) => cartItem.id !== item.id);
    setCart(newCart);
    setTotal(total - item.sale ? item.sale : item.price);
  };

  return { cart, total, length: cart.length, addToCart, removeFromCart };
};

export default useShopCart;
