import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import Error from '../Error/Error'
import logic from '../../logic'

class Login extends Component {
    state = { username: '', password: '', error: null }

    handleUsernameChange = event => {
        const username = event.target.value

        this.setState({ username })
    }

    handlePasswordChange = event => {
        const password = event.target.value

        this.setState({ password })
    }

    handleLogin = (username, password) => {
        try {
            logic.login(username, password)
                .then(() => this.props.history.push('/home'))
                .catch(err => this.setState({ error: err.message }))
        } catch (err) {
            this.setState({ error: err.message })
        }
    }

    handleSubmit = event => {
        event.preventDefault()

        const { username, password } = this.state

        this.handleLogin(username, password)
    }

    render() {
        const { error } = this.state

        return <form onSubmit={this.handleSubmit}>
            <input type="text" placeholder="Username" onChange={this.handleUsernameChange} />
            <input type="password" placeholder="Password" onChange={this.handlePasswordChange} />
            <button type="submit">Login</button> <a href="#" onClick={this.props.onGoBack}>back</a>
            {error && <Error message={error} />}

        </form>
    }
}

export default withRouter(Login)