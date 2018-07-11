import React, { Component } from 'react';
import './App.css';
import Title from './title/Title'
import MainContent from './maincontent/MainContent'
import SearchForm from './searchForm/SearchForm'

class App extends Component {

  state = {
    userGitHub: {},
    username: ''
  }

  _handlerSearchUser = e => {
    e.preventDefault()
    let userUrl = `https://api.github.com/users/${this.state.username}`
    const headers = {
      headers: {
        Authorization: 'Bearer ' + 'c0409c4df83fdddac17d4759356c6ff6fa746d35'
      }
    }
    fetch(userUrl, headers)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        this.setState({
          userGitHub: data
        })
      })
    }

  _handlerWriteName = input => {
    input.preventDefault()
    this.setState({
      username: input.target.value
    })
    this.setState.text = ''
  }

  render() {
    return (
      <div className="App">
        <Title className="apptitle" dataUser={this.state.userGitHub}/>
        <SearchForm className="appsearchform" handlerSearchUser={this._handlerSearchUser} handlerWriteName={this._handlerWriteName} />
        <MainContent className="appmain" dataUser={this.state.userGitHub}/>
      </div>
    );
  }
}

export default App;
