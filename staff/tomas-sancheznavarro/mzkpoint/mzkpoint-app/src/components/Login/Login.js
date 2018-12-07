import React, { Component } from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import Error from '../Error/Error'
import logic from '../../logic'
import './Login.sass'

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
            Error(err.message)
        }
    }

    handleSubmit = event => {
        event.preventDefault()

        const { username, password } = this.state

        this.handleLogin(username, password)
    }

    render() {
        const { error } = this.state
        return (
            <div className="form">

                <div className="login-page">
                    <form className="login-form" onSubmit={this.handleSubmit}>

                        <input type="text" placeholder="username" onChange={this.handleUsernameChange} />
                        <input type="password" placeholder="password" onChange={this.handlePasswordChange} />
                        <button type="submit">Login</button>
                        <div className="goto-register">
                            <p className="message">Not registered? <NavLink to='/register'><a href="#">Create an account</a></NavLink></p>

                        </div>
                        <span className="go-back" onClick={this.props.onGoBack}>Go back</span>
                        {/* {error && <Error message={error} />} */}
                    </form>

                </div>
            </div>

        )
    }
}

export default withRouter(Login)