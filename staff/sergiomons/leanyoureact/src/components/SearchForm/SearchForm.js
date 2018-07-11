import React from 'react'
import './SearchForm.css'

function SearchForm(props) {
    
    return <form onSubmit={props.handlerSearchUser}>
    <input type="text" placeholder="your github name" onChange={props.handlerWriteName} className='textField'/>
    <button type="submit" className="butSearch">Search for me, slave!</button>
  </form>
}

export default SearchForm