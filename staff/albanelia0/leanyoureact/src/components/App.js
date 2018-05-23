
import React, { Component } from 'react';
import './App.css';
import Title from './Title/title'
import SearchForm from './SearchForm/searchForm'
import MainContent from './MainContent/mainContent'


const headers = {
  headers: {
    Authorization: 'Bearer fe3b1eb48235bdb9276a916dcc44e4e55f5f09fd'
  }
};

class App extends Component {

      state = {
        users:'',
        value:'',
        data: {},
        error: ''
        
      }

  _handlerSearchUser =(e) => {
    e.preventDefault()

    const input = document.getElementsByClassName('input-text')[0].value

    this.setState({
      value:''
    })

    fetch(`https://api.github.com/users/${input}`,headers)
    .then(response => response.json())
    .then(data => { console.log(data)
      data.message ? this.error = true: this.error = false;

      this.setState ({
        data
      })
    })
    .catch(error => alert(`The following error occurred: ${error}`))


  }

  _handlerWriteName = (event) => {

    this.setState({ value: event.target.value })

  }

  render() {
    return (
      <div className="App">
        <div className='content-box'>
          <section className="header" class= "navbar navbar-light bg-light navbar-expand-lg">    
            <Title />
          </section>

          <section className="form">
            <SearchForm
            _handlerSearchUser={this._handlerSearchUser}
            _handlerWriteName={this._handlerWriteName} 
            value={this.state.value}
            />
          </section>

          <section className="content">
            {(this.error) ? <h2>Name not found :O!!</h2> :
              <MainContent let objeto={this.state.data}
              _handlerSearchUser={this._handlerSearchUser}
              data={this.state.data}
              />
            }
          </section>
        </div>
      </div>
    );
  }


}

export default App;

  
