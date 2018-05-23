import React, { Component } from 'react';
import SearchUsers from './components/SearchUsers'
import UsersList from './components/UsersList'
import UserDetails from './components/UserDetails'
import logic from './logic/index'

import './App.css';

class App extends Component {
  state = {
    users: [],
    user: {},
    query: '',
  }

  searchUsers = e => {
    e.preventDefault();
    if (this.state.query.length > 0) {
      logic.searchUsers(this.state.query)
        .then(users => {
          this.setState({
            users: users,
            user: {},
            query: ''
          })
        });
    }
  }

  retrieveUser = username => {
    logic.retrieveUser(username)
      .then(user => {
        this.setState({
          user: user,
          query: ''
        })
      });
  }


  render() {
    return (
      <div className="App">
        <section className="search-container">
          <SearchUsers
            handleWriteUser={this.handleChange}
            searchUsers={this.searchUsers}
            query={this.state.query}
          />
        </section>
        <section className="results-container">
          <div className="user-list">
            <UsersList
              users={this.state.users}
              handleUsers={this.retrieveUser}
            />
          </div>
          <div className="user-detail">
            <UserDetails user={this.state.user} />
          </div>
        </section>
      </div>
    );
  }
}

export default App;
