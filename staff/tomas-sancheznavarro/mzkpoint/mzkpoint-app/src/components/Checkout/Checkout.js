import React, { Component } from 'react'
import logic from '../../logic'
import { NavLink, withRouter } from 'react-router-dom'
import './Checkout.sass'

class Checkout extends Component {

    state = {
        error: null,
        userCheckout: [],
        successMessage: 'Your order has been processed'
    }

    componentDidMount() {
        try {
            logic.showCheckout()
                .then(userCheckout => { this.setState({ userCheckout: userCheckout.checkout }) })
                .catch(err => this.setState({ error: err.message }))
        } catch (err) {
            this.setState({ error: err.message })
        }
    }

    handleCreateOrder = event => {
        event.preventDefault()
        let total = 0
        this.state.userCheckout.map(item => {
            total += item.price
        })

        const products = this.state.userCheckout.map(ob => ob.productId)
        logic.createOrder(logic._userId, products)
            .then(() => this.props.history.push('/my-orders'))

    }

    render() {

        const prices = []
        this.state.userCheckout.forEach(item => {
            return prices.push(item.price)
        })

        let total = 0
        for (let i in prices) { total += prices[i] }

        return (
            <div className="row">
                <div className="col-75">
                    <div className="container_checkout">
                        <form className="checkout-form" onSubmit={this.handleCreateOrder}>

                            <div className="row">
                                <div className="col-50">
                                    <h3>Billing Address</h3>
                                    <label htmlFor="fname"><i className="fa fa-user"></i> Full Name</label>
                                    <input type="text" id="fname" name="firstname" placeholder="John M. Doe" />
                                    <label htmlFor="email"><i className="fa fa-envelope"></i> Email</label>
                                    <input type="text" id="email" name="email" placeholder="john@example.com" />
                                    <label htmlFor="adr"><i className="fa fa-address-card-o"></i> Address</label>
                                    <input type="text" id="adr" name="address" placeholder="542 W. 15th Street" />
                                    <label htmlFor="city"><i className="fa fa-institution"></i> City</label>
                                    <input type="text" id="city" name="city" placeholder="New York" />

                                    <div className="row">
                                        <div className="col-50">
                                            <label htmlFor="state">State</label>
                                            <input type="text" id="state" name="state" placeholder="NY" />
                                        </div>
                                        <div className="col-50">
                                            <label htmlFor="zip">Zip</label>
                                            <input type="text" id="zip" name="zip" placeholder="10001" />
                                        </div>
                                    </div>
                                </div>

                                <div className="col-50">
                                    <h3>Payment</h3>
                                    <label htmlFor="fname">Accepted Cards</label>
                                    <div className="icon-container">
                                        <i className="fa fa-cc-visa" ></i>
                                        <i className="fa fa-cc-amex" ></i>
                                        <i className="fa fa-cc-mastercard" ></i>
                                        <i className="fa fa-cc-discover"></i>
                                    </div>
                                    <label htmlFor="cname">Name on Card</label>
                                    <input type="text" id="cname" name="cardname" placeholder="John More Doe" />
                                    <label htmlFor="ccnum">Credit card number</label>
                                    <input type="text" id="ccnum" name="cardnumber" placeholder="1111-2222-3333-4444" />
                                    <label htmlFor="expmonth">Exp Month</label>
                                    <input type="text" id="expmonth" name="expmonth" placeholder="September" />
                                    <div className="row">
                                        <div className="col-50">
                                            <label htmlFor="expyear">Exp Year</label>
                                            <input type="text" id="expyear" name="expyear" placeholder="2018" />
                                        </div>
                                        <div className="col-50">
                                            <label htmlFor="cvv">CVV</label>
                                            <input type="text" id="cvv" name="cvv" placeholder="352" />
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <label>
                                <input type="checkbox" defaultChecked="checked" name="sameadr" /> Shipping address same as billing
                            </label>
                            <input type="submit" value="Make Purchase" className="btn" />
                            <NavLink to='/home'><input type="submit" value="No, I changed my mind, take me home!" className="btn-regret" /></NavLink>
                        </form>
                    </div>
                </div>
                <div className="col-25">
                    <div className="container-cart">
                        <h4>Cart <span className="price"><i className="fa fa-shopping-cart"></i> <b>{this.state.userCheckout.length}</b></span></h4>

                        {this.state.userCheckout.map(item => {
                            return (
                                <div>
                                    <ul>
                                        <span>{item.brand} {item.model}</span>
                                        <span className="price">{item.price} €</span>
                                        <br></br>
                                        <hr></hr>
                                    </ul>
                                </div>
                            )
                        })}
                        <br></br>
                        <p>Total <span className="price"><b>{total}€</b></span></p>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Checkout)