import React, { Component } from 'react'
import WishlistContent from '../WishlistContent/WishlistContent'
import logic from '../../logic'
import { NavLink } from 'react-router-dom'

class MyWishlist extends Component {
    state = {
        userWishlist: [],
        error: null
    }

    componentDidMount() {
        logic.showWishlist()
            .then(userWishlist => { this.setState({ userWishlist: userWishlist.wishlist }) })
    }

    handleRemoveProduct = id => {
        logic.removeItemInWishlist(id)
            .then(() => logic.showWishlist())
            .then(userWishlist => this.setState({ userWishlist }))
    }



    render() {
        return <div>
            <h1>My Wishlist</h1>
            <NavLink to="home"><span><span>Go Back</span></span></NavLink>

            <section>
                {this.state.userWishlist.map(item => {
                    return (
                        <WishlistContent brand={item.brand} model={item.model} id={item.productId} />
                    )
                })}
                <NavLink to="my-shoppingcart"><span>Go To My Shopping Cart</span></NavLink>
            </section>
        </div>
    }
}

export default MyWishlist