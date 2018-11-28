import React, { Component } from 'react'
import logic from '../logic'
import Error from './Error'

class SearchBar extends Component {
    state = { error: null, query: '' }

    handleSubmit = event => {
        event.preventDefault()

        const { query } = this.state

        this.handleSearch(query)
    }

    handleSearchChange = event => {
        const query = event.target.value

        this.setState({ query })
    }

    handleSearch = (query) => {
        try {
            logic.searchProduct(query)
                .then(products => {
                    this.props.pushProducts(products.data)
                })
                .catch(err => this.setState({ error: err.message }))
        } catch (err) {
            this.setState({ error: err.message })
        }
    }

    render() {
        const { error } = this.state

        return <form onSubmit={this.handleSubmit}>
            <input className="search-bar" type="text" placeholder="Search by instrument or brand..." onChange={this.handleSearchChange} />

            {error && <Error message={error} />}
        </form>

    }
}

export default SearchBar