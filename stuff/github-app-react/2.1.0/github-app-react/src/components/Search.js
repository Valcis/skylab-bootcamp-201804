import React, { Component } from 'react'

class Search extends Component {
    state = { query: '' }

    keepQuery = (e) => {
        const query = e.target.value

        this.setState({
            query
        })
    }

    search = (e) => {
        e.preventDefault()

        this.props.onSearch(this.state.query)
    }

    render() {
        return <section>
            <h2>search</h2>
            <form onSubmit={this.search}>
                <input type="text" onChange={this.keepQuery} value={this.state.query} placeholder="input a query..." />
                <button type="submit">search</button>
            </form>
        </section>
    }
}

export default Search