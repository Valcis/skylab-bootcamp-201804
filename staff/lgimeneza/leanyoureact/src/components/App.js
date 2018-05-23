import React, { Component } from 'react';
import logo from '../logo.svg';
import MainContent from './MainContent/mainContent'
import Title from './Title/title'
import SearchForm from './SearchForm/searchForm'
import './App.css';

class App extends Component {
  state = {
      username: '',
      data: {},
      onError: false
  }

  _handlerSearchUser = (e) => {
    e.preventDefault()

    const TOKEN = 'b02d8dbebbea776968fe85809017d589be94bedf'

    const headers = {
      headers: {
          Authorization: 'Bearer ' + TOKEN
      }
    };

    fetch(`https://api.github.com/users/${this.state.username}`, headers)
      .then(res => res.json())
      .then(data =>{
          if(data.message){
            this.setState({ onError: true })
          } else {
            this.setState({ data, onError: false })
          }
        })
  }

  _handlerWriteName = (e) => {
    this.setState({ username: e.target.value })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Title className="App-title" data={this.state.data}/>
        </header>
          <SearchForm _handlerSearchUser={this._handlerSearchUser} _handlerWriteName={this._handlerWriteName} />
          {
            this.state.onError ? <h3>User not found :(</h3> : <MainContent className="App-intro" data={ this.state.data } onError={this.state.onError} />
          }
      </div>
    );
  }
}

export default App;