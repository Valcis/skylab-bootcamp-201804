import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import logic from './logic'
import UsersSearch from './components/UsersSearch/UsersSearch'
import UsersList from './components/UsersList/UsersList';
import UserInfo from './components/UserInfo/UserInfo';
import Title from './components/Title/Title';

class App extends Component {

  constructor() {
    super()

    this.state = {
      username: '',
      data: [],
      onError: 0,
      user: {}
    }
  }

  _searchUsers = (e) => {
    e.preventDefault()

    logic.searchUsers(this.state.username)
      .then(data => {
        this.setState({ data })
        // data.message ? this.setState({ onError: true }) : this.setState({ onError: false });
        // this.setState({data, username: ''})
      })
  }
  _retrieveUser = (username) => {
    logic.retrieveUser(username)
      .then(user => { this.setState({ user }) })
  }

  _handlerWriteName = (e) => {
    this.setState({
      username: e.target.value
    })
  }

  render() {
    return (
      <div className="App">
      
          < Title/>

        < UsersSearch _searchUsers={this._searchUsers} _handlerWriteName={this._handlerWriteName} value={this.state.username} />

        <div className="listsContainer">

          {!this.state.data.length ? '' : < UsersList data={this.state.data} _retrieveUser={this._retrieveUser} />}

          <UserInfo user={this.state.user} />

        </div>

      </div>
    );
  }
}

export default App;