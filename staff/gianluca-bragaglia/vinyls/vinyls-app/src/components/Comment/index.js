import React, { Component } from 'react'
import './index.css'

class Comment extends Component {


  render() {
    const {username, imgProfile, text} = this.props
        
    return (<div className='comment-first-container'>
                <div className='comment-user-container'>
                    <img className='img-profile-micro' src={imgProfile ? imgProfile : './img/icon-profile.png'}/>
                    <p className='comment-username'>{username}</p>
                </div>
                <p className='comment-text'>{text}</p>
            </div>
        
      
    )
  }
}

export default Comment
