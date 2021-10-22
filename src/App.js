import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import About from './components/About/About';
import AboutMembers from './components/About/AboutMembers';
import Home from './components/Home/Home';
import Nav from './components/Nav/Nav';
import Members from './components/About/Members';
import GallerySlider from './components/Gallery/GallerySlider';
import { Images } from './components/Gallery/Images';
import Gallery from './components/Gallery/Gallery';
import GallerySingle from './components/Gallery/GallerySingle';
import SingleMember from './components/About/SingleMember';

function App() {
  return (
    <Router>
      <Nav />

      <Switch>
        <Route exact path="/">
          <Home />
          <About />
          <GallerySlider images={Images.slice(-7)} />
        </Route>
        <Route path="/About">
          <About />
          <AboutMembers members={Members} />
        </Route>
        <Route exact path="/Gallery">
          <Gallery images={Images} />
        </Route>
        <Route path="/Gallery/:id">
          <GallerySingle images={Images} />
        </Route>
        <Route path="/Builder/:name">
          <SingleMember images={Images} members={Members} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
