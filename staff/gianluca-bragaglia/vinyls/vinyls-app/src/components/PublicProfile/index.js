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
            .then(res => this.setState ({ fallowSelected:res }))
            .catch(err => this.setState({ error: err.message }))
        } catch (err) {
            this.setState({ error: err.message })
        }
    }

    handleFollowClick = () => {

             try {       
            
                logic.addFollow(this.state.username)
                .then(() => { this.setState({ error: null  }) })
                .catch(err => this.setState({ error: err.message }))
            } catch (err) {
                this.setState({ error: err.message })
            }
    }

    handleDontFollowClick = () => {

        try {       
       
           logic.removeFollow(this.state.username)
           .then(() => { this.setState({ error: null  }) })
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
                {/* <Button onClick={this.handleFollowClick}>Follow</Button> */}
                <a href="#" className="favourites-btn" onClick={followSelected ? this.handleDontFollowClick : this.handleFollowClick}><i className={this.state.followSelected ? 'fas fa-star' : 'far fa-star' }>  {this.state.followSelected ? <span>Added to favourites</span>: <span>Add to favourites</span>}</i></a> 
                <p className='profile-bio'>{bio}</p>
            
            
        </div>

            
            
        
    }
}

export default withRouter(PublicProfile)