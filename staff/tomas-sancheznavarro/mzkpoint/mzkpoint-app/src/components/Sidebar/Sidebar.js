import React, { Component } from 'react'
import logic from '../../logic'
// import Error from './Error'

class Sidebar extends Component {
    state = { error: null }

    handleSubmit = event => {
        event.preventDefault()

        const { query } = this.state

        this.handleSearch(query)
    }

    handleSearch = (instrument) => {
        try {
            logic.filterProduct(instrument)
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

        return (
            <aside className="aside">
                <ul>
                    <li><button className="aside-button" onClick={() => this.handleSearch('guitar')}>Our Guitars</button></li>
                    <li><button className="aside-button" onClick={() => this.handleSearch('bass')}>Our Basses</button></li>
                    <li><button className="aside-button" onClick={() => this.handleSearch('keyboard')}>Our Keyboards</button></li>
                    <li><button className="aside-button" onClick={() => this.handleSearch('drums')}>Our Drums</button></li>
                </ul>
                <span>{this.state.error}</span>
            </aside>

        )
    }
}

export default Sidebar