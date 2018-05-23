import React from 'react'
import './SearchUsers.css'


class SearchUsers extends Component {

  state = {
    query: '',
  }


  handleChange = e => {
    this.setState({ query: e.target.value })
  }

  render(){
    return(
      <form onSubmit={props.searchUsers}>
        <h2 className="title">Search GitHub users!</h2>
        <input className="search-input" type="text" onChange={this.handleChange} value={this.state.query} placeholder="name"/>
        <button type='submit' className="search-button">Submit</button>
        {/* <button className="search-button" onClick={props.searchUsers}>Submit</button> */}
      </form>
    )
  }
}

export default SearchUsers