import React, { Component } from 'react';
import Register from './components/Register'
import Login from './components/Login'
import Error from './components/Error'
import Landing from './components/Landing'
import logic from './logic'
import { Route, withRouter, Redirect } from 'react-router-dom'

logic.url = 'http://localhost:5000/api'

class App extends Component {
  state = { error: null }

  render() {
    return (
      <div className="App">
      </div>
    )
  }
}

export default withRouter(App)
