import React, { Component } from 'react'
import Error from './components/Error/Error'
import Home from './components/Home/Home'
import Landing from './components/Landing/Landing'
import MyWishlist from './components/MyWishlist/MyWishlist'
import MyShoppingCart from './components/MyShoppingCart/MyShoppingCart'
import MyOrders from './components/MyOrders/MyOrders'
import Checkout from './components/Checkout/Checkout'
import Login from './components/Login/Login'
import Register from './components/Register/Register'

import logic from './logic'

import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import './App.css'
import '../src/components/reset.sass'


class App extends Component {
  state = { error: null }

  handleRegisterClick = () => this.props.history.push('/register')

  handleLoginClick = () => this.props.history.push('/login')

  handleLogoutClick = () => {
    logic.logout()

    this.props.history.push('/')
  }

  handleGoBack = () => this.props.history.push('/')

  render() {
    const { error } = this.state
    return (

      <div className="App">
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route path="/login" render={() => !logic.loggedIn ? <Login onGoBack={this.handleGoBack} /> : <Redirect to="/home" />} />
          {error && <Error message={error} />}
          <Route path="/register" render={() => !logic.loggedIn ? <Register onGoBack={this.handleGoBack} /> : <Redirect to="/home" />} />
          <Route path="/my-wishlist" render={() => !logic.loggedIn ? <Login onGoBack={this.handleGoBack} /> : <MyWishlist />} />
          <Route path="/my-shoppingcart" render={() => !logic.loggedIn ? <Login onGoBack={this.handleGoBack} /> : <MyShoppingCart />} />
          <Route path="/my-orders" component={MyOrders}></Route>
          <Route path="/home" component={Home} />
          <Route path="/checkout" component={Checkout} />
        </Switch>
      </div>
    )
  }
}

export default withRouter(App)
