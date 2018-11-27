import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import Event from '../../plugins/bus'
import { Button } from 'mdbreact'
import logic from '../../logic'
import Error from '../Error'
import UploadImgProfile from '../UploadImageProfile'
import './index.css'




class EditProfile extends Component {
    // state = { username: '', newPassword: '', password: '', imgProfileUrl: null, bio: '', error: null, picture: null }


    // componentDidMount() {
    //     try {
    //         logic.getCurrentUser()
    //         .then(user => { this.setState({ username: user.username, imgProfileUrl: user.imgProfileUrl, bio: user.bio, error: null  }) })
    //         .catch(err => this.setState({ error: err.message }))
    //     } catch (err) {
    //         this.setState({ error: err.message })
    //     }
    // }

    // handleNameChange = e => {
    //     const name = e.target.value

    //     this.setState({ name })
    // }

    // handleSurnameChange = e => {
    //     const surname = e.target.value

    //     this.setState({ surname })
    // }

    // handleUsernameChange = e => {
    //     const username = e.target.value

    //     this.setState({ username })
    // }

    // handlePasswordChange = e => {
    //     const password = e.target.value

    //     this.setState({ password })
    // }

    // handleNewPasswordChange = e => {
    //     const newPassword = e.target.value

    //     this.setState({ newPassword })
    // }

    // handleBioChange = e => {
    //     const bio = e.target.value

    //     this.setState({ bio })
    // }

    
    // fileChangedHandler = event => {
    //     event.preventDefault()

    //    this.setState({picture: event.target.files[0]})
    // }


    // handleUploadImgProfile = e => {
    //   e.preventDefault()

    //    console.log(this.state.picture)

    //     try {
    //         logic.uploadImgProfile(this.state.picture)
    //         .then(res => {
    //             this.setState({error: null})
    //         })
    //         .catch(err => this.setState({ error: err.message }))
            
            
    //     } catch (err) {
    //         this.setState({ error: err.message })
    //     }
    // }

    // onEditProfile = ( username,  newPassword, password, imgProfileUrl, bio ) => {
        
    //     try {
    //         logic.modifyUser( username,  newPassword, password, imgProfileUrl, bio )
    //             .then(() => {
    //                 this.setState({ error: null }, () => this.props.history.push('/profile'))
    //                 Event.$emit('change-profile-img', {image: imgProfileUrl})
    //                 Event.$emit('change-profile-username', {username: username})
    //             })
    //             .catch(err => this.setState({ error: err.message }))
    //     } catch (err) {
    //         this.setState({ error: err.message })
    //     }
    // }



    // handleSubmit = e => {

    //     e.preventDefault()


    //     const { username, newPassword, password, imgProfileUrl, bio } = this.state

    //     console.log(username, newPassword, password, imgProfileUrl, bio )

    //     this.onEditProfile(username, newPassword, password, imgProfileUrl, bio)

    //     this.setState({error: null})
     
    // }

    render() {

        return <div className='edit-profile1-container'>
               
                <h3>Change Profile Image</h3>
                <UploadImgProfile></UploadImgProfile>
                <Link to={`/edit-profile2`} ><span className='edit-next-btn'>Next</span></Link>
  
        </div>
    }
}

export default withRouter(EditProfile)