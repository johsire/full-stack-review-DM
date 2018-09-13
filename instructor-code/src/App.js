import React, { Component } from 'react';
import './App.css';
import { HashRouter, Route, Switch } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
        <HashRouter>
          <Switch>
            <Route path='/' component={} exact />
          </Switch>
        </HashRouter>
      </div>
    );
  }
}

export default App;
