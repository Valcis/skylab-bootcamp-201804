import React, { Component } from 'react'
import './App.css'
import { Route, Switch, Link } from 'react-router-dom';
import NotFound from './components/NotFound'
import Container from './components/Container'
import UpdateUser from './components/UpdateUser'

class App extends Component {

  state = { registered: false }


  render() {
    return (
      <div className="app">
        <Switch>
          <Route path="/news/:category" render={props => <Container category={props.match.params.category} />} />

          <Route path="/users/update" component={UpdateUser} />

          <Route path="/404" component={NotFound} />
        </Switch >
      </div>
    );
  }
}

export default App;

