import React, { Component } from 'react'
import './App.css'
import { Route, Switch, Link } from 'react-router-dom';
import NotFound from './components/NotFound'
import Home from './components/Container'
import UpdateUser from './components/UpdateUser'

class App extends Component {

  state = { registered: false }


  render() {
    return (
      <div className="app">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/home" component={Home} />
          
          <Route exact path="/users/update" component={UpdateUser} />

          <Route exact path="/404" component={NotFound} />
        </Switch >
      </div>
    );
  }
}

export default App;

