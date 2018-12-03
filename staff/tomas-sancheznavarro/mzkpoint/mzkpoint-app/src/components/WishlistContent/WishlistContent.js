import React, { Component } from 'react'
import logic from '../../logic'


class WishlistContent extends Component {

    handleAddItemToCart = (id) => {
        debugger
        try {
            logic.addItemToCart(id)
                .then(() => this.setState({ error: null }))
                .catch(err => this.setState({ error: err.message }))

        } catch (err) {
            this.setState({ error: err.message })
        }
    }

    render() {
        const { brand, model, price, id } = this.props

        return (
            <li>{brand} {model} {price}<button onClick={(e) => {
                return e.preventDefault(), this.handleAddItemToCart(id)
            }}>Add to Shopping Cart</button></li>
        )
    }
}

export default WishlistContent
