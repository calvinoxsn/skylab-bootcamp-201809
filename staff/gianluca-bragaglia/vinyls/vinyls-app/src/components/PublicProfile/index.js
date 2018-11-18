import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import logic from '../../logic'
import Error from '../Error'
import { Button } from 'mdbreact'

class PublicProfile extends Component {

    state = { username: '', imgProfileUrl: null, bio: '', error: null, followSelected: false }

    componentDidMount() {
        try {       
            
            logic.retrieveUserById(this.props.id)
            .then(user => { this.setState({ username: user.username, imgProfileUrl: user.imgProfileUrl, bio: user.bio  }) })
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
                .then(() => this.setState({followSelected: true }))
                .catch(err => this.setState({ error: err.message }))
            } catch (err) {
                this.setState({ error: err.message })
            }
    }

    handleDontFollowClick = event => {
        event.preventDefault()
        try {       
       
           logic.removeFollow(this.state.username)
           .then(() => this.setState({followSelected: false }))
           .catch(err => this.setState({ error: err.message }))
       } catch (err) {
           this.setState({ error: err.message })
       }
}

    render() {

        const { imgProfileUrl, error, username, bio, followSelected } = this.state

        
        return<div className='profile-container'>
            <img className='profile-img' src={imgProfileUrl ? imgProfileUrl : './img/icon-profile.png'} ></img>
            <br></br>

                <p className='profile-username'> {username}</p>
                {error && <Error message={error} />}
                {/* <a href="#" className="favourites-btn" onClick={followSelected ? this.handleDontFollowClick : this.handleFollowClick}><i className={followSelected ? 'fas fa-star' : 'far fa-star' }>  {followSelected ? <span>Added to favourites</span>: <span><Button onClick={this.handleFollowClick}>Follow</Button></span>}</i></a>  */}
                <a href="#" className="favourites-btn" onClick={followSelected ? this.handleDontFollowClick : this.handleFollowClick}> {followSelected ? <span>you follow {username}</span> : <span>Follow</span>}</a>
                <p className='profile-bio'>{bio}</p>
            
            
        </div>

            
            
        
    }
}

export default withRouter(PublicProfile)