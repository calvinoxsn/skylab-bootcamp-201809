import React, { Component } from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import logic from '../../logic'
import Error from '../Error/Error'
import './Register.sass'

class Register extends Component {
    state = { error: null, name: '', surname: '', username: '', email: '', password: '' }

    handleNameChange = event => {
        const name = event.target.value

        this.setState({ name })
    }

    handleSurnameChange = event => {
        const surname = event.target.value

        this.setState({ surname })
    }

    handleUsernameChange = event => {
        const username = event.target.value

        this.setState({ username })
    }

    handlePasswordChange = event => {
        const password = event.target.value

        this.setState({ password })
    }

    handleEmailChange = event => {
        const email = event.target.value

        this.setState({ email })
    }

    handleSubmit = event => {
        event.preventDefault()

        const { name, surname, username, email, password } = this.state

        this.handleRegister(name, surname, username, email, password)
    }

    handleRegister = (name, surname, username, email, password) => {
        try {
            logic.registerUser(name, surname, username, email, password)
                .then(() => {
                    this.setState({ error: null }, () => this.props.history.push('/login'))
                })
                .catch(err => this.setState({ error: err.message }))
        } catch (err) {
            this.setState({ error: err.message })
        }
    }

    render() {
        const { error } = this.state

        return (
            <div className="form">
                <div className="register-page">
                    <form className="register-form" onSubmit={this.handleSubmit}>

                        <input type="text" placeholder="First Name" onChange={this.handleNameChange} />
                        <input type="text" placeholder="Last Name" onChange={this.handleSurnameChange} />
                        <input type="text" placeholder="Username" onChange={this.handleUsernameChange} />
                        <input type="text" placeholder="Email Address" onChange={this.handleEmailChange} />
                        <input type="password" placeholder="Password" onChange={this.handlePasswordChange} />
                        <button type="submit">Register</button>
                        <div className="goto-login">
                            <NavLink to="/login">Already have an account? Login here!</NavLink>
                        </div>
                        <a href="#" onClick={this.props.onGoBack}>Go back</a>
                        {error && <Error message={error} />}
                    </form>
                </div>
            </div>

        )

        {/* <input type="text" placeholder="name" onChange={this.handleNameChange} />
            <input type="text" placeholder="surname" onChange={this.handleSurnameChange} />
            <input type="text" placeholder="username" onChange={this.handleUsernameChange} />
            <input type="text" placeholder="email" onChange={this.handleEmailChange} />
            <input type="password" placeholder="password" onChange={this.handlePasswordChange} />
            <button type="submit">Register</button> <a href="#" onClick={this.props.onGoBack}>back</a>
            <div className="goto-login">
                <NavLink to="/login">Already have an account? Login here!</NavLink>
            </div>
            {error && <Error message={error} />} */}
        // </form >
    }
}

{/* <input type="text" placeholder="name" onChange={this.handleNameChange} />
            <input type="text" placeholder="surname" onChange={this.handleSurnameChange} />
            <input type="text" placeholder="username" onChange={this.handleUsernameChange} />
            <input type="text" placeholder="email" onChange={this.handleEmailChange} />
            <input type="password" placeholder="password" onChange={this.handlePasswordChange} />
            <button type="submit">Register</button> <a href="#" onClick={this.props.onGoBack}>back</a>
            <div className="goto-login">
                <NavLink to="/login">Already have an account? Login here!</NavLink>
            </div>
            {error && <Error message={error} />} */}


export default withRouter(Register)