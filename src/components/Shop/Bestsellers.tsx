import { Image } from '../../types';

interface BestsellersProps {
  bestsellers: Image[];
}

function Bestsellers({ bestsellers }: BestsellersProps) {
  return (
    <>
      {bestsellers.map((bestseller) => (
        <div className="item" key={bestseller.title}>
          <img src={bestseller.imageSrc} alt="" />
          <p>{bestseller.title}</p>
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
