import React, { Component } from 'react'
import Error from '../Error/Error'
import logic from '../../logic'
import './Card.sass'


class Card extends Component {

    state = {
        error: null
    }

    addItemToWishlist = (productId) => {

        try {
            logic.addItemToWishlist(productId)
                .then(() => {
                    this.props.pushToWishlist(this.props.product)
                })
                .catch(({ message }) => Error(message))

        } catch (err) {
            this.setState({ error: err.message })
        }
    }

    addItemToCart = (productId) => {

        try {
            logic.addItemToCart(productId)
                .then(() => {
                    this.props.pushToCart(this.props.product)
                })
                .catch(err => this.setState({ error: err.message }))
        } catch (err) {
            this.setState({ error: err.message })
        }
    }

    handleRemoveItemfromWishlist = (productId) => {

        logic.removeItemInWishlist(productId)
            .then(() => logic.showCart())
            .then(userWishlist => this.setState({ userWishlist }))
    }

    handleRemoveItemFromCart = (productId) => {

        logic.removeItemInCart(productId)
            .then(() => logic.showWishlist())
            .then(userShoppingCart => this.setState({ userShoppingCart }))
    }

    render() {

        const { product } = this.props

        return (
            <div className="mycard">
                <div className="card-pic">
                    <img src={product.imageUrl} onClick={() => this.props.toggleModal(product)} alt="" />
                    <hr className="line" />
                </div>
                <div className="container">
                    <p>{product.brand} {product.model}</p>
                    <p className="price-tag">{product.price}€</p>
                    <div>
                        <button className="card-button" onClick={() => this.addItemToWishlist(product.productId)}>Add to Wishlist<i className="fa fa-heart"></i></button>

                        <button className="card-button" onClick={() => this.handleRemoveItemfromWishlist(product.productId)}>Remove from Wishlist</button>

                        <button className="card-button" onClick={() => this.addItemToCart(product.productId)}>Add to Shopping Cart<i className="fa fa-shopping-cart"></i></button>

                        <button className="card-button" onClick={() => this.handleRemoveItemFromCart(product.productId)}>Remove from Shopping Cart</button>
                    </div>
              
                </div>

            </div>
        )
    }
}

export default Card

