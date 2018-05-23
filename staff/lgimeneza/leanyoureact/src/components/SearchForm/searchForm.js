import React from 'react'

function SearchForm(props) {
    return <div>
            <form>
                <input type="text" placeholder="your github name"  onChange={props._handlerWriteName}/>
                <button onClick={ props._handlerSearchUser}>Search for me, slave!</button>
            </form>
        </div>
}

export default SearchForm;