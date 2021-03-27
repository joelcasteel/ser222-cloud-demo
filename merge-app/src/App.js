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
          <Switch>
            <Route exact path="/" component={MergeSort}/>
            <Route exact path="/hash" component={HashTableVisual}/>
        </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
