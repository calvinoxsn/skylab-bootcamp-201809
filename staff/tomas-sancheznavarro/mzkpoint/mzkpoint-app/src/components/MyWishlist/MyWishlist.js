import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import WishlistContent from '../WishlistContent/WishlistContent'
import logic from '../../logic'
import './MyWishlist.sass'

class MyWishlist extends Component {
    state = {
        userWishlist: [],
        error: null
    }

    componentDidMount() {
        logic.showWishlist()
            .then(userWishlist => { this.setState({ userWishlist: userWishlist.wishlist }) })
    }

    render() {
        return <div className="my-wishlist-container">
            <h1 className="page-title">My Wishlist</h1>
            <span><NavLink to="home"><span>Go Back</span></NavLink></span>

            <section>
                {this.state.userWishlist.map(item => {
                    return (
                        <ul><WishlistContent image={item.imageUrl} brand={item.brand} model={item.model} price={item.price} id={item.productId} />
                        </ul>
                    )
                })}
                <NavLink to="my-shoppingcart"><span><strong>Go To My Shopping Cart</strong></span></NavLink>
            </section>
        </div>
    }
}

export default MyWishlist