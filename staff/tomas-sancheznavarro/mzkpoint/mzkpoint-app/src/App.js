import React, { Component } from 'react'
import Error from './components/Error'
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import Landing from './components/Landing'

import logic from './logic'

import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import './App.css'


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
          <Route path="/home" component={Home} />
        </Switch>
      </div>
    )
  }
}

export default withRouter(App)
