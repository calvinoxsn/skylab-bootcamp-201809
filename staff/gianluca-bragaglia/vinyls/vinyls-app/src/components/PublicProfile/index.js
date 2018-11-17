import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import logic from '../../logic'
import Error from '../Error'
import { Button } from 'mdbreact'

class PublicProfile extends Component {

    state = { username: '', imgProfileUrl: null, bio: '', error: null }

    componentDidMount() {
        try {       
            
            logic.retrieveUserById(this.props.id)
            .then(user => { this.setState({ username: user.username, imgProfileUrl: user.imgProfileUrl, bio: user.bio  }) })
            .catch(err => this.setState({ error: err.message }))
        } catch (err) {
            this.setState({ error: err.message })
        }
    }

    handleFollowClick = () => {
        console.log(this.state.username)
     
            
             logic.addFollow(this.state.username)

    }

    render() {

        const { imgProfileUrl, error, username, bio } = this.state

        return<div className='profile-container'>
            {error && <Error message={error} />}
            <img className='profile-img' src={imgProfileUrl ? imgProfileUrl : './img/icon-profile.png'} ></img>
            <br></br>

                <p className='profile-username'> {username}</p>
                <Button onClick={this.handleFollowClick}>Follow</Button>
                <p className='profile-bio'>{bio}</p>
            
            
        </div>

            
            
        
    }
}

export default withRouter(PublicProfile)