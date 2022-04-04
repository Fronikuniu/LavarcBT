import React from 'react';
import authImage from '../../images/AuthImage.png';
import authImage2 from '../../images/AuthImage2.png';
import authImage3 from '../../images/AuthImage3.png';

function AuthImages() {
  return (
    <div className="images-container">
      <img src={authImage} alt="beach" />
      <img src={authImage2} alt="dragon" />
      <img src={authImage3} alt="houses" />
    </div>
  );
}

export default AuthImages;
