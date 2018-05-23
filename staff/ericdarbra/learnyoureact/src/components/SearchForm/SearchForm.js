import React from 'react'

function SearchForm (props){
        
        return (
        <form>
            <input type="text" value={props.name} placeholder="Your Github name" onChange={props.HandlerWriteName}/>
            <button onClick={props.HandlerSearchUser}>Search for me, slave!</button>
        </form>
        )
    }

export default SearchForm;