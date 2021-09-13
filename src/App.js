import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import About from './components/About/About';
import AboutMembers from './components/About/AboutMembers';
import Home from './components/Home/Home';
import Nav from './components/Nav/Nav';

function App() {
  return (
    <Router>
      <Nav />

      <Switch>
        <Route exact path="/">
          <Home />
          <About />
        </Route>
        <Route path="/About">
          <About />
          <AboutMembers />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
