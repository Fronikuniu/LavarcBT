import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { DiscountCode, Image } from '../../types';
import useDocsSnapshot from './useDocsSnapshot';
import { UseUpdateDoc } from './useManageDoc';

const useShopCart = () => {
  const [cart, setCart] = useState<Image[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [discountNumber, setDiscountNumber] = useState<number>(0);
  const [codeUsed, setCodeUsed] = useState<boolean>(false);
  const { data: codesData } = useDocsSnapshot<DiscountCode>('discountCodes', [], {});

  useEffect(() => {
    const newCart = localStorage.getItem('shopCart');
    if (newCart) {
      const parsedCart = JSON.parse(newCart) as Image[];
      setCart(parsedCart);
    }
    const newTotal = localStorage.getItem('shopCartTotal');
    if (newTotal) {
      const parsedTotal = Number(newTotal);
      setTotal(Math.round(parsedTotal * 100) / 100);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('shopCart', JSON.stringify(cart));
    localStorage.setItem('shopCartTotal', JSON.stringify(total));
    if (!cart.length) setTotal(0);
    const cartSum = cart.reduce((acc: number, curr: Image) => {
      return acc + (curr.sale ? curr.sale : curr.price);
    }, 0);
    if (codeUsed) {
      setTotal(Math.round(cartSum * (1 - discountNumber) * 100) / 100);
    } else {
      setTotal(Math.round(cartSum * 100) / 100);
    }
  }, [cart, total, codeUsed, discountNumber]);

  const addToCart = async (item: Image) => {
    const isInCart = cart.find((cartItem) => cartItem.id === item.id);
    if (isInCart) toast.warning('Item already in cart!');
    else {
      const newCart = [...cart, item];
      setCart(newCart);
      await UseUpdateDoc('gallery', [item.doc_id], { bestseller: item.bestseller + 1 });
      toast.success('Item added to cart!');
    }
  };

  const removeFromCart = async (item: Image) => {
    const newCart = cart.filter((cartItem) => cartItem.id !== item.id);
    setCart(newCart);
    await UseUpdateDoc('gallery', [item.doc_id], { bestseller: item.bestseller });
    toast.success('Item removed from cart!');
  };

  const UseDiscountCode = (code: string) => {
    if (codeUsed) return;
    const findDiscount = codesData.find((codeData) => codeData.code === code);
    if (!findDiscount) return;
    const discount = findDiscount.discount / 100;
    setDiscountNumber(discount);
    setCodeUsed(true);
  };

  const clearCart = () => {
    setCart([]);
    setTotal(0);
    setCodeUsed(false);
    setDiscountNumber(0);
  };

  return {
    cart,
    total,
    length: cart.length,
    addToCart,
    removeFromCart,
    clearCart,
    UseDiscountCode,
  };
};

export default useShopCart;
