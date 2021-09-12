import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import About from './components/About/About';
import Home from './components/Home/Home';
import Nav from './components/Nav/Nav';
import './styles/components/app.scss';

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
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
