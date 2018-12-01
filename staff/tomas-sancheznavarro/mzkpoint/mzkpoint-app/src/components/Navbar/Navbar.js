import React, { Component } from 'react'
import logic from '../../logic'
import { withRouter } from 'react-router-dom'
import { Navbar, NavbarBrand, NavbarNav, NavItem, NavLink, NavbarToggler, Collapse, Fa } from 'mdbreact'

class NavbarPage extends Component {
    state = {
        collapseID: ""
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
                        <NavLink to="/my-wishlist" className="waves-effect waves-light"><Fa icon="heart" className="mr-1" />My Wishlist</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink to="/my-shoppingcart" className="waves-effect waves-light"><Fa icon="shopping-cart" className="mr-1" />My Shopping Cart</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavItem onClick={this.handleLogoutClick}>
                            <Fa icon="door" className="mr-1" />Log Out</NavItem>
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

        this.props.history.push('/')
    }


    render() {
        return (
            <Navbar color="stylish-color" dark expand="md">
                <NavbarBrand>
                    <strong className="white-text">Welcome to MusicPoint!</strong>
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
