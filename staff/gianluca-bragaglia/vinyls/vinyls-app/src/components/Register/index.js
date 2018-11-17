import React, {Component} from 'react'
import { Button, Input } from 'mdbreact'
import  './register.css'

class Register extends Component {
    state = { email: '', username: '', password: '' }

    handleEmailChange = event => {
        const email = event.target.value

        this.setState({ email })
    }

    handleUsernameChange = event => {
        const username = event.target.value

        this.setState({ username })
    }

    handlePasswordChange = event => {
        const password = event.target.value

        this.setState({ password })
    }


    handleSubmit = event => {
        event.preventDefault()

        const {  email, username, password } = this.state

        this.props.onRegister( email, username, password )
    }

    render() {
        return <div className="register-container">

        <form onSubmit={this.handleSubmit}>


            <Input type="text" label="Email" onChange={this.handleEmailChange} />

            <Input type="text" label="Username" onChange={this.handleUsernameChange} />

            <Input type="password" label="Password" onChange={this.handlePasswordChange} />

            <div className="button-container">
         
            <Button color="black" type="submit">Register</Button> 
            <br></br><br></br>
            <a className='back' href="#" onClick={this.props.onGoBack}>Back</a>
            </div>
        </form>
        </div>
    }
}

export default Register
