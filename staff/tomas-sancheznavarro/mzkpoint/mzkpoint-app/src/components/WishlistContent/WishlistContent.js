import React, { Component } from 'react'
import logic from '../../logic'
import './WishlistContent.sass'


class WishlistContent extends Component {

    state = {
        deleted: false,
        error: null
    }

    handleRemoveItemfromWishlist = () => {

        try {

            logic.removeItemInWishlist(this.props.id)
                .then(() => this.setState({ deleted: true, error: null }))
                .then(() => logic.showWishlist())
                .catch(err => this.setState({ error: err.message }))
        } catch (err) {
            this.setState({ error: err.message })
        }

    }


    handleAddItemToCart = (id) => {

        try {
            logic.addItemToCart(id)
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
                        <div className="wishlist-card">
                            <div className="wishlist-pic-container"><img className="wishlist-pic" src={image}></img></div>
                            <div className="wishlist-info">
                                <p className="wishlist-brand">{brand}</p>
                                <p className="wishlist-model">{model}</p>
                                <p className="wishlist-price">{price}€</p>
                            </div>
                            <br></br>
                            <div className="wishlist-button-container">
                                <div className="wishlist-button-top"><button className="wishlist-button" onClick={this.handleRemoveItemfromWishlist}><i className="fa fa-trash"></i></button>
                                </div>
                                <div className="wishlist-button-bottom">
                                    <button className="wishlist-button-shopping" onClick={(e) => {
                                        return e.preventDefault(), this.handleAddItemToCart(id)
                                    }}><i className="fa fa-shopping-cart"></i></button>
                                </div>
                            </div>
                        </div>
                    </li> : null}
            </div>
        )
    }
}

export default WishlistContent
