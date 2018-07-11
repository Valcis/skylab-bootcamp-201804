import React, { Component } from 'react'
import './App.css'
import { Route, Switch, Redirect } from 'react-router-dom';
import NotFound from './components/NotFound'
import UserUpdatePage from './components/UserUpdatePage'
import LandingPage from './components/LandingPage';
import UserRegisterPage from './components/UserRegisterPage';
import FullItemPage from './components/FullItemPage';
import LoginPage from './components/LoginPage';

class App extends Component {

  state = {
    registered: false,
    //actualNews: {}
  }

  /* setActualNews = (article) => {
    this.setState({ actualNews: article })
  } */

  render() {
    return (
      <div className="app">
        <Switch>
          <Route exact path="/users/register" component={UserRegisterPage} />
          <Route exact path="/users/update" component={UserUpdatePage} />
          <Route exact path="/users/login" component={LoginPage} />

          <Route exact path="/" render={() => <Redirect to="/news/introduction" />} />

          <Route path="/news/:category/:newsId/:title" render={props => <FullItemPage category={props.match.params.category} newsId={props.match.params.newsId} />} />
          <Route exact path="/news/:category" render={props => <LandingPage /* setActualNews={this.setActualNews} */ category={props.match.params.category} />} />

          <Route path="/404" component={NotFound} />
        </Switch >
      </div>
    );
  }
}

export default App;

