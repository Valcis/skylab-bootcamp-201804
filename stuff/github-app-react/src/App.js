import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom'
import './App.css';
import logic from './logic'
import { Search, List, Info } from './components'

logic.token = '316f8c330c989ac16e9c3a0a6fa1a2b8c3c18935'

class App extends Component {

  search = (query) => {
    //window.location.hash = `#/search/${query}`
    this.props.history.push(`/search/${query}`)
  }

  showError() {
    alert('something gone wrong :(')
  }

  render() {
    return (
      <main>
        <header>
          <h1>github app</h1>
          {/* <Route path="/holamundo" component={HelloWorld} /> */}
          {/* <Route path="/holamundo" render={() => <HelloWorld salute="hola mundo"/>} /> */}
          {/* <Route path="/hola/:name" render={(props) => <HelloWorld salute={props.match.params.name}/>} /> */}
        </header>
        <Search onSearch={this.search} />
        <div>
          <Route path="/search/:query" render={props => <List query={props.match.params.query} onError={this.showError} className="left" />} />
          <Route path="/user/:username" render={props => <Info username={props.match.params.username} onError={this.showError} className="right" />} />
        </div>
      </main>
    )
  }
}

// function HelloWorld(props) {
//   return <div><h1>{props.salute}</h1></div>
// }

export default withRouter(App);
