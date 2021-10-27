import React from 'react';
import authImage from '../../images/AuthImage.png';
import authImage2 from '../../images/AuthImage2.png';
import authImage3 from '../../images/AuthImage3.png';

const AuthImages = () => {
  return (
    <div className="images-container">
      <img src={authImage} alt="" />
      <img src={authImage2} alt="" />
      <img src={authImage3} alt="" />
    </div>
  );
};

export default AuthImages;
