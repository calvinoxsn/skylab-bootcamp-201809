import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Button } from 'mdbreact'
import { Link } from 'react-router-dom'
import logic from '../../logic'
import './index.css'

class Profile extends Component {

    state = { username: '', imgProfileUrl: null, bio: '', follows: [], followers: [] }

    componentDidMount() {
        try {       
            
            logic.getCurrentUser()
            .then(user => { this.setState({ username: user.username, imgProfileUrl: user.imgProfileUrl, bio: user.bio, follows: user.follows, followers: user.followers  }) })
            .catch(err => this.setState({ error: err.message }))
        } catch (err) {
            this.setState({ error: err.message })
        }
    }



    handleEditClick = () => this.props.history.push('/edit-profile') 


    render() {

        const { imgProfileUrl, username, bio, follows, followers } = this.state

        return<div className='profile-container'>

            <img className='profile-img' src={imgProfileUrl ? imgProfileUrl : './img/icon-profile.png'} ></img>
            <br></br>

                <p className='profile-username'> {username}</p>

                <Link to={`/follows`}> <p className='follow-btn-profile'>Follow {follows.length}</p></Link> <Link to={`/followers`}><p className='followers-btn-profile'>Followers {followers.length}</p></Link>

                <p className='profile-bio'>{bio}</p>
                <section><Button color='black' onClick={this.handleEditClick}>Edit Profile</Button></section>
            
            
        </div>

            
            
        
    }
}

export default withRouter(Profile)