import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import logic from '../../logic'
import './index.css'

class VinylListCardItem extends Component {

  state = { user: {} }

  componentDidMount() {

    try {              
        
        logic.retrieveUserById(this.props.userId)       
        .then(user => this.setState ({ user }))
        .catch(err => this.setState({ error: err.message }))

    } catch (err) {
        this.setState({ error: err.message })
    }
}
    
    render() { 
        const { title, artist, img, year, id, comments, likes, userId } = this.props
        const { user } = this.state
        return ( 
            
              <div className='card'>
              <div className='card-user'>
                <Link to={`/profile/${userId}`}><img className='profile-img-card' src={user.imgProfileUrl ? user.imgProfileUrl : './img/icon-profile.png'} ></img> <span className='profile-username-card'>{user.username}</span></Link>
              </div>
                <div className='card-image'>
                  <img src={img ? img : './img/vinyl.png'} alt='vinyls'/>
                  <Link to={`/vinyl/${id}`}>
                    <a className="float">
                      <i className="fa fa-plus my-float"></i>
                    </a>
                  </Link>
                </div>
                <p className='artist-card'>{artist}</p>
                <span className='title-card'>{title}</span>
                <span className='year-card'>{year}</span>
                
                <div className='card-content'>
                  <i className="far fa-comment-alt"></i><span className='comment-card' >{comments}</span>
                  <i className="fas fa-star"></i><span className='likes-card'>{likes}</span>
                </div>
              </div>

         )
    }
}
 
export default VinylListCardItem