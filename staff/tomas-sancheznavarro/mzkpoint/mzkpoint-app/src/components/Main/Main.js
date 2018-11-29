import React, { Component } from 'react'
import Card from '../Card/Card'
import logic from '../../logic'
import './Main.sass'

class Main extends Component {

    state = {
        userWishlist: [],
        userShoppingCart: []
    }

    componentDidMount() {
        this.getUserWishlist()

    }

    pushToWishlist = (productId) => {
        let userWishlist = this.state.userWishlist

        userWishlist.push(productId)

        this.setState({ userWishlist })
        console.log(this.state.userWishlist)
    }

    pushToCart = (productId) => {
        let userShoppingCart = this.state.userShoppingCart

        userShoppingCart.push(productId)

        this.setState({ userShoppingCart })
        console.log(this.state.userShoppingCart)
    }

    getUserWishlist = () => {

        try {
            logic.showWishlist()
                .then(res => {
                    this.setState({ userWishlist: res.wishlist })
                })
                .catch(err => this.setState({ error: err.message }))
        } catch (err) {
            this.setState({ error: err.message })
        }
    }

    getUserCart = () => {

        try {
            logic.showCart()
                .then(res => {
                    this.setState({ userShoppingCart: res.userShoppingCart })
                })
                .catch(err => this.setState({ error: err.message }))
        } catch (err) {
            this.setState({ error: err.message })
        }
    }

    render() {
        return (
            <div>
                <button>{this.state.userWishlist.length}</button>
                <button>{this.state.userShoppingCart.length}</button>

                <ul className="main-cards">
                    {(this.props.products || []).map(product => (
                        <Card pushToWishlist={this.pushToWishlist} pushToCart={this.pushToCart} key={Math.random()} product={product} />

                    ))}
                </ul>
            </div>
        )
    }
}

export default Main