import React, { Component } from 'react'
import './Card.sass'

class Card extends Component {

    render() {

        return (
            <div className="mycard">
                <div className="card-pic">
                    <img src={this.props.imageUrl} />
                </div>
                <div className="container">
                    <p>{this.props.brand}</p>
                    <p>{this.props.model}</p>
                    <p>{this.props.price}€</p>
                    <div>
                        <button>Add to Wishlist</button><i className="fa fa-heart"></i>
                        <button>Add to Shopping Cart</button><i className="fa fa-shopping-cart"></i>
                    </div>
                </div>
            </div>
        )
    }
}

export default Card

