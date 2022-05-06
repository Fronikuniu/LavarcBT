import About from '../About/AboutHome';
import GallerySlider from '../Gallery/GallerySlider';
import Recommendations from '../Recommendations/Recommendations';
import LandingPage from './LandingPage';

function Home() {
  return (
    <>
      <LandingPage />
      <About />
      <GallerySlider />
      <Recommendations />
    </>
  );
}

export default Home;
