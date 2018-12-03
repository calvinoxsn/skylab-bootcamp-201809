import React, { Component } from 'react'
import logic from '../../logic'


class CartContent extends Component {

    // handleAddItemToCart = () => {
    //     try {
    //         logic.addItemToCart(this.props.id)
    //             .then(() => this.setState({ error: null }))
    //             .catch(err => this.setState({ error: err.message }))

    //     } catch (err) {
    //         this.setState({ error: err.message })
    //     }
    // }

    render() {
        const { brand, model, price } = this.props

        return (
            <li>{brand} {model}<button onClick={this.handleAddItemToCart}>Send to Checkout</button></li>

        )
    }
}

export default CartContent

