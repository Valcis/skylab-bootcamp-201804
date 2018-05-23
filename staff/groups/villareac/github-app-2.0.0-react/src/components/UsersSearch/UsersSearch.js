import React from 'react'
import './UsersSearch.css'

function UsersSearch(props){
    return (
        <div className='form'>
          <form onSubmit={props._searchUsers}>
            <input placeholder="search slave!" onChange={props._handlerWriteName} value={props.value}/>
            <button>this is the button</button>
          </form>
        </div>
    )
}

export default UsersSearch