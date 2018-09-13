import React, { Component } from 'react';
import './App.css';
import Login from './components/Login/Login';
import { HashRouter, Route, Switch } from 'react-router-dom';


class App extends Component {
  render() {
    return (
      <div className="App">
      <HashRouter>
        <Switch>
          <Route path='/' component={Login} exact />
        </Switch>
      </HashRouter>
      </div>
    );
  }
}

export default App;
