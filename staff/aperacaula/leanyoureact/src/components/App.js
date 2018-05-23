import React, { Component } from 'react';
import logo from '../logo.svg';
import './App.css';
import SearchForm from './searchForm/SearchForm';
import Title from './title/Title';
import MainContent from './mainContent/MainContent';


const headers = {
  headers: {
      Authorization: 'Bearer ffc630410ccca738cda6e765a498698f8074f801'
  }
};

class App extends Component {

  constructor(){
    super()

    this.state = {
      username: '',
      lastUserSearched: {},
      thereIsError: false,
      searchedUsers: []
    }

  }

  _handlerWriteName= (e) => {
    this.setState({
      username: e.target.value
    })
  }

  _handlerSearchUser= (e) => {
   e.preventDefault()
   console.log('yew, you submitted user')
   console.log(this.username)
   fetch(`https://api.github.com/users/${this.state.username}`, headers)
    .then( promiseResult => promiseResult.json())
    .then(promiseResult =>
        {
        if (promiseResult.message){
          this.setState({
            thereIsError: true
          });
        }else{
        this.setState( prevState=> {
          return{
            thereIsError: false,
            lastUserSearched: promiseResult,
            searchedUsers: [...prevState.searchedUsers, promiseResult]}
           })
          }
      })
    
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src="http://www.stickpng.com/assets/images/5842a4f5a6515b1e0ad75af6.png" className="App-logo" alt="logo" />
          <Title text="AVENGERS" thereIsError={this.state.thereIsError}/> 
        </header>
        
        <main>
          <SearchForm 
            _handlerSearchUser={this._handlerSearchUser}
            _handlerWriteName= {this._handlerWriteName}
            buttonText= "Search"
          
          /> 

          <MainContent 
            searchedUsers={this.state.searchedUsers}
            lastUserSearched={this.state.lastUserSearched}
            thereIsError={this.state.thereIsError}

          />
        </main>
      </div>
    );
  }
}

export default App;
