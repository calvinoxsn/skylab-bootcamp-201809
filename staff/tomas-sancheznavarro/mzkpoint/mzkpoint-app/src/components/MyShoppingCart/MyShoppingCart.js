import React, { Component } from 'react'
import CartContent from '../CartContent/CartContent'
import logic from '../../logic'
import { NavLink } from 'react-router-dom'
import './MyShoppingCart.sass'

class MyShoppingCart extends Component {

    state = {
        userShoppingCart: [],
        error: null
    }

    componentDidMount() {
        try {
            logic.showCart()
                .then(userShoppingCart => { this.setState({ userShoppingCart: userShoppingCart.shoppingCart }) })
                .catch(err => this.setState({ error: err.message }))
        } catch (err) {
            this.setState({ error: err.message })
        }
    }

    render() {
        return <div className="my-shopping-cart-container">
            <h1>My Shopping Cart</h1>
            <NavLink to="home"><span><strong>Go Back</strong></span></NavLink>

            <section>
                {this.state.userShoppingCart.map(item => {
                    return (
                        <ul>
                            <CartContent image={item.imageUrl} brand={item.brand} model={item.model} price={item.price} id={item.productId} />
                        </ul>

                    )
                })}
            </section>
            <NavLink to="checkout"><span>Take Me to Checkout Area</span></NavLink>
        </div>
    }
}

export default MyShoppingCart

