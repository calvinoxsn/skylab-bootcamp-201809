import React, { Component } from 'react'
import logic from '../../logic'
import Error from '../Error/Error'
import './Search.sass'

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
                .catch(({ message }) => Error(message))
        } catch (err) {
            this.setState({ error: err.message })

        }
    }

    render() {

        return <form onSubmit={this.handleSubmit}>
            <div className="form-group">
                <input className="search-bar" type="text" placeholder="Search by instrument, brand or model" onChange={this.handleSearchChange} />
                <label htmlFor="search-bar">Search by instrument, brand, or model</label>
            </div>
        </form>
    }
}

export default SearchBar