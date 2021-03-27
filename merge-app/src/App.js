import React, {Component} from 'react';

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect,
  useHistory
} from 'react-router-dom';

import "./App.css";

import MergeSort from './pages/MergeSort';
import HashTableVisual from './pages/HashTable';
class App extends Component {
  componentDidMount() {
    document.title = "SER222 - Examples";
  }

  render() {
    return (
      <Router>
        <div>
          <h3>SER 222 - Visual Demos</h3>
          <Link to='/merge'>Merge Sort Demo</Link>
          <br/>
          <Link to='/hash'>Hash Table Demo</Link>
          <Switch>
            <Route exact path="/merge" component={MergeSort}/>
            <Route exact path="/hash" component={HashTableVisual}/>
        </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
