import React, { Component } from 'react';
import logo from '../logo.svg';
import './App.css';
import Title from "./Title/Title"
import SearchForm from "./SearchForm/SearchForm"
import MainContent from "./MainContent/MainContent"

class App extends Component {
  constructor() {
    super();

    this.state = {
      user : "",
      error: {},
      data: {}
    }
  }

  _handlerSearchUser = e => {
    e.preventDefault()

    const headers = {
      headers: {
          Authorization: 'Bearer ' + "8c31673426a0dceffe7d722bf03584903ed72848"
        }
    };

    fetch("https://api.github.com/users/" + this.state.user, headers)
      .then(resp => resp.json())
      .then(data => {
        this.setState({
          data
        })
      }
      )
      .catch(error => {
        this.setState({
          error
        })
        
      }
      )
  }

  _handlerWriteName = e => {
    this.setState({
      user: e.target.value
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Title className="App-title" userInfo={this.state.data.login} thisUser={this.state.user} />
        </header>
        <SearchForm className="search" input={this._handlerWriteName} but={this._handlerSearchUser}/>
        <MainContent className="Main-content" userInfo={this.state.data} />
      </div>
    );
  }
}

export default App;
