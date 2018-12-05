import React, { Component } from 'react'
import logic from '../../logic'
import { withRouter } from 'react-router-dom'
import { Navbar, NavbarBrand, NavbarNav, NavItem, NavLink, NavbarToggler, Collapse, Fa } from 'mdbreact'

import './Navbar.sass'
class NavbarPage extends Component {
    state = {
        collapseID: "",
        error: null,
        userWishlist: [],
        userShoppingCart: []
    }

    componentDidMount() {
        try {
            logic.showWishlist()
                .then(userWishlist => { this.setState({ userWishlist: userWishlist.wishlist }) })
                .catch(err => this.setState({ error: err.message }))
            logic.showCart()
                .then(userShoppingCart => {
                    this.setState({ userShoppingCart: userShoppingCart.shoppingCart })
                })
                .catch(err => this.setState({ error: err.message }))
        } catch (err) {
            this.setState({ error: err.message })
        }
    }

    componentWillReceiveProps() {

        try {
            logic.showWishlist()
                .then(userWishlist => { this.setState({ userWishlist: userWishlist.wishlist }) })
                .catch(err => this.setState({ error: err.message }))
                .then(logic.showCart()
                    .then(userShoppingCart => {
                        this.setState({ userShoppingCart: userShoppingCart.shoppingCart })
                    })
                    .catch(err => this.setState({ error: err.message })))
        } catch (err) {
            this.setState({ error: err.message })
        }
    }





    toggleCollapse = collapseID => () =>
        this.setState(prevState => ({
            collapseID: prevState.collapseID !== collapseID ? collapseID : ""
        }))

    renderNavbar = () => {
        if (logic.loggedIn) {
            return (
                <NavbarNav right>
                    <NavItem>
                        <NavLink to="/my-wishlist" className="waves-effect waves-light"><Fa icon="heart" className="mr-1" />My Wishlist  <span>({this.state.userWishlist.length})</span></NavLink>

                    </NavItem>
                    <NavItem>
                        <NavLink to="/my-shoppingcart" className="waves-effect waves-light"><Fa icon="shopping-cart" className="mr-1" />My Shopping Cart <span>({this.state.userShoppingCart.length})</span></NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink to="/my-orders" className="waves-effect waves-light">My Orders</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink onClick={this.handleLogoutClick} to="#" className="waves-effect waves-light"><Fa icon="sign-out-alt" className="mr-1" />Log Out</NavLink>
                    </NavItem>

                </NavbarNav>
            )
        } else {
            return (
                <NavbarNav right>
                    <NavItem>
                        <NavLink to="/register" className="waves-effect waves-light"><Fa icon="envelope" className="mr-1" />Sign up</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink to="/login" className="waves-effect waves-light"><Fa icon="user" className="mr-1" />Log in</NavLink>
                    </NavItem>
                </NavbarNav>
            )
        }
    }

    handleLogoutClick = () => {
        logic.logout()

        this.props.history.push('/home')
    }


    render() {
        return (
            <Navbar color="stylish-color" dark expand="md">
                <NavbarBrand>
                    <strong className="white-text">Welcome to MusicPoint!</strong>
                    <img alt="logo" className="logo" src="icons/mezzopiano.svg"></img>
                </NavbarBrand>
                <NavbarToggler onClick={this.toggleCollapse("navbarCollapse3")} />
                <Collapse id="navbarCollapse3" isOpen={this.state.collapseID} navbar>
                    {this.renderNavbar()}
                </Collapse>
            </Navbar>

        )
    }
}

export default withRouter(NavbarPage)
