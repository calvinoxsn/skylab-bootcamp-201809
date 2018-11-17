import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Button } from 'mdbreact'
import logic from '../../logic'
import './editProfile.css'



class EditProfile extends Component {
    state = { username: '', newPassword: '', password: '', imgProfileUrl: null, bio: '', error: null }


    componentDidMount() {
        try {
            logic.getCurrentUser()
            .then(user => { this.setState({ username: user.username, imgProfileUrl: user.imgProfileUrl, bio: user.bio  }) })
            .catch(err => this.setState({ error: err.message }))
        } catch (err) {
            this.setState({ error: err.message })
        }
    }

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

    handleNewPasswordChange = event => {
        const newPassword = event.target.value

        this.setState({ newPassword })
    }

    handleBioChange = event => {
        const bio = event.target.value

        this.setState({ bio })
    }

    uploadWidget =() => {

        let widget = window.cloudinary.openUploadWidget({ cloud_name: 'dmp64syaz', upload_preset: 'pd0ikih0'},
            (error, result) => {
               

                if (result.event === 'success') {

                    const imgProfileUrl = result.info.secure_url

                    this.setState({ imgProfileUrl })
                    
                    widget.close()


                }
            })
            
    }

    handleSubmit = event => {

        event.preventDefault()

        const { username, newPassword, password, imgProfileUrl, bio } = this.state

        this.props.onEditProfile(username, newPassword, password, imgProfileUrl, bio)

        this.setState({error: null})
     
    }

    render() {
        return <div className='edit-profile-container'>
                <img className='profile-img' src={this.state.imgProfileUrl ? this.state.imgProfileUrl : './img/icon-profile.png'} ></img>
                <br></br>
                <Button type='button' onClick={this.uploadWidget} color='black' >Upload Image</Button>
                <form className='form-edit-profile' onSubmit={this.handleSubmit}>
                    <br></br>
                    <input className='input' type='text'  value={this.state.username} onChange={this.handleUsernameChange} />
                    <br></br>
                    <input className='input' type='password' placeholder='password' onChange={this.handlePasswordChange} />
                    <br></br>
                    <input className='input' type='password' placeholder='new password' onChange={this.handleNewPasswordChange} />
                    <br></br>
                    <textarea className='textarea' type='text' value={this.state.bio} onChange={this.handleBioChange}></textarea>
                    <br></br>
                    <Button type='submit'color='black' >Save</Button> 
                </form>
        </div>
    }
}

export default withRouter(EditProfile)