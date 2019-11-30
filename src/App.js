import React from 'react';
import Login from '../src/component/Login'
import './App.css';
import Search from '../src/component/Search'
import '../src/css/style.css'
import {
  HashRouter as Router,
  Route
} from "react-router-dom";
const App = () => {
  return (
    <div className="App">
      <Router>
        <Route exact component={Login} path='/' />
          <Route component={Search} path='/Search' />
      </Router>
    </div>
  );
}

export default App;
