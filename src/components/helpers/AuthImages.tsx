import authImage from '../../images/AuthImage.webp';
import authImage2 from '../../images/AuthImage2.webp';
import authImage3 from '../../images/AuthImage3.webp';

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
