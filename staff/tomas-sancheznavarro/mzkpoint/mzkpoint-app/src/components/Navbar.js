import React, { Component } from 'react';
import { Navbar, NavbarBrand, NavbarNav, NavItem, NavLink, NavbarToggler, Collapse, Fa } from 'mdbreact';

class NavbarPage extends Component {
    state = {
        collapseID: ""
    };

    toggleCollapse = collapseID => () =>
        this.setState(prevState => ({
            collapseID: prevState.collapseID !== collapseID ? collapseID : ""
        }));

    render() {
        return (
            <Navbar color="stylish-color" dark expand="md">
                <NavbarBrand>
                    <strong className="white-text">Welcome to MusicPoint!</strong>
                </NavbarBrand>
                <NavbarToggler onClick={this.toggleCollapse("navbarCollapse3")} />
                <Collapse id="navbarCollapse3" isOpen={this.state.collapseID} navbar>
                    <NavbarNav right>
                        <NavItem>
                            <NavLink to="./register" className="waves-effect waves-light"><Fa icon="envelope" className="mr-1" />Sign up</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink to="./login" className="waves-effect waves-light"><Fa icon="user" className="mr-1" />Log in</NavLink>
                        </NavItem>
                    </NavbarNav>
                </Collapse>
            </Navbar>

        );
    }
}

export default NavbarPage;
