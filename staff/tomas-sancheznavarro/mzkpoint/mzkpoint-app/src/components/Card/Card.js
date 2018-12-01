import React, { Component } from 'react'
import Error from '../Error/Error'
import logic from '../../logic'
import './Card.sass'

class Card extends Component {

    state = {
        error: null
    }

    addItemToWishlist = (productId) => {

        let a = ''
        logic.showWishlist()
            .then(res => {
                console.log(res)
            })
        console.log(a)


        if (!productId) {

            try {
                logic.addItemToWishlist(productId)
                    .then(() => {
                        this.props.pushToWishlist(this.props.product)
                    })
                    .catch(err => this.setState({ error: err.message }))
            } catch (err) {
                this.setState({ error: err.message })
            }
        }
    }

    addItemToCart = (productId) => {

        // if (!logic.loggedIn) {

        // }

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

    handleRemoveProduct = (productId) => {

        logic.removeItemInWishlist(productId)
            .then(() => logic.showWishlist())
            .then(userWishlist => this.setState({ userWishlist }))
    }

    render() {

        const { error } = this.state

        const { product } = this.props

        return (
            <div className="mycard">
                <div className="card-pic">
                    <img src={product.imageUrl} onClick={() => this.props.toggleModal(product)} alt="" />
                    <hr className="line" />
                </div>
                <div className="container">
                    <p>{product.brand} {product.model}</p>
                    <p>{product.price}€</p>
                    <div>
                        <button onClick={() => this.addItemToWishlist(product.productId)}>Add to Wishlist</button><i className="fa fa-heart"></i>

                        <button onClick={() => this.handleRemoveProduct('5bfe72bdf95a1b4641fdfaf8')}>Remove item from Wishlist</button><i className="fa fa-heart"></i>

                        <button onClick={() => this.addItemToCart(product.productId)}>Add to Shopping Cart</button><i className="fa fa-shopping-cart"></i>
                    </div>
                    {error && <Error message={error} />}
                </div>

            </div>
        )
    }
}

export default Card

