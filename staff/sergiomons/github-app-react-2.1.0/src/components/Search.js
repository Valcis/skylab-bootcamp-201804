import React from 'react'

function Search(props) {
    return <section>
        <h2>search</h2>
        <form onSubmit={props.search}>
            <input type="text" onChange={props.keepQuery} value={props.query} placeholder="input a query..." />
            <button type="submit">search</button>
        </form>
    </section>
}

export default Search