import React from 'react'

function SearchForm(props) {

    return (        
        <form>
            <input type="text" className="search-input" placeholder="your github name" onChange={props.input}/>
            <input type="submit" className="search-button" value="Search for me, slave!" onClick={props.but} />
        </form>
    )
    
}

export default SearchForm