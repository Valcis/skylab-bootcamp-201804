import React, { Component } from 'react';

import './App.css';
import Title from './Title/Title'
import SearchForm from './SearchForm/SearchForm'
import MainContent from './MainContent/MainContent'

class App extends Component {

  state={
    userName: '',
    userInformation: '',
    onError: false
  }

  _handlerSearchUser = (e) => {
    e.preventDefault()

    const headers = {
      headers: {
          Authorization: 'Bearer ' + 'a4fdf83ba39d192feefb34d8c6aac9d3b6cd4c61'
      }
  };
  
   fetch('https://api.github.com/users/' + this.state.userName, headers
  )
    .then(res => {
      if(res.status === 200) 
        return res.json()
      else throw Error('Wrong')
  })
    .then(information => this.setState({userInformation: information, onError:false})) // Tenemos que actualizar el userInformation para que introduzca al nuevo objeto de usuario buscado
    .catch(error => this.setState({onError: true, userInformation: {} }))
   
    e.target.value="";
  
  }

  _handlerWriteName = (e) => {
    e.preventDefault()

 this.setState ({
     userName: e.target.value
 })


  }
  
  render() {
    return (
      <div className="App">
        <Title userName={this.state.userName}/>
        <SearchForm handlerWriteName={this._handlerWriteName} handlerSearchUser={this._handlerSearchUser}/>
        {this.state.userInformation && <MainContent userInfo={this.state.userInformation} error={this.state.onError}/>}
      </div>
    )
 }
}

export default App;
