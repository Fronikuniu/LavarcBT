import React from 'react';
import PropTypes from 'prop-types';

const Bestsellers = ({ bestsellers }) => {
  return bestsellers.map((bestseller) => {
    return (
      <div className="item" key={bestseller.title}>
        <img src={bestseller.image} alt="" />
        <p>{bestseller.title}</p>
        <p className="cost">
          {bestseller.sale ? (
            <>
              <span className="price">${bestseller.price}</span>
              <span className="sale">${bestseller.sale}</span>
            </>
          ) : (
            `$${bestseller.price}`
          )}
        </p>
      </div>
    );
  });
};

Bestsellers.propTypes = { bestsellers: PropTypes.array.isRequired };

export default Bestsellers;
