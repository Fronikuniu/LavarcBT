interface ShopCostProps {
  price: number;
  sale?: number;
}

function ShopCost({ price, sale }: ShopCostProps) {
  return (
    <p className="cost">
      {sale ? (
        <>
          <span className="price">${price}</span>
          <span className="sale">${sale}</span>
        </>
      ) : (
        <span>${price}</span>
      )}
    </p>
  );
}

export default ShopCost;
