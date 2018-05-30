import React, { Component } from 'react';
//import { Route, Link, HashRouter } from 'react-router-dom'
import './App.css';
import logic from './logic'
import { Search, List, Info } from './components'

logic.token = '316f8c330c989ac16e9c3a0a6fa1a2b8c3c18935'

class App extends Component {
  state = {
    users: [],
    user: {}
  }

  search = (query) => {
    logic.searchUsers(query)
      .then(users => this.setState({ users }))
      .catch(this.showError)
  }

  showError() {
    alert('something gone wrong :(')
  }

  showInfo = (username) => {
    logic.retrieveUser(username)
      .then(user => this.setState({ user }))
      .catch(this.showError)
  }

  render() {
    const { users, user } = this.state

    return (
      <main>
        <header>
          <h1>github app</h1>
        </header>
        <Search onSearch={this.search} />
        <div>
          <List users={users} onItemClick={this.showInfo} className="left" />
          <Info user={user} className="right" />
        </div>
      </main>
    )
  }
}

export default App;
