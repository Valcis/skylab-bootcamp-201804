import React, { Component } from 'react'
import './App.css'
import { Route, Switch, Redirect } from 'react-router-dom';
import NotFound from './components/NotFound'
import NewsGridContainer from './components/NewsGridContainer'
import UpdateUser from './components/UpdateUser'

class App extends Component {

  state = { registered: false }


  render() {
    return (
      <div className="app">
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/news/introduction" />} />

          <Route path="/news/:category" render={props => <NewsGridContainer category={props.match.params.category} />} />

          {/* DEMO: http://localhost:3000/#/news/culture/Muere%20el%20poeta%20cubano%20Rafael%20Alcides */}
          {/* <Route path="/news/:category/:path" render={props => <NewsItemContainer category={props.match.params.category} path={props.match.params.path} />} /> */}

          <Route path="/users/update" component={UpdateUser} />

          <Route path="/404" component={NotFound} />
        </Switch >
      </div>
    );
  }
}

export default App;

