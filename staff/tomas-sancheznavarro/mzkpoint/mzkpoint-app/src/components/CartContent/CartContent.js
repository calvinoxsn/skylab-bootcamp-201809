import React, { Component } from 'react'
import logic from '../../logic'
import './CartContent.sass'


class CartContent extends Component {

    state = {
        deleted: false,
        error: null
    }

    handleRemoveItemfromCart = () => {

        try {

            logic.removeItemInCart(this.props.id)
                .then(() => this.setState({ deleted: true, error: null }))
                .then(() => logic.showCart())
                .catch(err => this.setState({ error: err.message }))
        } catch (err) {
            this.setState({ error: err.message })
        }

    }


    handleAddItemToCheckoutArea = (id) => {
        try {
            logic.addItemToCheckout(this.props.id)
                .then(() => this.setState({ error: null }))
                .catch(err => this.setState({ error: err.message }))

        } catch (err) {
            this.setState({ error: err.message })
        }
    }

    render() {
        const { image, brand, model, price, id } = this.props

        const { deleted } = this.state

        return (
            <div>
                {!deleted ?
                    <li>
                        <div className="shopping-cart-card">
                            <div className="shopping-cart-pic-container"><img className="shopping-cart-pic" src={image}></img></div>
                            <div className="shopping-cart-info">
                                <p className="shopping-cart-brand">{brand}</p>
                                <p className="shopping-cart-model">{model}</p>
                                <p className="shopping-cart-price">{price}€</p>
                            </div>
                            <br></br>
                            <div className="shopping-cart-button-container">
                                <div className="shopping-cart-button-top"><button className="shopping-cart-button" onClick={this.handleRemoveItemfromCart}><i className="fa fa-trash"></i></button>
                                </div>
                                <div className="shopping-cart-button-bottom">
                                    <button className="shopping-cart-button-shopping" onClick={(e) => {
                                        return e.preventDefault(), this.handleAddItemToCheckoutArea(id)
                                    }}>BUY</button>
                                </div>
                            </div>
                        </div>
                    </li> : null}
            </div>
        )
    }
}

export default CartContent

