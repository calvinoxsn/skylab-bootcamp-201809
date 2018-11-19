import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import logic from '../../logic'
import Error from '../Error'
import './index.css'


class PublicProfile extends Component {

    state = { username: '', imgProfileUrl: null, bio: '', error: null, follows: [], followers: [] }

    componentDidMount() {
        try {       
            
            logic.retrieveUserById(this.props.id)
            .then(user => { this.setState({ username: user.username, imgProfileUrl: user.imgProfileUrl, bio: user.bio, follows: user.follows, followers: user.followers }) })
            .catch(err => this.setState({ error: err.message }))
            logic.retrieveFollows(this.props.id)        
            .then(res => {this.setState ({ followSelected: res })})
            .catch(err => this.setState({ error: err.message }))
        } catch (err) {
            this.setState({ error: err.message })
        }
    }

    

    handleFollowClick = event => {
        event.preventDefault()
             try {       
            
                logic.addFollow(this.state.username)
                .then(() => {
                    logic.retrieveUserById(this.props.id)
                    .then(user => { this.setState({ username: user.username, imgProfileUrl: user.imgProfileUrl, bio: user.bio, follows: user.follows, followers: user.followers, followSelected: true }) })
                })
                .catch(err => this.setState({ error: err.message }))
                logic.retrieveUserById(this.props.id)
                .then(user => { this.setState({ username: user.username, imgProfileUrl: user.imgProfileUrl, bio: user.bio, follows: user.follows, followers: user.followers }) })
            .catch(err => this.setState({ error: err.message }))
            } catch (err) {
                this.setState({ error: err.message })
            }
    }

    handleDontFollowClick = event => {
        event.preventDefault()
        try {       
       
           logic.removeFollow(this.state.username)
           .then(() => {
                logic.retrieveUserById(this.props.id)
                .then(user => { this.setState({ username: user.username, imgProfileUrl: user.imgProfileUrl, bio: user.bio, follows: user.follows, followers: user.followers, followSelected: false }) })
            })
           .catch(err => this.setState({ error: err.message }))
           logic.retrieveUserById(this.props.id)
           .then(user => { this.setState({ username: user.username, imgProfileUrl: user.imgProfileUrl, bio: user.bio, follows: user.follows, followers: user.followers }) })
           .catch(err => this.setState({ error: err.message }))
       } catch (err) {
           this.setState({ error: err.message })
       }
}

    render() {

        const { imgProfileUrl, error, username, bio, followSelected, follows, followers } = this.state
        
        return<div className='profile-container'>
            <img className='profile-img' src={imgProfileUrl ? imgProfileUrl : './img/icon-profile.png'} ></img>
            <br></br>

                <p className='profile-username'> {username}</p>
                {error && <Error message={error} />}
                <p className='follows'>Follow: {follows.length}</p> <p className='follows'>Followers: {followers.length}</p>

                <a href="#" onClick={followSelected ? this.handleDontFollowClick : this.handleFollowClick}> {followSelected ? <span className='dont-follow-btn'>stop follow {username}</span> : <span className='follow-btn'>Follow</span>}</a>
                <br></br> <br></br>
                <p className='profile-bio'>{bio}</p>
            
            
        </div>

            
            
        
    }
}

export default withRouter(PublicProfile)