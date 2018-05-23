
import React from 'react';

function SearchForm(props) {
  

    return (
      <form onSubmit={props._handlerSearchUser}>
        <input className='input-text' type="text" onChange={props._handlerWriteName} name="name" value={props.value}/>
        <input className='btn btn-primary' type="submit" value="Submit"/>

      </form>
      
    )
  
}



export default SearchForm
