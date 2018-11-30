import React from 'react'
import './index.css'



const Comment = (props) => {

  const {username, imgProfile, text} = props

  return (
            <div className='comment-first-container'>
                <div>
                  <img className='img-profile-micro' src={imgProfile ? imgProfile : './img/icon-profile.png'}/>
                </div>
                <div className='comment-user-container'>                
                    <p className='comment-username'>{username}</p>
                    <p className='comment-text'>{text}</p>
                </div>

            </div>
  )
}

export default Comment
