import React, { Component } from 'react'
import Card from '../Card/Card'
import logic from '../../logic'
import ModalPage from '../Popup/Popup'
import './Main.sass'

class Main extends Component {

    state = {
        userWishlist: [],
        userShoppingCart: [],
        showModal: false,
        activeProduct: null
    }

    toggle = (activeProduct) => {


        this.setState({
            showModal: !this.state.showModal,
            activeProduct
        })
    }

    resetToggle = () => {
        this.setState({
            showModal: false
        })

    }

    componentDidMount() {
        this.getUserWishlist()

    }

    pushToWishlist = (productId) => {


        let userWishlist = this.state.userWishlist

        userWishlist.push(productId)

        this.setState({ userWishlist })

    }

    pushToCart = (productId) => {
        let userShoppingCart = this.state.userShoppingCart

        userShoppingCart.push(productId)

        this.setState({ userShoppingCart })

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
                <ModalPage activeProduct={this.state.activeProduct} resetToggle={this.resetToggle} showModal={this.state.showModal} />

                <ul className="main-cards">
                    {(this.props.products || []).map(product => (
                        <Card toggleModal={this.toggle} pushToWishlist={this.pushToWishlist} pushToCart={this.pushToCart} key={Math.random()} product={product} />

                    ))}
                </ul>
            </div>
        )
    }
}

export default Main