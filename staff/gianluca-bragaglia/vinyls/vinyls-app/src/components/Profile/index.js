import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Button } from 'mdbreact'
import logic from '../../logic'
import './profile.css'

class Profile extends Component {

    state = { username: '', imgProfileUrl: null, bio: '' }

    componentDidMount() {
        try {       
            
            logic.getCurrentUser()
            .then(user => { this.setState({ username: user.username, imgProfileUrl: user.imgProfileUrl, bio: user.bio  }) })
            .catch(err => this.setState({ error: err.message }))
        } catch (err) {
            this.setState({ error: err.message })
        }
    }


    handleEditClick = () => this.props.history.push('/edit-profile') 


    render() {

        return<div className='profile-container'>

            <img className='profile-img' src={this.state.imgProfileUrl ? this.state.imgProfileUrl : './img/icon-profile.png'} ></img>
            <br></br>

                <p className='profile-username'> {this.state.username}</p>
                <p className='profile-bio'>{this.state.bio}</p>
                <section><Button color='black' onClick={this.handleEditClick}>Edit Profile</Button></section>
            
            
        </div>

            
            
        
    }
}

export default withRouter(Profile)